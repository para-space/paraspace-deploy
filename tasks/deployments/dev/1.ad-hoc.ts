import rawBRE from "hardhat";
import {
  getACLManager,
  getConduit,
  getConduitController,
  getMintableERC20,
  getNFTFloorOracle,
  getParaSpaceOracle,
  getPausableZoneController,
  getPoolAddressesProvider,
  getPoolAddressesProviderRegistry,
  getProtocolDataProvider,
  getUiPoolDataProvider,
  getWETHGatewayProxy,
} from "../../../helpers/contracts-getters";
import {
  getEthersSignersAddresses,
  getParaSpaceAdmins,
  impersonateAddress,
} from "../../../helpers/contracts-helpers";
import {DRE, waitForTx} from "../../../helpers/misc-utils";

const adHoc = async () => {
  await DRE.run("set-DRE");
  console.time("ad-hoc");
  console.log(await getEthersSignersAddresses());
  console.log(await getParaSpaceAdmins());

  console.log(await getParaSpaceAdmins());
  const poolAddressesProvider = await getPoolAddressesProvider();
  const protocolDataProvider = await getProtocolDataProvider();
  const poolDataProvider = await getUiPoolDataProvider();
  const aclManager = await getACLManager();
  const wethGatewayProxy = await getWETHGatewayProxy();
  const conduitController = await getConduitController();
  const zoneController = await getPausableZoneController();
  const conduit = await getConduit();
  const nftFloorOracle = await getNFTFloorOracle();
  const addressesProviderRegistry = await getPoolAddressesProviderRegistry();

  console.log(
    await poolDataProvider.getReservesData(poolAddressesProvider.address)
  );

  console.log(await protocolDataProvider.getAllXTokens());

  console.log(
    await aclManager.hasRole(
      aclManager.DEFAULT_ADMIN_ROLE(),
      "0x17816E9A858b161c3E37016D139cf618056CaCD4"
    )
  );

  console.log(
    await aclManager.isPoolAdmin("0x17816E9A858b161c3E37016D139cf618056CaCD4")
  );
  console.log(
    await aclManager.isRiskAdmin("0x17816E9A858b161c3E37016D139cf618056CaCD4")
  );
  console.log(
    await aclManager.isEmergencyAdmin(
      "0x17816E9A858b161c3E37016D139cf618056CaCD4"
    )
  );
  console.log(
    await aclManager.isAssetListingAdmin(
      "0x17816E9A858b161c3E37016D139cf618056CaCD4"
    )
  );

  console.log(
    (await poolAddressesProvider.getACLAdmin()) ==
      "0x17816E9A858b161c3E37016D139cf618056CaCD4"
  );

  console.log(
    (await wethGatewayProxy.owner()) ==
      "0x17816E9A858b161c3E37016D139cf618056CaCD4"
  );

  console.log(
    (await poolAddressesProvider.owner()) ==
      "0x17816E9A858b161c3E37016D139cf618056CaCD4"
  );

  const paraSpaceAdmin = await impersonateAddress(
    "0x17816E9A858b161c3E37016D139cf618056CaCD4"
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
    (await conduitController.ownerOf(conduit.address)) ==
      "0x17816E9A858b161c3E37016D139cf618056CaCD4"
  );
  console.log(
    (await zoneController.owner()) ==
      "0x17816E9A858b161c3E37016D139cf618056CaCD4"
  );

  console.log(
    await nftFloorOracle.hasRole(
      nftFloorOracle.DEFAULT_ADMIN_ROLE(),
      "0x17816E9A858b161c3E37016D139cf618056CaCD4"
    )
  );

  console.log(
    (await addressesProviderRegistry.owner()) ==
      "0x17816E9A858b161c3E37016D139cf618056CaCD4"
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
  const USDT = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

  const paraspaceOracle = await getParaSpaceOracle();
  console.log("USDC: ", (await paraspaceOracle.getAssetPrice(USDC)).toString());
  console.log("USDT: ", (await paraspaceOracle.getAssetPrice(USDT)).toString());
  console.log("WETH: ", (await paraspaceOracle.getAssetPrice(WETH)).toString());
  console.log("APE: ", (await paraspaceOracle.getAssetPrice(APE)).toString());

  // Your main logic
  console.timeEnd("ad-hoc");
};

async function main() {
  await rawBRE.run("set-DRE");
  await adHoc();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
