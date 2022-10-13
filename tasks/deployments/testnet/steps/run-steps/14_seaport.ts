import rawBRE from "hardhat";
import {step_14} from "../14_seaport";

async function main() {
  await rawBRE.run("set-DRE");

  await step_14();
  console.log("----------------- step 15 done ----------------- ");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
