import {
  deployPunkGateway,
  deployPunkGatewayProxy,
} from "../../../../helpers/contracts-deployments";
import {
  getAllTokens,
  getPoolProxy,
  getPoolAddressesProvider,
  getPunks,
} from "../../../../helpers/contracts-getters";
import {getParaSpaceAdmins} from "../../../../helpers/contracts-helpers";
import {getParaSpaceConfig} from "../../../../helpers/misc-utils";
import {ERC721TokenContractId} from "../../../../helpers/types";

export const step_14 = async (verify = false) => {
  const {gatewayAdmin} = await getParaSpaceAdmins();
  const paraSpaceConfig = getParaSpaceConfig();

  try {
    if (!paraSpaceConfig.ReservesConfig[ERC721TokenContractId.WPUNKS]) {
      return;
    }

    const allTokens = await getAllTokens();
    const punks = await getPunks();
    const addressesProvider = await getPoolAddressesProvider();
    const poolAddress = await addressesProvider.getPool();
    const poolProxy = await getPoolProxy(poolAddress);

    const punkGateway = await deployPunkGateway(
      [punks.address, allTokens.WPUNKS.address, poolProxy.address],
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
