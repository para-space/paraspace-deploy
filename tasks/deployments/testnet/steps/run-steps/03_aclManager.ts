import rawBRE from "hardhat";
import {step_03} from "../03_aclManager";

import dotenv from "dotenv";

dotenv.config();

const verify = process.env.ETHERSCAN_VERIFICATION === "true" ? true : false;

async function main() {
  await rawBRE.run("set-DRE");

  await step_03(verify);
  console.log("----------------- step 03 done ----------------- ");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
