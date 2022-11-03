import {ZERO_ADDRESS} from "../../../../helpers/constants";
import {
  deployApeCoinStaking,
  deployMockIncentivesController,
  deployMockReserveAuctionStrategy,
} from "../../../../helpers/contracts-deployments";
import {
  getAllTokens,
  getProtocolDataProvider,
} from "../../../../helpers/contracts-getters";
import {
  getContractAddresses,
  getParaSpaceAdmins,
} from "../../../../helpers/contracts-helpers";
import {
  configureReservesByHelper,
  initReservesByHelper,
} from "../../../../helpers/init-helpers";
import {
  getParaSpaceConfig,
  isLocalTestnet,
} from "../../../../helpers/misc-utils";
import {tEthereumAddress} from "../../../../helpers/types";
import {auctionStrategyLinear} from "../../../../market-config/auctionStrategies";

export const step_11 = async (verify = false) => {
  try {
    const allTokens = await getAllTokens();
    const {paraSpaceAdmin} = await getParaSpaceAdmins();
    const reservesParams = getParaSpaceConfig().ReservesConfig;
    const admin = await paraSpaceAdmin.getAddress();
    const protocolDataProvider = await getProtocolDataProvider();

    const allTokenAddresses = getContractAddresses(allTokens);

    console.log("Initialize configuration");

    const config = getParaSpaceConfig();

    const {PTokenNamePrefix, VariableDebtTokenNamePrefix, SymbolPrefix} =
      config;
    const treasuryAddress = config.Treasury;

    // Add an IncentivesController
    let incentivesController = ZERO_ADDRESS;
    let auctionStrategy: tEthereumAddress | undefined = undefined;

    if (isLocalTestnet()) {
      incentivesController = (await deployMockIncentivesController(verify))
        .address;
      auctionStrategy = (
        await deployMockReserveAuctionStrategy(
          [
            auctionStrategyLinear.maxPriceMultiplier,
            auctionStrategyLinear.minExpPriceMultiplier,
            auctionStrategyLinear.minPriceMultiplier,
            auctionStrategyLinear.stepLinear,
            auctionStrategyLinear.stepExp,
            auctionStrategyLinear.tickLength,
          ],
          verify
        )
      ).address;
    }

    await initReservesByHelper(
      reservesParams,
      allTokenAddresses,
      PTokenNamePrefix,
      VariableDebtTokenNamePrefix,
      SymbolPrefix,
      admin,
      treasuryAddress,
      incentivesController,
      verify,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      auctionStrategy
    );

    await configureReservesByHelper(
      reservesParams,
      allTokenAddresses,
      protocolDataProvider,
      admin
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
