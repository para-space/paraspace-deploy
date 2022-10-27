import {ZERO_ADDRESS} from "../../../../helpers/constants";
import {
  deployMockIncentivesController,
  deployMockReserveAuctionStrategy,
  deployUniswapDynamicConfigStrategy,
} from "../../../../helpers/contracts-deployments";
import {
  getAllTokens,
  getPoolAddressesProvider,
  getPoolConfiguratorProxy,
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
import {isLocalTestnet, waitForTx} from "../../../../helpers/misc-utils";
import {
  ERC721TokenContractId,
  tEthereumAddress,
} from "../../../../helpers/types";
import ParaSpaceConfig from "../../../../market-config";
import {auctionStrategyLinear} from "../../../../market-config/auctionStrategies";

export const step_11 = async (verify = false) => {
  try {
    const allTokens = await getAllTokens();
    const addressesProvider = await getPoolAddressesProvider();
    const {paraSpaceAdmin} = await getParaSpaceAdmins();
    const reservesParams = ParaSpaceConfig.ReservesConfig;
    const admin = await paraSpaceAdmin.getAddress();
    const protocolDataProvider = await getProtocolDataProvider();
    const poolConfigurator = await getPoolConfiguratorProxy();

    const allTokenAddresses = getContractAddresses(allTokens);

    console.log("Initialize configuration");

    const config = ParaSpaceConfig;

    const {PTokenNamePrefix, VariableDebtTokenNamePrefix, SymbolPrefix} =
      config;
    const treasuryAddress = config.ReserveFactorTreasuryAddress;

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

    const uniswapV3Token = allTokens[ERC721TokenContractId.UniswapV3];
    const dynamicConfigsStrategy = await deployUniswapDynamicConfigStrategy(
      [uniswapV3Token.address, addressesProvider.address],
      verify
    );
    await waitForTx(
      await poolConfigurator.setReserveDynamicConfigsStrategyAddress(
        uniswapV3Token.address,
        dynamicConfigsStrategy.address
      )
    );
    await waitForTx(
      await poolConfigurator.setDynamicConfigsEnabled(
        uniswapV3Token.address,
        true
      )
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
