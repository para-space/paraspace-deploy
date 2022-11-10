import rawBRE from "hardhat";

import {printContracts, waitForTx} from "../../../helpers/misc-utils";
import {deployPoolComponents} from "../../../helpers/contracts-deployments";
import {getPoolAddressesProvider} from "../../../helpers/contracts-getters";

import dotenv from "dotenv";
import {ZERO_ADDRESS} from "../../../helpers/constants";
import {upgradePToken} from "./upgrade_ptoken";
import {upgradeNToken} from "./upgrade_ntoken";
import {upgradeNTokenUniswapV3} from "./upgrade_ntoken_uniswapv3";
import {upgradeNTokenMoonBirds} from "./upgrade_ntoken_moonbirds";
import {ETHERSCAN_VERIFICATION} from "../../../helpers/hardhat-constants";

dotenv.config();

export const upgradeAll = async () => {
  await upgradePool();
  await upgradePToken();
  await upgradeNToken();
  await upgradeNTokenUniswapV3();
  await upgradeNTokenMoonBirds();
  console.log("upgrade all finished!");
};

export const upgradePool = async () => {
  const addressesProvider = await getPoolAddressesProvider();

  const {
    poolCore,
    poolParameters,
    poolMarketplace,
    poolCoreSelectors,
    poolParametersSelectors,
    poolMarketplaceSelectors,
  } = await deployPoolComponents(
    addressesProvider.address,
    ETHERSCAN_VERIFICATION
  );

  await waitForTx(
    await addressesProvider.updatePoolImpl(
      [
        {
          implAddress: poolParameters.address,
          action: 1, //replace
          functionSelectors: poolParametersSelectors,
        },
      ],
      ZERO_ADDRESS,
      "0x"
    )
  );

  await waitForTx(
    await addressesProvider.updatePoolImpl(
      [
        {
          implAddress: poolMarketplace.address,
          action: 1,
          functionSelectors: poolMarketplaceSelectors,
        },
      ],
      ZERO_ADDRESS,
      "0x"
    )
  );

  await waitForTx(
    await addressesProvider.updatePoolImpl(
      [
        {
          implAddress: poolCore.address,
          action: 1,
          functionSelectors: poolCoreSelectors,
        },
      ],
      ZERO_ADDRESS,
      "0x"
    )
  );

  console.log("upgrade pool components finished!");
};

async function main() {
  await rawBRE.run("set-DRE");

  await upgradeAll();

  printContracts();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
