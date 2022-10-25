import {
  tEthereumAddress,
  iAssetBase,
  iAssetAggregatorBase,
  ERC20TokenContractId,
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
  getNonfungiblePositionManager,
  getPairsTokenAggregator,
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
    const assetAddressIndex = Object.keys(assetsAddresses).findIndex(
      (value) => value === assetSymbol
    );
    const [, assetAddress] = (
      Object.entries(assetsAddresses) as [string, string][]
    )[assetAddressIndex];
    await waitForTx(
      await priceOracleInstance.setAssetPrice(assetAddress, price)
    );
  }
};

export const deployAllMockAggregators = async (
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
    const priceIndex = Object.keys(initialPrices).findIndex(
      (value) => value === tokenSymbol
    );
    const [, price] = (Object.entries(initialPrices) as [string, string][])[
      priceIndex
    ];
    aggregators[tokenSymbol] = await deployMockAggregator(
      tokenSymbol,
      price,
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
