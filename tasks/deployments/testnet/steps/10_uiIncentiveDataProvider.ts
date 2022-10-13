import {deployUiIncentiveDataProvider} from "../../../../helpers/contracts-deployments";
import rawBRE from "hardhat";

import dotenv from "dotenv";

dotenv.config();

const verify = process.env.ETHERSCAN_VERIFICATION === "true" ? true : false;

export const step_10 = async (verify = false) => {
  try {
    return await deployUiIncentiveDataProvider(verify);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

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
