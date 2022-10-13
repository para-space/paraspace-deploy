import rawBRE from "hardhat";
import {
  getParaSpaceAdmins,
  registerContractInJsonDb,
} from "../../../../helpers/contracts-helpers";
import {
  deployAzuki,
  deployCloneX,
  deployERC721OracleWrapper,
  deployMeebits,
  deployMintableERC721,
  deployMockAggregator,
  deployMoonbirds,
  deployOTHR,
} from "../../../../helpers/contracts-deployments";
import {
  eContractid,
  IReserveParams,
  tEthereumAddress,
} from "../../../../helpers/types";

import {printContracts, DRE} from "../../../../helpers/misc-utils";
import {
  initReservesByHelper,
  configureReservesByHelper,
} from "../../../../helpers/init-helpers";
import ParaSpaceConfig from "../../../../market-config";
import {
  getParaSpaceOracle,
  getPairsTokenAggregator,
  getProtocolDataProvider,
} from "../../../../helpers/contracts-getters";
import {rateStrategyAPE} from "../../../../market-config/rateStrategies";
import {parseEther} from "ethers/lib/utils";
import {
  Azuki,
  CloneX,
  Land,
  Meebits,
  MintableERC721,
  MockAggregator,
  Moonbirds,
} from "../../../../../types";
import {
  FORK_MAINNET_CHAINID,
  MAINNET_CHAINID,
  RINKEBY_CHAINID,
} from "../../../../helpers/hardhat-constants";
import {auctionStrategyExp} from "../../../../market-config/auctionStrategies";

const runScript = async () => {
  const ParaSpace_ORACLE = "0x08Eaf1C8c270a485DD9c8aebb2EDE3FcAe72e04f";
  const config = ParaSpaceConfig;
  const treasuryAddress = config.ReserveFactorTreasuryAddress;
  const {paraSpaceAdmin, gatewayAdmin} = await getParaSpaceAdmins();

  const tokensToDeploy = {
    MOONBIRD: "ERC721",
    Meebits: "ERC721",
    AZUKI: "ERC721",
    OTHR: "ERC721",
    CloneX: "ERC721",
  };

  const tokenSymbolToAddress: {
    [symbol: string]: tEthereumAddress;
  } = {
    MOONBIRD: "0x23581767a106ae21c074b2276D25e5C3e136a68b",
    Meebits: "0x7Bd29408f11D2bFC23c34f18275bBf23bB716Bc7",
    AZUKI: "0xED5AF388653567Af2F388E6224dC7C4b3241C544",
    OTHR: "0x34d85c9CDeB23FA97cb08333b511ac86E1C4E258",
    CloneX: "0x49cF6f5d44E70224e2E23fDcdd2C053F30aDA28B",
  };

  const network = DRE.network.config.chainId;

  let allTokenAddresses = [
    "0x23581767a106ae21c074b2276D25e5C3e136a68b",
    "0x7Bd29408f11D2bFC23c34f18275bBf23bB716Bc7",
    "0xED5AF388653567Af2F388E6224dC7C4b3241C544",
    "0x34d85c9CDeB23FA97cb08333b511ac86E1C4E258",
    "0x49cF6f5d44E70224e2E23fDcdd2C053F30aDA28B",
  ];

  const aggregators: {
    [symbol: string]: MockAggregator;
  } = {};

  const tokensPrices = {
    MOONBIRD: parseEther("0.02").toString(),
    Meebits: parseEther("22").toString(),
    AZUKI: parseEther("21").toString(),
    OTHR: parseEther("25").toString(),
    CloneX: parseEther("27").toString(),
  };

  // // mainnet contract addresses
  // const NFT_ORACLE = "0x46573cb878208d82232e25c90671C9134030c167";
  // const REWARD_PROXY = "0xdC3399E7118618F1E598dE5732C9a6A385039B07";
  // const GENERIC_STABLE_DEBT_TOKEN =
  //   "0x04C132B0E77B66fa669f45A6a74791eB104ce152";
  // const GENERIC_VARIABLE_DEBT_TOKEN =
  //   "0x2D51F3040AdA50D9Dbf0EfA737fC0Ff0c104D4e8";
  // const GENERIC_PTOKEN_IMPL = "0xa26b3b5BfA36D38E71fbe3446e1dBDAa9e13d7BB";
  // const GENERIC_NTOKEN_IMPL = "0x4e21F48add00E579B774CDaD1656c6625c280381";
  // const DELEGATION_AWARE_PTOKEN = "";
  // const RESERVE_INTEREST_RATE_STRATEGY =
  //   "0x3B2fAB8703bB7491CA2AB7aDCf8900B14923933b";
  // const POOL_ADDRESSES_PROVIDER = "0xD3CEB5a25a068d99609052b3B35cb204b5eC77c6";
  // const POOL = "0xEBe72CDafEbc1abF26517dd64b28762DF77912a9";
  // const POOL_CONFIGURATOR = "0x462F19e1BCf6de5c3D36486C21740996d8D2E747";
  // const ACL_MANAGER = "0x12750c5973D52126117d9Cf5A737BF4fbEce0172";
  // const RESERVE_HELPER = "0x4444b0e2000788435Fd88ea61D1ff09d159627CC";
  // const PROTOCOL_DATA_PROVIDER = "0x8AAc97e25c79195aC77817287Cf512b0Acc9da44";

  // // rinkeby
  // const NFT_ORACLE = "0x46573cb878208d82232e25c90671C9134030c167"; // keep so it's not undefined
  // const REWARD_PROXY = "0x6626ff0C451Dec65Bf4CFD95919aD5a66f59620C"; // MockIncentivesController hardcoded value rinkeby
  // const GENERIC_STABLE_DEBT_TOKEN =
  //   "0x505bf0fB2c46767417CbA5AbBEcEb4B81a7951B8";
  // const GENERIC_VARIABLE_DEBT_TOKEN =
  //   "0x77dFF335A6D7e665bfd23533369caC8D71AdB9A3";
  // const GENERIC_PTOKEN_IMPL = "0xe4907332b82e64d6cb5b50Dc4ec1dd87B0999a20";
  // const GENERIC_NTOKEN_IMPL = "0x2Ea3eCBb8Ee5A4068Ad36Ea581018253EBE6e9A0";
  // const DELEGATION_AWARE_PTOKEN = "";
  // const RESERVE_INTEREST_RATE_STRATEGY =
  //   "0xdFFB42E9A51dD69294bB8E4d69c883F299F01871";
  // const POOL_ADDRESSES_PROVIDER = "0xb4a325fC50A0123c1Cf4136b91dCd920E61ed5A3";
  // const POOL = "0x27326ACF5a808AbF4a077bcc564e7B7E9CE73C1C";
  // const POOL_CONFIGURATOR = "0x8f21043a4896dd1315512392a541fd032b1c5004";
  // const ACL_MANAGER = "0x3d033d03D881eb200a73a076D9a62610D7BFE394";
  // const RESERVE_HELPER = "0x194a3cD9F5f18bDEcD967b8754Bd74aB508e919D";
  // const PROTOCOL_DATA_PROVIDER = "0x7863372E27987aE95a76de6D6F3AbA0314272dD5";

  // localhost contract addresses
  const NFT_ORACLE = "0x46573cb878208d82232e25c90671C9134030c167"; // keep so it's not undefined
  const REWARD_PROXY = "0x6626ff0C451Dec65Bf4CFD95919aD5a66f59620C"; // MockIncentivesController hardcoded value rinkeby
  const GENERIC_STABLE_DEBT_TOKEN =
    "0xC6bA6049F86d528698B5924B8fC2FE7289D38578";
  const GENERIC_VARIABLE_DEBT_TOKEN =
    "0xde9595927B00361Ed7987a181Fb09EC6f31b451c";
  const GENERIC_PTOKEN_IMPL = "0x3bDA11B584dDff7F66E0cFe1da1562c92B45db60";
  const GENERIC_NTOKEN_IMPL = "0x392E5355a0e88Bd394F717227c752670fb3a8020";
  const DELEGATION_AWARE_PTOKEN = "";
  const RESERVE_INTEREST_RATE_STRATEGY =
    "0xD4B5A49d5bA242572ec3f4A8E52B97a10AF2543a";
  const POOL_ADDRESSES_PROVIDER = "0xbCf57D16d9d63aDDea3c2056A1de2A33ebD353F0";
  const POOL = "0x3B89C57422419604C805a58Aadc705e07d40358C";
  const POOL_CONFIGURATOR = "0xbff5b6067240e8f8Aa212e37584c01346d29A860";
  const ACL_MANAGER = "0x70325F3D34D83391a3b6ffE77a9fB62c033e8e55";
  const RESERVE_HELPER = "0xf45C720549136d5E2d6a5A2F12573A36E36C3411";
  const PROTOCOL_DATA_PROVIDER = "0xDf73fC454FA018051D4a1509e63D11530A59DE10";

  console.log("before network check --------------- ");
  console.log("network is --------------- ", DRE.network.config.chainId);
  if (network != MAINNET_CHAINID && network !== FORK_MAINNET_CHAINID) {
    allTokenAddresses = [];
    const tokens: {
      [symbol: string]:
        | MintableERC721
        | Azuki
        | CloneX
        | Land
        | Meebits
        | Moonbirds;
    } = {};

    let counter = 0;

    for (const [tokenSymbol] of Object.entries(tokensToDeploy)) {
      allTokenAddresses.push(
        (await deployMintableERC721([tokenSymbol, tokenSymbol, ""])).address
      );

      // rinkeby deploy actual tokens
      if (network === RINKEBY_CHAINID || DRE.network.name === "localhost") {
        console.log("rinkeby or local host ------------------- ");
        // moonbirds
        if (counter === 0) {
          console.log("before deployMoonbirds");
          tokens[tokenSymbol] = await deployMoonbirds([
            "MOON",
            "MOON",
            "0x0000000000000000000000000000000000000000",
            "0x69C33aB569816F1D564a420490AbB894a44071Fb",
            "0x69C33aB569816F1D564a420490AbB894a44071Fb",
          ]);
          console.log("MOONBIRDS deployed");
        }
        // meebits
        if (counter === 1) {
          tokens[tokenSymbol] = await deployMeebits([
            "0x201cE7467937DdF0315976B54e01e672fe95F707", // our punks address
            "0x0000000000000000000000000000000000000000",
            "0x69C33aB569816F1D564a420490AbB894a44071Fb", // shared wallet account 1
          ]);
          console.log("Meebits deployed");
        }
        // azuki
        if (counter === 2) {
          tokens[tokenSymbol] = await deployAzuki([10, 10000, 100, 100]);
          console.log("azuki deployed");
        }
        // OTHR Land
        if (counter === 3) {
          console.log("hitting OTHR");
          tokens[tokenSymbol] = await deployOTHR([
            "OTHR",
            "OTHR",
            [
              "0x0000000000000000000000000000000000000000",
              "0x0000000000000000000000000000000000000000",
              "0x0000000000000000000000000000000000000000",
            ],
            [10, 100, 1000, 10000],
            [["0x69C33aB569816F1D564a420490AbB894a44071Fb", 100]],
            "0x69C33aB569816F1D564a420490AbB894a44071Fb",
            "0x69C33aB569816F1D564a420490AbB894a44071Fb",
            "0x63616e6469646174653100000000000000000000000000000000000000000000",
            5,
            "0x69C33aB569816F1D564a420490AbB894a44071Fb",
          ]);
          console.log("OTHR land deployed");
        }
        // CloneX
        if (counter === 4) {
          tokens[tokenSymbol] = await deployCloneX([]);
          console.log("CloneX land deployed");
        }
        counter++;
      }
      // deploy mock
      else {
        tokens[tokenSymbol] = await deployMintableERC721([
          tokenSymbol,
          tokenSymbol,
          "",
        ]);

        await registerContractInJsonDb(
          tokenSymbol.toUpperCase(),
          tokens[tokenSymbol]
        );
      }
      allTokenAddresses.push(tokens[tokenSymbol].address);

      aggregators[tokenSymbol] = await deployMockAggregator(
        tokenSymbol,
        tokensPrices[tokenSymbol]
      );
    }

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

    for (let i = 0; i < allTokenAddresses.length; i++) {
      tokenSymbolToAddress[Object.keys(tokensToDeploy)[i]] =
        allTokenAddresses[i];
    }

    const [allTokens, allAggregators] = getPairsTokenAggregator(
      tokenSymbolToAddress,
      allAggregatorsAddresses
    );

    const paraspaceOracle = await getParaSpaceOracle(ParaSpace_ORACLE);
    await paraspaceOracle.setAssetSources(allTokens, allAggregators);
  }

  const oracleWrapperAddresses: string[] = [];

  if (network == MAINNET_CHAINID || network == FORK_MAINNET_CHAINID) {
    for (const [tokenSymbol] of Object.entries(tokensToDeploy)) {
      const wrapper = await deployERC721OracleWrapper(
        POOL_ADDRESSES_PROVIDER,
        NFT_ORACLE,
        tokenSymbolToAddress[tokenSymbol]
      );
      oracleWrapperAddresses.push(wrapper.address);
    }

    const paraspaceOracle = await getParaSpaceOracle(ParaSpace_ORACLE);
    const tx = await paraspaceOracle.setAssetSources(
      allTokenAddresses,
      oracleWrapperAddresses
    );
    await tx.wait(1);
  }

  const strategyNFT: IReserveParams = {
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

  const reservesParams = {
    MOONBIRD: strategyNFT,
    Meebits: strategyNFT,
    AZUKI: strategyNFT,
    OTHR: strategyNFT,
    CloneX: strategyNFT,
  };

  const {
    PTokenNamePrefix,
    StableDebtTokenNamePrefix,
    VariableDebtTokenNamePrefix,
    SymbolPrefix,
  } = config;

  const admin = await paraSpaceAdmin.getAddress();
  await initReservesByHelper(
    reservesParams,
    tokenSymbolToAddress,
    PTokenNamePrefix,
    StableDebtTokenNamePrefix,
    VariableDebtTokenNamePrefix,
    SymbolPrefix,
    admin,
    treasuryAddress,
    // MockIncentivesController
    REWARD_PROXY,
    true,
    GENERIC_PTOKEN_IMPL,
    GENERIC_NTOKEN_IMPL,
    GENERIC_STABLE_DEBT_TOKEN,
    GENERIC_VARIABLE_DEBT_TOKEN,
    RESERVE_INTEREST_RATE_STRATEGY,
    DELEGATION_AWARE_PTOKEN,
    POOL_ADDRESSES_PROVIDER,
    POOL,
    POOL_CONFIGURATOR
  );

  const testHelpers = await getProtocolDataProvider(PROTOCOL_DATA_PROVIDER);
  await configureReservesByHelper(
    reservesParams,
    tokenSymbolToAddress,
    testHelpers,
    admin,
    POOL_ADDRESSES_PROVIDER,
    ACL_MANAGER,
    RESERVE_HELPER
  );
};

async function main() {
  await rawBRE.run("set-DRE");
  await runScript();
  printContracts();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
