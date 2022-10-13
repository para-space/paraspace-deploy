import rawBRE from "hardhat";
import {step_15} from "../15_looksrare";

async function main() {
  await rawBRE.run("set-DRE");

  await step_15();
  console.log("----------------- step 16 done ----------------- ");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
