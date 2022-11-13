import {deployACLManager} from "../../../../helpers/contracts-deployments";
import {getParaSpaceAdmins} from "../../../../helpers/contracts-helpers";
import {waitForTx} from "../../../../helpers/misc-utils";
import {
  getFirstSigner,
  getPoolAddressesProvider,
} from "../../../../helpers/contracts-getters";

export const step_05 = async (verify = false) => {
  const {paraSpaceAdminAddress, emergencyAdminAddress, riskAdminAddress} =
    await getParaSpaceAdmins();
  const addressesProvider = await getPoolAddressesProvider();
  const deployer = await getFirstSigner();
  const deployerAddress = await deployer.getAddress();

  try {
    const aclManager = await deployACLManager(
      addressesProvider.address,
      verify
    );
    await waitForTx(await addressesProvider.setACLManager(aclManager.address));

    await waitForTx(await aclManager.addPoolAdmin(deployerAddress));
    await waitForTx(
      await aclManager.addAssetListingAdmin(paraSpaceAdminAddress)
    );
    await waitForTx(await aclManager.addEmergencyAdmin(emergencyAdminAddress));
    await waitForTx(await aclManager.addRiskAdmin(riskAdminAddress));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
