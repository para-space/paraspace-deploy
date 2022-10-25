import {BigNumber} from "ethers";
import {LiquidationLogicLibraryAddresses} from "../../types/factories/protocol/libraries/logic/LiquidationLogic__factory";
import {PoolConfiguratorLibraryAddresses} from "../../types/factories/protocol/pool/PoolConfigurator__factory";
import {PoolCoreLibraryAddresses} from "../../types/factories/protocol/pool/PoolCore__factory";
import {PoolMarketplaceLibraryAddresses} from "../../types/factories/protocol/pool/PoolMarketplace__factory";
import {PoolParametersLibraryAddresses} from "../../types/factories/protocol/pool/PoolParameters__factory";

export interface SymbolMap<T> {
  [symbol: string]: T;
}

export type eNetwork = eEthereumNetwork;

export type ConstructorArgs =
  | string
  | number
  | boolean
  | (string | string[] | number | boolean)[];

export type LibraryAddresses = {[key: string]: string};

export type ParaSpaceLibraryAddresses =
  | LiquidationLogicLibraryAddresses
  | PoolCoreLibraryAddresses
  | PoolMarketplaceLibraryAddresses
  | PoolParametersLibraryAddresses
  | PoolConfiguratorLibraryAddresses
  | {["NFTDescriptor"]: string};

export enum eEthereumNetwork {
  kovan = "kovan",
  ropsten = "ropsten",
  goerli = "goerli",
  main = "main",
  coverage = "coverage",
  hardhat = "hardhat",
  tenderlyMain = "tenderlyMain",
  ganache = "ganache",
  parallel = "parallel",
}

export enum eContractid {
  PoolAddressesProvider = "PoolAddressesProvider",
  MintableERC20 = "MintableERC20",
  MintableERC721 = "MintableERC721",
  MintableDelegationERC20 = "MintableDelegationERC20",
  PoolAddressesProviderRegistry = "PoolAddressesProviderRegistry",
  ACLManager = "ACLManager",
  PoolParametersProvider = "PoolParametersProvider",
  PoolConfiguratorProxy = "PoolConfiguratorProxy",
  ValidationLogic = "ValidationLogic",
  ReserveLogic = "ReserveLogic",
  GenericLogic = "GenericLogic",
  SupplyLogic = "SupplyLogic",
  BorrowLogic = "BorrowLogic",
  LiquidationLogic = "LiquidationLogic",
  AuctionLogic = "AuctionLogic",
  BridgeLogic = "BridgeLogic",
  PoolLogic = "PoolLogic",
  EModeLogic = "EModeLogic",
  ConfiguratorLogic = "ConfiguratorLogic",
  PoolProxy = "PoolProxy",
  PriceOracle = "PriceOracle",
  MockAggregator = "MockAggregator",
  ParaSpaceOracle = "ParaSpaceOracle",
  DefaultReserveInterestRateStrategy = "DefaultReserveInterestRateStrategy",
  DefaultReserveAuctionStrategy = "DefaultReserveAuctionStrategy",
  MockReserveAuctionStrategy = "MockReserveAuctionStrategy",
  InitializableImmutableAdminUpgradeabilityProxy = "InitializableImmutableAdminUpgradeabilityProxy",
  MockFlashLoanReceiver = "MockFlashLoanReceiver",
  PTokenImpl = "PTokenImpl",
  PTokenATokenImpl = "PTokenATokenImpl",
  PTokenStETHImpl = "PTokenStETHImpl",
  NTokenImpl = "NTokenImpl",
  NTokenMoonBirdsImpl = "NTokenMoonBirdsImpl",
  NTokenUniswapV3Impl = "NTokenUniswapV3Impl",
  DelegationAwarePTokenImpl = "DelegationAwarePTokenImpl",
  VariableDebtTokenImpl = "VariableDebtTokenImpl",
  MockVariableDebtToken = "MockVariableDebtToken",
  FlashClaimRegistry = "FlashClaimRegistry",
  ProtocolDataProvider = "ProtocolDataProvider",
  MockPToken = "MockPToken",
  IERC20Detailed = "IERC20Detailed",
  FeeProvider = "FeeProvider",
  TokenDistributor = "TokenDistributor",
  ReservesSetupHelper = "ReservesSetupHelper",
  WETHMocked = "WETH",
  PoolConfiguratorImpl = "PoolConfiguratorImpl",
  MockIncentivesController = "MockIncentivesController",
  MockReserveConfiguration = "MockReserveConfiguration",
  MockPool = "MockPool",
  MockInitializableImple = "MockInitializableImple",
  MockInitializableImpleV2 = "MockInitializableImpleV2",
  MockInitializableFromConstructorImple = "MockInitializableFromConstructorImple",
  MockReentrantInitializableImple = "MockReentrantInitializableImple",
  MockPoolInherited = "MockPoolInherited",
  UiPoolDataProvider = "UiPoolDataProvider",
  UiIncentiveDataProvider = "UiIncentiveDataProvider",
  WalletBalanceProvider = "WalletBalanceProvider",
  WETHGatewayImpl = "WETHGatewayImpl",
  WETHGatewayProxy = "WETHGatewayProxy",
  ERC721OracleWrapper = "ERC721OracleWrapper",
  CryptoPunksMarket = "CryptoPunksMarket",
  WPunk = "WPUNKS",
  WPunkGatewayImpl = "WPunkGatewayImpl",
  WPunkGatewayProxy = "WPunkGatewayProxy",
  FlashClaimLogic = "FlashClaimLogic",
  NFTFloorOracle = "NFTFloorOracle",
  ParaSpace = "ParaSpace",
  sParaSpace = "sParaSpace",
  RewardsController = "RewardsController",
  PCV = "PCV",
  MockTokenFaucet = "MockTokenFaucet",
  FallbackOracle = "FallbackOracle",
  BoredApeYachtClub = "BAYC",
  MutantApeYachtClub = "MAYC",
  Doodles = "DOODLE",
  MOONBIRD = "MOONBIRD",
  Meebits = "MEEBITS",
  Azuki = "AZUKI",
  CloneX = "CLONEX",
  OTHR = "OTHR",
  MoonBirdsGatewayImpl = "MoonBirdsGatewayImpl",
  MoonBirdsGatewayProxy = "MoonBirdsGatewayProxy",
  ConduitController = "ConduitController",
  PausableZoneController = "PausableZoneController",
  ConduitKey = "ConduitKey",
  Conduit = "Conduit",
  PausableZone = "PausableZone",
  Seaport = "Seaport",
  MarketplaceLogic = "MarketplaceLogic",
  SeaportAdapter = "SeaportAdapter",
  LooksRareAdapter = "LooksRareAdapter",
  X2Y2Adapter = "X2Y2Adapter",
  CurrencyManager = "CurrencyManager",
  ExecutionManager = "ExecutionManager",
  LooksRareExchange = "LooksRareExchange",
  RoyaltyFeeManager = "RoyaltyFeeManager",
  RoyaltyFeeRegistry = "RoyaltyFeeRegistry",
  TransferSelectorNFT = "TransferSelectorNFT",
  TransferManagerERC721 = "TransferManagerERC721",
  TransferManagerERC1155 = "TransferManagerERC1155",
  StrategyStandardSaleForFixedPrice = "StrategyStandardSaleForFixedPrice",
  X2Y2R1 = "X2Y2R1",
  ERC721Delegate = "ERC721Delegate",
  DataTypes = "DataTypes",
  MoonBirdHelper = "MoonBirdHelper",
  UniswapV3 = "UniswapV3",
  UniswapV3Factory = "UniswapV3Factory",
  UniswapV3SwapRouter = "UniswapV3SwapRouter",
  NFTDescriptor = "NFTDescriptor",
  NonfungibleTokenPositionDescriptor = "NonfungibleTokenPositionDescriptor",
  NonfungiblePositionManager = "NonfungiblePositionManager",
  UniswapV3OracleWrapper = "UniswapV3OracleWrapper",
  UniswapV3DynamicConfigsStrategy = "UniswapV3DynamicConfigsStrategy",
  StETH = "StETH",
  MockAToken = "MockAToken",
  MockAirdropProject = "MockAirdropProject",
  PoolCoreImpl = "PoolCoreImpl",
  PoolMarketplaceImpl = "PoolMarketplaceImpl",
  PoolParametersImpl = "PoolParametersImpl",
}

/*
 * Error messages
 */
export enum ProtocolErrors {
  CALLER_NOT_POOL_ADMIN = "1", // 'The caller of the function is not a pool admin'
  CALLER_NOT_EMERGENCY_ADMIN = "2", // 'The caller of the function is not an emergency admin'
  CALLER_NOT_POOL_OR_EMERGENCY_ADMIN = "3", // 'The caller of the function is not a pool or emergency admin'
  CALLER_NOT_RISK_OR_POOL_ADMIN = "4", // 'The caller of the function is not a risk or pool admin'
  CALLER_NOT_ASSET_LISTING_OR_POOL_ADMIN = "5", // 'The caller of the function is not an asset listing or pool admin'
  CALLER_NOT_BRIDGE = "6", // 'The caller of the function is not a bridge'
  ADDRESSES_PROVIDER_NOT_REGISTERED = "7", // 'Pool addresses provider is not registered'
  INVALID_ADDRESSES_PROVIDER_ID = "8", // 'Invalid id for the pool addresses provider'
  NOT_CONTRACT = "9", // 'Address is not a contract'
  CALLER_NOT_POOL_CONFIGURATOR = "10", // 'The caller of the function is not the pool configurator'
  CALLER_NOT_XTOKEN = "11", // 'The caller of the function is not an PToken'
  INVALID_ADDRESSES_PROVIDER = "12", // 'The address of the pool addresses provider is invalid'
  RESERVE_ALREADY_ADDED = "14", // 'Reserve has already been added to reserve list'
  NO_MORE_RESERVES_ALLOWED = "15", // 'Maximum amount of reserves in the pool reached'
  RESERVE_LIQUIDITY_NOT_ZERO = "18", // 'The liquidity of the reserve needs to be 0'
  INVALID_RESERVE_PARAMS = "20", // 'Invalid risk parameters for the reserve'
  CALLER_MUST_BE_POOL = "23", // 'The caller of this function must be a pool'
  INVALID_MINT_AMOUNT = "24", // 'Invalid amount to mint'
  INVALID_BURN_AMOUNT = "25", // 'Invalid amount to burn'
  INVALID_AMOUNT = "26", // 'Amount must be greater than 0'
  RESERVE_INACTIVE = "27", // 'Action requires an active reserve'
  RESERVE_FROZEN = "28", // 'Action cannot be performed because the reserve is frozen'
  RESERVE_PAUSED = "29", // 'Action cannot be performed because the reserve is paused'
  BORROWING_NOT_ENABLED = "30", // 'Borrowing is not enabled'
  STABLE_BORROWING_NOT_ENABLED = "31", // 'Stable borrowing is not enabled'
  NOT_ENOUGH_AVAILABLE_USER_BALANCE = "32", // 'User cannot withdraw more than the available balance'
  INVALID_INTEREST_RATE_MODE_SELECTED = "33", // 'Invalid interest rate mode selected'
  COLLATERAL_BALANCE_IS_ZERO = "34", // 'The collateral balance is 0'
  HEALTH_FACTOR_LOWER_THAN_LIQUIDATION_THRESHOLD = "35", // 'Health factor is lesser than the liquidation threshold'
  COLLATERAL_CANNOT_COVER_NEW_BORROW = "36", // 'There is not enough collateral to cover a new borrow'
  COLLATERAL_SAME_AS_BORROWING_CURRENCY = "37", // 'Collateral is (mostly) the same currency that is being borrowed'
  AMOUNT_BIGGER_THAN_MAX_LOAN_SIZE_STABLE = "38", // 'The requested amount is greater than the max loan size in stable rate mode'
  NO_DEBT_OF_SELECTED_TYPE = "39", // 'For repayment of a specific type of debt, the user needs to have debt that type'
  NO_EXPLICIT_AMOUNT_TO_REPAY_ON_BEHALF = "40", // 'To repay on behalf of a user an explicit amount to repay is needed'
  NO_OUTSTANDING_STABLE_DEBT = "41", // 'User does not have outstanding stable rate debt on this reserve'
  NO_OUTSTANDING_VARIABLE_DEBT = "42", // 'User does not have outstanding variable rate debt on this reserve'
  UNDERLYING_BALANCE_ZERO = "43", // 'The underlying balance needs to be greater than 0'
  INTEREST_RATE_REBALANCE_CONDITIONS_NOT_MET = "44", // 'Interest rate rebalance conditions were not met'
  HEALTH_FACTOR_NOT_BELOW_THRESHOLD = "45", // 'Health factor is not below the threshold'
  COLLATERAL_CANNOT_BE_AUCTIONED_OR_LIQUIDATED = "46", // 'The collateral chosen cannot be auctioned OR liquidated'
  SPECIFIED_CURRENCY_NOT_BORROWED_BY_USER = "47", // 'User did not borrow the specified currency'
  SAME_BLOCK_BORROW_REPAY = "48", // 'Borrow and repay in same block is not allowed'
  BORROW_CAP_EXCEEDED = "50", // 'Borrow cap is exceeded'
  SUPPLY_CAP_EXCEEDED = "51", // 'Supply cap is exceeded'
  XTOKEN_SUPPLY_NOT_ZERO = "54", // 'PToken supply is not zero'
  STABLE_DEBT_NOT_ZERO = "55", // 'Stable debt supply is not zero'
  VARIABLE_DEBT_SUPPLY_NOT_ZERO = "56", // 'Variable debt supply is not zero'
  LTV_VALIDATION_FAILED = "57", // 'Ltv validation failed'
  PRICE_ORACLE_SENTINEL_CHECK_FAILED = "59", // 'Price oracle sentinel validation failed'
  RESERVE_ALREADY_INITIALIZED = "61", // 'Reserve has already been initialized'
  INVALID_LTV = "63", // 'Invalid ltv parameter for the reserve'
  INVALID_LIQ_THRESHOLD = "64", // 'Invalid liquidity threshold parameter for the reserve'
  INVALID_LIQ_BONUS = "65", // 'Invalid liquidity bonus parameter for the reserve'
  INVALID_DECIMALS = "66", // 'Invalid decimals parameter of the underlying asset of the reserve'
  INVALID_RESERVE_FACTOR = "67", // 'Invalid reserve factor parameter for the reserve'
  INVALID_BORROW_CAP = "68", // 'Invalid borrow cap for the reserve'
  INVALID_SUPPLY_CAP = "69", // 'Invalid supply cap for the reserve'
  INVALID_LIQUIDATION_PROTOCOL_FEE = "70", // 'Invalid liquidation protocol fee for the reserve'
  INVALID_DEBT_CEILING = "73", // 'Invalid debt ceiling for the reserve
  INVALID_RESERVE_INDEX = "74", // 'Invalid reserve index'
  ACL_ADMIN_CANNOT_BE_ZERO = "75", // 'ACL admin cannot be set to the zero address'
  INCONSISTENT_PARAMS_LENGTH = "76", // 'Array parameters that should be equal length are not'
  ZERO_ADDRESS_NOT_VALID = "77", // 'Zero address not valid'
  INVALID_EXPIRATION = "78", // 'Invalid expiration'
  INVALID_SIGNATURE = "79", // 'Invalid signature'
  OPERATION_NOT_SUPPORTED = "80", // 'Operation not supported'
  ASSET_NOT_LISTED = "82", // 'Asset is not listed'
  INVALID_OPTIMAL_USAGE_RATIO = "83", // 'Invalid optimal usage ratio'
  INVALID_OPTIMAL_STABLE_TO_TOTAL_DEBT_RATIO = "84", // 'Invalid optimal stable to total debt ratio'
  UNDERLYING_CANNOT_BE_RESCUED = "85", // 'The underlying asset cannot be rescued'
  ADDRESSES_PROVIDER_ALREADY_ADDED = "86", // 'Reserve has already been added to reserve list'
  POOL_ADDRESSES_DO_NOT_MATCH = "87", // 'The token implementation pool address and the pool address provided by the initializing pool do not match'
  STABLE_BORROWING_ENABLED = "88", // 'Stable borrowing is enabled'
  SILOED_BORROWING_VIOLATION = "89", // 'User is trying to borrow multiple assets including a siloed one'
  RESERVE_DEBT_NOT_ZERO = "90", // the total debt of the reserve needs to be 0
  NOT_THE_OWNER = "91", // user is not the owner of a given asset
  LIQUIDATION_AMOUNT_NOT_ENOUGH = "92",
  INVALID_ASSET_TYPE = "93", // invalid asset type for action.
  INVALID_FLASH_CLAIM_RECEIVER = "94", // invalid flash claim receiver.
  ERC721_HEALTH_FACTOR_NOT_BELOW_THRESHOLD = "95", // ERC721 Health factor is not below the threshold. Can only liquidate ERC20.
  UNDERLYING_ASSET_CAN_NOT_BE_TRANSFERRED = "96", //underlying asset can not be transferred.
  TOKEN_TRANSFERRED_CAN_NOT_BE_SELF_ADDRESS = "97", //token transferred can not be self address.
  INVALID_AIRDROP_CONTRACT_ADDRESS = "98", //invalid airdrop contract address.
  INVALID_AIRDROP_PARAMETERS = "99", //invalid airdrop parameters.
  CALL_AIRDROP_METHOD_FAILED = "100", //call airdrop method failed.
  SUPPLIER_NOT_NTOKEN = "101", //supplier is not the NToken contract
  CALL_MARKETPLACE_FAILED = "102", //call marketplace failed.
  INVALID_MARKETPLACE_ID = "103", //invalid marketplace id.
  INVALID_MARKETPLACE_ORDER = "104", //invalid marketplace id.
  CREDIT_DOES_NOT_MATCH_ORDER = "105", //credit doesn't match order.
  PAYNOW_NOT_ENOUGH = "106", //paynow not enough.
  INVALID_CREDIT_SIGNATURE = "107", //invalid credit signature.
  INVALID_ORDER_TAKER = "108", //invalid order taker.
  MARKETPLACE_PAUSED = "109", //marketplace paused.
  INVALID_AUCTION_RECOVERY_HEALTH_FACTOR = "110", //invalid auction recovery health factor.
  AUCTION_ALREADY_STARTED = "111", //auction already started.
  AUCTION_NOT_STARTED = "112", //auction not started yet.
  AUCTION_NOT_ENABLED = "113", //auction not enabled on the reserve.
  ERC721_HEALTH_FACTOR_NOT_ABOVE_THRESHOLD = "114", //ERC721 Health factor is not above the threshold.
  TOKEN_IN_AUCTION = "115", //tokenId is in auction.
  AUCTIONED_BALANCE_NOT_ZERO = "116", //auctioned balance not zero

  LIQUIDATOR_CAN_NOT_BE_SELF = "117", //user can not liquidate himself
  UNIV3_NOT_ALLOWED = "119", //flash claim is not allowed for UniswapV3
  // SafeCast
  SAFECAST_UINT128_OVERFLOW = "SafeCast: value doesn't fit in 128 bits",

  // Ownable
  OWNABLE_ONLY_OWNER = "Ownable: caller is not the owner",

  // ERC20
  ERC20_TRANSFER_AMOUNT_EXCEEDS_BALANCE = "ERC20: transfer amount exceeds balance",

  // old
  INVALID_FROM_BALANCE_AFTER_TRANSFER = "Invalid from balance after transfer",
  INVALID_TO_BALANCE_AFTER_TRANSFER = "Invalid from balance after transfer",
  INVALID_HF = "Invalid health factor",
}

export type tEthereumAddress = string;
export type tStringTokenBigUnits = string; // 1 ETH, or 10e6 USDC or 10e18 DAI
export type tBigNumberTokenBigUnits = BigNumber;
export type tStringTokenSmallUnits = string; // 1 wei, or 1 basic unit of USDC, or 1 basic unit of DAI
export type tBigNumberTokenSmallUnits = BigNumber;

export interface iFunctionSignature {
  name: string;
  signature: string;
}

export interface iAssetCommon<T> {
  [key: string]: T;
}
export interface iAssetBase<T> {
  WETH: T;
  aWETH: T;
  cETH: T;
  DAI: T;
  USDC: T;
  USDT: T;
  BAYC: T;
  WPUNKS: T;
  PUNKS: T;
  PUNK: T;
  WBTC: T;
  stETH: T;
  APE: T;
  MAYC: T;
  DOODLE: T;
  MOONBIRD: T;
  MEEBITS: T;
  AZUKI: T;
  OTHR: T;
  CLONEX: T;
}

export type iAssetsWithoutETH<T> = Omit<iAssetBase<T>, "ETH">;

export type iAssetsWithoutUSD<T> = Omit<iAssetBase<T>, "USD">;

export type iParaSpacePoolAssets<T> = Pick<
  iAssetsWithoutUSD<T>,
  | "DAI"
  | "USDC"
  | "USDT"
  | "WETH"
  | "WBTC"
  | "stETH"
  | "APE"
  | "BAYC"
  | "WPUNKS"
  | "MAYC"
  | "DOODLE"
  | "AZUKI"
  | "CLONEX"
  | "MOONBIRD"
  | "MEEBITS"
  | "OTHR"
>;

export type iMultiPoolsAssets<T> = iAssetCommon<T> | iParaSpacePoolAssets<T>;

export type iAssetAggregatorBase<T> = iAssetsWithoutETH<T>;

export enum ERC20TokenContractId {
  DAI = "DAI",
  WETH = "WETH",
  USDC = "USDC",
  USDT = "USDT",
  WBTC = "WBTC",
  stETH = "stETH",
  APE = "APE",
  aWETH = "aWETH",
  cETH = "cETH",
  PUNK = "PUNK",
}

export enum ERC721TokenContractId {
  WPUNKS = "WPUNKS",
  BAYC = "BAYC",
  MAYC = "MAYC",
  DOODLE = "DOODLE",
  AZUKI = "AZUKI",
  CLONEX = "CLONEX",
  MOONBIRD = "MOONBIRD",
  MEEBITS = "MEEBITS",
  OTHR = "OTHR",
  UniswapV3 = "UniswapV3",
}

export enum NTokenContractId {
  nBAYC = "nBAYC",
  nMAYC = "nMAYC",
  nDOODLES = "nDOODLES",
  nWPUNKS = "nWPUNKS",
  nMOONBIRD = "nMOONBIRD",
  nUniswapV3 = "nUniswapV3",
}

export enum PTokenContractId {
  pDAI = "pDAI",
  pUSDC = "pUSDC",
  pWETH = "pWETH",
  paWETH = "paWETH",
  pstETH = "pstETH",
}

export interface IReserveParams
  extends IReserveBorrowParams,
    IReserveCollateralParams {
  address?: tEthereumAddress;
  xTokenImpl: eContractid;
  reserveFactor: string;
  supplyCap: string;
  strategy: IInterestRateStrategyParams;
  auctionStrategy: IAuctionStrategyParams;
}

export interface IInterestRateStrategyParams {
  name: string;
  optimalUsageRatio: string;
  baseVariableBorrowRate: string;
  variableRateSlope1: string;
  variableRateSlope2: string;
}

export interface IAuctionStrategyParams {
  name: string;

  maxPriceMultiplier: string;

  minExpPriceMultiplier: string;
  minPriceMultiplier: string;
  stepLinear: string;
  stepExp: string;
  tickLength: string;
}

export interface IReserveBorrowParams {
  borrowingEnabled: boolean;
  reserveDecimals: string;
  borrowCap: string;
}

export interface IReserveCollateralParams {
  baseLTVAsCollateral: string;
  liquidationThreshold: string;
  liquidationBonus: string;
}
export interface IMarketRates {
  borrowRate: string;
}

export type iParamsPerNetwork<T> = iEthereumParamsPerNetwork<T>;

export type iParamsPerNetworkAll<T> = iEthereumParamsPerNetwork<T>;

export interface iEthereumParamsPerNetwork<T> {
  [eEthereumNetwork.coverage]: T;
  [eEthereumNetwork.kovan]: T;
  [eEthereumNetwork.ropsten]: T;
  [eEthereumNetwork.goerli]: T;
  [eEthereumNetwork.main]: T;
  [eEthereumNetwork.hardhat]: T;
  [eEthereumNetwork.ganache]: T;
  [eEthereumNetwork.parallel]: T;
  [eEthereumNetwork.tenderlyMain]: T;
}

export enum RateMode {
  None = "0",
  Stable = "1",
  Variable = "2",
}

export interface IUniswapV2Config {
  Factory: tEthereumAddress;
  Router: tEthereumAddress;
}

export interface IUniswapV3Config {
  Factory: tEthereumAddress;
  NFTPositionManager: tEthereumAddress;
}

export interface IMarketplaceConfig {
  Seaport: tEthereumAddress;
}

export interface IChainlinkConfig {
  ETH_USD_ORACLE: tEthereumAddress;
  DAI_ETH_ORACLE?: tEthereumAddress;
  USDC_ETH_ORACLE?: tEthereumAddress;
  USDT_ETH_ORACLE?: tEthereumAddress;
  WBTC_ETH_ORACLE?: tEthereumAddress;
  STETH_ETH_ORACLE?: tEthereumAddress;
  APE_ETH_ORACLE?: tEthereumAddress;
}

export interface IOracleConfig extends IChainlinkConfig {
  BEND_DAO_ORACLE?: tEthereumAddress;
}

export interface IUniswapConfig {
  V2Factory: tEthereumAddress;
  V2Router: tEthereumAddress;
  V3Factory: tEthereumAddress;
  V3NFTPositionManager: tEthereumAddress;
}

export interface IMocksConfig {
  USDPriceInWEI: string;
  AllAssetsInitialPrices: iAssetBase<string>;
}

export interface IRate {
  borrowRate: string;
}

export interface ICommonConfiguration {
  MarketId: string;
  ParaSpaceTeam: tEthereumAddress;
  PTokenNamePrefix: string;
  VariableDebtTokenNamePrefix: string;
  SymbolPrefix: string;
  ProviderId: number;
  MaxUserAtomicTokensAllowed: number;
  AuctionRecoveryHealthFactor: string | number;
  Mocks: IMocksConfig;
  ParaSpaceAdmin: tEthereumAddress | undefined;
  ParaSpaceAdminIndex: number;
  EmergencyAdmin: tEthereumAddress | undefined;
  EmergencyAdminIndex: number;

  RiskAdmin: tEthereumAddress | undefined;
  RiskAdminIndex: number;

  GatewayAdmin: tEthereumAddress | undefined;
  GatewayAdminIndex: number;
  WETH: tEthereumAddress;
  Uniswap: IUniswapConfig;
  Marketplace: IMarketplaceConfig;
  Oracle: IOracleConfig;
  ReservesConfig: iMultiPoolsAssets<IReserveParams>;
  ReserveFactorTreasuryAddress: tEthereumAddress;
}

export interface IParaSpaceConfiguration extends ICommonConfiguration {
  ReservesConfig: iMultiPoolsAssets<IReserveParams>;
}

export type PoolConfiguration = ICommonConfiguration | IParaSpaceConfiguration;
