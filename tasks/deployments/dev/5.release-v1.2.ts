import rawBRE from "hardhat";
import {ONE_ADDRESS, ZERO_ADDRESS} from "../../../helpers/constants";
import {
  deployPoolComponents,
  deployPunkGateway,
  deployPunkGatewayProxy,
} from "../../../helpers/contracts-deployments";
import {
  getConduit,
  getConduitController,
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
  const paraspaceOracle = await getParaSpaceOracle();
  const protocolDataProvider = await getProtocolDataProvider();
  const pool = await getPoolProxy();
  const conduitController = await getConduitController();
  const zoneController = await getPausableZoneController();
  const conduit = await getConduit();

  try {
    console.time("deploy PoolComponent");
    const {
      poolCore,
      poolParameters,
      poolMarketplace,
      poolApeStaking,
      poolCoreSelectors,
      poolParametersSelectors,
      poolMarketplaceSelectors,
      poolApeStakingSelectors,
    } = await deployPoolComponents(addressesProvider.address, verify);
    console.timeEnd("deploy PoolComponent");

    console.time("upgrade PoolCore");
    await waitForTx(
      await addressesProvider.updatePoolImpl(
        [
          {
            implAddress: poolCore.address,
            action: 1,
            functionSelectors: poolCoreSelectors,
          },
        ],
        ZERO_ADDRESS,
        "0x",
        GLOBAL_OVERRIDES
      )
    );
    console.timeEnd("upgrade PoolCore");

    console.time("upgrade PoolParameters");
    await waitForTx(
      await addressesProvider.updatePoolImpl(
        [
          {
            implAddress: poolParameters.address,
            action: 1, //replace
            functionSelectors: poolParametersSelectors,
          },
        ],
        ZERO_ADDRESS,
        "0x",
        GLOBAL_OVERRIDES
      )
    );
    console.timeEnd("upgrade PoolParameters");

    console.time("upgrade PoolMarketplace");
    await waitForTx(
      await addressesProvider.updatePoolImpl(
        [
          {
            implAddress: poolMarketplace.address,
            action: 1,
            functionSelectors: poolMarketplaceSelectors,
          },
        ],
        ZERO_ADDRESS,
        "0x",
        GLOBAL_OVERRIDES
      )
    );
    console.timeEnd("upgrade PoolMarketplace");

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

    console.log("deploying aggregators...");
    const assets = [
      {
        symbol: "BAYC",
        address: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
        aggregator: "0x352f2Bc3039429fC2fe62004a1575aE74001CfcE",
      },
      {
        symbol: "MAYC",
        address: "0x60E4d786628Fea6478F785A6d7e704777c86a7c6",
        aggregator: "0x1823C89715Fe3fB96A24d11c917aCA918894A090",
      },
      {
        symbol: "DOODLE",
        address: "0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e",
        aggregator: "0x027828052840a43Cc2D0187BcfA6e3D6AcE60336",
      },
      {
        symbol: "AZUKI",
        address: "0xed5af388653567af2f388e6224dc7c4b3241c544",
        aggregator: "0xA8B9A447C73191744D5B79BcE864F343455E1150",
      },
      {
        symbol: "CLONEX",
        address: "0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b",
        aggregator: "0x021264d59DAbD26E7506Ee7278407891Bb8CDCCc",
      },
      {
        symbol: "WPUNKS",
        address: "0xb7F7F6C52F2e2fdb1963Eab30438024864c313F6",
        aggregator: "0x01B6710B01cF3dd8Ae64243097d91aFb03728Fdd",
      },
    ];

    assets.push(
      {
        symbol: "DAI",
        address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        aggregator: "0x773616E4d11A78F511299002da57A0a94577F1f4",
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
