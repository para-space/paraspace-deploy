import {Contract, ethers} from "ethers";
import {
  deployERC721OracleWrapper,
  deployParaSpaceFallbackOracle,
  deployParaSpaceOracle,
  deployNftFloorPriceOracle,
} from "../../../../helpers/contracts-deployments";
import {getPairsTokenAggregator} from "../../../../helpers/contracts-getters";
import {tEthereumAddress} from "../../../../helpers/types";
import {NFT_PROJECTS_WITH_FLOOR_PRICE} from '../helpers/constants'

import {
  APE_ETH_ORACLE,
  WBTC_ETH_ORACLE,
  stETH_ETH_ORACLE,
  DAI_ETH_ORACLE,
  ETH_USD_ORACLE,
  USDC_ETH_ORACLE,
  USDT_ETH_ORACLE,
  BAYC,
  MAYC,
  PUNKS,
  DOODLES,
  BEND_DAO_ORACLE,
  UNISWAP_FACTORY,
  UNISWAP_ROUTER,
  WETH,
  USDC,
} from "../helpers/constants";

import {PoolAddressesProvider} from "../../../../../types"

import dotenv from "dotenv";

dotenv.config();

const verify = process.env.ETHERSCAN_VERIFICATION === "true" ? true : false;

export const deployOracles = async (
  deployedTokens: {[tokenSymbol: string]: Contract},
  addressesProvider: PoolAddressesProvider,
) => {  
  const nftFloorOracle = await deployNftFloorPriceOracle(NFT_PROJECTS_WITH_FLOOR_PRICE, verify)

  const fallbackOracle = await deployParaSpaceFallbackOracle(
    [BEND_DAO_ORACLE, UNISWAP_FACTORY, UNISWAP_ROUTER, WETH, USDC],
    verify
  );

  const allTokenAddresses = Object.entries(deployedTokens).reduce(
    (
      accum: {[tokenSymbol: string]: tEthereumAddress},
      [tokenSymbol, tokenContract]
    ) => ({
      ...accum,
      [tokenSymbol]: tokenContract.address,
    }),
    {}
  );

  const bayc_oracle = await deployERC721OracleWrapper(
    addressesProvider.address,
    nftFloorOracle.address,
    BAYC,
    verify
  );

  const mayc_oracle = await deployERC721OracleWrapper(
    addressesProvider.address,
    nftFloorOracle.address,
    MAYC,
    verify
  );

  const punk_oracle = await deployERC721OracleWrapper(
    addressesProvider.address,
    nftFloorOracle.address,
    PUNKS,
    verify
  );

  const doodles_oracle = await deployERC721OracleWrapper(
    addressesProvider.address,
    nftFloorOracle.address,
    DOODLES,
    verify
  );

  const allAggregatorsAddresses = {
    WETH: ETH_USD_ORACLE,
    DAI: DAI_ETH_ORACLE,
    USDC: USDC_ETH_ORACLE,
    USDT: USDT_ETH_ORACLE,
    APE: APE_ETH_ORACLE,
    WBTC: WBTC_ETH_ORACLE,
    stETH: stETH_ETH_ORACLE,
    BAYC: bayc_oracle.address,
    MAYC: mayc_oracle.address,
    WPUNKS: punk_oracle.address,
    DOODLE: doodles_oracle.address,
  };

  const [tokens, aggregators] = getPairsTokenAggregator(
    allTokenAddresses,
    allAggregatorsAddresses
  );

  console.log("tokens", tokens);
  console.log("aggs", aggregators);

  const paraspaceOracle = await deployParaSpaceOracle(
    [
      addressesProvider.address,
      tokens,
      aggregators,
      fallbackOracle.address,
      deployedTokens.WETH.address,
      ethers.constants.WeiPerEther.toString(),
    ],
    verify
  );

  return {fallbackOracle, nftFloorOracle, paraspaceOracle};
};
