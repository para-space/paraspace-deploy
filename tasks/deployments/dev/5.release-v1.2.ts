import rawBRE from "hardhat";
import {ONE_ADDRESS, ZERO_ADDRESS} from "../../../helpers/constants";
import {
  deployERC721OracleWrapper,
  deployNFTFloorPriceOracle,
  deployPoolComponents,
  deployPunkGateway,
  deployPunkGatewayProxy,
} from "../../../helpers/contracts-deployments";
import {
  getConduit,
  getConduitController,
  getFirstSigner,
  getParaSpaceOracle,
  getPausableZoneController,
  getPoolAddressesProvider,
  getPoolProxy,
  getProtocolDataProvider,
} from "../../../helpers/contracts-getters";
import {getParaSpaceAdmins} from "../../../helpers/contracts-helpers";
import {GLOBAL_OVERRIDES} from "../../../helpers/hardhat-constants";
import {
  configureReservesByHelper,
  initReservesByHelper,
} from "../../../helpers/init-helpers";
import {DRE, getParaSpaceConfig, waitForTx} from "../../../helpers/misc-utils";
import {tEthereumAddress} from "../../../helpers/types";
import {step_20} from "../full-deployment/steps/20_renounceOwnership";

const releaseV12 = async (verify = false) => {
  await DRE.run("set-DRE");
  console.time("release-v1.2");
  const addressesProvider = await getPoolAddressesProvider();
  const paraSpaceConfig = getParaSpaceConfig();
  const oracleConfig = paraSpaceConfig.Oracle;
  const paraspaceOracle = await getParaSpaceOracle();
  const protocolDataProvider = await getProtocolDataProvider();
  const deployer = await getFirstSigner();
  const pool = await getPoolProxy();
  const conduitController = await getConduitController();
  const zoneController = await getPausableZoneController();
  const conduit = await getConduit();

  try {
    console.log("deploying PoolApeStakingImpl...");
    const {poolApeStaking, poolApeStakingSelectors} =
      await deployPoolComponents(addressesProvider.address, verify);

    console.log("registering PoolApeStaking function selectors...");
    await waitForTx(
      await addressesProvider.updatePoolImpl(
        [
          {
            implAddress: poolApeStaking.address,
            action: 0,
            functionSelectors: poolApeStakingSelectors,
          },
        ],
        ZERO_ADDRESS,
        "0x",
        GLOBAL_OVERRIDES
      )
    );

    console.log("deploying NFTFloorOracle...");
    const assets = [
      {
        symbol: "BAYC",
        address: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
        aggregator: "",
      },
      {
        symbol: "MAYC",
        address: "0x60E4d786628Fea6478F785A6d7e704777c86a7c6",
        aggregator: "",
      },
      {
        symbol: "DOODLE",
        address: "0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e",
        aggregator: "",
      },
      {
        symbol: "MOONBIRD",
        address: "0x23581767a106ae21c074b2276d25e5c3e136a68b",
        aggregator: "",
      },
      {
        symbol: "MEEBITS",
        address: "0x7bd29408f11d2bfc23c34f18275bbf23bb716bc7",
        aggregator: "",
      },
      {
        symbol: "AZUKI",
        address: "0xed5af388653567af2f388e6224dc7c4b3241c544",
        aggregator: "",
      },
      {
        symbol: "OTHR",
        address: "0x34d85c9cdeb23fa97cb08333b511ac86e1c4e258",
        aggregator: "",
      },
      {
        symbol: "CLONEX",
        address: "0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b",
        aggregator: "",
      },
      {
        symbol: "WPUNKS",
        address: "0xb7F7F6C52F2e2fdb1963Eab30438024864c313F6",
        aggregator: "",
      },
    ];
    const nftFloorOracle = await deployNFTFloorPriceOracle(verify);
    await waitForTx(
      await nftFloorOracle.initialize(
        await deployer.getAddress(),
        oracleConfig.Nodes,
        assets.map((x) => x.address),
        GLOBAL_OVERRIDES
      )
    );

    console.log("deploying NFT aggregators...");
    for (const asset of assets) {
      asset.aggregator = (
        await deployERC721OracleWrapper(
          addressesProvider.address,
          nftFloorOracle.address,
          asset.address,
          asset.symbol,
          verify
        )
      ).address;
    }

    assets.push(
      {
        symbol: "DAI",
        address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        aggregator: "0x773616E4d11A78F511299002da57A0a94577F1f4",
      },
      {
        symbol: "WBTC",
        address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
        aggregator: "0xdeb288F737066589598e9214E782fa5A8eD689e8",
      },
      {
        symbol: "sAPE",
        address: ONE_ADDRESS,
        aggregator: "0xc7de7f4d4C9c991fF62a07D18b3E31e349833A18",
      }
    );

    console.log("registering aggregators...");
    await waitForTx(
      await paraspaceOracle.setAssetSources(
        assets.map((x) => x.address),
        assets.map((x) => x.aggregator),
        GLOBAL_OVERRIDES
      )
    );

    const reservesParams = paraSpaceConfig.ReservesConfig;
    const allTokenAddresses = assets.reduce(
      (accum: {[name: string]: tEthereumAddress}, {symbol, address}) => ({
        ...accum,
        [symbol]: address,
      }),
      {}
    );
    const {PTokenNamePrefix, VariableDebtTokenNamePrefix, SymbolPrefix} =
      paraSpaceConfig;
    const {paraSpaceAdminAddress} = await getParaSpaceAdmins();
    const treasuryAddress = paraSpaceConfig.Treasury;

    console.log("initializing reserves...");
    await initReservesByHelper(
      reservesParams,
      allTokenAddresses,
      PTokenNamePrefix,
      VariableDebtTokenNamePrefix,
      SymbolPrefix,
      paraSpaceAdminAddress,
      treasuryAddress,
      ZERO_ADDRESS,
      verify
    );
    console.log("configuring reserves...");
    await configureReservesByHelper(
      reservesParams,
      allTokenAddresses,
      protocolDataProvider,
      paraSpaceAdminAddress
    );

    console.log("deploying wpunkgateway...");
    const punkGateway = await deployPunkGateway(
      [
        "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB",
        "0xb7F7F6C52F2e2fdb1963Eab30438024864c313F6",
        pool.address,
      ],
      verify
    );

    const punkGatewayEncodedInitialize =
      punkGateway.interface.encodeFunctionData("initialize");

    await deployPunkGatewayProxy(
      ZERO_ADDRESS, // disable upgradeability
      punkGateway.address,
      punkGatewayEncodedInitialize,
      verify
    );

    console.log("accepting Conduit, ZoneController ownership...");
    await waitForTx(
      await conduitController.acceptOwnership(conduit.address, GLOBAL_OVERRIDES)
    );
    await waitForTx(await zoneController.acceptOwnership(GLOBAL_OVERRIDES));

    console.log("renouncing ownership to multisig...");
    await step_20(verify, {
      paraSpaceAdminAddress: "0xe965198731CDdB2f06e91DD0CDff74b71e4b3714",
      gatewayAdminAddress: "0xe965198731CDdB2f06e91DD0CDff74b71e4b3714",
      riskAdminAddress: "0xe965198731CDdB2f06e91DD0CDff74b71e4b3714",
    });

    console.timeEnd("release-v1.2");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

async function main() {
  await rawBRE.run("set-DRE");
  await releaseV12();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
