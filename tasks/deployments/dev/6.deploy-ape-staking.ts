import rawBRE from "hardhat";
import {DRE} from "../../../helpers/misc-utils";
import {GLOBAL_OVERRIDES} from "../../../helpers/hardhat-constants";
import {
  deployApeCoinStaking,
  deployMintableERC721,
} from "../../../helpers/contracts-deployments";
import {convertToCurrencyDecimals} from "../../../helpers/contracts-helpers";

const deployApeStaking = async (verify = false) => {
  await DRE.run("set-DRE");
  console.time("deploy-apestaking");
  const bakc = await deployMintableERC721(["BAKC", "BAKC", ""], verify);

  const apeCoinStaking = await deployApeCoinStaking(
    [
      "0x4d224452801ACEd8B2F0aebE155379bb5D594381",
      "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
      "0x60E4d786628Fea6478F785A6d7e704777c86a7c6",
      bakc.address,
    ],
    verify
  );
  const amount = await convertToCurrencyDecimals(
    "0x4d224452801ACEd8B2F0aebE155379bb5D594381",
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
  console.timeEnd("deploy-apestaking");
};

async function main() {
  await rawBRE.run("set-DRE");
  await deployApeStaking();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
