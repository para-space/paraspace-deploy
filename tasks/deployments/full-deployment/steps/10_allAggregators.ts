import {constants} from "ethers";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import {
  deployMockIncentivesController,
  deployMockReserveAuctionStrategy,
  deployParaSpaceOracle,
  deployProtocolDataProvider,
  deployUiPoolDataProvider,
  deployUniswapDynamicConfigStrategy,
  deployUniswapV3OracleWrapper,
  deployWalletBalanceProvider,
} from "../../../../helpers/contracts-deployments";
import {
  getAllTokens,
  getNonfungiblePositionManager,
  getPairsTokenAggregator,
  getPoolAddressesProvider,
  getPoolConfiguratorProxy,
  getPriceOracle,
  getUniswapV3Factory,
} from "../../../../helpers/contracts-getters";
import {getParaSpaceAdmins} from "../../../../helpers/contracts-helpers";
import {
  configureReservesByHelper,
  initReservesByHelper,
} from "../../../../helpers/init-helpers";
import {DRE, waitForTx} from "../../../../helpers/misc-utils";
import {deployAllMockAggregators} from "../../../../helpers/oracles-helpers";
import {
  eContractid,
  ERC20TokenContractId,
  ERC721TokenContractId,
  tEthereumAddress,
} from "../../../../helpers/types";
import ParaSpaceConfig from "../../../../market-config";
import {auctionStrategyLinear} from "../../../../market-config/auctionStrategies";

declare let hre: HardhatRuntimeEnvironment;

export const step_10 = async (verify = false) => {
  try {
    const MOCK_CHAINLINK_AGGREGATORS_PRICES =
      ParaSpaceConfig.Mocks.AllAssetsInitialPrices;
    const allTokens = await getAllTokens();
    const addressesProvider = await getPoolAddressesProvider();
    const fallbackOracle = await getPriceOracle();
    const {paraSpaceAdmin} = await getParaSpaceAdmins();
    const poolConfigurator = await getPoolConfiguratorProxy();

    const [allTokenAddresses, allAggregatorsAddresses] =
      await deployAllMockAggregators(MOCK_CHAINLINK_AGGREGATORS_PRICES, verify);

    const [tokens, aggregators] = getPairsTokenAggregator(
      allTokenAddresses,
      allAggregatorsAddresses
    );

    const paraspaceOracle = await deployParaSpaceOracle(
      [
        addressesProvider.address,
        tokens,
        aggregators,
        fallbackOracle.address,
        allTokens.WETH.address,
        constants.WeiPerEther.toString(),
      ],
      verify
    );
    await waitForTx(
      await addressesProvider.setPriceOracle(paraspaceOracle.address)
    );

    const reservesParams = ParaSpaceConfig.ReservesConfig;

    const protocolDataProvider = await deployProtocolDataProvider(
      addressesProvider.address,
      verify
    );
    const admin = await paraSpaceAdmin.getAddress();

    await addressesProvider.setProtocolDataProvider(
      protocolDataProvider.address
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
    await poolConfigurator.setReserveDynamicConfigsStrategyAddress(
      uniswapV3Token.address,
      dynamicConfigsStrategy.address
    );
    await poolConfigurator.setDynamicConfigsEnabled(
      uniswapV3Token.address,
      true
    );
    await deployUiPoolDataProvider(
      allAggregatorsAddresses[ERC20TokenContractId.USDT],
      allAggregatorsAddresses[ERC20TokenContractId.USDC],
      verify
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
