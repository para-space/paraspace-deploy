import {eEthereumNetwork, IParaSpaceConfiguration} from "../helpers/types";
import {MocksConfig} from "./mocks";
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

export const CommonConfig: Pick<
  IParaSpaceConfiguration,
  | "MarketId"
  | "PTokenNamePrefix"
  | "VariableDebtTokenNamePrefix"
  | "SymbolPrefix"
  | "ProviderId"
  | "MaxUserAtomicTokensAllowed"
  | "AuctionRecoveryHealthFactor"
  | "ParaSpaceAdmin"
  | "EmergencyAdmin"
  | "RiskAdmin"
  | "GatewayAdmin"
  | "ParaSpaceAdminIndex"
  | "EmergencyAdminIndex"
  | "RiskAdminIndex"
  | "GatewayAdminIndex"
  | "Mocks"
> = {
  MarketId: "ParaSpaceMM",
  PTokenNamePrefix: "ParaSpace Derivative Token",
  VariableDebtTokenNamePrefix: "ParaSpace Variable Debt Token",
  SymbolPrefix: "",
  ProviderId: 1,
  MaxUserAtomicTokensAllowed: 256,
  AuctionRecoveryHealthFactor: "1500000000000000000",
  // ACL CONFIGURATION
  ParaSpaceAdmin: undefined,
  EmergencyAdmin: undefined,
  RiskAdmin: undefined,
  GatewayAdmin: undefined,
  // DONT CHANGE THIS!!!
  ParaSpaceAdminIndex: 0, // ACL Admin, Pool Admin, Asset Listing Admin
  EmergencyAdminIndex: 1, // Emergency Admin, >1 is a must to make tests pass
  RiskAdminIndex: 2, // Risk Admin, >1 is a must to make tests pass
  GatewayAdminIndex: 4, // Gateway Admin, for polkadot evm only 5 accounts initialized
  // MOCKS
  Mocks: MocksConfig,
};

export const HardhatParaSpaceConfig: IParaSpaceConfiguration = {
  // BASIC INFO
  ...CommonConfig,
  ParaSpaceTeam: "0x03D10cda221C2faA9F5CA22087654011ceE1802D",
  Treasury: "0x03D10cda221C2faA9F5CA22087654011ceE1802D",
  Tokens: {},
  BendDAO: {},
  Uniswap: {},
  Marketplace: {},
  Chainlink: {},
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
};

export const GoerliParaSpaceConfig: IParaSpaceConfiguration = {
  // BASIC INFO
  ...CommonConfig,
  ParaSpaceTeam: "0x03D10cda221C2faA9F5CA22087654011ceE1802D",
  Treasury: "0x03D10cda221C2faA9F5CA22087654011ceE1802D",
  Tokens: {},
  BendDAO: {},
  Uniswap: {
    V2Factory: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
    V2Router: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    V3Factory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
    V3NFTPositionManager: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
  },
  Marketplace: {
    Seaport: "0x00000000006c3852cbEf3e08E8dF289169EdE581",
  },
  Chainlink: {
    ETH: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
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
};

export const MainnetParaSpaceConfig: IParaSpaceConfiguration = {
  // BASIC INFO
  ...CommonConfig,
  ParaSpaceTeam: "0x69C33aB569816F1D564a420490AbB894a44071Fb",
  Treasury: "0x03D10cda221C2faA9F5CA22087654011ceE1802D",
  Tokens: {
    WETH: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
    USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  },
  BendDAO: {
    Oracle: "0x7c2a19e54e48718f6c60908a9cff3396e4ea1eba",
  },
  Uniswap: {
    V2Factory: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
    V2Router: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    V3Factory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
    V3NFTPositionManager: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
  },
  Marketplace: {
    Seaport: "0x00000000006c3852cbEf3e08E8dF289169EdE581",
  },
  Chainlink: {
    ETH: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
    DAI: "0x773616E4d11A78F511299002da57A0a94577F1f4",
    USDC: "0x986b5E1e1755e3C2440e960477f25201B0a8bbD4",
    USDT: "0xEe9F2375b4bdF6387aa8265dD4FB8F16512A1d46",
    WBTC: "0xdeb288F737066589598e9214E782fa5A8eD689e8",
    APE: "0xc7de7f4d4C9c991fF62a07D18b3E31e349833A18",
  },
  // RESERVE ASSETS - CONFIG, ASSETS, BORROW RATES,
  ReservesConfig: {
    DAI: strategyDAI,
    USDC: strategyUSDC,
    USDT: strategyUSDT,
    WETH: strategyWETH,
    APE: strategyAPE,
    WBTC: strategyWBTC,
    BAYC: strategyBAYC,
    MAYC: strategyMAYC,
    DOODLE: strategyDOODLES,
    MOONBIRD: strategyMoonbird,
    MEEBITS: strategyMeebits,
    AZUKI: strategyAzuki,
    OTHR: strategyOthr,
    CLONEX: strategyClonex,
  },
};

export const ParaSpaceConfigs: Partial<
  Record<eEthereumNetwork, IParaSpaceConfiguration>
> = {
  [eEthereumNetwork.hardhat]: HardhatParaSpaceConfig,
  [eEthereumNetwork.coverage]: HardhatParaSpaceConfig,
  [eEthereumNetwork.goerli]: GoerliParaSpaceConfig,
  [eEthereumNetwork.mainnet]: MainnetParaSpaceConfig,
};
