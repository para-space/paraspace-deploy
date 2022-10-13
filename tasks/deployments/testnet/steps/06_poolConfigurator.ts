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
import rawBRE from "hardhat";

import dotenv from "dotenv";

dotenv.config();

const verify = process.env.ETHERSCAN_VERIFICATION === "true" ? true : false;

export const step_06 = async (verify = false) => {
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
      await poolConfiguratorProxy.setMaxAtomicTokensAllowed(
        ParaSpaceConfig.MaxUserAtomicTokensAllowed
      )
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

async function main() {
  await rawBRE.run("set-DRE");

  await step_06(verify);
  console.log("----------------- step 06 done ----------------- ");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
