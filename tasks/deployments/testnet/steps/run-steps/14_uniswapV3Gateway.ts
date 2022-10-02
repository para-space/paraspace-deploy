import rawBRE from "hardhat";
import {step_14} from "../14_uniswapV3Gateway";

import dotenv from "dotenv";

dotenv.config();

const verify = process.env.ETHERSCAN_VERIFICATION === "true" ? true : false;

async function main() {
  await rawBRE.run("set-DRE");

  await step_14(verify);
  console.log("----------------- step 14 done ----------------- ");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
