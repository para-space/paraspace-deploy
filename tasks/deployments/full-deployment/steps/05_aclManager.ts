import {deployACLManager} from "../../../../helpers/contracts-deployments";
import {getParaSpaceAdmins} from "../../../../helpers/contracts-helpers";
import {waitForTx} from "../../../../helpers/misc-utils";
import {getPoolAddressesProvider} from "../../../../helpers/contracts-getters";

export const step_05 = async (verify = false) => {
  const {deployer, emergencyAdmin, riskAdmin} =
    await getParaSpaceAdmins();
  const addressesProvider = await getPoolAddressesProvider();

  try {
    const aclManager = await deployACLManager(
      addressesProvider.address,
      verify
    );
    await waitForTx(await addressesProvider.setACLManager(aclManager.address));

    // Temporary setting, renounceRole needs to be done later
    await waitForTx(await aclManager.addPoolAdmin(deployer));

    await waitForTx(await aclManager.addAssetListingAdmin(deployer));
    await waitForTx(await aclManager.addEmergencyAdmin(emergencyAdmin));
    await waitForTx(await aclManager.addRiskAdmin(riskAdmin));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
