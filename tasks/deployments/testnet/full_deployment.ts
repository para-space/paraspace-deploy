import rawBRE from "hardhat";
import {printContracts} from "../../../helpers/misc-utils";
import {step_00} from "./steps/00_deleteDb";
import {step_01} from "./steps/01_mockERC20Tokens";
import {step_02} from "./steps/02_mockERC721Tokens";
import {step_03} from "./steps/03_faucet";
import {step_04} from "./steps/04_addressProvider";
import {step_05} from "./steps/05_aclManager";
import {step_06} from "./steps/06_poolAddressesProviderRegistry";
import {step_07} from "./steps/07_pool";
import {step_08} from "./steps/08_poolConfigurator";
import {step_09} from "./steps/09_reservesSetupHelper";
import {step_10} from "./steps/10_priceOracle";
import {step_11} from "./steps/11_allMockAggregators";
import {step_12} from "./steps/12_uiIncentiveDataProvider";
import {step_13} from "./steps/13_wethGateway";
import {step_14} from "./steps/14_punkGateway";
import {step_15} from "./steps/15_moonbirdsGateway";
import {step_16} from "./steps/16_uniswapV3Gateway";
import {step_16} from "./steps/16_seaport";
import {step_17} from "./steps/17_looksrare";
import {step_19} from "./steps/18_x2y2";
import {step_20} from "./steps/19_flashClaimRegistry";

import dotenv from "dotenv";

dotenv.config();

const verify = process.env.ETHERSCAN_VERIFICATION === "true" ? true : false;

const buildTestEnv = async () => {
  console.time("setup");
  // delete json file
  step_00();
  console.log("------------ step 00 done ------------ ");

  // deploy all mock erc20 tokens
  await step_01(verify);
  console.log("------------ step 01 done ------------ ");

  // deploy all mock erc721 tokens
  await step_02(verify);
  console.log("------------ step 02 done ------------ ");

  // deploy faucet
  await step_03();
  console.log("------------ step 03 done ------------ ");

  // deploy PoolAddressesProvider
  await step_04(verify);
  console.log("------------ step 04 done ------------ ");

  // deploy ACLManager and setup ACLManager
  await step_05(verify);
  console.log("------------ step 05 done ------------ ");

  // deploy PoolAddressesProviderRegistry
  await step_06(verify);
  console.log("------------ step 06 done ------------ ");

  // deploy Pool
  await step_07(verify);
  console.log("------------ step 07 done ------------ ");

  // deploy PoolConfigurator
  await step_08(verify);
  console.log("------------ step 08 done ------------ ");

  // deploy ReservesSetupHelper
  await step_09(verify);
  console.log("------------ step 09 done ------------ ");

  // deploy PriceOracle and set initial prices
  await step_10(verify);
  console.log("------------ step 10 done ------------ ");

  // deploy mock aggregators, ParaSpaceOracle, ProtocolDataProvider, MockIncentivesController, UiPoolDataProvider and walletBalanceProvider
  await step_11(verify);
  console.log("------------ step 11 done ------------ ");

  // deploy UiIncentiveDataProviderV3
  await step_12(verify);
  console.log("------------ step 12 done ------------ ");

  // deploy wethGateway
  await step_13(verify);
  console.log("------------ step 13 done ------------ ");

  // deploy wpunkGateway
  await step_14(verify);
  console.log("------------ step 14 done ------------ ");

  // deploy moonbirdsGateway
  await step_15();
  console.log("------------ step 15 done ------------ ");

  // deploy uniswapV3Gateway
  await step_16();
  console.log("------------ step 16 done ------------ ");

  // deploy seaport
  await step_16(verify);
  console.log("------------ step 17 done ------------ ");

  // deploy looksrare
  await step_17(verify);
  console.log("------------ step 18 done ------------ ");

  // deploy x2y2
  await step_19(verify);
  console.log("------------ step 19 done ------------ ");

  // deploy flash claim registry
  await step_20(verify);
  console.log("------------ step 20 done ------------ ");

  console.timeEnd("setup");
};

async function main() {
  await rawBRE.run("set-DRE");

  await buildTestEnv();

  printContracts();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
