import {constants} from "ethers";
import {
  deployParaSpaceOracle,
  deployProtocolDataProvider,
  deployUiPoolDataProvider,
  deployWalletBalanceProvider,
} from "../../../../helpers/contracts-deployments";
import {
  getAllTokens,
  getNFTFloorOracle,
  getPoolAddressesProvider,
  getPriceOracle,
} from "../../../../helpers/contracts-getters";
import {getParaSpaceConfig, waitForTx} from "../../../../helpers/misc-utils";
import {
  deployAllAggregators,
  getPairsTokenAggregators,
} from "../../../../helpers/oracles-helpers";
import {ERC20TokenContractId} from "../../../../helpers/types";

export const step_10 = async (verify = false) => {
  try {
    const allTokens = await getAllTokens();
    const addressesProvider = await getPoolAddressesProvider();
    const nftFloorOracle = await getNFTFloorOracle();
    const fallbackOracle = await getPriceOracle();

    const [allTokenAddresses, allAggregatorsAddresses] =
      await deployAllAggregators(
        nftFloorOracle.address,
        getParaSpaceConfig().Mocks?.AllAssetsInitialPrices,
        verify
      );

    const [tokens, aggregators] = getPairsTokenAggregators(
      allTokenAddresses,
      allAggregatorsAddresses
    );

    const paraspaceOracle = await deployParaSpaceOracle(
      [
        addressesProvider.address,
        tokens,
        aggregators,
        fallbackOracle.address,
        allTokens.WETH.address,
        constants.WeiPerEther.toString(),
      ],
      verify
    );
    await waitForTx(
      await addressesProvider.setPriceOracle(paraspaceOracle.address)
    );

    const protocolDataProvider = await deployProtocolDataProvider(
      addressesProvider.address,
      verify
    );
    await addressesProvider.setProtocolDataProvider(
      protocolDataProvider.address
    );

    await deployUiPoolDataProvider(
      allAggregatorsAddresses[ERC20TokenContractId.WETH],
      allAggregatorsAddresses[ERC20TokenContractId.WETH],
      verify
    );
    await deployWalletBalanceProvider(verify);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
