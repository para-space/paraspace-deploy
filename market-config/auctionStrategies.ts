import {utils} from "ethers";
import {IAuctionStrategyParams} from "../helpers/types";

////////////////////////////////////////////////////////////
// V1
////////////////////////////////////////////////////////////
export const auctionStrategyBAYC: IAuctionStrategyParams = {
  name: "auctionStrategyBAYC",
  maxPriceMultiplier: utils.parseUnits("2.5", 18).toString(),
  minExpPriceMultiplier: utils.parseUnits("1.2", 18).toString(),
  minPriceMultiplier: utils.parseUnits("0.8", 18).toString(),
  stepLinear: utils.parseUnits("0.08", 18).toString(),
  stepExp: utils.parseUnits("0.02", 18).toString(),
  tickLength: "900",
};

export const auctionStrategyWPunks: IAuctionStrategyParams = {
  name: "auctionStrategyWPunks",
  maxPriceMultiplier: utils.parseUnits("5", 18).toString(),
  minExpPriceMultiplier: utils.parseUnits("1.2", 18).toString(),
  minPriceMultiplier: utils.parseUnits("0.8", 18).toString(),
  stepLinear: utils.parseUnits("0.011", 18).toString(),
  stepExp: utils.parseUnits("0.041", 18).toString(),
  tickLength: "900",
};

export const auctionStrategyMAYC: IAuctionStrategyParams = {
  name: "auctionStrategyMAYC",
  maxPriceMultiplier: utils.parseUnits("2", 18).toString(),
  minExpPriceMultiplier: utils.parseUnits("1.2", 18).toString(),
  minPriceMultiplier: utils.parseUnits("0.8", 18).toString(),
  stepLinear: utils.parseUnits("0.012", 18).toString(),
  stepExp: utils.parseUnits("0.015", 18).toString(),
  tickLength: "900",
};

export const auctionStrategyDoodles: IAuctionStrategyParams = {
  name: "auctionStrategyDoodles",
  maxPriceMultiplier: utils.parseUnits("3.5", 18).toString(),
  minExpPriceMultiplier: utils.parseUnits("1.2", 18).toString(),
  minPriceMultiplier: utils.parseUnits("0.7", 18).toString(),
  stepLinear: utils.parseUnits("0.014", 18).toString(),
  stepExp: utils.parseUnits("0.03", 18).toString(),
  tickLength: "900",
};

export const auctionStrategyOthr: IAuctionStrategyParams = {
  name: "auctionStrategyOthr",
  maxPriceMultiplier: utils.parseUnits("11", 18).toString(),
  minExpPriceMultiplier: utils.parseUnits("1.2", 18).toString(),
  minPriceMultiplier: utils.parseUnits("0.8", 18).toString(),
  stepLinear: utils.parseUnits("0.025", 18).toString(),
  stepExp: utils.parseUnits("0.11", 18).toString(),
  tickLength: "900",
};

export const auctionStrategyCloneX: IAuctionStrategyParams = {
  name: "auctionStrategyCloneX",
  maxPriceMultiplier: utils.parseUnits("3", 18).toString(),
  minExpPriceMultiplier: utils.parseUnits("1.5", 18).toString(),
  minPriceMultiplier: utils.parseUnits("0.8", 18).toString(),
  stepLinear: utils.parseUnits("0.025", 18).toString(),
  stepExp: utils.parseUnits("0.025", 18).toString(),
  tickLength: "900",
};

export const auctionStrategyMoonbird: IAuctionStrategyParams = {
  name: "auctionStrategyMoonbird",
  maxPriceMultiplier: utils.parseUnits("2", 18).toString(),
  minExpPriceMultiplier: utils.parseUnits("1.1", 18).toString(),
  minPriceMultiplier: utils.parseUnits("0.8", 18).toString(),
  stepLinear: utils.parseUnits("0.011", 18).toString(),
  stepExp: utils.parseUnits("0.023", 18).toString(),
  tickLength: "900",
};

export const auctionStrategyMeebits: IAuctionStrategyParams = {
  name: "auctionStrategyMeebits",
  maxPriceMultiplier: utils.parseUnits("3.5", 18).toString(),
  minExpPriceMultiplier: utils.parseUnits("1.2", 18).toString(),
  minPriceMultiplier: utils.parseUnits("0.7", 18).toString(),
  stepLinear: utils.parseUnits("0.014", 18).toString(),
  stepExp: utils.parseUnits("0.03", 18).toString(),
  tickLength: "900",
};

export const auctionStrategyAzuki: IAuctionStrategyParams = {
  name: "auctionStrategyAzuki",
  maxPriceMultiplier: utils.parseUnits("3", 18).toString(),
  minExpPriceMultiplier: utils.parseUnits("1.2", 18).toString(),
  minPriceMultiplier: utils.parseUnits("0.7", 18).toString(),
  stepLinear: utils.parseUnits("0.020", 18).toString(),
  stepExp: utils.parseUnits("0.036", 18).toString(),
  tickLength: "900",
};

export const auctionStrategyUniswapV3: IAuctionStrategyParams = {
  name: "auctionStrategyUniswapV3",
  maxPriceMultiplier: utils.parseUnits("3", 18).toString(),
  minExpPriceMultiplier: utils.parseUnits("1.2", 18).toString(),
  minPriceMultiplier: utils.parseUnits("0.9", 18).toString(),
  stepLinear: utils.parseUnits("0.01", 18).toString(),
  stepExp: utils.parseUnits("0.01", 18).toString(),
  tickLength: "900",
};

////////////////////////////////////////////////////////////
// MOCK
////////////////////////////////////////////////////////////
export const auctionStrategyExp: IAuctionStrategyParams = {
  name: "auctionStrategyExp",
  maxPriceMultiplier: utils.parseUnits("3", 18).toString(),
  minExpPriceMultiplier: utils.parseUnits("1.2", 18).toString(),
  minPriceMultiplier: utils.parseUnits("0.5", 18).toString(),
  stepLinear: utils.parseUnits("0.057", 18).toString(),
  stepExp: utils.parseUnits("0.08", 18).toString(),
  tickLength: "900",
};

export const auctionStrategyLinear: IAuctionStrategyParams = {
  name: "auctionStrategyLinear",
  maxPriceMultiplier: utils.parseUnits("3", 18).toString(),
  minExpPriceMultiplier: utils.parseUnits("1", 18).toString(), // NOT USED
  minPriceMultiplier: utils.parseUnits("0.5", 18).toString(),
  stepLinear: utils.parseUnits("0.05", 18).toString(),
  stepExp: utils.parseUnits("0.1", 18).toString(), // NOT USED
  tickLength: "60", // mainly used for tests so shouldn't be too much to avoid influencing accruing interests
};

export const auctionStrategyZero: IAuctionStrategyParams = {
  name: "auctionStrategyZero",
  maxPriceMultiplier: utils.parseUnits("3", 18).toString(),
  minExpPriceMultiplier: utils.parseUnits("1", 18).toString(), // NOT USED
  minPriceMultiplier: utils.parseUnits("0.5", 18).toString(),
  stepLinear: utils.parseUnits("0.05", 18).toString(),
  stepExp: utils.parseUnits("0.1", 18).toString(), // NOT USED
  tickLength: "60", // mainly used for tests so shouldn't be too much to avoid influencing accruing interests
};
