import rawBRE from "hardhat";
import {printContracts} from "../../../helpers/misc-utils";
import {getPoolAddressesProvider} from "../../../helpers/contracts-getters";
import {deployPool} from "../../../helpers/contracts-deployments";

import dotenv from "dotenv";

dotenv.config();

const verify = process.env.ETHERSCAN_VERIFICATION === "true" ? true : false;

const upgradePool = async () => {
  const poolAddressesProvider = await getPoolAddressesProvider(
    "0xcA89c82AAC429875Db4F9d7AfF8bb2f18900924A"
  );

  const poolImpl = await deployPool(poolAddressesProvider.address, verify);

  console.log("new pool", poolImpl.address);
  const poolIml = await poolAddressesProvider.setPoolImpl(poolImpl.address, {
    gasLimit: 1000000,
  });
  console.log((await poolIml.wait()).logs);
  console.log("new pool address", poolImpl.address);
};

async function main() {
  await rawBRE.run("set-DRE");

  await upgradePool();

  printContracts();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
