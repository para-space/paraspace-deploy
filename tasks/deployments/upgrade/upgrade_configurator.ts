import {deployPoolConfigurator} from "../../../helpers/contracts-deployments";
import {getPoolAddressesProvider} from "../../../helpers/contracts-getters";
import {waitForTx} from "../../../helpers/misc-utils";

export const upgradeConfigurator = async (verify = false) => {
  const addressesProvider = await getPoolAddressesProvider();
  console.time("deploy PoolConfigurator");
  const poolConfiguratorImpl = await deployPoolConfigurator(verify);
  console.timeEnd("deploy PoolConfigurator");

  console.time("upgrade PoolConfigurator");
  await waitForTx(
    await addressesProvider.setPoolConfiguratorImpl(
      poolConfiguratorImpl.address
    )
  );
  console.timeEnd("upgrade PoolConfigurator");
};
