import {
  deployMoonBirdsGateway,
  deployMoonBirdsGatewayProxy,
} from "../../../../helpers/contracts-deployments";
import {
  getAllMockedTokens,
  getPool,
  getPoolAddressesProvider,
} from "../../../../helpers/contracts-getters";
import {getParaSpaceAdmins} from "../../../../helpers/contracts-helpers";

export const step_13 = async (verify = false) => {
  const {gatewayAdmin} = await getParaSpaceAdmins();

  try {
    const mockTokens = await getAllMockedTokens();
    const addressesProvider = await getPoolAddressesProvider();
    const poolAddress = await addressesProvider.getPool();
    const poolProxy = await getPool(poolAddress);

    const moonbirdsGateway = await deployMoonBirdsGateway(
      [mockTokens["MOONBIRD"].address, poolProxy.address],
      verify
    );

    const moonbirdsGatewayEncodedInitialize =
      moonbirdsGateway.interface.encodeFunctionData("initialize");

    await deployMoonBirdsGatewayProxy(
      await gatewayAdmin.getAddress(),
      moonbirdsGateway.address,
      moonbirdsGatewayEncodedInitialize,
      verify
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
