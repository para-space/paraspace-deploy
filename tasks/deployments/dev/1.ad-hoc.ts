import rawBRE from "hardhat";
import {ONE_ADDRESS} from "../../../helpers/constants";
import {
  getACLManager,
  getConduit,
  getConduitController,
  getNFTFloorOracle,
  getParaSpaceOracle,
  getPausableZoneController,
  getPoolAddressesProvider,
  getPoolAddressesProviderRegistry,
  getProtocolDataProvider,
  getUiPoolDataProvider,
  getWETHGatewayProxy,
  getWPunkGatewayProxy,
} from "../../../helpers/contracts-getters";
import {impersonateAddress} from "../../../helpers/contracts-helpers";
import {DRE, waitForTx} from "../../../helpers/misc-utils";
// import {getFirstSigner} from "../../../helpers/contracts-getters";
// import {utils} from "ethers";
// import {GLOBAL_OVERRIDES} from "../../../helpers/hardhat-constants";

const adHoc = async () => {
  await DRE.run("set-DRE");
  console.time("ad-hoc");
  console.timeEnd("ad-hoc");
};

async function main() {
  await rawBRE.run("set-DRE");
  // const signer = await getFirstSigner();
  // await signer.sendTransaction({
  //   to: "0xe965198731CDdB2f06e91DD0CDff74b71e4b3714",
  //   value: utils.parseEther("3").toString(),
  //   ...GLOBAL_OVERRIDES,
  // });

  const poolAddressesProvider = await getPoolAddressesProvider();
  const protocolDataProvider = await getProtocolDataProvider();
  const poolDataProvider = await getUiPoolDataProvider();
  const aclManager = await getACLManager();
  const wethGatewayProxy = await getWETHGatewayProxy();
  const wpunkGatewayProxy = await getWPunkGatewayProxy();
  const conduitController = await getConduitController();
  const zoneController = await getPausableZoneController();
  const conduit = await getConduit();
  const nftFloorOracle = await getNFTFloorOracle();
  const addressesProviderRegistry = await getPoolAddressesProviderRegistry();

  await poolDataProvider.getReservesData(poolAddressesProvider.address);

  console.log(await protocolDataProvider.getAllXTokens());

  console.log(
    "is aclManager admin ",
    await aclManager.hasRole(
      aclManager.DEFAULT_ADMIN_ROLE(),
      "0xe965198731CDdB2f06e91DD0CDff74b71e4b3714"
    )
  );

  console.log(
    "is pool admin ",
    await aclManager.isPoolAdmin("0xe965198731CDdB2f06e91DD0CDff74b71e4b3714")
  );
  console.log(
    "is risk admin ",
    await aclManager.isRiskAdmin("0xe965198731CDdB2f06e91DD0CDff74b71e4b3714")
  );
  console.log(
    "is emergency admin ",
    await aclManager.isEmergencyAdmin(
      "0xe965198731CDdB2f06e91DD0CDff74b71e4b3714"
    )
  );
  console.log(
    "is asset listing admin ",
    await aclManager.isAssetListingAdmin(
      "0xe965198731CDdB2f06e91DD0CDff74b71e4b3714"
    )
  );

  console.log(
    "is ACL admin ",
    (await poolAddressesProvider.getACLAdmin()) ==
      "0xe965198731CDdB2f06e91DD0CDff74b71e4b3714"
  );

  console.log(
    "is wethGatewayProxy owner ",
    (await wethGatewayProxy.owner()) ==
      "0xe965198731CDdB2f06e91DD0CDff74b71e4b3714"
  );

  console.log(
    "is wpunkGatewayProxy owner ",
    (await wpunkGatewayProxy.owner()) ==
      "0xe965198731CDdB2f06e91DD0CDff74b71e4b3714"
  );

  console.log(
    "is addressesProvider owner",
    (await poolAddressesProvider.owner()) ==
      "0xe965198731CDdB2f06e91DD0CDff74b71e4b3714"
  );

  const paraSpaceAdmin = await impersonateAddress(
    "0xe965198731CDdB2f06e91DD0CDff74b71e4b3714"
  );
  try {
    await waitForTx(
      await conduitController
        .connect(paraSpaceAdmin.signer)
        .acceptOwnership(conduit.address)
    );
    await waitForTx(
      await zoneController.connect(paraSpaceAdmin.signer).acceptOwnership()
    );
  } catch (e) {
    //
  }
  console.log(
    "is conduit owner ",
    (await conduitController.ownerOf(conduit.address)) ==
      "0xe965198731CDdB2f06e91DD0CDff74b71e4b3714"
  );
  console.log(
    "is zone controller owner ",
    (await zoneController.owner()) ==
      "0xe965198731CDdB2f06e91DD0CDff74b71e4b3714"
  );

  console.log(
    "is nftFloorOracle admin ",
    await nftFloorOracle.hasRole(
      nftFloorOracle.DEFAULT_ADMIN_ROLE(),
      "0xe965198731CDdB2f06e91DD0CDff74b71e4b3714"
    )
  );

  console.log(
    "is addressesProviderRegistry owner ",
    (await addressesProviderRegistry.owner()) ==
      "0xe965198731CDdB2f06e91DD0CDff74b71e4b3714"
  );
  await Promise.all(
    [
      "0x17816E9A858b161c3E37016D139cf618056CaCD4",
      "0x69FAD68De47D5666Ad668C7D682dDb8FD6322949",
      "0xD65Fee206a4ea89eBBcF4694E745C597AB6F8325",
      "0x755C1bd877788739dD002B98B093c4852AbfA6c4",
      "0x3A6c796edffc057d789F7d4ffAd438B1D48f3075",
      "0x2f2d07d60ea7330DD2314f4413CCbB2dC25276EF",
      "0x001e2bcC5c1BfC3131d33Ba074B12c2F1237FB04",
    ].map(async (x) => await aclManager.isEmergencyAdmin(x))
  );

  const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
  const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
  const APE = "0x4d224452801ACEd8B2F0aebE155379bb5D594381";
  const sAPE = ONE_ADDRESS;
  const USDT = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
  const WBTC = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599";
  const BAYC = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";
  const MAYC = "0x60E4d786628Fea6478F785A6d7e704777c86a7c6";
  const DOODLE = "0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e";
  const MOONBIRD = "0x23581767a106ae21c074b2276d25e5c3e136a68b";
  const MEEBITS = "0x7bd29408f11d2bfc23c34f18275bbf23bb716bc7";
  const AZUKI = "0xed5af388653567af2f388e6224dc7c4b3241c544";
  const OTHR = "0x34d85c9cdeb23fa97cb08333b511ac86e1c4e258";
  const CLONEX = "0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b";
  const WPUNKS = "0xb7F7F6C52F2e2fdb1963Eab30438024864c313F6";

  const paraspaceOracle = await getParaSpaceOracle();
  console.log("USDC: ", (await paraspaceOracle.getAssetPrice(USDC)).toString());
  console.log("USDT: ", (await paraspaceOracle.getAssetPrice(USDT)).toString());
  console.log("WETH: ", (await paraspaceOracle.getAssetPrice(WETH)).toString());
  console.log("APE: ", (await paraspaceOracle.getAssetPrice(APE)).toString());
  console.log("sAPE: ", (await paraspaceOracle.getAssetPrice(sAPE)).toString());
  console.log("WBTC: ", (await paraspaceOracle.getAssetPrice(WBTC)).toString());
  console.log("BAYC: ", (await paraspaceOracle.getAssetPrice(BAYC)).toString());
  console.log("MAYC: ", (await paraspaceOracle.getAssetPrice(MAYC)).toString());
  console.log(
    "DOODLE: ",
    (await paraspaceOracle.getAssetPrice(DOODLE)).toString()
  );
  console.log(
    "MOONBIRD: ",
    (await paraspaceOracle.getAssetPrice(MOONBIRD)).toString()
  );
  console.log(
    "MEEBITS: ",
    (await paraspaceOracle.getAssetPrice(MEEBITS)).toString()
  );
  console.log(
    "AZUKI: ",
    (await paraspaceOracle.getAssetPrice(AZUKI)).toString()
  );
  console.log("OTHR: ", (await paraspaceOracle.getAssetPrice(OTHR)).toString());
  console.log(
    "CLONEX: ",
    (await paraspaceOracle.getAssetPrice(CLONEX)).toString()
  );
  console.log(
    "WPUNKS: ",
    (await paraspaceOracle.getAssetPrice(WPUNKS)).toString()
  );
  await adHoc();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
