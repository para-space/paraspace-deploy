import {deployUiIncentiveDataProvider} from "../../../../helpers/contracts-deployments";
import {isLocalTestnet, isPublicTestnet} from "../../../../helpers/misc-utils";

export const step_12 = async (verify = false) => {
  try {
    if (!isLocalTestnet() && !isPublicTestnet()) {
      return;
    }

    return await deployUiIncentiveDataProvider(verify);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
