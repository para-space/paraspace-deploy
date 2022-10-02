import {utils} from "ethers";
import {IInterestRateStrategyParams} from "../helpers/types";

// BUSD SUSD
export const rateStrategyStableOne: IInterestRateStrategyParams = {
  name: "rateStrategyStableOne",
  optimalUsageRatio: utils.parseUnits("0.8", 27).toString(),
  baseVariableBorrowRate: utils.parseUnits("0", 27).toString(),
  variableRateSlope1: utils.parseUnits("0.04", 27).toString(),
  variableRateSlope2: utils.parseUnits("1", 27).toString(),
  stableRateSlope1: "0",
  stableRateSlope2: "0",
  baseStableRateOffset: utils.parseUnits("0.02", 27).toString(),
  stableRateExcessOffset: utils.parseUnits("0.05", 27).toString(),
  optimalStableToTotalDebtRatio: utils.parseUnits("0.2", 27).toString(),
};

// DAI USDT
export const rateStrategyStableTwo: IInterestRateStrategyParams = {
  name: "rateStrategyStableTwo",
  optimalUsageRatio: utils.parseUnits("0.8", 27).toString(),
  baseVariableBorrowRate: utils.parseUnits("0", 27).toString(),
  variableRateSlope1: utils.parseUnits("0.04", 27).toString(),
  variableRateSlope2: utils.parseUnits("0.75", 27).toString(),
  stableRateSlope1: utils.parseUnits("0.02", 27).toString(),
  stableRateSlope2: utils.parseUnits("0.75", 27).toString(),
  baseStableRateOffset: utils.parseUnits("0.02", 27).toString(),
  stableRateExcessOffset: utils.parseUnits("0.05", 27).toString(),
  optimalStableToTotalDebtRatio: utils.parseUnits("0.2", 27).toString(),
};

// USDC
export const rateStrategyStableThree: IInterestRateStrategyParams = {
  name: "rateStrategyStableThree",
  optimalUsageRatio: utils.parseUnits("0.9", 27).toString(),
  baseVariableBorrowRate: utils.parseUnits("0", 27).toString(),
  variableRateSlope1: utils.parseUnits("0.04", 27).toString(),
  variableRateSlope2: utils.parseUnits("0.6", 27).toString(),
  stableRateSlope1: utils.parseUnits("0.02", 27).toString(),
  stableRateSlope2: utils.parseUnits("0.6", 27).toString(),
  baseStableRateOffset: utils.parseUnits("0.02", 27).toString(),
  stableRateExcessOffset: utils.parseUnits("0.05", 27).toString(),
  optimalStableToTotalDebtRatio: utils.parseUnits("0.2", 27).toString(),
};

// WETH stETH, Punk
export const rateStrategyXETH: IInterestRateStrategyParams = {
  name: "rateStrategyXETH",
  optimalUsageRatio: utils.parseUnits("0.65", 27).toString(),
  baseVariableBorrowRate: utils.parseUnits("0", 27).toString(),
  variableRateSlope1: utils.parseUnits("0.08", 27).toString(),
  variableRateSlope2: utils.parseUnits("1", 27).toString(),
  stableRateSlope1: utils.parseUnits("0.1", 27).toString(),
  stableRateSlope2: utils.parseUnits("1", 27).toString(),
  baseStableRateOffset: utils.parseUnits("0.02", 27).toString(),
  stableRateExcessOffset: utils.parseUnits("0.05", 27).toString(),
  optimalStableToTotalDebtRatio: utils.parseUnits("0.2", 27).toString(),
};

// ParaSpace
export const rateStrategyParaSpace: IInterestRateStrategyParams = {
  name: "rateStrategyParaSpace",
  optimalUsageRatio: utils.parseUnits("0.45", 27).toString(),
  baseVariableBorrowRate: "0",
  variableRateSlope1: "0",
  variableRateSlope2: "0",
  stableRateSlope1: "0",
  stableRateSlope2: "0",
  baseStableRateOffset: utils.parseUnits("0.02", 27).toString(),
  stableRateExcessOffset: utils.parseUnits("0.05", 27).toString(),
  optimalStableToTotalDebtRatio: utils.parseUnits("0.2", 27).toString(),
};

// BAT ENJ LINK MANA MKR REN YFI ZRX
export const rateStrategyVolatileOne: IInterestRateStrategyParams = {
  name: "rateStrategyVolatileOne",
  optimalUsageRatio: utils.parseUnits("0.45", 27).toString(),
  baseVariableBorrowRate: utils.parseUnits("0", 27).toString(),
  variableRateSlope1: utils.parseUnits("0.07", 27).toString(),
  variableRateSlope2: utils.parseUnits("3", 27).toString(),
  stableRateSlope1: utils.parseUnits("0.1", 27).toString(),
  stableRateSlope2: utils.parseUnits("0.3", 27).toString(),
  baseStableRateOffset: utils.parseUnits("0.02", 27).toString(),
  stableRateExcessOffset: utils.parseUnits("0.05", 27).toString(),
  optimalStableToTotalDebtRatio: utils.parseUnits("0.2", 27).toString(),
};

// WBTC
export const rateStrategyWBTC: IInterestRateStrategyParams = {
  name: "rateStrategyWBTC",
  optimalUsageRatio: utils.parseUnits("0.65", 27).toString(),
  baseVariableBorrowRate: utils.parseUnits("0", 27).toString(),
  variableRateSlope1: utils.parseUnits("0.07", 27).toString(),
  variableRateSlope2: utils.parseUnits("1", 27).toString(),
  stableRateSlope1: utils.parseUnits("0.1", 27).toString(),
  stableRateSlope2: utils.parseUnits("0.3", 27).toString(),
  baseStableRateOffset: utils.parseUnits("0.02", 27).toString(),
  stableRateExcessOffset: utils.parseUnits("0.05", 27).toString(),
  optimalStableToTotalDebtRatio: utils.parseUnits("0.2", 27).toString(),
};

// APE
export const rateStrategyAPE: IInterestRateStrategyParams = {
  name: "rateStrategyAPE",
  optimalUsageRatio: utils.parseUnits("0.45", 27).toString(),
  baseVariableBorrowRate: utils.parseUnits("0", 27).toString(),
  variableRateSlope1: utils.parseUnits("0.07", 27).toString(),
  variableRateSlope2: utils.parseUnits("3", 27).toString(),
  stableRateSlope1: utils.parseUnits("0.1", 27).toString(),
  stableRateSlope2: utils.parseUnits("0.3", 27).toString(),
  baseStableRateOffset: utils.parseUnits("0.02", 27).toString(),
  stableRateExcessOffset: utils.parseUnits("0.05", 27).toString(),
  optimalStableToTotalDebtRatio: utils.parseUnits("0.2", 27).toString(),
};

// NFT
export const rateStrategyNFT: IInterestRateStrategyParams = {
  name: "rateStrategyNFT",
  optimalUsageRatio: utils.parseUnits("0.45", 27).toString(),
  baseVariableBorrowRate: utils.parseUnits("0", 27).toString(),
  variableRateSlope1: utils.parseUnits("0.07", 27).toString(),
  variableRateSlope2: utils.parseUnits("3", 27).toString(),
  stableRateSlope1: utils.parseUnits("0.1", 27).toString(),
  stableRateSlope2: utils.parseUnits("0.3", 27).toString(),
  baseStableRateOffset: utils.parseUnits("0.02", 27).toString(),
  stableRateExcessOffset: utils.parseUnits("0.05", 27).toString(),
  optimalStableToTotalDebtRatio: utils.parseUnits("0.2", 27).toString(),
};
