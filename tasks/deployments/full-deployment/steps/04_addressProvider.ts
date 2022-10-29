import {
  deployPoolAddressesProvider,
  deployPoolAddressesProviderRegistry,
} from "../../../../helpers/contracts-deployments";
import {getParaSpaceAdmins} from "../../../../helpers/contracts-helpers";
import {waitForTx} from "../../../../helpers/misc-utils";
import ParaSpaceConfig from "../../../../market-config";

export const step_04 = async (verify = false) => {
  const {deployer} = await getParaSpaceAdmins();

  try {
    const addressesProviderRegistry = await deployPoolAddressesProviderRegistry(
      deployer,
      verify
    );
    const addressesProvider = await deployPoolAddressesProvider(
      ParaSpaceConfig.MarketId,
      deployer,
      verify
    );
    await waitForTx(
      await addressesProviderRegistry.registerAddressesProvider(
        addressesProvider.address,
        ParaSpaceConfig.ProviderId
      )
    );
    // Temporary setting, renounceRole needs to be done later
    await waitForTx(await addressesProvider.setACLAdmin(deployer));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
