import {ZERO_ADDRESS} from "../../../../helpers/constants";
import {deployPoolComponents} from "../../../../helpers/contracts-deployments";
import {
  getPoolProxy,
  getPoolAddressesProvider,
} from "../../../../helpers/contracts-getters";
import {registerContractInDb} from "../../../../helpers/contracts-helpers";
import {waitForTx} from "../../../../helpers/misc-utils";
import {eContractid} from "../../../../helpers/types";

export const step_06 = async (verify = false) => {
  const addressesProvider = await getPoolAddressesProvider();

  try {
    const {
      poolCore,
      poolParameters,
      poolMarketplace,
      poolCoreSelectors,
      poolParametersSelectors,
      poolMarketplaceSelectors,
    } = await deployPoolComponents(addressesProvider.address, verify);

    await waitForTx(
      await addressesProvider.updatePoolImpl(
        [
          {
            implAddress: poolParameters.address,
            action: 0,
            functionSelectors: poolParametersSelectors,
          },
        ],
        ZERO_ADDRESS,
        "0x"
      )
    );

    await waitForTx(
      await addressesProvider.updatePoolImpl(
        [
          {
            implAddress: poolMarketplace.address,
            action: 0,
            functionSelectors: poolMarketplaceSelectors,
          },
        ],
        ZERO_ADDRESS,
        "0x"
      )
    );

    const poolAddress = await addressesProvider.getPool();

    await waitForTx(
      await addressesProvider.updatePoolImpl(
        [
          {
            implAddress: poolCore.address,
            action: 0,
            functionSelectors: poolCoreSelectors,
          },
        ],
        poolAddress,
        poolCore.interface.encodeFunctionData("initialize", [
          addressesProvider.address,
        ])
      )
    );

    const poolProxy = await getPoolProxy(poolAddress);
    await registerContractInDb(eContractid.PoolProxy, poolProxy, [
      addressesProvider.address,
    ]);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
