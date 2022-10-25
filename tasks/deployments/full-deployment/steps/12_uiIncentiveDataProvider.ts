import {deployUiIncentiveDataProvider} from "../../../../helpers/contracts-deployments";
import {
  isLocalTestnet,
  isPublicTestnet,
} from "../../../../helpers/contracts-helpers";
import {DRE} from "../../../../helpers/misc-utils";

export const step_12 = async (verify = false) => {
  try {
    if (!isLocalTestnet(DRE) && !isPublicTestnet(DRE)) {
      return;
    }

    return await deployUiIncentiveDataProvider(verify);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
