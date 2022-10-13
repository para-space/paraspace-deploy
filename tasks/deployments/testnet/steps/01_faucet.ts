import {
  getAllMockedTokens,
  getPunk,
} from "../../../../helpers/contracts-getters";
import {deployFaucet} from "../token_faucet";
import dotenv from "dotenv";
import rawBRE from "hardhat";

dotenv.config();

const verify = process.env.ETHERSCAN_VERIFICATION === "true" ? true : false;

export const step_01 = async (verify = false) => {
  try {
    const mockTokens = await getAllMockedTokens();
    const punks = await getPunk();

    await deployFaucet(
      {
        // ERC20
        DAI: mockTokens.DAI.address,
        USDC: mockTokens.USDC.address,
        USDT: mockTokens.USDT.address,
        BAYC: mockTokens.BAYC.address,
        WBTC: mockTokens.WBTC.address,
        APE: mockTokens.APE.address,
        stETH: mockTokens.stETH.address,
        CRYPTO_PUNK: punks.address,
        aWETH: mockTokens.aWETH.address,
        cWETH: mockTokens.cETH.address,
        PUNK: mockTokens.PUNK.address,
        // WPUNKS: mockTokens.WPUNKS.address,
        MAYC: mockTokens.MAYC.address,
        DOODLE: mockTokens.DOODLE.address,
        MOONBIRD: mockTokens.MOONBIRD.address,
        MEEBITS: mockTokens.MEEBITS.address,
        AZUKI: mockTokens.AZUKI.address,
        OTHR: mockTokens.OTHR.address,
        CLONEX: mockTokens.CLONEX.address,
      },
      verify
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

async function main() {
  await rawBRE.run("set-DRE");

  await step_01(verify);
  console.log("----------------- step 01 done ----------------- ");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
