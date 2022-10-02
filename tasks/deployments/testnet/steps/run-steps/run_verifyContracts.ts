import rawBRE from "hardhat";
import {verifyContracts} from "../../../../../helpers/misc-utils";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  await rawBRE.run("set-DRE");
  await verifyContracts();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
