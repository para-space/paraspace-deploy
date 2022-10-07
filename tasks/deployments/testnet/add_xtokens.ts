import rawBRE from "hardhat";
import {Contract} from "ethers";
import {
  deployMockAggregator,
  deployMintableERC20,
  deployMintableERC721,
} from "../../../helpers/contracts-deployments";
import {
  eContractid,
  IReserveParams,
  tEthereumAddress,
} from "../../../helpers/types";
import {
  initReservesByHelper,
  configureReservesByHelper,
} from "../../../helpers/init-helpers";
import ParaSpaceConfig from "../../../market-config";
import {
  getFirstSigner,
  getPairsTokenAggregator,
  getParaSpaceOracle,
  getProtocolDataProvider,
} from "../../../helpers/contracts-getters";
import {rateStrategyParaSpace} from "../../../market-config/rateStrategies";
import {parseEther} from "ethers/lib/utils";
import {strategyParaSpace} from "../../../market-config/reservesConfigs";

import dotenv from "dotenv";
import {auctionStrategyExp} from "../../../market-config/auctionStrategies";

dotenv.config();

const verify = process.env.ETHERSCAN_VERIFICATION === "true" ? true : false;

const runScript = async () => {
  const tokensToDeploy = {
    APE: "ERC20",
    MAYC: "ERC721",
    DOODLES: "ERC721",
  };

  const tokensPrices = {
    APE: parseEther("0.02").toString(),
    MAYC: parseEther("22").toString(),
    DOODLES: parseEther("21").toString(),
  };

  const tokens: {[tokenSymbol: string]: Contract} = {};
  const aggregators: {[tokenSymbol: string]: Contract} = {};

  for (const [tokenSymbol, type] of Object.entries(tokensToDeploy)) {
    if (type == "ERC20") {
      tokens[tokenSymbol] = await deployMintableERC20([
        tokenSymbol,
        tokenSymbol,
        "18",
      ]);
    } else if (type == "ERC721") {
      tokens[tokenSymbol] = await deployMintableERC721([
        tokenSymbol,
        tokenSymbol,
        "",
      ]);
    }
    aggregators[tokenSymbol] = await deployMockAggregator(
      tokenSymbol,
      tokensPrices[tokenSymbol]
    );
  }

  const allTokenAddresses = Object.entries(tokens).reduce(
    (
      accum: {[tokenSymbol: string]: tEthereumAddress},
      [tokenSymbol, tokenContract]
    ) => ({
      ...accum,
      [tokenSymbol]: tokenContract.address,
    }),
    {}
  );

  const allAggregatorsAddresses = Object.entries(aggregators).reduce(
    (
      accum: {[tokenSymbol: string]: tEthereumAddress},
      [tokenSymbol, aggregator]
    ) => ({
      ...accum,
      [tokenSymbol]: aggregator.address,
    }),
    {}
  );

  const [allTokens, allAggregators] = getPairsTokenAggregator(
    allTokenAddresses,
    allAggregatorsAddresses
  );

  const paraspaceOracle = await getParaSpaceOracle();

  await paraspaceOracle.setAssetSources(allTokens, allAggregators);

  const strategyNFT: IReserveParams = {
    strategy: rateStrategyParaSpace,
    auctionStrategy: auctionStrategyExp,
    baseLTVAsCollateral: "5000",
    liquidationThreshold: "6500",
    liquidationBonus: "11000",
    borrowingEnabled: false,
    stableBorrowRateEnabled: false,
    reserveDecimals: "0",
    xTokenImpl: eContractid.NToken,
    reserveFactor: "0",
    borrowCap: "0",
    supplyCap: "0",
  };

  const reservesParams = {
    APE: strategyParaSpace,
    MAYC: strategyNFT,
    DOODLES: strategyNFT,
  };

  const config = ParaSpaceConfig;

  const {
    PTokenNamePrefix,
    StableDebtTokenNamePrefix,
    VariableDebtTokenNamePrefix,
    SymbolPrefix,
  } = config;
  const treasuryAddress = config.ReserveFactorTreasuryAddress;

  const admin = await (await getFirstSigner()).getAddress();

  await initReservesByHelper(
    reservesParams,
    allTokenAddresses,
    PTokenNamePrefix,
    StableDebtTokenNamePrefix,
    VariableDebtTokenNamePrefix,
    SymbolPrefix,
    admin,
    treasuryAddress,
    "0x6626ff0C451Dec65Bf4CFD95919aD5a66f59620C", // Reward Controller
    verify
  );

  const testHelpers = await getProtocolDataProvider();

  await configureReservesByHelper(
    reservesParams,
    allTokenAddresses,
    testHelpers,
    admin
  );
};

async function main() {
  await rawBRE.run("set-DRE");
  await runScript();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
