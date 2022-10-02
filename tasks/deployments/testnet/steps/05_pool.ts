import {FormatTypes} from "ethers/lib/utils";
import {ZERO_ADDRESS} from "../../../../helpers/constants";
import {deployPoolComponents} from "../../../../helpers/contracts-deployments";
import {
  getPool,
  getPoolAddressesProvider,
} from "../../../../helpers/contracts-getters";
import {insertContractAddressInDb} from "../../../../helpers/contracts-helpers";
import {waitForTx} from "../../../../helpers/misc-utils";
import {eContractid} from "../../../../helpers/types";

export const step_05 = async (verify = false) => {
  const addressesProvider = await getPoolAddressesProvider();

  try {
    const {poolCore, poolParameters, poolMarketplace, poolCoreSelectors, poolParametersSelectors, poolMarketplaceSelectors} = await deployPoolComponents(addressesProvider.address, verify);
    
    await waitForTx(
      await addressesProvider.updatePoolImpl([
        {
    implAddress: poolParameters.address,
    action: 0,
    functionSelectors: poolParametersSelectors
        }], ZERO_ADDRESS, '0x')
    );

    await waitForTx(
      await addressesProvider.updatePoolImpl([{
        implAddress: poolMarketplace.address,
        action: 0,
        functionSelectors: poolMarketplaceSelectors
      }], ZERO_ADDRESS, '0x')
    );

    const poolAddress = await addressesProvider.getPool();

    await waitForTx(
      await addressesProvider.updatePoolImpl([{
        implAddress: poolCore.address,
        action: 0,
        functionSelectors: poolCoreSelectors
      }], poolAddress, poolCore.interface.encodeFunctionData("initialize", [addressesProvider.address]))
    );

    const poolProxy = await getPool(poolAddress);

    await insertContractAddressInDb(eContractid.Pool, poolProxy.address);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
