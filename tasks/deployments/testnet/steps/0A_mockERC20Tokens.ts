import {deployAllMockERC20Tokens} from "../../../../helpers/contracts-deployments";
import rawBRE from "hardhat";

import dotenv from "dotenv";

dotenv.config();

const verify = process.env.ETHERSCAN_VERIFICATION === "true" ? true : false;

export const step_0A = async (verify = false) => {
  try {
    return await deployAllMockERC20Tokens(verify);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

async function main() {
  await rawBRE.run("set-DRE");

  await step_0A(verify);
  console.log("----------------- step 0A done ----------------- ");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
