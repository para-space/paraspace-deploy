import {
  deployWETHGateway,
  deployWETHGatewayProxy,
} from "../../../../helpers/contracts-deployments";
import {
  getAllTokens,
  getPoolProxy,
  getPoolAddressesProvider,
} from "../../../../helpers/contracts-getters";
import {getParaSpaceAdmins} from "../../../../helpers/contracts-helpers";

export const step_13 = async (verify = false) => {
  const {gatewayAdmin} = await getParaSpaceAdmins();

  try {
    const mockTokens = await getAllTokens();
    const addressesProvider = await getPoolAddressesProvider();
    const poolAddress = await addressesProvider.getPool();
    const poolProxy = await getPoolProxy(poolAddress);

    const wethGateway = await deployWETHGateway(
      mockTokens.WETH.address,
      poolProxy.address,
      verify
    );

    const wethGatewayEncodedInitialize =
      wethGateway.interface.encodeFunctionData("initialize");

    await deployWETHGatewayProxy(
      await gatewayAdmin.getAddress(),
      wethGateway.address,
      wethGatewayEncodedInitialize,
      verify
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};