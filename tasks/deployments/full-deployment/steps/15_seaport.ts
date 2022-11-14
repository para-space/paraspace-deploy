import {
  deployConduitController,
  deployPausableZoneController,
  deploySeaport,
  deploySeaportAdapter,
} from "../../../../helpers/contracts-deployments";
import {
  getAllTokens,
  getConduit,
  getFirstSigner,
  getPoolAddressesProvider,
  getProtocolDataProvider,
} from "../../../../helpers/contracts-getters";
import {
  OPENSEA_SEAPORT_ID,
  PARASPACE_SEAPORT_ID,
} from "../../../../helpers/constants";
import {getParaSpaceConfig, waitForTx} from "../../../../helpers/misc-utils";
import {
  createZone,
  insertContractAddressInDb,
  createConduit,
} from "../../../../helpers/contracts-helpers";
import {eContractid} from "../../../../helpers/types";

export const step_15 = async (verify = false) => {
  try {
    const deployer = await getFirstSigner();
    const deployerAddress = await deployer.getAddress();
    const paraSpaceConfig = getParaSpaceConfig();
    const allTokens = await getAllTokens();
    const addressesProvider = await getPoolAddressesProvider();
    const protocolDataProvider = await getProtocolDataProvider();
    const conduitController = await deployConduitController(verify);
    const pausableZoneController = await deployPausableZoneController(
      deployerAddress,
      verify
    );
    const conduitKey = `${deployerAddress}000000000000000000000000`;
    const conduit = await createConduit(
      conduitController,
      deployer,
      conduitKey
    );
    const conduitInstance = await getConduit(conduit);
    await waitForTx(
      await conduitInstance.initialize(protocolDataProvider.address, {
        gasLimit: 1000000,
      })
    );
    const zone = await createZone(pausableZoneController, deployer);
    const seaport = await deploySeaport(conduitController.address, verify);
    const seaportAdapter = await deploySeaportAdapter(verify);
    await waitForTx(
      await conduitController.updateChannel(conduit, seaport.address, true)
    );
    await waitForTx(
      await addressesProvider.setMarketplace(
        PARASPACE_SEAPORT_ID,
        seaport.address,
        seaportAdapter.address,
        conduitInstance.address,
        false
      )
    );

    if (paraSpaceConfig.Marketplace.Seaport) {
      await waitForTx(
        await addressesProvider.setMarketplace(
          OPENSEA_SEAPORT_ID,
          paraSpaceConfig.Marketplace.Seaport,
          seaportAdapter.address,
          paraSpaceConfig.Marketplace.Seaport,
          false
        )
      );
    }

    await waitForTx(await addressesProvider.setWETH(allTokens.WETH.address));
    await insertContractAddressInDb(eContractid.ConduitKey, conduitKey, false);
    await insertContractAddressInDb(eContractid.Conduit, conduit);
    await insertContractAddressInDb(eContractid.PausableZone, zone);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
