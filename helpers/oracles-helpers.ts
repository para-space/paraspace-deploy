import {tEthereumAddress, iAssetBase, iAssetAggregatorBase} from "./types";
import {PriceOracle} from "../../types";
import {MockAggregator} from "../../types";
import {deployMockAggregator} from "./contracts-deployments";
import {waitForTx} from "./misc-utils";

export const setInitialAssetPricesInOracle = async (
  prices: iAssetBase<tEthereumAddress>,
  assetsAddresses: iAssetBase<tEthereumAddress>,
  priceOracleInstance: PriceOracle
) => {
  for (const [assetSymbol, price] of Object.entries(prices) as [
    string,
    string
  ][]) {
    console.log(price);
    console.log(assetSymbol);
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
  const aggregators: {[tokenSymbol: string]: MockAggregator} = {};
  for (const tokenContractName of Object.keys(initialPrices)) {
    if (tokenContractName !== "ETH") {
      const priceIndex = Object.keys(initialPrices).findIndex(
        (value) => value === tokenContractName
      );
      const [, price] = (Object.entries(initialPrices) as [string, string][])[
        priceIndex
      ];
      aggregators[tokenContractName] = await deployMockAggregator(
        tokenContractName,
        price,
        verify
      );
    }
  }
  return aggregators;
};
