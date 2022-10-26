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
import {getParaSpaceAdmins} from "../../../../helpers/contracts-helpers";
import {
  configureReservesByHelper,
  initReservesByHelper,
} from "../../../../helpers/init-helpers";
import {waitForTx} from "../../../../helpers/misc-utils";
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

    const allTokenAddresses = Object.entries(allTokens).reduce(
      (
        accum: {[tokenSymbol: string]: tEthereumAddress},
        [tokenSymbol, token]
      ) => ({
        ...accum,
        [tokenSymbol]: token.address,
      }),
      {}
    );

    console.log("Initialize configuration");

    const config = ParaSpaceConfig;

    const {PTokenNamePrefix, VariableDebtTokenNamePrefix, SymbolPrefix} =
      config;
    const treasuryAddress = config.ReserveFactorTreasuryAddress;

    // Add an IncentivesController
    const mockIncentivesController = await deployMockIncentivesController(
      verify
    );
    const mockReserveAuctionStrategy = await deployMockReserveAuctionStrategy(
      [
        auctionStrategyLinear.maxPriceMultiplier,
        auctionStrategyLinear.minExpPriceMultiplier,
        auctionStrategyLinear.minPriceMultiplier,
        auctionStrategyLinear.stepLinear,
        auctionStrategyLinear.stepExp,
        auctionStrategyLinear.tickLength,
      ],
      verify
    );

    await initReservesByHelper(
      reservesParams,
      allTokenAddresses,
      PTokenNamePrefix,
      VariableDebtTokenNamePrefix,
      SymbolPrefix,
      admin,
      treasuryAddress,
      mockIncentivesController.address,
      verify,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      mockReserveAuctionStrategy.address
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
