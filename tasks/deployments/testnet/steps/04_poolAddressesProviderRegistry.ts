import {deployPoolAddressesProviderRegistry} from "../../../../helpers/contracts-deployments";
import {getPoolAddressesProvider} from "../../../../helpers/contracts-getters";
import {getParaSpaceAdmins} from "../../../../helpers/contracts-helpers";
import {waitForTx} from "../../../../helpers/misc-utils";
import ParaSpaceConfig from "../../../../market-config";

export const step_04 = async (verify = false) => {
  const {paraSpaceAdmin} = await getParaSpaceAdmins();
  const paraSpaceAdminAddress = await paraSpaceAdmin.getAddress();
  const addressesProvider = await getPoolAddressesProvider();

  try {
    const addressesProviderRegistry = await deployPoolAddressesProviderRegistry(
      paraSpaceAdminAddress,
      verify
    );

    await waitForTx(
      await addressesProviderRegistry.registerAddressesProvider(
        addressesProvider.address,
        ParaSpaceConfig.ProviderId
      )
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
