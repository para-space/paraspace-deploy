import {
  deployPoolAddressesProvider,
  deployPoolAddressesProviderRegistry,
} from "../../../../helpers/contracts-deployments";
import {getParaSpaceAdmins} from "../../../../helpers/contracts-helpers";
import {getParaSpaceConfig, waitForTx} from "../../../../helpers/misc-utils";

export const step_04 = async (verify = false) => {
  const {paraSpaceAdminAddress} = await getParaSpaceAdmins();

  try {
    const addressesProviderRegistry = await deployPoolAddressesProviderRegistry(
      paraSpaceAdminAddress,
      verify
    );
    const addressesProvider = await deployPoolAddressesProvider(
      getParaSpaceConfig().MarketId,
      paraSpaceAdminAddress,
      verify
    );
    await waitForTx(
      await addressesProviderRegistry.registerAddressesProvider(
        addressesProvider.address,
        getParaSpaceConfig().ProviderId
      )
    );
    await waitForTx(await addressesProvider.setACLAdmin(paraSpaceAdminAddress));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
