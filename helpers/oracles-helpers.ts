import {
  tEthereumAddress,
  iAssetBase,
  iAssetAggregatorBase,
  ERC721TokenContractId,
  ERC20TokenContractId,
} from "./types";
import {
  ERC721OracleWrapper,
  PriceOracle,
  UniswapV3OracleWrapper,
} from "../../types";
import {MockAggregator} from "../../types";
import {
  deployERC721OracleWrapper,
  deployMockAggregator,
  deployUniswapV3OracleWrapper,
} from "./contracts-deployments";
import {getParaSpaceConfig, waitForTx} from "./misc-utils";
import {
  getAllTokens,
  getPoolAddressesProvider,
  getUniswapV3Factory,
} from "./contracts-getters";
import {getContractAddresses} from "./contracts-helpers";

export const setInitialAssetPricesInOracle = async (
  prices: iAssetBase<tEthereumAddress>,
  assetsAddresses: iAssetBase<tEthereumAddress>,
  priceOracleInstance: PriceOracle
) => {
  for (const [assetSymbol, price] of Object.entries(prices)) {
    await waitForTx(
      await priceOracleInstance.setAssetPrice(
        assetsAddresses[assetSymbol],
        price
      )
    );
  }
};

export const deployAllAggregators = async (
  nftFloorOracle: tEthereumAddress,
  initialPrices?: iAssetAggregatorBase<string>,
  verify?: boolean
) => {
  const tokens = await getAllTokens();
  const aggregators: {
    [tokenSymbol: string]:
      | MockAggregator
      | UniswapV3OracleWrapper
      | ERC721OracleWrapper;
  } = {};
  const addressesProvider = await getPoolAddressesProvider();
  const chainlinkConfig = getParaSpaceConfig().Chainlink;
  for (const tokenSymbol of Object.keys(tokens)) {
    if (tokenSymbol === ERC20TokenContractId.WETH) {
      continue;
    }
    if (tokenSymbol === ERC721TokenContractId.UniswapV3) {
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
    if (chainlinkConfig[tokenSymbol]) {
      aggregators[tokenSymbol] = chainlinkConfig[tokenSymbol];
    } else if (!initialPrices) {
      aggregators[tokenSymbol] = await deployERC721OracleWrapper(
        addressesProvider.address,
        nftFloorOracle,
        tokens[tokenSymbol].address,
        verify
      );
    } else if (initialPrices[tokenSymbol]) {
      aggregators[tokenSymbol] = await deployMockAggregator(
        tokenSymbol,
        initialPrices[tokenSymbol],
        verify
      );
    } else {
      continue;
    }
  }

  const allTokenAddresses = getContractAddresses(tokens);
  const allAggregatorsAddresses = getContractAddresses(aggregators);

  return [allTokenAddresses, allAggregatorsAddresses];
};

export const getPairsTokenAggregators = (
  allAssetsAddresses: {
    [tokenSymbol: string]: tEthereumAddress;
  },
  aggregatorsAddresses: {[tokenSymbol: string]: tEthereumAddress}
): [string[], string[]] => {
  const pairs = Object.entries(allAssetsAddresses)
    .filter(([tokenSymbol]) => tokenSymbol !== ERC20TokenContractId.WETH)
    .map(([tokenSymbol, tokenAddress]) => {
      return [tokenAddress, aggregatorsAddresses[tokenSymbol]];
    }) as [string, string][];

  const mappedPairs = pairs.map(([asset]) => asset);
  const mappedAggregators = pairs.map(([, source]) => source);

  return [mappedPairs, mappedAggregators];
};
