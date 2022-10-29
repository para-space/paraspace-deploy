import {
  getACLManager,
  getPoolAddressesProvider,
  getPoolAddressesProviderRegistry,
} from "../../../../helpers/contracts-getters";
import {getParaSpaceAdmins} from "../../../../helpers/contracts-helpers";
import {waitForTx} from "../../../../helpers/misc-utils";

export const step_19 = async () => {
  try {
    const addressesProviderRegistry = await getPoolAddressesProviderRegistry();
    const addressesProvider = await getPoolAddressesProvider();
    const aclManager = await getACLManager();
    const {paraSpaceAdmin, deployer} = await getParaSpaceAdmins();
    await waitForTx(await aclManager.addAssetListingAdmin(paraSpaceAdmin));
    await waitForTx(await aclManager.addPoolAdmin(paraSpaceAdmin));
    await waitForTx(await aclManager.removeAssetListingAdmin(deployer));
    await waitForTx(await aclManager.removePoolAdmin(deployer));

    await waitForTx(await addressesProvider.setACLAdmin(paraSpaceAdmin));
    await waitForTx(await addressesProvider.transferOwnership(paraSpaceAdmin));
    await waitForTx(
      await addressesProviderRegistry.transferOwnership(paraSpaceAdmin)
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
