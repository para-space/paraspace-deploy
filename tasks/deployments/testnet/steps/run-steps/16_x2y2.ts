import rawBRE from "hardhat";
import {step_16} from "../16_x2y2";

async function main() {
  await rawBRE.run("set-DRE");

  await step_16();
  console.log("----------------- step 17 done ----------------- ");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
