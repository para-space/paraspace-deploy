import {
  deployPunkGateway,
  deployPunkGatewayProxy,
} from "../../../../helpers/contracts-deployments";
import {
  getAllTokens,
  getPoolProxy,
  getPoolAddressesProvider,
  getCryptoPunksMarket,
} from "../../../../helpers/contracts-getters";
import {getParaSpaceAdmins} from "../../../../helpers/contracts-helpers";

export const step_14 = async (verify = false) => {
  const {gatewayAdmin} = await getParaSpaceAdmins();

  try {
    const mockTokens = await getAllTokens();
    const punks = await getCryptoPunksMarket();
    const addressesProvider = await getPoolAddressesProvider();
    const poolAddress = await addressesProvider.getPool();
    const poolProxy = await getPoolProxy(poolAddress);

    const punkGateway = await deployPunkGateway(
      [punks.address, mockTokens.WPUNKS.address, poolProxy.address],
      verify
    );

    const punkGatewayEncodedInitialize =
      punkGateway.interface.encodeFunctionData("initialize");

    await deployPunkGatewayProxy(
      await gatewayAdmin.getAddress(),
      punkGateway.address,
      punkGatewayEncodedInitialize,
      verify
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};