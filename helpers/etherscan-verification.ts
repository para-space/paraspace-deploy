import fs from "fs";
import {file} from "tmp-promise";
import {DRE, getDb} from "./misc-utils";
import {
  COVERAGE_CHAINID,
  FORK_MAINNET_CHAINID,
  HARDHAT_CHAINID,
} from "./hardhat-constants";
import {tEthereumAddress} from "./types";
import axios from "axios";

const ALREADY_VERIFIED = "Already Verified";

const fatalErrors = [
  `The address provided as argument contains a contract, but its bytecode`,
  `Daily limit of 100 source code submissions reached`,
  `has no bytecode. Is the contract deployed to this network`,
  `The constructor for`,
  ALREADY_VERIFIED,
];

const okErrors = [`Contract source code already verified`];

const unableVerifyError = "Fail - Unable to verify";

type VerificationArgs = {
  address: string;
  constructorArgs: string | number | string[] | number[];
  relatedSources?: true;
};

export const SUPPORTED_ETHERSCAN_NETWORKS = [
  "main",
  "ropsten",
  "kovan",
  "matic",
  "mumbai",
  "rinkeby",
  "goerli",
];

export const ETHERSCAN_APIS = {
  main: "api.etherscan.io",
  ropsten: "api-ropsten.etherscan.io",
  kovan: "api-kovan.etherscan.io",
  rinkeby: "api-rinkeby.etherscan.io",
  goerli: "api-goerli.etherscan.io",
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getIsVerified = async (
  contractId: string,
  address: string,
  network: string
) => {
  const value = await getDb().get(`${contractId}.${network}`).value();
  return (
    value?.address == address &&
    (value?.verified ||
      (ETHERSCAN_APIS[network] &&
        (await hasVerifiedSourceCode(address, network))))
  );
};

const setIsVerified = async (
  contractId: string,
  address: string,
  network: string
) => {
  const db = getDb();
  const key = `${contractId}.${network}`;
  const value = await db.get(key).value();
  if (value?.address != address || value?.verified) {
    return;
  }

  await db
    .set(key, {
      ...value,
      verified: true,
    })
    .write();
};

export const verifyEtherscanContract = async (
  contractId: string,
  address: string,
  constructorArguments: (
    | string
    | number
    | boolean
    | string[]
    | number[]
    | boolean[]
  )[] = []
) => {
  const currentNetwork = DRE.network.name;
  const currentNetworkChainId = DRE.network.config.chainId;
  const isVerified = await getIsVerified(contractId, address, currentNetwork);

  if (isVerified) {
    await setIsVerified(contractId, address, currentNetwork);
    return;
  }

  // hardhat = 31337
  // forked mainnet = 522
  if (
    currentNetworkChainId === HARDHAT_CHAINID ||
    currentNetworkChainId === FORK_MAINNET_CHAINID ||
    currentNetworkChainId === COVERAGE_CHAINID
  ) {
    return;
  }

  if (!SUPPORTED_ETHERSCAN_NETWORKS.includes(currentNetwork)) {
    throw Error(
      `Current network ${currentNetwork} not supported. Please change to one of the next networks: ${SUPPORTED_ETHERSCAN_NETWORKS.toString()}`
    );
  }

  if (!process.env.ETHERSCAN_KEY) {
    throw Error("Missing process.env.ETHERSCAN_KEY.");
  }

  try {
    console.log(
      "[ETHERSCAN][WARNING] Delaying Etherscan verification due their API can not find newly deployed contracts"
    );
    const msDelay = 3000;
    const times = 3;
    // Write a temporal file to host complex parameters for buidler-etherscan https://github.com/nomiclabs/buidler/tree/development/packages/buidler-etherscan#complex-arguments
    const {fd, path, cleanup} = await file({
      prefix: "verify-params-",
      postfix: ".js",
    });
    fs.writeSync(
      fd,
      `module.exports = ${JSON.stringify([...constructorArguments])};`
    );

    const params: VerificationArgs = {
      address: address,
      constructorArgs: path,
      relatedSources: true,
    };
    await runTaskWithRetry("verify", params, times, msDelay, cleanup);
    await setIsVerified(contractId, address, currentNetwork);
    // eslint-disable-next-line
  } catch (error: any) {
    const errMsg = error.message || error;
    console.error(errMsg);
    if (errMsg.includes(ALREADY_VERIFIED)) {
      await setIsVerified(contractId, address, currentNetwork);
    }
  }
};

export const runTaskWithRetry = async (
  task: string,
  params: VerificationArgs,
  times: number,
  msDelay: number,
  cleanup: () => void
) => {
  let counter = times;
  await delay(msDelay);

  try {
    if (times > 1) {
      await DRE.run(task, params);
      await cleanup();
      return Promise.resolve();
    } else if (times === 1) {
      console.log(
        "[ETHERSCAN][WARNING] Trying to verify via uploading all sources."
      );
      delete params.relatedSources;
      await DRE.run(task, params);
      await cleanup();
      return Promise.resolve();
    } else {
      await cleanup();
      const errMsg =
        "[ETHERSCAN][ERROR] Errors after all the retries, check the logs for more information.";
      return Promise.reject(new Error(errMsg));
    }
    // eslint-disable-next-line
  } catch (error: any) {
    counter--;
    if (okErrors.some((okReason) => error.message.includes(okReason))) {
      console.info(
        "[ETHERSCAN][INFO] Skipping due OK response: ",
        error.message
      );
      return Promise.resolve();
    }

    if (fatalErrors.some((fatalError) => error.message.includes(fatalError))) {
      const errMsg = `[ETHERSCAN][ERROR] Fatal error detected, skip retries and resume deployment.${error.message}`;
      return Promise.reject(new Error(errMsg));
    }

    console.error("[ETHERSCAN][ERROR]", error.message);
    console.log();
    console.info(`[ETHERSCAN][[INFO] Retrying attempts: ${counter}.`);
    if (error.message.includes(unableVerifyError)) {
      console.log(
        "[ETHERSCAN][WARNING] Trying to verify via uploading all sources."
      );
      delete params.relatedSources;
    }
    await runTaskWithRetry(task, params, counter, msDelay, cleanup);
  }
};

const hasVerifiedSourceCode = async (
  address: tEthereumAddress,
  network: string
): Promise<boolean> => {
  const apiBase = ETHERSCAN_APIS[network];
  try {
    const {data} = await axios.get(
      `https://${apiBase}/api?module=contract&action=getsourcecode&address=${address}&apikey=${process.env.ETHERSCAN_KEY}`
    );
    return (
      data.status === "1" &&
      data.message === "OK" &&
      data.result.length > 0 &&
      data.result.some(({SourceCode}) => !!SourceCode)
    );
  } catch (e) {
    return false;
  }
};
