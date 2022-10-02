import rawBRE from "hardhat";
import {printContracts} from "../../../../../helpers/misc-utils";

async function main() {
  await rawBRE.run("set-DRE");
  printContracts();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
