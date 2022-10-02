import rawBRE from "hardhat";
import {step_06} from "../06_poolConfigurator";

import dotenv from "dotenv";

dotenv.config();

const verify = process.env.ETHERSCAN_VERIFICATION === "true" ? true : false;

async function main() {
  await rawBRE.run("set-DRE");

  await step_06(verify);
  console.log("----------------- step 06 done ----------------- ");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
