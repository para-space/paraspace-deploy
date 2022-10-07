import {parseEther} from "ethers/lib/utils";
import {IParaSpaceConfiguration, eEthereumNetwork} from "../helpers/types";
import {TREASURY_MULTISIG} from "../tasks/deployments/full-deployment/helpers/constants";
import {
  strategyDAI,
  strategyUSDC,
  strategyUSDT,
  strategyWETH,
  strategyBAYC,
  strategyWPUNKS,
  strategyAPE,
  strategyWBTC,
  strategySTETH,
  strategyMAYC,
  strategyDOODLES,
  strategyAWETH,
  strategyCETH,
  strategyPUNK,
  strategyMoonbird,
  strategyAzuki,
  strategyOthr,
  strategyUniswapV3,
  strategyClonex,
  strategyMeebits,
} from "./reservesConfigs";

export const MOCK_CHAINLINK_AGGREGATORS_PRICES = {
  // ERC20
  DAI: parseEther("0.000908578801039414").toString(),
  USDC: parseEther("0.000915952223931999").toString(),
  USDT: parseEther("0.000915952223931999").toString(),
  WETH: parseEther("1").toString(),
  WBTC: parseEther("18.356369399062118").toString(),
  stETH: parseEther("1").toString(),
  APE: parseEther("0.0036906841286").toString(),
  aWETH: parseEther("1").toString(),
  cETH: parseEther("1").toString(),
  PUNK: parseEther("140").toString(),
  // ERC721
  BAYC: parseEther("101").toString(),
  WPUNKS: parseEther("140").toString(),
  PUNKS: parseEther("140").toString(),
  MAYC: parseEther("51").toString(),
  DOODLE: parseEther("75").toString(),
  MOONBIRD: parseEther("0.02").toString(),
  MEEBITS: parseEther("22").toString(),
  AZUKI: parseEther("21").toString(),
  OTHR: parseEther("25").toString(),
  CLONEX: parseEther("27").toString(),
};

export const MOCK_TOKEN_MINT_VALUE = {
  // ERC20
  DAI: 10000,
  USDC: 10000,
  USDT: 10000,
  WBTC: 10,
  stETH: 10,
  APE: 10000,
  aWETH: 10,
  cWETH: 10,
  PUNK: 1000,
  // ERC721
  BAYC: 2,
  CRYPTO_PUNK: 2,
  MAYC: 2,
  DOODLE: 2,
  MOONBIRD: 2,
  MEEBITS: 2,
  AZUKI: 2,
  OTHR: 2,
  CLONEX: 2,
};

export const ParaSpaceConfig: IParaSpaceConfiguration = {
  // BASIC INFO
  MarketId: "ParaSpaceMM",
  PTokenNamePrefix: "ParaSpace Derivative Token",
  StableDebtTokenNamePrefix: "ParaSpace stable debt token",
  VariableDebtTokenNamePrefix: "ParaSpace variable debt token",
  SymbolPrefix: "",
  ProviderId: 1, // Overridden in index.ts
  MaxUserAtomicTokensAllowed: 256,
  AuctionRecoveryHealthFactor: "1500000000000000000",
  ProtocolGlobalParams: {
    TokenDistributorPercentageBase: "10000",
    MockUsdPriceInWei: "5848466240000000",
    UsdAddress: "0x10F7Fc1F91Ba351f9C629c5947AD69bD03C05b96",
    NilAddress: "0x0000000000000000000000000000000000000000",
    OneAddress: "0x0000000000000000000000000000000000000001",
    ParaSpaceReferral: "0",
  },

  // MARKET CONFIGURATION
  ParaSpaceAdmin: undefined,
  // DONT CHANGE THIS!!!
  ParaSpaceAdminIndex: 0, // ACL Admin, Pool Admin, Asset Listing Admin
  EmergencyAdmin: undefined,
  EmergencyAdminIndex: 1, // Emergency Admin, >1 is a must to make tests pass
  RiskAdmin: undefined,
  RiskAdminIndex: 2, // Risk Admin, >1 is a must to make tests pass
  GatewayAdmin: undefined,
  // Gateway Admin, for polkadot evm only 5 accounts initialized
  // so change index no more than it here
  GatewayAdminIndex: 4,
  ProviderRegistry: undefined,
  ProviderRegistryOwner: undefined,
  PoolConfigurator: undefined,
  Pool: undefined,
  TokenDistributor: undefined,
  ParaSpaceOracle: undefined,
  FallbackOracle: undefined,
  ChainlinkAggregator: undefined,
  PTokenDomainSeparator:
    "0xbae024d959c6a022dc5ed37294cd39c141034b2ae5f02a955cce75c930a81bf5",
  WETH: undefined,
  WrappedNativeToken: undefined,
  ReserveFactorTreasuryAddress: TREASURY_MULTISIG,
  IncentivesController: undefined,

  // MOCK ORACLES
  Mocks: {
    AllAssetsInitialPrices: {
      ...MOCK_CHAINLINK_AGGREGATORS_PRICES,
    },
  },

  // RESERVE ASSETS - CONFIG, ASSETS, BORROW RATES,
  ReservesConfig: {
    DAI: strategyDAI,
    USDC: strategyUSDC,
    USDT: strategyUSDT,
    WETH: strategyWETH,
    APE: strategyAPE,
    WBTC: strategyWBTC,
    stETH: strategySTETH,
    aWETH: strategyAWETH,
    cETH: strategyCETH,
    PUNK: strategyPUNK,
    BAYC: strategyBAYC,
    MAYC: strategyMAYC,
    DOODLE: strategyDOODLES,
    WPUNKS: strategyWPUNKS,
    MOONBIRD: strategyMoonbird,
    MEEBITS: strategyMeebits,
    AZUKI: strategyAzuki,
    OTHR: strategyOthr,
    CLONEX: strategyClonex,
    UniswapV3: strategyUniswapV3,
  },
  ReserveAssets: {
    [eEthereumNetwork.hardhat]: undefined,
    [eEthereumNetwork.coverage]: undefined,
    [eEthereumNetwork.tenderlyMain]: undefined,
  },
};

export default ParaSpaceConfig;
