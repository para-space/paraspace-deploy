import {
  deployPriceOracle,
  deployNftFloorPriceOracle,
} from "../../../../helpers/contracts-deployments";
import {getAllTokens, getPunk} from "../../../../helpers/contracts-getters";
import {waitForTx} from "../../../../helpers/misc-utils";
import {setInitialAssetPricesInOracle} from "../../../../helpers/oracles-helpers";
import ParaSpaceConfig from "../../../../market-config";

export const step_09 = async (verify = false) => {
  try {
    const ALL_ASSETS_INITIAL_PRICES =
      ParaSpaceConfig.Mocks.AllAssetsInitialPrices;
    const mockTokens = await getAllTokens();
    const punks = await getPunk();

    //for testnet we only deploy but still use mock price instead
    const nftFloorOracle = await deployNftFloorPriceOracle([], verify);

    const fallbackOracle = await deployPriceOracle(verify);
    await waitForTx(
      await fallbackOracle.setEthUsdPrice(ParaSpaceConfig.Mocks.USDPriceInWEI)
    );
    await setInitialAssetPricesInOracle(
      ALL_ASSETS_INITIAL_PRICES,
      {
        WETH: mockTokens.WETH.address,
        aWETH: mockTokens.aWETH.address,
        cETH: mockTokens.cETH.address,
        DAI: mockTokens.DAI.address,
        USDC: mockTokens.USDC.address,
        USDT: mockTokens.USDT.address,
        BAYC: mockTokens.BAYC.address,
        WPUNKS: mockTokens.WPUNKS.address,
        PUNKS: punks.address,
        PUNK: mockTokens.PUNK.address,
        WBTC: mockTokens.WBTC.address,
        stETH: mockTokens.stETH.address,
        APE: mockTokens.APE.address,
        MAYC: mockTokens.MAYC.address,
        DOODLE: mockTokens.DOODLE.address,
        MOONBIRD: mockTokens.MOONBIRD.address,
        MEEBITS: mockTokens.MEEBITS.address,
        AZUKI: mockTokens.AZUKI.address,
        OTHR: mockTokens.OTHR.address,
        CLONEX: mockTokens.CLONEX.address,
      },
      fallbackOracle
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
