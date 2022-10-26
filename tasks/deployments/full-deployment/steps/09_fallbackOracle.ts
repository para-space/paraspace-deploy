import {
  deployFallbackOracle,
  deployNFTFloorPriceOracle,
  deployParaSpaceFallbackOracle,
} from "../../../../helpers/contracts-deployments";
import {
  getAllERC20Tokens,
  getAllERC721Tokens,
  getAllTokens,
  getCryptoPunksMarket,
} from "../../../../helpers/contracts-getters";
import {
  isLocalTestnet,
  isMainnet,
  isPublicTestnet,
} from "../../../../helpers/misc-utils";
import {waitForTx} from "../../../../helpers/misc-utils";
import {setInitialAssetPricesInOracle} from "../../../../helpers/oracles-helpers";
import ParaSpaceConfig from "../../../../market-config";
import {DRE} from "../../../../helpers/misc-utils";
import {ERC721TokenContractId} from "../../../../helpers/types";

export const step_09 = async (verify = false) => {
  try {
    const ALL_ASSETS_INITIAL_PRICES =
      ParaSpaceConfig.Mocks.AllAssetsInitialPrices;
    const erc20Tokens = await getAllERC20Tokens();
    const erc721Tokens = await getAllERC721Tokens();
    const punks = await getCryptoPunksMarket();

    // UniswapV3 should use price from `UniswapV3OracleWrapper` instead of NFTFloorOracle
    delete erc721Tokens[ERC721TokenContractId.UniswapV3];

    if (isMainnet()) {
      const nftFloorOracle = await deployNFTFloorPriceOracle(
        Object.values(erc721Tokens).map((x) => x.address),
        verify
      );
      const fallbackOracle = await deployParaSpaceFallbackOracle(
        [
          ParaSpaceConfig.Oracle.BEND_DAO!,
          ParaSpaceConfig.Uniswap.V2Factory,
          ParaSpaceConfig.Uniswap.V2Router,
          ParaSpaceConfig.WETH,
          ParaSpaceConfig.USDC,
        ],
        verify
      );
    }

    if (isLocalTestnet() || isPublicTestnet()) {
      //for testnet we only deploy but still use mock price instead
      const nftFloorOracle = await deployNFTFloorPriceOracle([], verify);
      const fallbackOracle = await deployFallbackOracle(verify);
      await waitForTx(
        await fallbackOracle.setEthUsdPrice(ParaSpaceConfig.Mocks.USDPriceInWEI)
      );
      await setInitialAssetPricesInOracle(
        ALL_ASSETS_INITIAL_PRICES,
        {
          // ERC20
          WETH: erc20Tokens.WETH.address,
          aWETH: erc20Tokens.aWETH.address,
          cETH: erc20Tokens.cETH.address,
          DAI: erc20Tokens.DAI.address,
          USDC: erc20Tokens.USDC.address,
          USDT: erc20Tokens.USDT.address,
          stETH: erc20Tokens.stETH.address,
          APE: erc20Tokens.APE.address,
          PUNK: erc20Tokens.PUNK.address,
          WBTC: erc20Tokens.WBTC.address,
          // ERC721
          BAYC: erc721Tokens.BAYC.address,
          WPUNKS: erc721Tokens.WPUNKS.address,
          PUNKS: punks.address,
          MAYC: erc721Tokens.MAYC.address,
          DOODLE: erc721Tokens.DOODLE.address,
          MOONBIRD: erc721Tokens.MOONBIRD.address,
          MEEBITS: erc721Tokens.MEEBITS.address,
          AZUKI: erc721Tokens.AZUKI.address,
          OTHR: erc721Tokens.OTHR.address,
          CLONEX: erc721Tokens.CLONEX.address,
        },
        fallbackOracle
      );
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
