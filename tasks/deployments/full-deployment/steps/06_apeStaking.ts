import {
  deployApeCoinStaking,
  deployApeYield,
  deployMintableERC721,
} from "../../../../helpers/contracts-deployments";
import {getAllTokens} from "../../../../helpers/contracts-getters";
import {GLOBAL_OVERRIDES} from "../../../../helpers/hardhat-constants";
import {convertToCurrencyDecimals} from "../../../../helpers/contracts-helpers";

export const step_06a = async (verify = false) => {
  try {
    // 1, deploy bakc
    const bakc = await deployMintableERC721(["BAKC", "BAKC", ""], verify);

    //2, deploy ApeCoinStaking
    const allTokens = await getAllTokens();

    const apeCoinStaking = await deployApeCoinStaking(
      [
        allTokens.APE.address,
        allTokens.BAYC.address,
        allTokens.MAYC.address,
        bakc.address,
      ],
      verify
    );
    const amount = await convertToCurrencyDecimals(
      allTokens.APE.address,
      "94694400"
    );

    await apeCoinStaking.addTimeRange(
      0,
      amount,
      "1666771200",
      "1761465600",
      amount,
      GLOBAL_OVERRIDES
    );
    await apeCoinStaking.addTimeRange(
      1,
      amount,
      "1666771200",
      "1761465600",
      amount,
      GLOBAL_OVERRIDES
    );
    await apeCoinStaking.addTimeRange(
      2,
      amount,
      "1666771200",
      "1761465600",
      amount,
      GLOBAL_OVERRIDES
    );
    await apeCoinStaking.addTimeRange(
      3,
      amount,
      "1666771200",
      "1761465600",
      amount,
      GLOBAL_OVERRIDES
    );

    //3, deploy ApeYield
    await deployApeYield(
      [allTokens.APE.address, apeCoinStaking.address],
      verify
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
