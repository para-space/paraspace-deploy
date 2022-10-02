import rawBRE from "hardhat";
import {step_17} from "../17_x2y2";

async function main() {
  await rawBRE.run("set-DRE");

  await step_17();
  console.log("----------------- step 17 done ----------------- ");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
