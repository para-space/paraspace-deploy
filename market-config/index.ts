import {parseEther} from "ethers/lib/utils";
import {IParaSpaceConfiguration} from "../helpers/types";
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
  ParaSpaceTeam: "0x69C33aB569816F1D564a420490AbB894a44071Fb",
  PTokenNamePrefix: "ParaSpace Derivative Token",
  VariableDebtTokenNamePrefix: "ParaSpace Variable Debt Token",
  SymbolPrefix: "",
  ProviderId: 1, // Overridden in index.ts
  AuctionRecoveryHealthFactor: "1500000000000000000",
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
  ReserveFactorTreasuryAddress: "0x03D10cda221C2faA9F5CA22087654011ceE1802D",
  WETH: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
  USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  BendDAO: {
    Oracle: "0x7c2a19e54e48718f6c60908a9cff3396e4ea1eba",
  },
  Uniswap: {
    V2Factory: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
    V2Router: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    V3Factory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
    V3NFTPositionManager: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
    // MAINNET
    // V2Factory: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
    // V2Router: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
  },
  Marketplace: {
    Seaport: "0x00000000006c3852cbEf3e08E8dF289169EdE581",
  },
  Oracle: {
    ETH: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
    // MAINNET
    // ETH: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
    // DAI: "0x773616E4d11A78F511299002da57A0a94577F1f4",
    // USDC: "0x986b5E1e1755e3C2440e960477f25201B0a8bbD4",
    // USDT: "0xEe9F2375b4bdF6387aa8265dD4FB8F16512A1d46",
    // WBTC: "0xdeb288F737066589598e9214E782fa5A8eD689e8",
    // STETH: "0x86392dC19c0b719886221c78AB11eb8Cf5c52812",
    // APE: "0xc7de7f4d4C9c991fF62a07D18b3E31e349833A18"
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
  // MOCK ORACLES
  Mocks: {
    USDPriceInWEI: "5848466240000000",
    AllAssetsInitialPrices: {
      ...MOCK_CHAINLINK_AGGREGATORS_PRICES,
    },
  },
};

export default ParaSpaceConfig;
