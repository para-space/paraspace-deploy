import {deployAllMockERC20Tokens} from "../../../../helpers/contracts-deployments";

export const step_0A = async (verify = false) => {
  try {
    return await deployAllMockERC20Tokens(verify);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
