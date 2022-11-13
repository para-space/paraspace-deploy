import {
  getACLManager,
  getConduit,
  getConduitController,
  getFirstSigner,
  getNFTFloorOracle,
  getPausableZoneController,
  getPoolAddressesProvider,
  getPoolAddressesProviderRegistry,
  getReservesSetupHelper,
  getWETHGatewayProxy,
  getWPunkGatewayProxy,
} from "../../../../helpers/contracts-getters";
import {getParaSpaceAdmins} from "../../../../helpers/contracts-helpers";
import {waitForTx} from "../../../../helpers/misc-utils";

// eslint-disable-next-line
export const step_19 = async (_verify = false) => {
  const {paraSpaceAdminAddress, gatewayAdminAddress} =
    await getParaSpaceAdmins();
  const deployer = await getFirstSigner();
  const deployerAddress = await deployer.getAddress();

  try {
    const addressesProviderRegistry = await getPoolAddressesProviderRegistry();
    const addressesProvider = await getPoolAddressesProvider();
    const reservesSetupHelper = await getReservesSetupHelper();
    const conduitController = await getConduitController();
    const conduit = await getConduit();
    const zoneController = await getPausableZoneController();
    const aclManager = await getACLManager();
    const wethGatewayProxy = await getWETHGatewayProxy();
    const punkGatewayProxy = await getWPunkGatewayProxy();
    const nftFloorOracle = await getNFTFloorOracle();

    await waitForTx(
      await addressesProviderRegistry.transferOwnership(paraSpaceAdminAddress)
    );
    await waitForTx(await addressesProvider.setACLAdmin(paraSpaceAdminAddress));
    await waitForTx(
      await addressesProvider.transferOwnership(paraSpaceAdminAddress)
    );

    await waitForTx(await aclManager.removePoolAdmin(deployerAddress));
    await waitForTx(await aclManager.addPoolAdmin(paraSpaceAdminAddress));
    await waitForTx(
      await aclManager.grantRole(
        await aclManager.DEFAULT_ADMIN_ROLE(),
        paraSpaceAdminAddress
      )
    );
    await waitForTx(
      await aclManager.revokeRole(
        await aclManager.DEFAULT_ADMIN_ROLE(),
        deployerAddress
      )
    );

    await waitForTx(
      await reservesSetupHelper.transferOwnership(paraSpaceAdminAddress)
    );

    await waitForTx(
      await conduitController.transferOwnership(
        conduit.address,
        paraSpaceAdminAddress
      )
    );
    await waitForTx(
      await zoneController.transferOwnership(paraSpaceAdminAddress)
    );

    await waitForTx(
      await wethGatewayProxy.transferOwnership(gatewayAdminAddress)
    );
    await waitForTx(
      await punkGatewayProxy.transferOwnership(gatewayAdminAddress)
    );

    await waitForTx(
      await nftFloorOracle.grantRole(
        await nftFloorOracle.UPDATER_ROLE(),
        paraSpaceAdminAddress
      )
    );
    await waitForTx(
      await nftFloorOracle.revokeRole(
        await nftFloorOracle.UPDATER_ROLE(),
        deployerAddress
      )
    );
    await waitForTx(
      await nftFloorOracle.grantRole(
        await nftFloorOracle.DEFAULT_ADMIN_ROLE(),
        paraSpaceAdminAddress
      )
    );
    await waitForTx(
      await nftFloorOracle.revokeRole(
        await nftFloorOracle.DEFAULT_ADMIN_ROLE(),
        deployerAddress
      )
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
