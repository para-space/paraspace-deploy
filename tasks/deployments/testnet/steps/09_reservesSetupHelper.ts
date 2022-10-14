import {deployReservesSetupHelper} from "../../../../helpers/contracts-deployments";

export const step_09 = async (verify = false) => {
  try {
    return await deployReservesSetupHelper(verify);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
