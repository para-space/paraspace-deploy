import {
  deployUniswapV3Gateway,
  deployUniswapV3GatewayProxy,
} from "../../../../helpers/contracts-deployments";
import {
  getAllMockedTokens,
  getPoolAddressesProvider,
} from "../../../../helpers/contracts-getters";
import {getParaSpaceAdmins} from "../../../../helpers/contracts-helpers";

export const step_16 = async (verify = false) => {
  const {gatewayAdmin} = await getParaSpaceAdmins();

  try {
    const mockTokens = await getAllMockedTokens();
    const addressesProvider = await getPoolAddressesProvider();
    const poolAddress = await addressesProvider.getPool();

    const uniswapV3Gateway = await deployUniswapV3Gateway(
      mockTokens.UniswapV3.address,
      poolAddress,
      verify
    );

    const uniswapV3GatewayEncodedInitialize =
      uniswapV3Gateway.interface.encodeFunctionData("initialize");

    await deployUniswapV3GatewayProxy(
      await gatewayAdmin.getAddress(),
      uniswapV3Gateway.address,
      uniswapV3GatewayEncodedInitialize,
      verify
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
