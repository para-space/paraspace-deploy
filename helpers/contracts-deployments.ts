import {MockContract} from "ethereum-waffle";
import {
  ACLManager,
  ACLManager__factory,
  ApeCoinStaking,
  ApeCoinStaking__factory,
  ApeStakingLogic,
  ApeStakingLogic__factory,
  ATokenDebtToken,
  ATokenDebtToken__factory,
  AuctionLogic,
  AuctionLogic__factory,
  Azuki,
  Azuki__factory,
  BlurAdapter,
  BlurAdapter__factory,
  BlurExchange,
  BlurExchange__factory,
  BoredApeYachtClub,
  BoredApeYachtClub__factory,
  BorrowLogic,
  BorrowLogic__factory,
  CloneX,
  CloneX__factory,
  ConduitController,
  ConduitController__factory,
  ConfiguratorLogic,
  ConfiguratorLogic__factory,
  CryptoPunksMarket,
  CryptoPunksMarket__factory,
  CurrencyManager,
  CurrencyManager__factory,
  DefaultReserveAuctionStrategy,
  DefaultReserveAuctionStrategy__factory,
  DefaultReserveInterestRateStrategy,
  DefaultReserveInterestRateStrategy__factory,
  DelegationAwarePToken,
  DelegationAwarePToken__factory,
  Doodles,
  Doodles__factory,
  ERC721Delegate,
  ERC721Delegate__factory,
  ERC721OracleWrapper,
  ERC721OracleWrapper__factory,
  ExecutionDelegate,
  ExecutionDelegate__factory,
  ExecutionManager,
  ExecutionManager__factory,
  FlashClaimLogic,
  FlashClaimLogic__factory,
  InitializableImmutableAdminUpgradeabilityProxy,
  InitializableImmutableAdminUpgradeabilityProxy__factory,
  Land,
  Land__factory,
  LiquidationLogic,
  LiquidationLogic__factory,
  LooksRareAdapter,
  LooksRareAdapter__factory,
  LooksRareExchange,
  LooksRareExchange__factory,
  MarketplaceLogic,
  MarketplaceLogic__factory,
  Meebits,
  Meebits__factory,
  MerkleVerifier,
  MerkleVerifier__factory,
  MintableDelegationERC20__factory,
  MintableERC20,
  MintableERC20__factory,
  MintableERC721,
  MintableERC721Logic,
  MintableERC721Logic__factory,
  MintableERC721__factory,
  MockAggregator,
  MockAggregator__factory,
  MockAirdropProject,
  MockAirdropProject__factory,
  MockAToken,
  MockAToken__factory,
  MockIncentivesController,
  MockIncentivesController__factory,
  MockInitializableFromConstructorImple,
  MockInitializableFromConstructorImple__factory,
  MockInitializableImple,
  MockInitializableImpleV2,
  MockInitializableImpleV2__factory,
  MockInitializableImple__factory,
  MockNToken__factory,
  MockPToken__factory,
  MockReentrantInitializableImple,
  MockReentrantInitializableImple__factory,
  MockReserveAuctionStrategy,
  MockReserveAuctionStrategy__factory,
  MockReserveConfiguration,
  MockReserveConfiguration__factory,
  MockTokenFaucet,
  MockTokenFaucet__factory,
  MockVariableDebtToken__factory,
  Moonbirds,
  Moonbirds__factory,
  MutantApeYachtClub,
  MutantApeYachtClub__factory,
  NFTFloorOracle,
  NFTFloorOracle__factory,
  NToken,
  NTokenBAYC,
  NTokenBAYC__factory,
  NTokenMAYC,
  NTokenMAYC__factory,
  NTokenMoonBirds,
  NTokenMoonBirds__factory,
  NTokenUniswapV3,
  NTokenUniswapV3__factory,
  NToken__factory,
  ParaProxy__factory,
  ParaSpaceFallbackOracle,
  ParaSpaceFallbackOracle__factory,
  ParaSpaceOracle,
  ParaSpaceOracle__factory,
  PausableZoneController,
  PausableZoneController__factory,
  PolicyManager,
  PolicyManager__factory,
  PoolAddressesProvider,
  PoolAddressesProviderRegistry,
  PoolAddressesProviderRegistry__factory,
  PoolAddressesProvider__factory,
  PoolApeStaking,
  PoolApeStaking__factory,
  PoolConfigurator,
  PoolConfigurator__factory,
  PoolCore,
  PoolCore__factory,
  PoolLogic,
  PoolLogic__factory,
  PoolMarketplace,
  PoolMarketplace__factory,
  PoolParameters,
  PoolParameters__factory,
  PriceOracle,
  PriceOracle__factory,
  ProtocolDataProvider,
  ProtocolDataProvider__factory,
  PToken,
  PTokenAToken,
  PTokenAToken__factory,
  PTokenSApe,
  PTokenSApe__factory,
  PTokenStETH,
  PTokenStETH__factory,
  PToken__factory,
  ReservesSetupHelper,
  ReservesSetupHelper__factory,
  RoyaltyFeeManager,
  RoyaltyFeeManager__factory,
  RoyaltyFeeRegistry,
  RoyaltyFeeRegistry__factory,
  Seaport,
  SeaportAdapter,
  SeaportAdapter__factory,
  Seaport__factory,
  StandardPolicyERC721,
  StandardPolicyERC721__factory,
  StETH,
  StETHDebtToken,
  StETHDebtToken__factory,
  StETH__factory,
  StrategyStandardSaleForFixedPrice,
  StrategyStandardSaleForFixedPrice__factory,
  SupplyLogic,
  SupplyLogic__factory,
  TransferManagerERC1155,
  TransferManagerERC1155__factory,
  TransferManagerERC721,
  TransferManagerERC721__factory,
  TransferSelectorNFT,
  TransferSelectorNFT__factory,
  UiIncentiveDataProvider,
  UiIncentiveDataProvider__factory,
  UiPoolDataProvider,
  UiPoolDataProvider__factory,
  UniswapV3Factory,
  UniswapV3Factory__factory,
  UniswapV3OracleWrapper,
  UniswapV3OracleWrapper__factory,
  UserFlashclaimRegistry,
  UserFlashclaimRegistry__factory,
  VariableDebtToken,
  VariableDebtToken__factory,
  WalletBalanceProvider,
  WalletBalanceProvider__factory,
  WETH9Mocked,
  WETH9Mocked__factory,
  WETHGateway,
  WETHGateway__factory,
  WPunk,
  WPunkGateway,
  WPunkGateway__factory,
  WPunk__factory,
  X2Y2Adapter,
  X2Y2Adapter__factory,
  X2Y2R1,
  X2Y2R1__factory,
} from "../../types";
import {
  getAllERC20Tokens,
  getApeStakingLogic,
  getFirstSigner,
  getMintableERC721Logic,
  getPunks,
  getWETH,
} from "./contracts-getters";
import {
  convertToCurrencyDecimals,
  getFunctionSignatures,
} from "./contracts-helpers";
import {DRE, getDb, getParaSpaceConfig} from "./misc-utils";
import {
  eContractid,
  ERC20TokenContractId,
  ERC721TokenContractId,
  tEthereumAddress,
  tStringTokenSmallUnits,
} from "./types";

import * as nFTDescriptor from "@uniswap/v3-periphery/artifacts/contracts/libraries/NFTDescriptor.sol/NFTDescriptor.json";
import * as nonfungiblePositionManager from "@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json";
import * as nonfungibleTokenPositionDescriptor from "@uniswap/v3-periphery/artifacts/contracts/NonfungibleTokenPositionDescriptor.sol/NonfungibleTokenPositionDescriptor.json";
import * as uniSwapRouter from "@uniswap/v3-periphery/artifacts/contracts/SwapRouter.sol/SwapRouter.json";

import {Contract} from "ethers";
import {Address} from "hardhat-deploy/dist/types";
import {MintableDelegationERC20} from "../../types";
import {LiquidationLogicLibraryAddresses} from "../../types/factories/protocol/libraries/logic/LiquidationLogic__factory";
import {MarketplaceLogicLibraryAddresses} from "../../types/factories/protocol/libraries/logic/MarketplaceLogic__factory";
import {PoolCoreLibraryAddresses} from "../../types/factories/protocol/pool/PoolCore__factory";
import {PoolMarketplaceLibraryAddresses} from "../../types/factories/protocol/pool/PoolMarketplace__factory";
import {PoolParametersLibraryAddresses} from "../../types/factories/protocol/pool/PoolParameters__factory";
import {
  insertContractAddressInDb,
  withSaveAndVerify,
} from "./contracts-helpers";

import {pick} from "lodash";
import {ZERO_ADDRESS} from "./constants";
import {GLOBAL_OVERRIDES} from "./hardhat-constants";

export const deployPoolAddressesProvider = async (
  marketId: string,
  owner: string,
  verify?: boolean
) =>
  withSaveAndVerify<C extends ContractFactory>(
    PoolAddressesProvider__factory,
    eContractid.PoolAddressesProvider,
    [marketId, owner],
    verify
  ) as Promise<PoolAddressesProvider>;

export const deployPoolAddressesProviderRegistry = async (
  owner: string,
  verify?: boolean
) =>
  withSaveAndVerify(
    PoolAddressesProviderRegistry__factory,
    eContractid.PoolAddressesProviderRegistry,
    [owner],
    verify
  ) as Promise<PoolAddressesProviderRegistry>;

export const deployACLManager = async (
  provider: tEthereumAddress,
  verify?: boolean
) =>
  withSaveAndVerify(
    ACLManager__factory,
    eContractid.ACLManager,
    [provider],
    verify
  ) as Promise<ACLManager>;

export const deployConfiguratorLogicLibrary = async (verify?: boolean) =>
  withSaveAndVerify(
    ConfiguratorLogic__factory,
    eContractid.ConfiguratorLogic,
    [],
    verify
  ) as Promise<ConfiguratorLogic>;

export const deployPoolConfigurator = async (verify?: boolean) => {
  const configuratorLogic = await deployConfiguratorLogicLibrary(verify);
  const libraries = {
    ["contracts/protocol/libraries/logic/ConfiguratorLogic.sol:ConfiguratorLogic"]:
      configuratorLogic.address,
  };
  return withSaveAndVerify(
    PoolConfigurator__factory,
    eContractid.PoolConfiguratorImpl,
    [],
    verify,
    false,
    libraries
  ) as Promise<PoolConfigurator>;
};

export const deploySupplyLogic = async (verify?: boolean) =>
  withSaveAndVerify(
    SupplyLogic__factory,
    eContractid.SupplyLogic,
    [],
    verify
  ) as Promise<SupplyLogic>;

export const deployFlashClaimLogic = async (verify?: boolean) => {
  return withSaveAndVerify(
    FlashClaimLogic__factory,
    eContractid.FlashClaimLogic,
    [],
    verify
  ) as Promise<FlashClaimLogic>;
};

export const deployBorrowLogic = async (verify?: boolean) => {
  return withSaveAndVerify(
    BorrowLogic__factory,
    eContractid.BorrowLogic,
    [],
    verify
  ) as Promise<BorrowLogic>;
};

export const deployLiquidationLogic = async (
  libraries: LiquidationLogicLibraryAddresses,
  verify?: boolean
) => {
  return withSaveAndVerify(
    LiquidationLogic__factory,
    eContractid.LiquidationLogic,
    [],
    verify,
    false,
    libraries
  ) as Promise<LiquidationLogic>;
};

export const deployAuctionLogic = async (verify?: boolean) => {
  return withSaveAndVerify(
    AuctionLogic__factory,
    eContractid.AuctionLogic,
    [],
    verify
  ) as Promise<AuctionLogic>;
};

export const deployPoolLogic = async (verify?: boolean) => {
  return withSaveAndVerify(
    PoolLogic__factory,
    eContractid.PoolLogic,
    [],
    verify
  ) as Promise<PoolLogic>;
};

export const deployPoolCoreLibraries = async (
  verify?: boolean
): Promise<PoolCoreLibraryAddresses> => {
  const supplyLogic = await deploySupplyLogic(verify);
  const borrowLogic = await deployBorrowLogic(verify);
  const auctionLogic = await deployAuctionLogic(verify);
  const liquidationLogic = await deployLiquidationLogic(
    {
      ["contracts/protocol/libraries/logic/SupplyLogic.sol:SupplyLogic"]:
        supplyLogic.address,
    },
    verify
  );
  const flashClaimLogic = await deployFlashClaimLogic(verify);

  return {
    ["contracts/protocol/libraries/logic/AuctionLogic.sol:AuctionLogic"]:
      auctionLogic.address,
    ["contracts/protocol/libraries/logic/LiquidationLogic.sol:LiquidationLogic"]:
      liquidationLogic.address,
    ["contracts/protocol/libraries/logic/SupplyLogic.sol:SupplyLogic"]:
      supplyLogic.address,
    ["contracts/protocol/libraries/logic/BorrowLogic.sol:BorrowLogic"]:
      borrowLogic.address,
    ["contracts/protocol/libraries/logic/FlashClaimLogic.sol:FlashClaimLogic"]:
      flashClaimLogic.address,
  };
};

export const deployPoolMarketplaceLibraries = async (
  coreLibraries: PoolCoreLibraryAddresses,
  verify?: boolean
): Promise<PoolMarketplaceLibraryAddresses> => {
  const marketplaceLogic = await deployMarketplaceLogic(
    pick(coreLibraries, [
      "contracts/protocol/libraries/logic/SupplyLogic.sol:SupplyLogic",
      "contracts/protocol/libraries/logic/BorrowLogic.sol:BorrowLogic",
    ]),
    verify
  );
  return {
    ["contracts/protocol/libraries/logic/MarketplaceLogic.sol:MarketplaceLogic"]:
      marketplaceLogic.address,
  };
};

export const deployPoolParametersLibraries = async (
  verify?: boolean
): Promise<PoolParametersLibraryAddresses> => {
  const poolLogic = await deployPoolLogic(verify);
  return {
    ["contracts/protocol/libraries/logic/PoolLogic.sol:PoolLogic"]:
      poolLogic.address,
  };
};

export const getPoolSignatures = () => {
  const poolCoreSelectors = getFunctionSignatures(PoolCore__factory.abi);

  const poolParametersSelectors = getFunctionSignatures(
    PoolParameters__factory.abi
  );

  const poolMarketplaceSelectors = getFunctionSignatures(
    PoolMarketplace__factory.abi
  );

  const poolApeStakingSelectors = getFunctionSignatures(
    PoolApeStaking__factory.abi
  );

  const poolProxySelectors = getFunctionSignatures(ParaProxy__factory.abi);

  const allSelectors = {};
  const poolSelectors = [
    ...poolCoreSelectors,
    ...poolParametersSelectors,
    ...poolMarketplaceSelectors,
    ...poolApeStakingSelectors,
    ...poolProxySelectors,
  ];
  for (const selector of poolSelectors) {
    if (!allSelectors[selector.signature]) {
      allSelectors[selector.signature] = selector;
    } else {
      throw new Error(
        `added function ${selector.name} conflict with exist function:${
          allSelectors[selector.signature].name
        }`
      );
    }
  }

  return {
    poolCoreSelectors,
    poolParametersSelectors,
    poolMarketplaceSelectors,
    poolApeStakingSelectors,
  };
};

export const deployPoolComponents = async (
  provider: string,
  verify?: boolean
) => {
  const coreLibraries = await deployPoolCoreLibraries(verify);
  const marketplaceLibraries = await deployPoolMarketplaceLibraries(
    coreLibraries,
    verify
  );
  const parametersLibraries = await deployPoolParametersLibraries(verify);

  const apeStakingLibraries = pick(coreLibraries, [
    "contracts/protocol/libraries/logic/BorrowLogic.sol:BorrowLogic",
    "contracts/protocol/libraries/logic/SupplyLogic.sol:SupplyLogic",
  ]);

  const {
    poolCoreSelectors,
    poolParametersSelectors,
    poolMarketplaceSelectors,
    poolApeStakingSelectors,
  } = getPoolSignatures();

  return {
    poolCore: (await withSaveAndVerify(
      PoolCore__factory,
      eContractid.PoolCoreImpl,
      [provider],
      verify,
      false,
      coreLibraries,
      poolCoreSelectors
    )) as PoolCore,
    poolParameters: (await withSaveAndVerify(
      PoolParameters__factory,
      eContractid.PoolParametersImpl,
      [provider],
      verify,
      false,
      parametersLibraries,
      poolParametersSelectors
    )) as PoolParameters,
    poolMarketplace: (await withSaveAndVerify(
      PoolMarketplace__factory,
      eContractid.PoolMarketplaceImpl,
      [provider],
      verify,
      false,
      marketplaceLibraries,
      poolMarketplaceSelectors
    )) as PoolMarketplace,
    poolApeStaking: (await withSaveAndVerify(
      PoolApeStaking__factory,
      eContractid.PoolApeStakingImpl,
      [provider],
      verify,
      false,
      apeStakingLibraries,
      poolApeStakingSelectors
    )) as PoolApeStaking,
    poolCoreSelectors: poolCoreSelectors.map((s) => s.signature),
    poolParametersSelectors: poolParametersSelectors.map((s) => s.signature),
    poolMarketplaceSelectors: poolMarketplaceSelectors.map((s) => s.signature),
    poolApeStakingSelectors: poolApeStakingSelectors.map((s) => s.signature),
  };
};

export const deployPriceOracle = async (verify?: boolean) =>
  withSaveAndVerify(
    PriceOracle__factory,
    eContractid.PriceOracle,
    [],
    verify
  ) as Promise<PriceOracle>;

export const deployAggregator = async (
  symbol: string,
  price: tStringTokenSmallUnits,
  verify?: boolean
) =>
  withSaveAndVerify(
    MockAggregator__factory,
    eContractid.Aggregator.concat(`.${symbol}`),
    [price],
    verify
  ) as Promise<MockAggregator>;

export const deployParaSpaceOracle = async (
  args: [
    tEthereumAddress,
    tEthereumAddress[],
    tEthereumAddress[],
    tEthereumAddress,
    tEthereumAddress,
    string
  ],
  verify?: boolean
) =>
  withSaveAndVerify(
    ParaSpaceOracle__factory,
    eContractid.ParaSpaceOracle,
    [...args],
    verify
  ) as Promise<ParaSpaceOracle>;

export const deployNFTFloorPriceOracle = async (verify?: boolean) =>
  withSaveAndVerify(
    NFTFloorOracle__factory,
    eContractid.NFTFloorOracle,
    [],
    verify
  ) as Promise<NFTFloorOracle>;

export const deployProtocolDataProvider = async (
  addressesProvider: tEthereumAddress,
  verify?: boolean
) =>
  withSaveAndVerify(
    ProtocolDataProvider__factory,
    eContractid.ProtocolDataProvider,
    [addressesProvider],
    verify
  ) as Promise<ProtocolDataProvider>;

export const deployMintableERC20 = async (
  args: [string, string, string],
  verify?: boolean
): Promise<MintableERC20> =>
  withSaveAndVerify(
    MintableERC20__factory,
    args[1],
    [...args],
    verify
  ) as Promise<MintableERC20>;

export const deployMintableERC721 = async (
  args: [string, string, string],
  verify?: boolean
): Promise<MintableERC721> =>
  withSaveAndVerify(
    MintableERC721__factory,
    args[1],
    [...args],
    verify
  ) as Promise<MintableERC721>;

export const deployMintableDelegationERC20 = async (
  args: [string, string, string],
  verify?: boolean
): Promise<MintableDelegationERC20> =>
  withSaveAndVerify(
    MintableDelegationERC20__factory,
    eContractid.MintableDelegationERC20,
    [...args],
    verify
  ) as Promise<MintableDelegationERC20>;

export const deployMockReserveAuctionStrategy = async (
  args: [string, string, string, string, string, string],
  verify?: boolean
) =>
  withSaveAndVerify(
    MockReserveAuctionStrategy__factory,
    eContractid.MockReserveAuctionStrategy,
    [...args],
    verify
  ) as Promise<MockReserveAuctionStrategy>;

export const deployReserveAuctionStrategy = async (
  strategyName: string,
  args: [string, string, string, string, string, string],
  verify?: boolean
) =>
  withSaveAndVerify(
    DefaultReserveAuctionStrategy__factory,
    strategyName,
    [...args],
    verify
  ) as Promise<DefaultReserveAuctionStrategy>;

export const deployReserveInterestRateStrategy = async (
  strategyName: string,
  args: [tEthereumAddress, string, string, string, string],
  verify?: boolean
) =>
  withSaveAndVerify(
    DefaultReserveInterestRateStrategy__factory,
    strategyName,
    [...args],
    verify
  ) as Promise<DefaultReserveInterestRateStrategy>;

export const deployGenericVariableDebtToken = async (
  poolAddress: tEthereumAddress,
  verify?: boolean
) =>
  withSaveAndVerify(
    VariableDebtToken__factory,
    eContractid.VariableDebtTokenImpl,
    [poolAddress],
    verify
  ) as Promise<VariableDebtToken>;

export const deployGenericPTokenImpl = async (
  poolAddress: tEthereumAddress,
  verify?: boolean
) =>
  withSaveAndVerify(
    PToken__factory,
    eContractid.PTokenImpl,
    [poolAddress],
    verify
  ) as Promise<PToken>;

export const deployGenericNTokenImpl = async (
  poolAddress: tEthereumAddress,
  atomicPricing: boolean,
  verify?: boolean
) => {
  let mintableERC721Logic;
  mintableERC721Logic = await getMintableERC721Logic();
  if (!mintableERC721Logic) {
    mintableERC721Logic = await deployMintableERC721Logic(verify);
  }

  const libraries = {
    ["contracts/protocol/tokenization/libraries/MintableERC721Logic.sol:MintableERC721Logic"]:
      mintableERC721Logic.address,
  };
  return withSaveAndVerify(
    NToken__factory,
    eContractid.NTokenImpl,
    [poolAddress, atomicPricing],
    verify,
    false,
    libraries
  ) as Promise<NToken>;
};

export const deployUniswapV3NTokenImpl = async (
  poolAddress: tEthereumAddress,
  verify?: boolean
) => {
  let mintableERC721Logic;
  mintableERC721Logic = await getMintableERC721Logic();
  if (!mintableERC721Logic) {
    mintableERC721Logic = await deployMintableERC721Logic(verify);
  }

  const libraries = {
    ["contracts/protocol/tokenization/libraries/MintableERC721Logic.sol:MintableERC721Logic"]:
      mintableERC721Logic.address,
  };
  return withSaveAndVerify(
    NTokenUniswapV3__factory,
    eContractid.NTokenUniswapV3Impl,
    [poolAddress],
    verify,
    false,
    libraries
  ) as Promise<NTokenUniswapV3>;
};

export const deployGenericMoonbirdNTokenImpl = async (
  poolAddress: tEthereumAddress,
  verify?: boolean
) => {
  let mintableERC721Logic;
  mintableERC721Logic = await getMintableERC721Logic();
  if (!mintableERC721Logic) {
    mintableERC721Logic = await deployMintableERC721Logic(verify);
  }

  const libraries = {
    ["contracts/protocol/tokenization/libraries/MintableERC721Logic.sol:MintableERC721Logic"]:
      mintableERC721Logic.address,
  };
  return withSaveAndVerify(
    NTokenMoonBirds__factory,
    eContractid.NTokenMoonBirdsImpl,
    [poolAddress],
    verify,
    false,
    libraries
  ) as Promise<NTokenMoonBirds>;
};

export const deployDelegationAwarePTokenImpl = async (
  poolAddress: tEthereumAddress,
  verify?: boolean
) =>
  withSaveAndVerify(
    DelegationAwarePToken__factory,
    eContractid.DelegationAwarePTokenImpl,
    [poolAddress],
    verify
  ) as Promise<DelegationAwarePToken>;

export const deployAllERC20Tokens = async (verify?: boolean) => {
  const tokens: {
    [symbol: string]:
      | MockContract
      | MintableERC20
      | WETH9Mocked
      | StETH
      | MockAToken;
  } = {};

  const paraSpaceConfig = getParaSpaceConfig();
  const reservesConfig = paraSpaceConfig.ReservesConfig;
  const tokensConfig = paraSpaceConfig.Tokens;

  for (const tokenSymbol of Object.keys(ERC20TokenContractId)) {
    const db = getDb();
    const contractAddress = db
      .get(`${tokenSymbol}.${DRE.network.name}`)
      .value()?.address;
    const reserveConfig = reservesConfig[tokenSymbol];
    if (!reserveConfig) {
      continue;
    }

    // if contract address is already in db, then skip to next tokenSymbol
    if (contractAddress) {
      console.log("contract address is already in db ", tokenSymbol);
      continue;
    } else if (tokensConfig[tokenSymbol]) {
      console.log("contract address is already onchain ", tokenSymbol);
      await insertContractAddressInDb(
        tokenSymbol,
        getParaSpaceConfig().Tokens[tokenSymbol],
        false
      );
      continue;
    } else {
      console.log("deploying now ", tokenSymbol);
      if (tokenSymbol === ERC20TokenContractId.WETH) {
        tokens[tokenSymbol] = await deployWETH(verify);
        continue;
      }

      if (tokenSymbol === ERC20TokenContractId.stETH) {
        tokens[tokenSymbol] = await deployStETH(
          [tokenSymbol, tokenSymbol, reserveConfig.reserveDecimals],
          verify
        );
        continue;
      }

      if (tokenSymbol === ERC20TokenContractId.aWETH) {
        tokens[tokenSymbol] = await deployMockAToken(
          [tokenSymbol, tokenSymbol, reserveConfig.reserveDecimals],
          verify
        );
        continue;
      }

      tokens[tokenSymbol] = await deployMintableERC20(
        [tokenSymbol, tokenSymbol, reserveConfig.reserveDecimals],
        verify
      );
    }
  }

  return tokens;
};

export const deployAllERC721Tokens = async (verify?: boolean) => {
  const erc20Tokens = await getAllERC20Tokens();
  const tokens: {
    [symbol: string]:
      | MockContract
      | MintableERC721
      | WPunk
      | CryptoPunksMarket
      | Doodles
      | BoredApeYachtClub
      | MutantApeYachtClub
      | Azuki
      | CloneX
      | Land
      | Meebits
      | Moonbirds
      | Contract;
  } = {};
  const paraSpaceConfig = getParaSpaceConfig();
  const reservesConfig = paraSpaceConfig.ReservesConfig;
  const tokensConfig = paraSpaceConfig.Tokens;

  for (const tokenSymbol of Object.keys(ERC721TokenContractId)) {
    const db = getDb();
    const contractAddress = db
      .get(`${tokenSymbol}.${DRE.network.name}`)
      .value()?.address;
    const reserveConfig = reservesConfig[tokenSymbol];
    if (!reserveConfig) {
      continue;
    }

    // if contract address is already in db, then skip to next tokenSymbol
    if (contractAddress) {
      console.log("contract address is already in db ", tokenSymbol);
      continue;
    } else if (tokensConfig[tokenSymbol]) {
      console.log("contract address is already onchain ", tokenSymbol);
      await insertContractAddressInDb(
        tokenSymbol,
        tokensConfig[tokenSymbol],
        false
      );
      if (
        tokenSymbol === ERC721TokenContractId.UniswapV3 &&
        paraSpaceConfig.Uniswap.V3Factory
      ) {
        await insertContractAddressInDb(
          eContractid.UniswapV3Factory,
          paraSpaceConfig.Uniswap.V3Factory,
          false
        );
      }
      if (
        tokenSymbol === ERC721TokenContractId.WPUNKS &&
        paraSpaceConfig.Tokens.PUNKS
      ) {
        await insertContractAddressInDb(
          eContractid.PUNKS,
          paraSpaceConfig.Tokens.PUNKS,
          false
        );
      }
      continue;
    } else {
      console.log("deploying now ", tokenSymbol);

      // we are using hardhat, we want to use mock ERC721 contracts
      if (tokenSymbol === ERC721TokenContractId.WPUNKS) {
        const punks = await deployPunks([], verify);
        tokens[eContractid.PUNKS] = punks;
        tokens[tokenSymbol] = await deployWPunks([punks.address], verify);
        continue;
      }

      if (tokenSymbol === ERC721TokenContractId.BAYC) {
        tokens[tokenSymbol] = await deployBAYC(
          [tokenSymbol, tokenSymbol, "8000", "0"],
          verify
        );
        continue;
      }

      if (tokenSymbol === ERC721TokenContractId.MAYC) {
        tokens[tokenSymbol] = await deployMAYC(
          [tokenSymbol, tokenSymbol, ZERO_ADDRESS, ZERO_ADDRESS],
          verify
        );
        const bakc = await deployMintableERC721(["BAKC", "BAKC", ""], verify);

        const apeCoinStaking = await deployApeCoinStaking(
          [
            erc20Tokens.APE.address,
            tokens.BAYC.address,
            tokens.MAYC.address,
            bakc.address,
          ],
          verify
        );
        const amount = await convertToCurrencyDecimals(
          erc20Tokens.APE.address,
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
        continue;
      }

      if (tokenSymbol === ERC721TokenContractId.DOODLE) {
        tokens[tokenSymbol] = await deployDoodle([], verify);
        continue;
      }

      if (tokenSymbol === ERC721TokenContractId.AZUKI) {
        tokens[tokenSymbol] = await deployAzuki([5, 10000, 8900, 200], verify);
        continue;
      }

      if (tokenSymbol === ERC721TokenContractId.CLONEX) {
        tokens[tokenSymbol] = await deployCloneX([], verify);
        continue;
      }

      if (tokenSymbol === ERC721TokenContractId.MEEBITS) {
        const punks = await getPunks();
        tokens[tokenSymbol] = await deployMeebits(
          [punks.address, ZERO_ADDRESS, paraSpaceConfig.ParaSpaceTeam],
          verify
        );
        continue;
      }

      if (tokenSymbol === ERC721TokenContractId.OTHR) {
        tokens[tokenSymbol] = await deployOTHR(
          [
            "OTHR",
            "OTHR",
            [ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS],
            [10, 100, 1000, 10000],
            [[paraSpaceConfig.ParaSpaceTeam, 100]],
            paraSpaceConfig.ParaSpaceTeam,
            paraSpaceConfig.ParaSpaceTeam,
            "0x63616e6469646174653100000000000000000000000000000000000000000000",
            5,
            paraSpaceConfig.ParaSpaceTeam,
          ],
          verify
        );
        continue;
      }

      if (tokenSymbol === ERC721TokenContractId.MOONBIRD) {
        tokens[tokenSymbol] = await deployMoonbirds(
          [
            "Moonbirds",
            "MOONBIRD",
            "0x0000000000000000000000000000000000000000",
            paraSpaceConfig.ParaSpaceTeam,
            paraSpaceConfig.ParaSpaceTeam,
          ],
          verify
        );
        await (tokens[tokenSymbol] as Moonbirds).setNestingOpen(
          true,
          GLOBAL_OVERRIDES
        );
        continue;
      }

      if (tokenSymbol === ERC721TokenContractId.UniswapV3) {
        const weth = await getWETH();
        const positionDescriptor =
          await deployNonfungibleTokenPositionDescriptor(
            [
              weth.address,
              // 'ETH' as a bytes32 string
              "0x4554480000000000000000000000000000000000000000000000000000000000",
            ],
            verify
          );
        const factory = await deployUniswapV3Factory([], verify);
        await deployUniswapSwapRouter([factory.address, weth.address], verify);
        const nonfungiblePositionManager =
          await deployNonfungiblePositionManager(
            [factory.address, weth.address, positionDescriptor.address],
            verify
          );
        tokens[tokenSymbol] = nonfungiblePositionManager;
        continue;
      }

      tokens[tokenSymbol] = await deployMintableERC721(
        [tokenSymbol, tokenSymbol, ""],
        verify
      );
    }
  }

  return tokens;
};

export const deployMoonbirds = async (
  args: [string, string, tEthereumAddress, tEthereumAddress, tEthereumAddress],
  verify?: boolean
) =>
  withSaveAndVerify(
    Moonbirds__factory,
    eContractid.MOONBIRD,
    [...args],
    verify
  ) as Promise<Moonbirds>;

export const deployReservesSetupHelper = async (verify?: boolean) =>
  withSaveAndVerify(
    ReservesSetupHelper__factory,
    eContractid.ReservesSetupHelper,
    [],
    verify
  ) as Promise<ReservesSetupHelper>;

export const deployInitializableImmutableAdminUpgradeabilityProxy = async (
  args: [tEthereumAddress],
  verify?: boolean
) =>
  withSaveAndVerify(
    InitializableImmutableAdminUpgradeabilityProxy__factory,
    eContractid.InitializableImmutableAdminUpgradeabilityProxy,
    [...args],
    verify
  ) as Promise<InitializableImmutableAdminUpgradeabilityProxy>;

export const deployWETH = async (verify?: boolean) =>
  withSaveAndVerify(
    WETH9Mocked__factory,
    eContractid.WETH,
    [],
    verify
  ) as Promise<WETH9Mocked>;

export const deployUiPoolDataProvider = async (
  arg1: string,
  arg2: string,
  verify?: boolean
) =>
  withSaveAndVerify(
    UiPoolDataProvider__factory,
    eContractid.UiPoolDataProvider,
    [arg1, arg2],
    verify
  ) as Promise<UiPoolDataProvider>;

export const deployUiIncentiveDataProvider = async (verify?: boolean) =>
  withSaveAndVerify(
    UiIncentiveDataProvider__factory,
    eContractid.UiIncentiveDataProvider,
    [],
    verify
  ) as Promise<UiIncentiveDataProvider>;

export const deployWalletBalanceProvider = async (verify?: boolean) =>
  withSaveAndVerify(
    WalletBalanceProvider__factory,
    eContractid.WalletBalanceProvider,
    [],
    verify
  ) as Promise<WalletBalanceProvider>;

export const deployWETHGateway = async (
  weth: string,
  pool: Address,
  verify?: boolean
) =>
  withSaveAndVerify(
    WETHGateway__factory,
    eContractid.WETHGatewayImpl,
    [weth, pool],
    verify
  ) as Promise<WETHGateway>;

export const deployWETHGatewayProxy = async (
  admin: string,
  impl: string,
  initData: string,
  verify?: boolean
) => {
  return withSaveAndVerify(
    InitializableImmutableAdminUpgradeabilityProxy__factory,
    eContractid.WETHGatewayProxy,
    [admin, impl, initData],
    verify,
    true
  ) as Promise<InitializableImmutableAdminUpgradeabilityProxy>;
};

export const deployMeebits = async (
  args: [tEthereumAddress, tEthereumAddress, tEthereumAddress],
  verify?: boolean
) =>
  withSaveAndVerify(
    Meebits__factory,
    eContractid.Meebits,
    [...args],
    verify
  ) as Promise<Meebits>;

export const deployAzuki = async (
  args: [number, number, number, number],
  verify?: boolean
) =>
  withSaveAndVerify(
    Azuki__factory,
    eContractid.Azuki,
    [...args],
    verify
  ) as Promise<Azuki>;

export const deployOTHR = async (
  // eslint-disable-next-line
  args: [any, any, any, any, any, any, any, any, any, any],
  verify?: boolean
) =>
  withSaveAndVerify(
    Land__factory,
    eContractid.OTHR,
    [...args],
    verify
  ) as Promise<Land>;

export const deployCloneX = async (args: [], verify?: boolean) =>
  withSaveAndVerify(
    CloneX__factory,
    eContractid.CloneX,
    [...args],
    verify
  ) as Promise<CloneX>;

export const deployDoodle = async (args: [], verify?: boolean) =>
  withSaveAndVerify(
    Doodles__factory,
    eContractid.Doodles,
    [...args],
    verify
  ) as Promise<Doodles>;

export const deployMAYC = async (
  args: [string, string, string, string],
  verify?: boolean
) =>
  withSaveAndVerify(
    MutantApeYachtClub__factory,
    eContractid.MutantApeYachtClub,
    [...args],
    verify
  ) as Promise<MutantApeYachtClub>;

export const deployBAYC = async (
  args: [string, string, string, string],
  verify?: boolean
) =>
  withSaveAndVerify(
    BoredApeYachtClub__factory,
    eContractid.BoredApeYachtClub,
    [...args],
    verify
  ) as Promise<BoredApeYachtClub>;

export const deployERC721OracleWrapper = async (
  addressesProvider: string,
  oracleAddress: string,
  asset: string,
  symbol: string,
  verify?: boolean
) =>
  withSaveAndVerify(
    ERC721OracleWrapper__factory,
    eContractid.Aggregator.concat(`.${symbol}`),
    [addressesProvider, oracleAddress, asset],
    verify
  ) as Promise<ERC721OracleWrapper>;

export const deployPunks = async (args: [], verify?: boolean) =>
  withSaveAndVerify(
    CryptoPunksMarket__factory,
    eContractid.PUNKS,
    [...args],
    verify
  ) as Promise<CryptoPunksMarket>;

export const deployWPunks = async (
  args: [tEthereumAddress],
  verify?: boolean
) =>
  withSaveAndVerify(
    WPunk__factory,
    eContractid.WPunk,
    [...args],
    verify
  ) as Promise<WPunk>;

export const deployPunkGateway = async (
  args: [
    tEthereumAddress,
    tEthereumAddress,
    // tEthereumAddress,
    tEthereumAddress
  ],
  verify?: boolean
) => {
  return withSaveAndVerify(
    WPunkGateway__factory,
    eContractid.WPunkGatewayImpl,
    [...args],
    verify
  ) as Promise<WPunkGateway>;
};

export const deployPunkGatewayProxy = async (
  admin: string,
  impl: string,
  initData: string,
  verify?: boolean
) => {
  return withSaveAndVerify(
    InitializableImmutableAdminUpgradeabilityProxy__factory,
    eContractid.WPunkGatewayProxy,
    [admin, impl, initData],
    verify,
    true
  ) as Promise<InitializableImmutableAdminUpgradeabilityProxy>;
};

export const deployParaSpaceFallbackOracle = async (
  args: [string, string, string, string, string],
  verify?: boolean
) => {
  return withSaveAndVerify(
    ParaSpaceFallbackOracle__factory,
    eContractid.PriceOracle,
    [...args],
    verify
  ) as Promise<ParaSpaceFallbackOracle>;
};

export const deployMockTokenFaucet = async (
  erc20configs,
  erc721configs,
  punkConfig,
  verify?: boolean
) =>
  withSaveAndVerify(
    MockTokenFaucet__factory,
    eContractid.MockTokenFaucet,
    [erc20configs, erc721configs, punkConfig],
    verify
  ) as Promise<MockTokenFaucet>;

export const deploySeaportAdapter = async (verify?: boolean) => {
  return withSaveAndVerify(
    SeaportAdapter__factory,
    eContractid.SeaportAdapter,
    [],
    verify
  ) as Promise<SeaportAdapter>;
};

export const deployLooksRareAdapter = async (verify?: boolean) => {
  return withSaveAndVerify(
    LooksRareAdapter__factory,
    eContractid.LooksRareAdapter,
    [],
    verify
  ) as Promise<LooksRareAdapter>;
};

export const deployX2Y2Adapter = async (verify?: boolean) => {
  return withSaveAndVerify(
    X2Y2Adapter__factory,
    eContractid.X2Y2Adapter,
    [],
    verify
  ) as Promise<X2Y2Adapter>;
};

export const deployMarketplaceLogic = async (
  libraries: MarketplaceLogicLibraryAddresses,
  verify?: boolean
) => {
  return withSaveAndVerify(
    MarketplaceLogic__factory,
    eContractid.MarketplaceLogic,
    [],
    verify,
    false,
    libraries
  ) as Promise<MarketplaceLogic>;
};

export const deployConduitController = async (verify?: boolean) =>
  withSaveAndVerify(
    ConduitController__factory,
    eContractid.ConduitController,
    [],
    verify
  ) as Promise<ConduitController>;

export const deployPausableZoneController = async (
  owner: tEthereumAddress,
  verify?: boolean
) =>
  withSaveAndVerify(
    PausableZoneController__factory,
    eContractid.PausableZoneController,
    [owner],
    verify
  ) as Promise<PausableZoneController>;

export const deploySeaport = async (
  conduitController: string,
  verify?: boolean
) =>
  withSaveAndVerify(
    Seaport__factory,
    eContractid.Seaport,
    [conduitController],
    verify
  ) as Promise<Seaport>;

export const deployCurrencyManager = async (verify?: boolean) =>
  withSaveAndVerify(
    CurrencyManager__factory,
    eContractid.CurrencyManager,
    [],
    verify
  ) as Promise<CurrencyManager>;

export const deployExecutionManager = async (verify?: boolean) =>
  withSaveAndVerify(
    ExecutionManager__factory,
    eContractid.ExecutionManager,
    [],
    verify
  ) as Promise<ExecutionManager>;

export const deployLooksRareExchange = async (
  currencyManager: string,
  executionManager: string,
  royaltyFeeManager: string,
  weth: string,
  protocolFeeRecipient: string,
  verify?: boolean
) =>
  withSaveAndVerify(
    LooksRareExchange__factory,
    eContractid.LooksRareExchange,
    [
      currencyManager,
      executionManager,
      royaltyFeeManager,
      weth,
      protocolFeeRecipient,
    ],
    verify
  ) as Promise<LooksRareExchange>;

export const deployRoyaltyFeeManager = async (
  royaltyFeeRegistry: string,
  verify?: boolean
) =>
  withSaveAndVerify(
    RoyaltyFeeManager__factory,
    eContractid.RoyaltyFeeManager,
    [royaltyFeeRegistry],
    verify
  ) as Promise<RoyaltyFeeManager>;

export const deployRoyaltyFeeRegistry = async (
  royaltyFeeLimit: string,
  verify?: boolean
) =>
  withSaveAndVerify(
    RoyaltyFeeRegistry__factory,
    eContractid.RoyaltyFeeRegistry,
    [royaltyFeeLimit],
    verify
  ) as Promise<RoyaltyFeeRegistry>;

export const deployTransferSelectorNFT = async (
  transferManagerERC721: string,
  transferManagerERC1155: string,
  verify?: boolean
) =>
  withSaveAndVerify(
    TransferSelectorNFT__factory,
    eContractid.TransferSelectorNFT,
    [transferManagerERC721, transferManagerERC1155],
    verify
  ) as Promise<TransferSelectorNFT>;

export const deployTransferManagerERC721 = async (
  looksRareExchange: string,
  verify?: boolean
) =>
  withSaveAndVerify(
    TransferManagerERC721__factory,
    eContractid.TransferManagerERC721,
    [looksRareExchange],
    verify
  ) as Promise<TransferManagerERC721>;

export const deployTransferManagerERC1155 = async (
  looksRareExchange: string,
  verify?: boolean
) =>
  withSaveAndVerify(
    TransferManagerERC1155__factory,
    eContractid.TransferManagerERC1155,
    [looksRareExchange],
    verify
  ) as Promise<TransferManagerERC1155>;

export const deployStrategyStandardSaleForFixedPrice = async (
  protocolFee: string,
  verify?: boolean
) =>
  withSaveAndVerify(
    StrategyStandardSaleForFixedPrice__factory,
    eContractid.StrategyStandardSaleForFixedPrice,
    [protocolFee],
    verify
  ) as Promise<StrategyStandardSaleForFixedPrice>;

export const deployX2Y2R1 = async (verify?: boolean) =>
  withSaveAndVerify(
    X2Y2R1__factory,
    eContractid.X2Y2R1,
    [],
    verify
  ) as Promise<X2Y2R1>;

export const deployERC721Delegate = async (verify?: boolean) =>
  withSaveAndVerify(
    ERC721Delegate__factory,
    eContractid.ERC721Delegate,
    [],
    verify
  ) as Promise<ERC721Delegate>;

export const deployUniswapV3Factory = async (args: [], verify?: boolean) => {
  return withSaveAndVerify(
    UniswapV3Factory__factory,
    eContractid.UniswapV3Factory,
    [...args],
    verify
  ) as Promise<UniswapV3Factory>;
};

export const deployNonfungibleTokenPositionDescriptor = async (
  args: [string, string],
  verify?: boolean
) => {
  const nFTDescriptorFactory = (
    await DRE.ethers.getContractFactoryFromArtifact(nFTDescriptor)
  ).connect(await getFirstSigner());

  const nftDescriptorLibraryContract = await withSaveAndVerify(
    nFTDescriptorFactory,
    eContractid.NFTDescriptor,
    [],
    verify
  );
  const libraries = {
    NFTDescriptor: nftDescriptorLibraryContract.address,
  };
  const nonfungibleTokenPositionDescriptorFactory = (
    await DRE.ethers.getContractFactoryFromArtifact(
      nonfungibleTokenPositionDescriptor,
      {
        libraries,
      }
    )
  ).connect(await getFirstSigner());

  return withSaveAndVerify(
    nonfungibleTokenPositionDescriptorFactory,
    eContractid.NonfungibleTokenPositionDescriptor,
    [...args],
    verify,
    false,
    libraries
  );
};

export const deployUniswapV3OracleWrapper = async (
  factory: string,
  manager: string,
  addressProvider: string,
  verify?: boolean
) =>
  withSaveAndVerify(
    UniswapV3OracleWrapper__factory,
    eContractid.Aggregator.concat(`.${eContractid.UniswapV3}`),
    [factory, manager, addressProvider],
    verify
  ) as Promise<UniswapV3OracleWrapper>;

export const deployNonfungiblePositionManager = async (
  args: [string, string, string],
  verify?: boolean
) => {
  const nonfungiblePositionManagerFactory = (
    await DRE.ethers.getContractFactoryFromArtifact(nonfungiblePositionManager)
  ).connect(await getFirstSigner());

  return withSaveAndVerify(
    nonfungiblePositionManagerFactory,
    eContractid.UniswapV3,
    [...args],
    verify
  );
};

export const deployUniswapSwapRouter = async (
  args: [string, string],
  verify?: boolean
) => {
  const swapRouter = (
    await DRE.ethers.getContractFactoryFromArtifact(uniSwapRouter)
  ).connect(await getFirstSigner());

  return withSaveAndVerify(
    swapRouter,
    eContractid.UniswapV3SwapRouter,
    [...args],
    verify
  );
};

export const deployStETH = async (
  args: [string, string, string],
  verify?: boolean
): Promise<StETH> =>
  withSaveAndVerify(
    StETH__factory,
    args[1],
    [...args],
    verify
  ) as Promise<StETH>;

export const deployMockAToken = async (
  args: [string, string, string],
  verify?: boolean
): Promise<MockAToken> =>
  withSaveAndVerify(
    MockAToken__factory,
    args[1],
    [...args],
    verify
  ) as Promise<MockAToken>;

export const deployPTokenAToken = async (
  poolAddress: tEthereumAddress,
  verify?: boolean
) =>
  withSaveAndVerify(
    PTokenAToken__factory,
    eContractid.PTokenATokenImpl,
    [poolAddress],
    verify
  ) as Promise<PTokenAToken>;

export const deployPTokenStETH = async (
  poolAddress: tEthereumAddress,
  verify?: boolean
) =>
  withSaveAndVerify(
    PTokenStETH__factory,
    eContractid.PTokenStETHImpl,
    [poolAddress],
    verify
  ) as Promise<PTokenStETH>;

export const deployPTokenSApe = async (
  poolAddress: tEthereumAddress,
  verify?: boolean
) =>
  withSaveAndVerify(
    PTokenSApe__factory,
    eContractid.PTokenSApeImpl,
    [poolAddress],
    verify
  ) as Promise<PTokenSApe>;

export const deployUserFlashClaimRegistry = async (
  poolAddress: tEthereumAddress,
  verify?: boolean
) =>
  withSaveAndVerify(
    UserFlashclaimRegistry__factory,
    eContractid.FlashClaimRegistry,
    [poolAddress],
    verify
  ) as Promise<UserFlashclaimRegistry>;

export const deployApeCoinStaking = async (
  args: [string, string, string, string],
  verify?: boolean
) =>
  withSaveAndVerify(
    ApeCoinStaking__factory,
    eContractid.ApeCoinStaking,
    [...args],
    verify
  ) as Promise<ApeCoinStaking>;

export const deployApeStakingLogic = async (verify?: boolean) => {
  return withSaveAndVerify(
    ApeStakingLogic__factory,
    eContractid.ApeStakingLogic,
    [],
    verify
  ) as Promise<ApeStakingLogic>;
};

export const deployNTokenBAYCImpl = async (
  apeCoinStaking: tEthereumAddress,
  poolAddress: tEthereumAddress,
  verify?: boolean
) => {
  let apeStakingLogic;
  apeStakingLogic = await getApeStakingLogic();
  if (!apeStakingLogic) {
    apeStakingLogic = await deployApeStakingLogic(verify);
  }
  let mintableERC721Logic;
  mintableERC721Logic = await getMintableERC721Logic();
  if (!mintableERC721Logic) {
    mintableERC721Logic = await deployMintableERC721Logic(verify);
  }

  const libraries = {
    ["contracts/protocol/tokenization/libraries/ApeStakingLogic.sol:ApeStakingLogic"]:
      apeStakingLogic.address,
    ["contracts/protocol/tokenization/libraries/MintableERC721Logic.sol:MintableERC721Logic"]:
      mintableERC721Logic.address,
  };

  return withSaveAndVerify(
    NTokenBAYC__factory,
    eContractid.NTokenBAYCImpl,
    [poolAddress, apeCoinStaking],
    verify,
    false,
    libraries
  ) as Promise<NTokenBAYC>;
};

export const deployNTokenMAYCImpl = async (
  apeCoinStaking: tEthereumAddress,
  poolAddress: tEthereumAddress,
  verify?: boolean
) => {
  let apeStakingLogic;
  apeStakingLogic = await getApeStakingLogic();
  if (!apeStakingLogic) {
    apeStakingLogic = await deployApeStakingLogic();
  }
  let mintableERC721Logic;
  mintableERC721Logic = await getMintableERC721Logic();
  if (!mintableERC721Logic) {
    mintableERC721Logic = await deployMintableERC721Logic(verify);
  }

  const libraries = {
    ["contracts/protocol/tokenization/libraries/ApeStakingLogic.sol:ApeStakingLogic"]:
      apeStakingLogic.address,
    ["contracts/protocol/tokenization/libraries/MintableERC721Logic.sol:MintableERC721Logic"]:
      mintableERC721Logic.address,
  };
  return withSaveAndVerify(
    NTokenMAYC__factory,
    eContractid.NTokenMAYCImpl,
    [poolAddress, apeCoinStaking],
    verify,
    false,
    libraries
  ) as Promise<NTokenMAYC>;
};
export const deployATokenDebtToken = async (
  poolAddress: tEthereumAddress,
  verify?: boolean
) =>
  withSaveAndVerify(
    ATokenDebtToken__factory,
    eContractid.ATokenDebtToken,
    [poolAddress],
    verify
  ) as Promise<ATokenDebtToken>;

export const deployStETHDebtToken = async (
  poolAddress: tEthereumAddress,
  verify?: boolean
) =>
  withSaveAndVerify(
    StETHDebtToken__factory,
    eContractid.StETHDebtToken,
    [poolAddress],
    verify
  ) as Promise<StETHDebtToken>;

export const deployMintableERC721Logic = async (verify?: boolean) => {
  return withSaveAndVerify(
    MintableERC721Logic__factory,
    eContractid.MintableERC721Logic,
    [],
    verify
  ) as Promise<MintableERC721Logic>;
};

export const deployMerkleVerifier = async (verify?: boolean) =>
  withSaveAndVerify(
    MerkleVerifier__factory,
    eContractid.MerkleVerifier,
    [],
    verify
  ) as Promise<MerkleVerifier>;

export const deployExecutionDelegate = async (verify?: boolean) =>
  withSaveAndVerify(
    ExecutionDelegate__factory,
    eContractid.ExecutionDelegate,
    [],
    verify
  ) as Promise<ExecutionDelegate>;

export const deployPolicyManager = async (verify?: boolean) =>
  withSaveAndVerify(
    PolicyManager__factory,
    eContractid.PolicyManager,
    [],
    verify
  ) as Promise<PolicyManager>;

export const deployStandardPolicyERC721 = async (verify?: boolean) =>
  withSaveAndVerify(
    StandardPolicyERC721__factory,
    eContractid.StandardPolicyERC721,
    [],
    verify
  ) as Promise<StandardPolicyERC721>;

export const deployBlurExchangeImpl = async (verify?: boolean) => {
  const merkleVerifier = await deployMerkleVerifier(verify);
  const blurExchangeLibraries = {
    ["contracts/dependencies/blur-exchange/MerkleVerifier.sol:MerkleVerifier"]:
      merkleVerifier.address,
  };

  return withSaveAndVerify(
    BlurExchange__factory,
    eContractid.BlurExchangeImpl,
    [],
    verify,
    false,
    blurExchangeLibraries
  ) as Promise<BlurExchange>;
};

export const deployBlurExchangeProxy = async (
  admin: string,
  impl: string,
  initData: string,
  verify?: boolean
) => {
  return withSaveAndVerify(
    InitializableImmutableAdminUpgradeabilityProxy__factory,
    eContractid.BlurExchangeProxy,
    [admin, impl, initData],
    verify,
    true
  ) as Promise<InitializableImmutableAdminUpgradeabilityProxy>;
};

export const deployBlurAdapter = async (verify?: boolean) => {
  return withSaveAndVerify(
    BlurAdapter__factory,
    eContractid.BlurAdapter,
    [],
    verify
  ) as Promise<BlurAdapter>;
};

export const deployDelegationAwarePToken = async (
  [
    poolAddress,
    underlyingAssetAddress,
    treasuryAddress,
    incentivesController,
    name,
    symbol,
  ]: [
    tEthereumAddress,
    tEthereumAddress,
    tEthereumAddress,
    tEthereumAddress,
    string,
    string
  ],
  verify?: boolean
) => {
  const instance = await withSaveAndVerify(
    DelegationAwarePToken__factory,
    eContractid.DelegationAwarePTokenImpl,
    [poolAddress],
    verify
  );

  await instance.initialize(
    poolAddress,
    treasuryAddress,
    underlyingAssetAddress,
    incentivesController,
    "18",
    name,
    symbol,
    "0x10"
  );

  return instance;
};

export const deployMockVariableDebtToken = async (
  args: [
    tEthereumAddress,
    tEthereumAddress,
    tEthereumAddress,
    string,
    string,
    string
  ],
  verify?: boolean
) => {
  const instance = await withSaveAndVerify(
    MockVariableDebtToken__factory,
    eContractid.MockVariableDebtToken,
    [args[0]],
    verify
  );

  await instance.initialize(
    args[0],
    args[1],
    args[2],
    "18",
    args[3],
    args[4],
    args[5],
    GLOBAL_OVERRIDES
  );

  return instance;
};

export const deployMockNToken = async (
  args: [
    tEthereumAddress,
    tEthereumAddress,
    tEthereumAddress,
    string,
    string,
    string
  ],
  verify?: boolean
) => {
  let mintableERC721Logic;
  mintableERC721Logic = await getMintableERC721Logic();
  if (!mintableERC721Logic) {
    mintableERC721Logic = await deployMintableERC721Logic(verify);
  }

  const libraries = {
    ["contracts/protocol/tokenization/libraries/MintableERC721Logic.sol:MintableERC721Logic"]:
      mintableERC721Logic.address,
  };

  const instance = await withSaveAndVerify(
    MockNToken__factory,
    eContractid.MockNToken,
    [args[0], false],
    verify,
    false,
    libraries
  );

  await instance.initialize(
    args[0],
    args[1],
    args[2],
    args[3],
    args[4],
    args[5],
    GLOBAL_OVERRIDES
  );

  return instance;
};

export const deployMockPToken = async (
  args: [
    tEthereumAddress,
    tEthereumAddress,
    tEthereumAddress,
    tEthereumAddress,
    string,
    string,
    string
  ],
  verify?: boolean
) => {
  const instance = await withSaveAndVerify(
    MockPToken__factory,
    eContractid.MockPToken,
    [args[0]],
    verify
  );

  await instance.initialize(
    args[0],
    args[2],
    args[1],
    args[3],
    "18",
    args[4],
    args[5],
    args[6],
    GLOBAL_OVERRIDES
  );

  return instance;
};

export const deployMockIncentivesController = async (verify?: boolean) =>
  withSaveAndVerify(
    MockIncentivesController__factory,
    eContractid.MockIncentivesController,
    [],
    verify
  ) as Promise<MockIncentivesController>;

export const deployMockReserveConfiguration = async (verify?: boolean) =>
  withSaveAndVerify(
    MockReserveConfiguration__factory,
    eContractid.MockReserveConfiguration,
    [],
    verify
  ) as Promise<MockReserveConfiguration>;

export const deployMockInitializableImple = async (verify?: boolean) =>
  withSaveAndVerify(
    MockInitializableImple__factory,
    eContractid.MockInitializableImple,
    [],
    verify
  ) as Promise<MockInitializableImple>;

export const deployMockInitializableImpleV2 = async (verify?: boolean) =>
  withSaveAndVerify(
    MockInitializableImpleV2__factory,
    eContractid.MockInitializableImpleV2,
    [],
    verify
  ) as Promise<MockInitializableImpleV2>;

export const deployMockInitializableFromConstructorImple = async (
  args: [string],
  verify?: boolean
) =>
  withSaveAndVerify(
    MockInitializableFromConstructorImple__factory,
    eContractid.MockInitializableFromConstructorImple,
    [...args],
    verify
  ) as Promise<MockInitializableFromConstructorImple>;

export const deployMockReentrantInitializableImple = async (verify?: boolean) =>
  withSaveAndVerify(
    MockReentrantInitializableImple__factory,
    eContractid.MockReentrantInitializableImple,
    [],
    verify
  ) as Promise<MockReentrantInitializableImple>;

export const deployMockAirdropProject = async (
  underlyingAddress: tEthereumAddress,
  verify?: boolean
) =>
  withSaveAndVerify(
    MockAirdropProject__factory,
    eContractid.MockAirdropProject,
    [underlyingAddress],
    verify
  ) as Promise<MockAirdropProject>;
