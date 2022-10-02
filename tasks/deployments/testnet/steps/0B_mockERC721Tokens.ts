import {deployAllMockERC721Tokens} from "../../../../helpers/contracts-deployments";

export const step_0B = async (verify = false) => {
  try {
    return await deployAllMockERC721Tokens(verify);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
