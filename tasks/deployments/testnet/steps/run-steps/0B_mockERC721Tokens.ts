import rawBRE from "hardhat";
import {step_0B} from "../0B_mockERC721Tokens";

import dotenv from "dotenv";

dotenv.config();

const verify = process.env.ETHERSCAN_VERIFICATION === "true" ? true : false;

async function main() {
  await rawBRE.run("set-DRE");

  await step_0B(verify);
  console.log("----------------- step 0B done ----------------- ");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
