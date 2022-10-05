import {deployMockTokenFaucet} from "../../../helpers/contracts-deployments";
import {MOCK_TOKEN_MINT_VALUE} from "../../../market-config";

export const deployFaucet = async (mockTokens, verify?: boolean) => {
  const erc20configs = [
    {
      name: "DAI",
      addr: mockTokens.DAI,
      mintValue: MOCK_TOKEN_MINT_VALUE.DAI,
    },
    {
      name: "APE",
      addr: mockTokens.APE,
      mintValue: MOCK_TOKEN_MINT_VALUE.APE,
    },
    {
      name: "USDC",
      addr: mockTokens.USDC,
      mintValue: MOCK_TOKEN_MINT_VALUE.USDC,
    },
    {
      name: "USDT",
      addr: mockTokens.USDT,
      mintValue: MOCK_TOKEN_MINT_VALUE.USDT,
    },
    {
      name: "WBTC",
      addr: mockTokens.WBTC,
      mintValue: MOCK_TOKEN_MINT_VALUE.WBTC,
    },
    {
      name: "STETH",
      addr: mockTokens.stETH,
      mintValue: MOCK_TOKEN_MINT_VALUE.stETH,
    },
    {
      name: "aWETH",
      addr: mockTokens.aWETH,
      mintValue: MOCK_TOKEN_MINT_VALUE.aWETH,
    },
    {
      name: "cWETH",
      addr: mockTokens.cWETH,
      mintValue: MOCK_TOKEN_MINT_VALUE.cWETH,
    },
    {
      name: "PUNK",
      addr: mockTokens.PUNK,
      mintValue: MOCK_TOKEN_MINT_VALUE.PUNK,
    },
  ];

  const erc721configs = [
    {
      name: "BAYC",
      addr: mockTokens.BAYC,
      mintValue: MOCK_TOKEN_MINT_VALUE.BAYC,
    },
    {
      name: "MAYC",
      addr: mockTokens.MAYC,
      mintValue: MOCK_TOKEN_MINT_VALUE.MAYC,
    },
    {
      name: "DOODLES",
      addr: mockTokens.DOODLE,
      mintValue: MOCK_TOKEN_MINT_VALUE.DOODLE,
    },
    {
      name: "MOONBIRD",
      addr: mockTokens.MOONBIRD,
      mintValue: MOCK_TOKEN_MINT_VALUE.MOONBIRD,
    },
    {
      name: "MEEBITS",
      addr: mockTokens.MEEBITS,
      mintValue: MOCK_TOKEN_MINT_VALUE.MEEBITS,
    },
    {
      name: "AZUKI",
      addr: mockTokens.AZUKI,
      mintValue: MOCK_TOKEN_MINT_VALUE.AZUKI,
    },
    {
      name: "OTHR",
      addr: mockTokens.OTHR,
      mintValue: MOCK_TOKEN_MINT_VALUE.OTHR,
    },
    {
      name: "CLONEX",
      addr: mockTokens.CLONEX,
      mintValue: MOCK_TOKEN_MINT_VALUE.CLONEX,
    },
  ];

  const punkConfig = {
    name: "CRYPTO_PUNK",
    addr: mockTokens.CRYPTO_PUNK,
    mintValue: MOCK_TOKEN_MINT_VALUE.CRYPTO_PUNK,
  };

  const faucet = await deployMockTokenFaucet(
    erc20configs,
    erc721configs,
    punkConfig,
    verify
  );

  console.log(`faucet`, faucet.address);
};
