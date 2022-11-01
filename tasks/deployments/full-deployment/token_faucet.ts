import {deployMockTokenFaucet} from "../../../helpers/contracts-deployments";
import {getParaSpaceConfig} from "../../../helpers/misc-utils";

export const deployFaucet = async (mockTokens, verify?: boolean) => {
  const erc20configs = [
    {
      name: "DAI",
      addr: mockTokens.DAI,
      mintValue: getParaSpaceConfig().Mocks.TokenFaucetMintValue.DAI,
    },
    {
      name: "APE",
      addr: mockTokens.APE,
      mintValue: getParaSpaceConfig().Mocks.TokenFaucetMintValue.APE,
    },
    {
      name: "USDC",
      addr: mockTokens.USDC,
      mintValue: getParaSpaceConfig().Mocks.TokenFaucetMintValue.USDC,
    },
    {
      name: "USDT",
      addr: mockTokens.USDT,
      mintValue: getParaSpaceConfig().Mocks.TokenFaucetMintValue.USDT,
    },
    {
      name: "WBTC",
      addr: mockTokens.WBTC,
      mintValue: getParaSpaceConfig().Mocks.TokenFaucetMintValue.WBTC,
    },
    {
      name: "STETH",
      addr: mockTokens.stETH,
      mintValue: getParaSpaceConfig().Mocks.TokenFaucetMintValue.stETH,
    },
    {
      name: "aWETH",
      addr: mockTokens.aWETH,
      mintValue: getParaSpaceConfig().Mocks.TokenFaucetMintValue.aWETH,
    },
    {
      name: "cWETH",
      addr: mockTokens.cWETH,
      mintValue: getParaSpaceConfig().Mocks.TokenFaucetMintValue.cWETH,
    },
    {
      name: "PUNK",
      addr: mockTokens.PUNK,
      mintValue: getParaSpaceConfig().Mocks.TokenFaucetMintValue.PUNK,
    },
  ];

  const erc721configs = [
    {
      name: "BAYC",
      addr: mockTokens.BAYC,
      mintValue: getParaSpaceConfig().Mocks.TokenFaucetMintValue.BAYC,
    },
    {
      name: "MAYC",
      addr: mockTokens.MAYC,
      mintValue: getParaSpaceConfig().Mocks.TokenFaucetMintValue.MAYC,
    },
    {
      name: "DOODLES",
      addr: mockTokens.DOODLE,
      mintValue: getParaSpaceConfig().Mocks.TokenFaucetMintValue.DOODLE,
    },
    {
      name: "MOONBIRD",
      addr: mockTokens.MOONBIRD,
      mintValue: getParaSpaceConfig().Mocks.TokenFaucetMintValue.MOONBIRD,
    },
    {
      name: "MEEBITS",
      addr: mockTokens.MEEBITS,
      mintValue: getParaSpaceConfig().Mocks.TokenFaucetMintValue.MEEBITS,
    },
    {
      name: "AZUKI",
      addr: mockTokens.AZUKI,
      mintValue: getParaSpaceConfig().Mocks.TokenFaucetMintValue.AZUKI,
    },
    {
      name: "OTHR",
      addr: mockTokens.OTHR,
      mintValue: getParaSpaceConfig().Mocks.TokenFaucetMintValue.OTHR,
    },
    {
      name: "CLONEX",
      addr: mockTokens.CLONEX,
      mintValue: getParaSpaceConfig().Mocks.TokenFaucetMintValue.CLONEX,
    },
  ];

  const punkConfig = {
    name: "CRYPTO_PUNK",
    addr: mockTokens.CRYPTO_PUNK,
    mintValue: getParaSpaceConfig().Mocks.TokenFaucetMintValue.CRYPTO_PUNK,
  };

  const faucet = await deployMockTokenFaucet(
    erc20configs,
    erc721configs,
    punkConfig,
    verify
  );

  console.log(`faucet`, faucet.address);
};
