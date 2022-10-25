import {
  deployPoolAddressesProvider,
  deployPoolAddressesProviderRegistry,
} from "../../../../helpers/contracts-deployments";
import {getParaSpaceAdmins} from "../../../../helpers/contracts-helpers";
import {waitForTx} from "../../../../helpers/misc-utils";
import ParaSpaceConfig from "../../../../market-config";

export const step_04 = async (verify = false) => {
  const {paraSpaceAdmin} = await getParaSpaceAdmins();
  const paraSpaceAdminAddress = await paraSpaceAdmin.getAddress();

  try {
    const addressesProviderRegistry = await deployPoolAddressesProviderRegistry(
      paraSpaceAdminAddress,
      verify
    );
    const addressesProvider = await deployPoolAddressesProvider(
      ParaSpaceConfig.MarketId,
      paraSpaceAdminAddress,
      verify
    );
    await waitForTx(
      await addressesProviderRegistry.registerAddressesProvider(
        addressesProvider.address,
        ParaSpaceConfig.ProviderId
      )
    );
    await waitForTx(await addressesProvider.setACLAdmin(paraSpaceAdminAddress));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
