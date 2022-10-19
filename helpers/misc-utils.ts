import low from "lowdb";
import {Wallet, ContractTransaction, BigNumber, utils} from "ethers";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import {
  ConstructorArgs,
  eContractid,
  iFunctionSignature,
  tEthereumAddress,
} from "./types";
import {Fragment, isAddress} from "ethers/lib/utils";
import {isZeroAddress} from "ethereumjs-util";
import mapLimit from "async/mapLimit";
import {verifyEtherscanContract} from "./etherscan-verification";
import {ABI} from "hardhat-deploy/dist/types";
import {getAdapter} from "./db-adapter";

export const getDb = () => low(getAdapter(process.env.DB_PATH ?? ":memory:"));

export let DRE: HardhatRuntimeEnvironment;

export const setDRE = (_DRE: HardhatRuntimeEnvironment) => {
  DRE = _DRE;
};

export const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const createRandomAddress = () => Wallet.createRandom().address;

export const setAutomineEvm = async (activate: boolean) => {
  await DRE.network.provider.send("evm_setAutomine", [activate]);
};

export const evmSnapshot = async () =>
  await DRE.ethers.provider.send("evm_snapshot", []);

export const evmRevert = async (id: string) =>
  DRE.ethers.provider.send("evm_revert", [id]);

export const timeLatest = async () => {
  const block = await DRE.ethers.provider.getBlock("latest");
  return BigNumber.from(block.timestamp);
};

export const advanceBlock = async (timestamp: number) =>
  await DRE.ethers.provider.send("evm_mine", [timestamp]);

export const increaseTime = async (secondsToIncrease: number) => {
  await DRE.ethers.provider.send("evm_increaseTime", [secondsToIncrease]);
  await DRE.ethers.provider.send("evm_mine", []);
};

export const setBlocktime = async (time: number) => {
  await DRE.ethers.provider.send("evm_setNextBlockTimestamp", [time]);
};

// Workaround for time travel tests bug: https://github.com/Tonyhaenn/hh-time-travel/blob/0161d993065a0b7585ec5a043af2eb4b654498b8/test/test.js#L12
export const advanceTimeAndBlock = async function (forwardTime: number) {
  const currentBlockNumber = await DRE.ethers.provider.getBlockNumber();
  const currentBlock = await DRE.ethers.provider.getBlock(currentBlockNumber);

  if (currentBlock === null) {
    /* Workaround for https://github.com/nomiclabs/hardhat/issues/1183
     */
    await DRE.ethers.provider.send("evm_increaseTime", [forwardTime]);
    await DRE.ethers.provider.send("evm_mine", []);
    //Set the next blocktime back to 15 seconds
    await DRE.ethers.provider.send("evm_increaseTime", [15]);
    return;
  }
  const currentTime = currentBlock.timestamp;
  const futureTime = currentTime + forwardTime;
  await DRE.ethers.provider.send("evm_setNextBlockTimestamp", [futureTime]);
  await DRE.ethers.provider.send("evm_mine", []);
};

export const setAutomine = async (activate: boolean) => {
  await DRE.network.provider.send("evm_setAutomine", [activate]);
  if (activate) await DRE.network.provider.send("evm_mine", []);
};

export const mine = async () => {
  await DRE.network.provider.send("evm_mine", []);
};

export const waitForTx = async (tx: ContractTransaction) => await tx.wait(1);

// export const filterMapBy = (
//   raw: {[key: string]: any},
//   fn: (key: string) => boolean
// ) =>
//   Object.keys(raw)
//     .filter(fn)
//     .reduce<{[key: string]: any}>((obj, key) => {
//       obj[key] = raw[key];
//       return obj;
//     }, {});

export const chunk = <T>(arr: Array<T>, chunkSize: number): Array<Array<T>> => {
  return arr.reduce(
    // eslint-disable-next-line
    (prevVal: any, currVal: any, currIndx: number, array: Array<T>) =>
      !(currIndx % chunkSize)
        ? prevVal.concat([array.slice(currIndx, currIndx + chunkSize)])
        : prevVal,
    []
  );
};

export interface DbEntry {
  [network: string]: {
    deployer: string;
    address: string;
    constructorArgs: ConstructorArgs;
    verified: boolean;
  };
}

export const printContracts = () => {
  const network = DRE.network.name;
  const db = getDb();
  const ignores = [eContractid.MintableERC20, eContractid.MintableERC721];
  console.log("Contracts deployed at", network);
  console.log("---------------------------------");

  const entries = Object.entries<DbEntry>(db.getState()).filter(
    ([key, value]) => {
      return !ignores.includes(key as eContractid) && !!value[network];
    }
  );

  const contractsPrint = entries.map(
    ([key, value]: [string, DbEntry]) => `${key}: ${value[network].address}`
  );

  console.log("N# Contracts:", entries.length);
  console.log(contractsPrint.join("\n"));
};

export const verifyContracts = async (limit = 1) => {
  const db = getDb();
  const network = DRE.network.name;
  const entries = Object.entries<DbEntry>(db.getState()).filter(
    ([key, value]) => {
      // constructorArgs must be Array to make the contract verifiable
      return !!value[network] && Array.isArray(value[network].constructorArgs);
    }
  );

  await mapLimit(entries, limit, async ([key, value]) => {
    const {address, constructorArgs = [], libraries} = value[network];
    console.log(`- Verifying ${key}`);
    console.log(`  - address: ${address}`);
    await verifyEtherscanContract(key, address, constructorArgs, libraries);
  });
};

export const notFalsyOrZeroAddress = (
  address: tEthereumAddress | null | undefined
): boolean => {
  if (!address) {
    return false;
  }
  return isAddress(address) && !isZeroAddress(address);
};

export const impersonateAccountsHardhat = async (accounts: string[]) => {
  if (process.env.TENDERLY === "true") {
    return;
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const account of accounts) {
    // eslint-disable-next-line no-await-in-loop
    await (DRE as HardhatRuntimeEnvironment).network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [account],
    });
  }
};

export const getFunctionSignatures = (
  abi: string | ReadonlyArray<Fragment | Fragment | string>
) => {
  const i = new utils.Interface(abi);
  return Object.keys(i.functions).map((f) => i.getSighash(i.functions[f]));
};

export const getFunctionSignatureObjs = (
  abi: string | ReadonlyArray<Fragment | Fragment | string> | ABI
): Array<iFunctionSignature> => {
  const i = new utils.Interface(abi);
  return Object.keys(i.functions).map((f) => {
    return {
      name: f,
      signature: i.getSighash(i.functions[f]),
    };
  });
};
