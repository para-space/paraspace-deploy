import fs from "fs";
import {DRE, getDb} from "./misc-utils";
import {
  COVERAGE_CHAINID,
  FORK_MAINNET_CHAINID,
  HARDHAT_CHAINID,
} from "./hardhat-constants";
import {ConstructorArgs, LibraryAddresses, tEthereumAddress} from "./types";
import axios from "axios";
import minimatch from "minimatch";

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
  constructorArguments: ConstructorArgs;
  relatedSources?: true;
  libraries?: LibraryAddresses;
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
      ((await hasVerifiedSourceCode(address, network)) &&
        (await setIsVerified(contractId, address, network))))
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

  await verifyProxyContract(address, network);

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
  constructorArguments: ConstructorArgs = [],
  libraries?: LibraryAddresses
) => {
  const currentNetwork = DRE.network.name;
  const currentNetworkChainId = DRE.network.config.chainId;
  const verifyContracts =
    process.env.ETHERSCAN_VERIFICATION_CONTRACT?.trim().split(/\s?,\s?/);

  if (verifyContracts?.every((p) => !minimatch(contractId, p))) {
    return;
  }

  let isVerified = await getIsVerified(contractId, address, currentNetwork);
  if (isVerified) {
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

    const params: VerificationArgs = {
      address,
      constructorArguments,
      relatedSources: true,
      libraries,
    };
    await runTaskWithRetry("verify:verify", params, times, msDelay);
    isVerified = true;
    // eslint-disable-next-line
  } catch (error: any) {
    const errMsg = error.message || error;
    console.error(errMsg);
    isVerified = errMsg.includes(ALREADY_VERIFIED);
  }

  if (isVerified) await setIsVerified(contractId, address, currentNetwork);
};

export const runTaskWithRetry = async (
  task: string,
  params: VerificationArgs,
  times: number,
  msDelay: number
) => {
  let counter = times;
  await delay(msDelay);

  try {
    if (times > 1) {
      await DRE.run(task, params);
      return Promise.resolve();
    } else if (times === 1) {
      console.log(
        "[ETHERSCAN][WARNING] Trying to verify via uploading all sources."
      );
      delete params.relatedSources;
      await DRE.run(task, params);
      return Promise.resolve();
    } else {
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
    await runTaskWithRetry(task, params, counter, msDelay);
  }
};

const hasVerifiedSourceCode = async (
  address: tEthereumAddress,
  network: string
): Promise<boolean> => {
  try {
    const {data} = await axios.get(
      `https://${ETHERSCAN_APIS[network]}/api?module=contract&action=getsourcecode&address=${address}&apikey=${process.env.ETHERSCAN_KEY}`
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

const verifyProxyContract = async (
  address: tEthereumAddress,
  network: string
): Promise<boolean> => {
  try {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    const {data} = await axios.post(
      `https://${ETHERSCAN_APIS[network]}/api?module=contract&action=verifyproxycontract&apikey=${process.env.ETHERSCAN_KEY}`,
      `address=${address}`,
      {
        headers,
      }
    );
    return (
      data.status === "1" && data.message === "OK" && data.result.length > 0
    );
  } catch (e) {
    return false;
  }
};
