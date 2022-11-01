import {eContractid, IReserveParams} from "../helpers/types";

import {
  rateStrategyStableTwo,
  rateStrategyStableThree,
  rateStrategyXETH,
  rateStrategyWBTC,
  rateStrategyAPE,
  rateStrategyNFT,
  rateStrategyParaSpace,
} from "./rateStrategies";
import {auctionStrategyExp, auctionStrategyZero} from "./auctionStrategies";

export const strategyDAI: IReserveParams = {
  // address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  strategy: rateStrategyStableTwo,
  auctionStrategy: auctionStrategyZero,
  baseLTVAsCollateral: "7500",
  liquidationThreshold: "8000",
  liquidationBonus: "10500",
  borrowingEnabled: true,
  reserveDecimals: "18",
  xTokenImpl: eContractid.PTokenImpl,
  reserveFactor: "1000",
  borrowCap: "0",
  supplyCap: "0",
};

export const strategyUSDC: IReserveParams = {
  // address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  strategy: rateStrategyStableThree,
  auctionStrategy: auctionStrategyZero,
  baseLTVAsCollateral: "8000",
  liquidationThreshold: "8500",
  liquidationBonus: "10500",
  borrowingEnabled: true,
  reserveDecimals: "6",
  xTokenImpl: eContractid.PTokenImpl,
  reserveFactor: "1000",
  borrowCap: "0",
  supplyCap: "0",
};

export const strategyUSDT: IReserveParams = {
  // address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  strategy: rateStrategyStableTwo,
  auctionStrategy: auctionStrategyZero,
  baseLTVAsCollateral: "7500",
  liquidationThreshold: "8000",
  liquidationBonus: "10500",
  borrowingEnabled: true,
  reserveDecimals: "6",
  xTokenImpl: eContractid.PTokenImpl,
  reserveFactor: "1000",
  borrowCap: "0",
  supplyCap: "0",
};

export const strategyWETH: IReserveParams = {
  // address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  strategy: rateStrategyXETH,
  auctionStrategy: auctionStrategyZero,
  baseLTVAsCollateral: "8250",
  liquidationThreshold: "8500",
  liquidationBonus: "10500",
  borrowingEnabled: true,
  reserveDecimals: "18",
  xTokenImpl: eContractid.PTokenImpl,
  reserveFactor: "1000",
  borrowCap: "0",
  supplyCap: "0",
};

export const strategyWBTC: IReserveParams = {
  // address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
  strategy: rateStrategyWBTC,
  auctionStrategy: auctionStrategyZero,
  baseLTVAsCollateral: "7000",
  liquidationThreshold: "7500",
  liquidationBonus: "10650",
  borrowingEnabled: true,
  reserveDecimals: "8",
  xTokenImpl: eContractid.PTokenImpl,
  reserveFactor: "2000",
  borrowCap: "0",
  supplyCap: "0",
};

export const strategySTETH: IReserveParams = {
  // address: "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84",
  strategy: rateStrategyXETH,
  auctionStrategy: auctionStrategyZero,
  baseLTVAsCollateral: "6900",
  liquidationThreshold: "8100",
  liquidationBonus: "10750",
  borrowingEnabled: true,
  reserveDecimals: "18",
  xTokenImpl: eContractid.PTokenImpl,
  reserveFactor: "1000",
  borrowCap: "0",
  supplyCap: "0",
};

export const strategyAPE: IReserveParams = {
  // address: "0x4d224452801ACEd8B2F0aebE155379bb5D594381",
  strategy: rateStrategyAPE,
  auctionStrategy: auctionStrategyZero,
  baseLTVAsCollateral: "2000",
  liquidationThreshold: "7000",
  liquidationBonus: "10500",
  borrowingEnabled: true,
  reserveDecimals: "18",
  xTokenImpl: eContractid.PTokenImpl,
  reserveFactor: "1000",
  borrowCap: "0",
  supplyCap: "0",
};

export const strategyAWETH: IReserveParams = {
  strategy: rateStrategyXETH,
  auctionStrategy: auctionStrategyZero,
  baseLTVAsCollateral: "6900",
  liquidationThreshold: "8100",
  liquidationBonus: "10750",
  borrowingEnabled: true,
  reserveDecimals: "18",
  xTokenImpl: eContractid.PTokenATokenImpl,
  reserveFactor: "1000",
  borrowCap: "0",
  supplyCap: "0",
};

export const strategyCETH: IReserveParams = {
  strategy: rateStrategyXETH,
  auctionStrategy: auctionStrategyZero,
  baseLTVAsCollateral: "6900",
  liquidationThreshold: "8100",
  liquidationBonus: "10750",
  borrowingEnabled: true,
  reserveDecimals: "8",
  xTokenImpl: eContractid.PTokenImpl,
  reserveFactor: "1000",
  borrowCap: "0",
  supplyCap: "0",
};

export const strategyPUNK: IReserveParams = {
  // address: "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB",
  strategy: rateStrategyXETH,
  auctionStrategy: auctionStrategyZero,
  baseLTVAsCollateral: "6900",
  liquidationThreshold: "8100",
  liquidationBonus: "10750",
  borrowingEnabled: true,
  reserveDecimals: "18",
  xTokenImpl: eContractid.PTokenImpl,
  reserveFactor: "1000",
  borrowCap: "0",
  supplyCap: "0",
};

export const strategyParaSpace: IReserveParams = {
  strategy: rateStrategyParaSpace,
  auctionStrategy: auctionStrategyZero,
  baseLTVAsCollateral: "2000",
  liquidationThreshold: "7000",
  liquidationBonus: "10500",
  borrowingEnabled: true,
  reserveDecimals: "18",
  xTokenImpl: eContractid.PTokenImpl,
  reserveFactor: "1000",
  borrowCap: "0",
  supplyCap: "0",
};

export const strategyBAYC: IReserveParams = {
  // address: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
  strategy: rateStrategyNFT,
  auctionStrategy: auctionStrategyExp,
  baseLTVAsCollateral: "3000",
  liquidationThreshold: "7000",
  liquidationBonus: "10500",
  borrowingEnabled: false,
  reserveDecimals: "0",
  xTokenImpl: eContractid.NTokenImpl,
  reserveFactor: "0",
  borrowCap: "0",
  supplyCap: "0",
};

export const strategyWPUNKS: IReserveParams = {
  // address: "0xb7F7F6C52F2e2fdb1963Eab30438024864c313F6",
  strategy: rateStrategyNFT,
  auctionStrategy: auctionStrategyExp,
  baseLTVAsCollateral: "3000",
  liquidationThreshold: "7000",
  liquidationBonus: "10500",
  borrowingEnabled: false,
  reserveDecimals: "0",
  xTokenImpl: eContractid.NTokenImpl,
  reserveFactor: "0",
  borrowCap: "0",
  supplyCap: "0",
};

export const strategyMAYC: IReserveParams = {
  // address: "0x60E4d786628Fea6478F785A6d7e704777c86a7c6",
  strategy: rateStrategyNFT,
  auctionStrategy: auctionStrategyExp,
  baseLTVAsCollateral: "3000",
  liquidationThreshold: "7000",
  liquidationBonus: "10500",
  borrowingEnabled: false,
  reserveDecimals: "0",
  xTokenImpl: eContractid.NTokenImpl,
  reserveFactor: "0",
  borrowCap: "0",
  supplyCap: "0",
};

export const strategyDOODLES: IReserveParams = {
  // address: "0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e",
  strategy: rateStrategyNFT,
  auctionStrategy: auctionStrategyExp,
  baseLTVAsCollateral: "3000",
  liquidationThreshold: "7000",
  liquidationBonus: "10500",
  borrowingEnabled: false,
  reserveDecimals: "0",
  xTokenImpl: eContractid.NTokenImpl,
  reserveFactor: "0",
  borrowCap: "0",
  supplyCap: "0",
};

export const strategyMoonbird: IReserveParams = {
  // address: "0x23581767a106ae21c074b2276d25e5c3e136a68b",
  strategy: rateStrategyNFT,
  auctionStrategy: auctionStrategyExp,
  baseLTVAsCollateral: "3000",
  liquidationThreshold: "7000",
  liquidationBonus: "10500",
  borrowingEnabled: false,
  reserveDecimals: "0",
  xTokenImpl: eContractid.NTokenMoonBirdsImpl,
  reserveFactor: "0",
  borrowCap: "0",
  supplyCap: "0",
};

export const strategyMeebits: IReserveParams = {
  // address: "0x7bd29408f11d2bfc23c34f18275bbf23bb716bc7",
  strategy: rateStrategyNFT,
  auctionStrategy: auctionStrategyExp,
  baseLTVAsCollateral: "3000",
  liquidationThreshold: "7000",
  liquidationBonus: "10500",
  borrowingEnabled: false,
  reserveDecimals: "0",
  xTokenImpl: eContractid.NTokenImpl,
  reserveFactor: "0",
  borrowCap: "0",
  supplyCap: "0",
};

export const strategyAzuki: IReserveParams = {
  // address: "0xed5af388653567af2f388e6224dc7c4b3241c544",
  strategy: rateStrategyAPE,
  auctionStrategy: auctionStrategyExp,
  baseLTVAsCollateral: "3000",
  liquidationThreshold: "7000",
  liquidationBonus: "10500",
  borrowingEnabled: false,
  reserveDecimals: "0",
  xTokenImpl: eContractid.NTokenImpl,
  reserveFactor: "0",
  borrowCap: "0",
  supplyCap: "0",
};

export const strategyOthr: IReserveParams = {
  // address: "0x34d85c9cdeb23fa97cb08333b511ac86e1c4e258",
  strategy: rateStrategyAPE,
  auctionStrategy: auctionStrategyExp,
  baseLTVAsCollateral: "3000",
  liquidationThreshold: "7000",
  liquidationBonus: "10500",
  borrowingEnabled: false,
  reserveDecimals: "0",
  xTokenImpl: eContractid.NTokenImpl,
  reserveFactor: "0",
  borrowCap: "0",
  supplyCap: "0",
};

export const strategyClonex: IReserveParams = {
  // address: "0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b",
  strategy: rateStrategyNFT,
  auctionStrategy: auctionStrategyExp,
  baseLTVAsCollateral: "3000",
  liquidationThreshold: "7000",
  liquidationBonus: "10500",
  borrowingEnabled: false,
  reserveDecimals: "0",
  xTokenImpl: eContractid.NTokenImpl,
  reserveFactor: "0",
  borrowCap: "0",
  supplyCap: "0",
};

export const strategyUniswapV3: IReserveParams = {
  // address: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
  strategy: rateStrategyNFT,
  auctionStrategy: auctionStrategyZero,
  baseLTVAsCollateral: "3000",
  liquidationThreshold: "7000",
  liquidationBonus: "10500",
  borrowingEnabled: false,
  reserveDecimals: "0",
  xTokenImpl: eContractid.NTokenUniswapV3Impl,
  reserveFactor: "0",
  borrowCap: "0",
  supplyCap: "0",
};
