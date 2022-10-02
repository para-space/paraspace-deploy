import {utils} from "ethers";
import {IAuctionStrategyParams} from "../helpers/types";

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
