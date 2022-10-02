import rawBRE from "hardhat";
import {step_00} from "../00_deleteDb";

async function main() {
  await rawBRE.run("set-DRE");

  await step_00();
  console.log("----------------- step 00 done ----------------- ");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
