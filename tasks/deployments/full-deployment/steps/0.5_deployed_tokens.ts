import {getERC20, getERC721} from "../../../../helpers/contracts-getters";
import {
  APE,
  BAYC,
  DAI,
  DOODLES,
  MAYC,
  stETH,
  USDC,
  USDT,
  WBTC,
  WETH,
  WPUNKS,
} from "../helpers/constants";

export const getMainnetDeployedContracts = async () => {
  const deployedTokens = {};

  deployedTokens["DAI"] = await getERC20(DAI);
  deployedTokens["USDC"] = await getERC20(USDC);
  deployedTokens["USDT"] = await getERC20(USDT);
  deployedTokens["WBTC"] = await getERC20(WBTC);
  deployedTokens["WETH"] = await getERC20(WETH);
  deployedTokens["stETH"] = await getERC20(stETH);
  deployedTokens["APE"] = await getERC20(APE);

  deployedTokens["BAYC"] = await getERC721(BAYC);
  deployedTokens["MAYC"] = await getERC721(MAYC);
  deployedTokens["DOODLE"] = await getERC721(DOODLES);
  deployedTokens["WPUNKS"] = await getERC721(WPUNKS);

  return deployedTokens;
};
