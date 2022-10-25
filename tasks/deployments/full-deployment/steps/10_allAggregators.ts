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
import {
  getParaSpaceAdmins,
  isLocalTestnet,
  isPublicTestnet,
} from "../../../../helpers/contracts-helpers";
import {
  configureReservesByHelper,
  initReservesByHelper,
} from "../../../../helpers/init-helpers";
import {DRE, waitForTx} from "../../../../helpers/misc-utils";
import {deployAllMockAggregators} from "../../../../helpers/oracles-helpers";
import {eContractid, tEthereumAddress} from "../../../../helpers/types";
import ParaSpaceConfig from "../../../../market-config";
import {auctionStrategyLinear} from "../../../../market-config/auctionStrategies";

declare let hre: HardhatRuntimeEnvironment;

export const step_10 = async (verify = false) => {
  // hardhat local node
  if (isLocalTestnet(DRE)) {
    try {
      const MOCK_CHAINLINK_AGGREGATORS_PRICES =
        ParaSpaceConfig.Mocks.AllAssetsInitialPrices;
      const mockTokens = await getAllTokens();
      const addressesProvider = await getPoolAddressesProvider();
      const fallbackOracle = await getPriceOracle();
      const {paraSpaceAdmin} = await getParaSpaceAdmins();
      const univ3Factory = await getUniswapV3Factory();
      const uniV3PositionManager = await getNonfungiblePositionManager();
      const poolConfigurator = await getPoolConfiguratorProxy();

      const mockAggregators = await deployAllMockAggregators(
        MOCK_CHAINLINK_AGGREGATORS_PRICES,
        verify
      );

      const uniswapToken = mockTokens["UniswapV3"];
      delete mockTokens["UniswapV3"];

      console.log("Mock aggs deployed");
      const allTokenAddresses = Object.entries(mockTokens).reduce(
        (
          accum: {[tokenSymbol: string]: tEthereumAddress},
          [tokenSymbol, tokenContract]
        ) => ({
          ...accum,
          [tokenSymbol]: tokenContract.address,
        }),
        {}
      );

      const allAggregatorsAddresses = Object.entries(mockAggregators).reduce(
        (
          accum: {[tokenSymbol: string]: tEthereumAddress},
          [tokenSymbol, aggregator]
        ) => ({
          ...accum,
          [tokenSymbol]: aggregator.address,
        }),
        {}
      );

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
          mockTokens.WETH.address,
          constants.WeiPerEther.toString(),
        ],
        verify
      );
      await waitForTx(
        await addressesProvider.setPriceOracle(paraspaceOracle.address)
      );

      const uniswapWrapper = await deployUniswapV3OracleWrapper(
        univ3Factory.address,
        uniV3PositionManager.address,
        addressesProvider.address,
        verify
      );

      await waitForTx(
        await paraspaceOracle.setAssetSources(
          [uniV3PositionManager.address],
          [uniswapWrapper.address]
        )
      );

      const {...tokensAddressesWithoutUsd} = allTokenAddresses;
      const allReservesAddresses = {
        ...tokensAddressesWithoutUsd,
        ...{UniswapV3: uniswapToken.address},
      };

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
        allReservesAddresses,
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
        allReservesAddresses,
        protocolDataProvider,
        admin
      );

      const uniswapManager = (await getNonfungiblePositionManager()).address;

      const dynamicConfigsStrategy = (
        await deployUniswapDynamicConfigStrategy(
          [uniswapManager, addressesProvider.address],
          verify
        )
      ).address;
      await poolConfigurator.setReserveDynamicConfigsStrategyAddress(
        uniswapToken.address,
        dynamicConfigsStrategy
      );
      await poolConfigurator.setDynamicConfigsEnabled(
        uniswapToken.address,
        true
      );
      await deployUiPoolDataProvider(
        mockAggregators["USDT"].address,
        mockAggregators["USDC"].address,
        verify
      );
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }
  // goerli
  if (isPublicTestnet(DRE)) {
    try {
      const MOCK_CHAINLINK_AGGREGATORS_PRICES =
        ParaSpaceConfig.Mocks.AllAssetsInitialPrices;
      const mockTokens = await getAllTokens();
      const addressesProvider = await getPoolAddressesProvider();
      const fallbackOracle = await getPriceOracle();
      const {paraSpaceAdmin} = await getParaSpaceAdmins();
      const poolConfigurator = await getPoolConfiguratorProxy();

      const mockAggregators = await deployAllMockAggregators(
        MOCK_CHAINLINK_AGGREGATORS_PRICES,
        verify
      );
      console.log("Mock aggs deployed");

      const uniswapToken = mockTokens["UniswapV3"];
      delete mockTokens["UniswapV3"];

      const allTokenAddresses = Object.entries(mockTokens).reduce(
        (
          accum: {[tokenSymbol: string]: tEthereumAddress},
          [tokenSymbol, tokenContract]
        ) => ({
          ...accum,
          [tokenSymbol]: tokenContract.address,
        }),
        {}
      );

      const allAggregatorsAddresses = Object.entries(mockAggregators).reduce(
        (
          accum: {[tokenSymbol: string]: tEthereumAddress},
          [tokenSymbol, aggregator]
        ) => ({
          ...accum,
          [tokenSymbol]: aggregator.address,
        }),
        {}
      );

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
          mockTokens.WETH.address,
          constants.WeiPerEther.toString(),
        ],
        verify
      );
      await waitForTx(
        await addressesProvider.setPriceOracle(paraspaceOracle.address)
      );

      const uniswapWrapper = await deployUniswapV3OracleWrapper(
        ParaSpaceConfig.Uniswap.V3Factory,
        ParaSpaceConfig.Uniswap.V3NFTPositionManager,
        addressesProvider.address,
        verify
      );

      await waitForTx(
        await paraspaceOracle.setAssetSources(
          [ParaSpaceConfig.Uniswap.V3NFTPositionManager],
          [uniswapWrapper.address]
        )
      );

      const {...tokensAddressesWithoutUsd} = allTokenAddresses;

      const allReservesAddresses = {
        ...tokensAddressesWithoutUsd,
        ...{UniswapV3: uniswapToken.address},
      };

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

      await initReservesByHelper(
        reservesParams,
        allReservesAddresses,
        PTokenNamePrefix,
        VariableDebtTokenNamePrefix,
        SymbolPrefix,
        admin,
        treasuryAddress,
        mockIncentivesController.address,
        verify
      );

      await configureReservesByHelper(
        reservesParams,
        allReservesAddresses,
        protocolDataProvider,
        admin
      );

      const uniswapManager = (await getNonfungiblePositionManager()).address;

      const dynamicConfigsStrategy = (
        await deployUniswapDynamicConfigStrategy(
          [uniswapManager, addressesProvider.address],
          verify
        )
      ).address;
      await poolConfigurator.setReserveDynamicConfigsStrategyAddress(
        uniswapToken.address,
        dynamicConfigsStrategy
      );
      console.log("uniswap token", uniswapToken.address);
      await poolConfigurator.setDynamicConfigsEnabled(
        uniswapToken.address,
        true
      );
      await deployUiPoolDataProvider(
        ParaSpaceConfig.Oracle.ETH_USD_ORACLE,
        ParaSpaceConfig.Oracle.ETH_USD_ORACLE,
        verify
      );

      await deployWalletBalanceProvider(verify);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }
};
