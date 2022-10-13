import {ethers} from "ethers";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import {
  UNISWAP_V3_FACTORY,
  UNISWAP_V3_POSITION_MANAGER_ADDRESS,
} from "../../../../helpers/constants";
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
  getAllMockedTokens,
  getNonfungiblePositionManager,
  getPairsTokenAggregator,
  getPoolAddressesProvider,
  getPoolConfiguratorProxy,
  getPriceOracle,
  getUniswapV3Factory,
} from "../../../../helpers/contracts-getters";
import {
  getParaSpaceAdmins,
  insertContractAddressInDb,
} from "../../../../helpers/contracts-helpers";
import {
  COVERAGE_CHAINID,
  GOERLI_CHAINID,
  HARDHAT_CHAINID,
  RINKEBY_CHAINID,
} from "../../../../helpers/hardhat-constants";
import {
  configureReservesByHelper,
  initReservesByHelper,
} from "../../../../helpers/init-helpers";
import {waitForTx} from "../../../../helpers/misc-utils";
import {deployAllMockAggregators} from "../../../../helpers/oracles-helpers";
import {eContractid, tEthereumAddress} from "../../../../helpers/types";
import ParaSpaceConfig from "../../../../market-config";
import {auctionStrategyLinear} from "../../../../market-config/auctionStrategies";
import {ETH_USD_ORACLE} from "../helpers/constants";

declare let hre: HardhatRuntimeEnvironment;

export const step_09 = async (verify = false) => {
  // hardhat local node
  if (
    hre.network.config.chainId === HARDHAT_CHAINID ||
    hre.network.config.chainId === COVERAGE_CHAINID
  ) {
    try {
      const MOCK_CHAINLINK_AGGREGATORS_PRICES =
        ParaSpaceConfig.Mocks.AllAssetsInitialPrices;
      const mockTokens = await getAllMockedTokens();
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
          ethers.constants.WeiPerEther.toString(),
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

      const testHelpers = await deployProtocolDataProvider(
        addressesProvider.address,
        verify
      );

      await insertContractAddressInDb(
        eContractid.ProtocolDataProvider,
        testHelpers.address
      );
      const admin = await paraSpaceAdmin.getAddress();

      await addressesProvider.setPoolDataProvider(testHelpers.address);

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
        testHelpers,
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
  // rinkeby, goerli
  if (
    hre.network.config.chainId === RINKEBY_CHAINID ||
    hre.network.config.chainId === GOERLI_CHAINID
  ) {
    try {
      const MOCK_CHAINLINK_AGGREGATORS_PRICES =
        ParaSpaceConfig.Mocks.AllAssetsInitialPrices;
      const mockTokens = await getAllMockedTokens();
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
          ethers.constants.WeiPerEther.toString(),
        ],
        verify
      );
      await waitForTx(
        await addressesProvider.setPriceOracle(paraspaceOracle.address)
      );

      const uniswapWrapper = await deployUniswapV3OracleWrapper(
        UNISWAP_V3_FACTORY,
        UNISWAP_V3_POSITION_MANAGER_ADDRESS,
        addressesProvider.address,
        verify
      );

      await waitForTx(
        await paraspaceOracle.setAssetSources(
          [UNISWAP_V3_POSITION_MANAGER_ADDRESS],
          [uniswapWrapper.address]
        )
      );

      const {...tokensAddressesWithoutUsd} = allTokenAddresses;

      const allReservesAddresses = {
        ...tokensAddressesWithoutUsd,
        ...{UniswapV3: uniswapToken.address},
      };

      const reservesParams = ParaSpaceConfig.ReservesConfig;

      const testHelpers = await deployProtocolDataProvider(
        addressesProvider.address,
        verify
      );

      await insertContractAddressInDb(
        eContractid.ProtocolDataProvider,
        testHelpers.address
      );
      const admin = await paraSpaceAdmin.getAddress();

      await addressesProvider.setPoolDataProvider(testHelpers.address);

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
        testHelpers,
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
      await deployUiPoolDataProvider(ETH_USD_ORACLE, ETH_USD_ORACLE, verify);

      await deployWalletBalanceProvider(verify);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }
};
