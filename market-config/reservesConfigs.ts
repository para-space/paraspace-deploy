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
import {ZERO_ADDRESS} from "../helpers/constants";

export const strategyDAI: IReserveParams = {
  strategy: rateStrategyStableTwo,
  auctionStrategy: auctionStrategyZero,
  baseLTVAsCollateral: "7500",
  liquidationThreshold: "8000",
  liquidationBonus: "10500",
  borrowingEnabled: true,
  stableBorrowRateEnabled: false,
  reserveDecimals: "18",
  xTokenImpl: eContractid.PToken,
  reserveFactor: "1000",
  borrowCap: "0",
  supplyCap: "0",
};

export const strategyUSDC: IReserveParams = {
  strategy: rateStrategyStableThree,
  auctionStrategy: auctionStrategyZero,
  baseLTVAsCollateral: "8000",
  liquidationThreshold: "8500",
  liquidationBonus: "10500",
  borrowingEnabled: true,
  stableBorrowRateEnabled: false,
  reserveDecimals: "6",
  xTokenImpl: eContractid.PToken,
  reserveFactor: "1000",
  borrowCap: "0",
  supplyCap: "0",
};

export const strategyUSDT: IReserveParams = {
  strategy: rateStrategyStableTwo,
  auctionStrategy: auctionStrategyZero,
  baseLTVAsCollateral: "7500",
  liquidationThreshold: "8000",
  liquidationBonus: "10500",
  borrowingEnabled: true,
  stableBorrowRateEnabled: false,
  reserveDecimals: "6",
  xTokenImpl: eContractid.PToken,
  reserveFactor: "1000",
  borrowCap: "0",
  supplyCap: "0",
};

export const strategyWETH: IReserveParams = {
  strategy: rateStrategyXETH,
  auctionStrategy: auctionStrategyZero,
  baseLTVAsCollateral: "8250",
  liquidationThreshold: "8500",
  liquidationBonus: "10500",
  borrowingEnabled: true,
  stableBorrowRateEnabled: false,
  reserveDecimals: "18",
  xTokenImpl: eContractid.PToken,
  reserveFactor: "1000",
  borrowCap: "0",
  supplyCap: "0",
};

export const strategyWBTC: IReserveParams = {
  strategy: rateStrategyWBTC,
  auctionStrategy: auctionStrategyZero,
  baseLTVAsCollateral: "7000",
  liquidationThreshold: "7500",
  liquidationBonus: "10650",
  borrowingEnabled: true,
  stableBorrowRateEnabled: false,
  reserveDecimals: "8",
  xTokenImpl: eContractid.PToken,
  reserveFactor: "2000",
  borrowCap: "0",
  supplyCap: "0",
};

export const strategySTETH: IReserveParams = {
  strategy: rateStrategyXETH,
  auctionStrategy: auctionStrategyZero,
  baseLTVAsCollateral: "6900",
  liquidationThreshold: "8100",
  liquidationBonus: "10750",
  borrowingEnabled: true,
  stableBorrowRateEnabled: false,
  reserveDecimals: "18",
  xTokenImpl: eContractid.PToken,
  reserveFactor: "1000",
  borrowCap: "0",
  supplyCap: "0",
};

export const strategyAPE: IReserveParams = {
  strategy: rateStrategyAPE,
  auctionStrategy: auctionStrategyZero,
  baseLTVAsCollateral: "2000",
  liquidationThreshold: "7000",
  liquidationBonus: "10500",
  borrowingEnabled: true,
  stableBorrowRateEnabled: false,
  reserveDecimals: "18",
  xTokenImpl: eContractid.PToken,
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
  stableBorrowRateEnabled: false,
  reserveDecimals: "18",
  xTokenImpl: eContractid.PTokenAToken,
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
  stableBorrowRateEnabled: false,
  reserveDecimals: "8",
  xTokenImpl: eContractid.PToken,
  reserveFactor: "1000",
  borrowCap: "0",
  supplyCap: "0",
};

export const strategyPUNK: IReserveParams = {
  strategy: rateStrategyXETH,
  auctionStrategy: auctionStrategyZero,
  baseLTVAsCollateral: "6900",
  liquidationThreshold: "8100",
  liquidationBonus: "10750",
  borrowingEnabled: true,
  stableBorrowRateEnabled: false,
  reserveDecimals: "18",
  xTokenImpl: eContractid.PToken,
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
  stableBorrowRateEnabled: false,
  reserveDecimals: "18",
  xTokenImpl: eContractid.PToken,
  reserveFactor: "1000",
  borrowCap: "0",
  supplyCap: "0",
};

export const strategyBAYC: IReserveParams = {
  strategy: rateStrategyNFT,
  auctionStrategy: auctionStrategyExp,
  baseLTVAsCollateral: "3000",
  liquidationThreshold: "7000",
  liquidationBonus: "10500",
  borrowingEnabled: false,
  stableBorrowRateEnabled: false,
  reserveDecimals: "0",
  xTokenImpl: eContractid.NToken,
  reserveFactor: "0",
  borrowCap: "0",
  supplyCap: "0",
};

export const strategyWPUNKS: IReserveParams = {
  strategy: rateStrategyNFT,
  auctionStrategy: auctionStrategyExp,
  baseLTVAsCollateral: "3000",
  liquidationThreshold: "7000",
  liquidationBonus: "10500",
  borrowingEnabled: false,
  stableBorrowRateEnabled: false,
  reserveDecimals: "0",
  xTokenImpl: eContractid.NToken,
  reserveFactor: "0",
  borrowCap: "0",
  supplyCap: "0",
};

export const strategyMAYC: IReserveParams = {
  strategy: rateStrategyNFT,
  auctionStrategy: auctionStrategyExp,
  baseLTVAsCollateral: "3000",
  liquidationThreshold: "7000",
  liquidationBonus: "10500",
  borrowingEnabled: false,
  stableBorrowRateEnabled: false,
  reserveDecimals: "0",
  xTokenImpl: eContractid.NToken,
  reserveFactor: "0",
  borrowCap: "0",
  supplyCap: "0",
};

export const strategyDOODLES: IReserveParams = {
  strategy: rateStrategyNFT,
  auctionStrategy: auctionStrategyExp,
  baseLTVAsCollateral: "3000",
  liquidationThreshold: "7000",
  liquidationBonus: "10500",
  borrowingEnabled: false,
  stableBorrowRateEnabled: false,
  reserveDecimals: "0",
  xTokenImpl: eContractid.NToken,
  reserveFactor: "0",
  borrowCap: "0",
  supplyCap: "0",
};

export const strategyMoonbird: IReserveParams = {
  strategy: rateStrategyNFT,
  auctionStrategy: auctionStrategyExp,
  baseLTVAsCollateral: "3000",
  liquidationThreshold: "7000",
  liquidationBonus: "10500",
  borrowingEnabled: false,
  stableBorrowRateEnabled: false,
  reserveDecimals: "0",
  xTokenImpl: eContractid.NToken,
  reserveFactor: "0",
  borrowCap: "0",
  supplyCap: "0",
};

export const strategyMeebits: IReserveParams = {
  strategy: rateStrategyNFT,
  auctionStrategy: auctionStrategyExp,
  baseLTVAsCollateral: "3000",
  liquidationThreshold: "7000",
  liquidationBonus: "10500",
  borrowingEnabled: false,
  stableBorrowRateEnabled: false,
  reserveDecimals: "0",
  xTokenImpl: eContractid.NToken,
  reserveFactor: "0",
  borrowCap: "0",
  supplyCap: "0",
};

export const strategyAzuki: IReserveParams = {
  strategy: rateStrategyAPE,
  auctionStrategy: auctionStrategyExp,
  baseLTVAsCollateral: "3000",
  liquidationThreshold: "7000",
  liquidationBonus: "10500",
  borrowingEnabled: false,
  stableBorrowRateEnabled: false,
  reserveDecimals: "0",
  xTokenImpl: eContractid.NToken,
  reserveFactor: "0",
  borrowCap: "0",
  supplyCap: "0",
};

export const strategyOthr: IReserveParams = {
  strategy: rateStrategyAPE,
  auctionStrategy: auctionStrategyExp,
  baseLTVAsCollateral: "3000",
  liquidationThreshold: "7000",
  liquidationBonus: "10500",
  borrowingEnabled: false,
  stableBorrowRateEnabled: false,
  reserveDecimals: "0",
  xTokenImpl: eContractid.NToken,
  reserveFactor: "0",
  borrowCap: "0",
  supplyCap: "0",
};

export const strategyClonex: IReserveParams = {
  strategy: rateStrategyNFT,
  auctionStrategy: auctionStrategyExp,
  baseLTVAsCollateral: "3000",
  liquidationThreshold: "7000",
  liquidationBonus: "10500",
  borrowingEnabled: false,
  stableBorrowRateEnabled: false,
  reserveDecimals: "0",
  xTokenImpl: eContractid.NToken,
  reserveFactor: "0",
  borrowCap: "0",
  supplyCap: "0",
};

export const strategyUniswapV3: IReserveParams = {
  strategy: rateStrategyNFT,
  auctionStrategy: auctionStrategyZero,
  baseLTVAsCollateral: "3000",
  liquidationThreshold: "7000",
  liquidationBonus: "10000",
  borrowingEnabled: false,
  stableBorrowRateEnabled: false,
  reserveDecimals: "0",
  xTokenImpl: eContractid.NToken,
  reserveFactor: "0",
  borrowCap: "0",
  supplyCap: "0",
};
