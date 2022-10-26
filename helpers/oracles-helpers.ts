import {
  tEthereumAddress,
  iAssetBase,
  iAssetAggregatorBase,
  ERC721TokenContractId,
} from "./types";
import {PriceOracle, UniswapV3OracleWrapper} from "../../types";
import {MockAggregator} from "../../types";
import {
  deployMockAggregator,
  deployUniswapV3OracleWrapper,
} from "./contracts-deployments";
import {waitForTx} from "./misc-utils";
import {
  getAllTokens,
  getPoolAddressesProvider,
  getUniswapV3Factory,
} from "./contracts-getters";

export const setInitialAssetPricesInOracle = async (
  prices: iAssetBase<tEthereumAddress>,
  assetsAddresses: iAssetBase<tEthereumAddress>,
  priceOracleInstance: PriceOracle
) => {
  for (const [assetSymbol, price] of Object.entries(prices) as [
    string,
    string
  ][]) {
    await waitForTx(
      await priceOracleInstance.setAssetPrice(
        assetsAddresses[assetSymbol],
        price
      )
    );
  }
};

export const deployAllAggregators = async (
  initialPrices: iAssetAggregatorBase<string>,
  verify?: boolean
) => {
  const tokens = await getAllTokens();
  const aggregators: {
    [tokenSymbol: string]: MockAggregator | UniswapV3OracleWrapper;
  } = {};
  for (const tokenSymbol of Object.keys(tokens)) {
    if (tokenSymbol === "ETH") {
      continue;
    }
    if (tokenSymbol === ERC721TokenContractId.UniswapV3) {
      const addressesProvider = await getPoolAddressesProvider();
      const univ3Factory = await getUniswapV3Factory();
      const univ3Token = await tokens[ERC721TokenContractId.UniswapV3];
      aggregators[tokenSymbol] = await deployUniswapV3OracleWrapper(
        univ3Factory.address,
        univ3Token.address,
        addressesProvider.address,
        verify
      );
      continue;
    }
    aggregators[tokenSymbol] = await deployMockAggregator(
      tokenSymbol,
      initialPrices[tokenSymbol],
      verify
    );
  }

  const allTokenAddresses = Object.entries(tokens).reduce(
    (
      accum: {[tokenSymbol: string]: tEthereumAddress},
      [tokenSymbol, token]
    ) => ({
      ...accum,
      [tokenSymbol]: token.address,
    }),
    {}
  );

  const allAggregatorsAddresses = Object.entries(aggregators).reduce(
    (
      accum: {[tokenSymbol: string]: tEthereumAddress},
      [tokenSymbol, aggregator]
    ) => ({
      ...accum,
      [tokenSymbol]: aggregator.address,
    }),
    {}
  );

  return [allTokenAddresses, allAggregatorsAddresses];
};
