import rawBRE from "hardhat";
import {
  getACLManager,
  getConduit,
  getConduitController,
  getNFTFloorOracle,
  getPausableZoneController,
  getPoolAddressesProvider,
  getPoolAddressesProviderRegistry,
  getProtocolDataProvider,
  getUiPoolDataProvider,
  getWETHGateway,
  getWETHGatewayProxy,
} from "../../../helpers/contracts-getters";
import {
  getParaSpaceAdmins,
  impersonateAddress,
} from "../../../helpers/contracts-helpers";
import {DRE, waitForTx} from "../../../helpers/misc-utils";

const adHoc = async () => {
  await DRE.run("set-DRE");
  console.time("ad-hoc");

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
