import rawBRE from "hardhat";
import {step_10} from "../10_uiIncentiveDataProvider";

import dotenv from "dotenv";

dotenv.config();

const verify = process.env.ETHERSCAN_VERIFICATION === "true" ? true : false;

async function main() {
  await rawBRE.run("set-DRE");

  await step_10(verify);
  console.log("----------------- step 10 done ----------------- ");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
