import {deployMockTokenFaucet} from "../../../helpers/contracts-deployments";
import ParaSpaceConfig from "../../../market-config";

export const deployFaucet = async (mockTokens, verify?: boolean) => {
  const erc20configs = [
    {
      name: "DAI",
      addr: mockTokens.DAI,
      mintValue: ParaSpaceConfig.Mocks.TokenFaucetMintValue.DAI,
    },
    {
      name: "APE",
      addr: mockTokens.APE,
      mintValue: ParaSpaceConfig.Mocks.TokenFaucetMintValue.APE,
    },
    {
      name: "USDC",
      addr: mockTokens.USDC,
      mintValue: ParaSpaceConfig.Mocks.TokenFaucetMintValue.USDC,
    },
    {
      name: "USDT",
      addr: mockTokens.USDT,
      mintValue: ParaSpaceConfig.Mocks.TokenFaucetMintValue.USDT,
    },
    {
      name: "WBTC",
      addr: mockTokens.WBTC,
      mintValue: ParaSpaceConfig.Mocks.TokenFaucetMintValue.WBTC,
    },
    {
      name: "STETH",
      addr: mockTokens.stETH,
      mintValue: ParaSpaceConfig.Mocks.TokenFaucetMintValue.stETH,
    },
    {
      name: "aWETH",
      addr: mockTokens.aWETH,
      mintValue: ParaSpaceConfig.Mocks.TokenFaucetMintValue.aWETH,
    },
    {
      name: "cWETH",
      addr: mockTokens.cWETH,
      mintValue: ParaSpaceConfig.Mocks.TokenFaucetMintValue.cWETH,
    },
    {
      name: "PUNK",
      addr: mockTokens.PUNK,
      mintValue: ParaSpaceConfig.Mocks.TokenFaucetMintValue.PUNK,
    },
  ];

  const erc721configs = [
    {
      name: "BAYC",
      addr: mockTokens.BAYC,
      mintValue: ParaSpaceConfig.Mocks.TokenFaucetMintValue.BAYC,
    },
    {
      name: "MAYC",
      addr: mockTokens.MAYC,
      mintValue: ParaSpaceConfig.Mocks.TokenFaucetMintValue.MAYC,
    },
    {
      name: "DOODLES",
      addr: mockTokens.DOODLE,
      mintValue: ParaSpaceConfig.Mocks.TokenFaucetMintValue.DOODLE,
    },
    {
      name: "MOONBIRD",
      addr: mockTokens.MOONBIRD,
      mintValue: ParaSpaceConfig.Mocks.TokenFaucetMintValue.MOONBIRD,
    },
    {
      name: "MEEBITS",
      addr: mockTokens.MEEBITS,
      mintValue: ParaSpaceConfig.Mocks.TokenFaucetMintValue.MEEBITS,
    },
    {
      name: "AZUKI",
      addr: mockTokens.AZUKI,
      mintValue: ParaSpaceConfig.Mocks.TokenFaucetMintValue.AZUKI,
    },
    {
      name: "OTHR",
      addr: mockTokens.OTHR,
      mintValue: ParaSpaceConfig.Mocks.TokenFaucetMintValue.OTHR,
    },
    {
      name: "CLONEX",
      addr: mockTokens.CLONEX,
      mintValue: ParaSpaceConfig.Mocks.TokenFaucetMintValue.CLONEX,
    },
  ];

  const punkConfig = {
    name: "CRYPTO_PUNK",
    addr: mockTokens.CRYPTO_PUNK,
    mintValue: ParaSpaceConfig.Mocks.TokenFaucetMintValue.CRYPTO_PUNK,
  };

  const faucet = await deployMockTokenFaucet(
    erc20configs,
    erc721configs,
    punkConfig,
    verify
  );

  console.log(`faucet`, faucet.address);
};
