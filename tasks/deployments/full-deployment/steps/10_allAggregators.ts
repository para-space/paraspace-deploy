import {constants} from "ethers";
import {
  deployNFTFloorPriceOracle,
  deployParaSpaceOracle,
  deployProtocolDataProvider,
  deployUiPoolDataProvider,
  deployWalletBalanceProvider,
} from "../../../../helpers/contracts-deployments";
import {
  getAllERC721Tokens,
  getAllTokens,
  getPoolAddressesProvider,
  getPriceOracle,
} from "../../../../helpers/contracts-getters";
import {getEthersSignersAddresses} from "../../../../helpers/contracts-helpers";
import {getParaSpaceConfig, waitForTx} from "../../../../helpers/misc-utils";
import {
  deployAllAggregators,
  getPairsTokenAggregators,
} from "../../../../helpers/oracles-helpers";
import {
  ERC20TokenContractId,
  ERC721TokenContractId,
} from "../../../../helpers/types";

const deployNftOracle = async (verify = false) => {
  const erc721Tokens = await getAllERC721Tokens();
  // UniswapV3 should use price from `UniswapV3OracleWrapper` instead of NFTFloorOracle
  delete erc721Tokens[ERC721TokenContractId.UniswapV3];
  const [deployer, user1, user2] = await getEthersSignersAddresses();
  //at launch phase we will only use 2 feeders for nft oracle in mainnet
  const feeders = [user1, user2];
  const projects = Object.values(erc721Tokens).map((x) => x.address);
  const nftFloorOracle = await deployNFTFloorPriceOracle(verify);
  await waitForTx(await nftFloorOracle.initialize(deployer, feeders, projects));
  return nftFloorOracle;
};

export const step_10 = async (verify = false) => {
  try {
    const allTokens = await getAllTokens();
    const addressesProvider = await getPoolAddressesProvider();
    const fallbackOracle = await getPriceOracle();
    const chainlinkConfig = getParaSpaceConfig().Chainlink;

    const nftFloorOracle = await deployNftOracle(verify);

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
      (chainlinkConfig.WETH ||
        allAggregatorsAddresses[ERC20TokenContractId.USDT])!,
      (chainlinkConfig.WETH ||
        allAggregatorsAddresses[ERC20TokenContractId.USDC])!,
      verify
    );
    await deployWalletBalanceProvider(verify);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
