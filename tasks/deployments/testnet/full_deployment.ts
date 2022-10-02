import rawBRE from "hardhat";
import {printContracts} from "../../../helpers/misc-utils";
import {step_00} from "./steps/00_deleteDb";
import {step_0A} from "./steps/0A_mockERC20Tokens";
import {step_0B} from "./steps/0B_mockERC721Tokens";
import {step_01} from "./steps/01_faucet";
import {step_02} from "./steps/02_addressProvider";
import {step_03} from "./steps/03_aclManager";
import {step_04} from "./steps/04_poolAddressesProviderRegistry";
import {step_05} from "./steps/05_pool";
import {step_06} from "./steps/06_poolConfigurator";
import {step_07} from "./steps/07_reservesSetupHelper";
import {step_08} from "./steps/08_priceOracle";
import {step_09} from "./steps/09_allMockAggregators";
import {step_10} from "./steps/10_uiIncentiveDataProvider";
import {step_11} from "./steps/11_wethGateway";
import {step_12} from "./steps/12_punkGateway";
import {step_13} from "./steps/13_moonbirdsGateway";
import {step_14} from "./steps/14_uniswapV3Gateway";
import {step_15} from "./steps/15_seaport";
import {step_16} from "./steps/16_looksrare";
import {step_17} from "./steps/17_x2y2";
import {step_18} from "./steps/18_flashClaimRegistry";

import dotenv from "dotenv";

dotenv.config();

const verify = process.env.ETHERSCAN_VERIFICATION === "true" ? true : false;

const buildTestEnv = async () => {
  console.time("setup");
  // delete json file
  step_00();
  console.log("------------ step 00 done ------------ ");

  // deploy all mock erc20 tokens
  await step_0A(verify);
  console.log("------------ step 0A done ------------ ");

  // deploy all mock erc721 tokens
  await step_0B(verify);
  console.log("------------ step 0B done ------------ ");

  // deploy faucet
  await step_01();
  console.log("------------ step 01 done ------------ ");

  // deploy PoolAddressesProvider
  await step_02(verify);
  console.log("------------ step 02 done ------------ ");

  // deploy ACLManager and setup ACLManager
  await step_03(verify);
  console.log("------------ step 03 done ------------ ");

  // deploy PoolAddressesProviderRegistry
  await step_04(verify);
  console.log("------------ step 04 done ------------ ");

  // deploy Pool
  await step_05(verify);
  console.log("------------ step 05 done ------------ ");

  // deploy PoolConfigurator
  await step_06(verify);
  console.log("------------ step 06 done ------------ ");

  // deploy ReservesSetupHelper
  await step_07(verify);
  console.log("------------ step 07 done ------------ ");

  // deploy PriceOracle and set initial prices
  await step_08(verify);
  console.log("------------ step 08 done ------------ ");

  // deploy mock aggregators, ParaSpaceOracle, ProtocolDataProvider, MockIncentivesController, UiPoolDataProvider and walletBalanceProvider
  await step_09(verify);
  console.log("------------ step 09 done ------------ ");

  // deploy UiIncentiveDataProviderV3
  await step_10(verify);
  console.log("------------ step 10 done ------------ ");

  // deploy wethGateway
  await step_11(verify);
  console.log("------------ step 11 done ------------ ");

  // deploy wpunkGateway
  await step_12(verify);
  console.log("------------ step 12 done ------------ ");

  // deploy moonbirdsGateway
  await step_13();
  console.log("------------ step 13 done ------------ ");

  // deploy uniswapV3Gateway
  await step_14();
  console.log("------------ step 14 done ------------ ");

  // deploy seaport
  await step_15(verify);
  console.log("------------ step 15 done ------------ ");

  // deploy looksrare
  await step_16(verify);
  console.log("------------ step 16 done ------------ ");

  // deploy x2y2
  await step_17(verify);
  console.log("------------ step 17 done ------------ ");

  // deploy flash claim registry
  await step_18(verify);
  console.log("------------ step 18 done ------------ ");

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
