import {
  deployPriceOracle,
  deployNFTFloorPriceOracle,
  deployParaSpaceFallbackOracle,
} from "../../../../helpers/contracts-deployments";
import {
  getAllERC20Tokens,
  getAllERC721Tokens,
  getCryptoPunksMarket,
} from "../../../../helpers/contracts-getters";
import {
  getParaSpaceConfig,
  isLocalTestnet,
  isMainnet,
  isPublicTestnet,
} from "../../../../helpers/misc-utils";
import {waitForTx} from "../../../../helpers/misc-utils";
import {setInitialAssetPricesInOracle} from "../../../../helpers/oracles-helpers";
import {ERC721TokenContractId} from "../../../../helpers/types";

export const step_09 = async (verify = false) => {
  try {
    const erc20Tokens = await getAllERC20Tokens();
    const erc721Tokens = await getAllERC721Tokens();
    const paraSpaceConfig = getParaSpaceConfig();

    if (isMainnet()) {
      // UniswapV3 should use price from `UniswapV3OracleWrapper` instead of NFTFloorOracle
      delete erc721Tokens[ERC721TokenContractId.UniswapV3];
      await deployNFTFloorPriceOracle(
        Object.values(erc721Tokens).map((x) => x.address),
        verify
      );
      if (
        !paraSpaceConfig.BendDAO.Oracle ||
        !paraSpaceConfig.Uniswap.V2Factory ||
        !paraSpaceConfig.Uniswap.V2Router ||
        !paraSpaceConfig.Tokens.WETH ||
        !paraSpaceConfig.Tokens.USDC
      ) {
        throw new Error("Missing BendDAO-Oracle/UniswapV2/WETH/USDC config");
      }
      await deployParaSpaceFallbackOracle(
        [
          paraSpaceConfig.BendDAO.Oracle,
          paraSpaceConfig.Uniswap.V2Factory,
          paraSpaceConfig.Uniswap.V2Router,
          paraSpaceConfig.Tokens.WETH,
          paraSpaceConfig.Tokens.USDC,
        ],
        verify
      );
    }

    if (isLocalTestnet() || isPublicTestnet()) {
      const punks = await getCryptoPunksMarket();
      //for testnet we only deploy but still use mock price instead
      await deployNFTFloorPriceOracle([], verify);
      const fallbackOracle = await deployPriceOracle(verify);
      await waitForTx(
        await fallbackOracle.setEthUsdPrice(
          paraSpaceConfig.Mocks!.USDPriceInWEI
        )
      );
      await setInitialAssetPricesInOracle(
        paraSpaceConfig.Mocks!.AllAssetsInitialPrices,
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
