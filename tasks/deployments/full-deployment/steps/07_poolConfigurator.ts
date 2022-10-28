import {deployPoolConfigurator} from "../../../../helpers/contracts-deployments";
import {
  getPoolAddressesProvider,
  getPoolConfiguratorProxy,
  getACLManager,
} from "../../../../helpers/contracts-getters";
import {
  getParaSpaceAdmins,
  insertContractAddressInDb,
} from "../../../../helpers/contracts-helpers";
import {waitForTx} from "../../../../helpers/misc-utils";
import {eContractid} from "../../../../helpers/types";
import ParaSpaceConfig from "../../../../market-config";

export const step_07 = async (verify = false) => {
  const {riskAdmin} = await getParaSpaceAdmins();
  const riskAdminAddress = await riskAdmin.getAddress();
  const addressesProvider = await getPoolAddressesProvider();
  const aclManager = await getACLManager();

  try {
    const poolConfiguratorImpl = await deployPoolConfigurator(verify);
    await waitForTx(
      await addressesProvider.setPoolConfiguratorImpl(
        poolConfiguratorImpl.address
      )
    );
    await waitForTx(await aclManager.addRiskAdmin(riskAdminAddress));
    const poolConfiguratorProxy = await getPoolConfiguratorProxy(
      await addressesProvider.getPoolConfigurator()
    );
    await waitForTx(
      await poolConfiguratorProxy.setAuctionRecoveryHealthFactor(
        ParaSpaceConfig.AuctionRecoveryHealthFactor
      )
    );
    await insertContractAddressInDb(
      eContractid.PoolConfiguratorProxy,
      poolConfiguratorProxy.address
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
