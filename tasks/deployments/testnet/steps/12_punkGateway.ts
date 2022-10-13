import {
  deployPunkGateway,
  deployPunkGatewayProxy,
} from "../../../../helpers/contracts-deployments";
import {
  getAllMockedTokens,
  getPoolProxy,
  getPoolAddressesProvider,
  getPunk,
} from "../../../../helpers/contracts-getters";
import {getParaSpaceAdmins} from "../../../../helpers/contracts-helpers";
import rawBRE from "hardhat";

import dotenv from "dotenv";

dotenv.config();

const verify = process.env.ETHERSCAN_VERIFICATION === "true" ? true : false;

export const step_12 = async (verify = false) => {
  const {gatewayAdmin} = await getParaSpaceAdmins();

  try {
    const mockTokens = await getAllMockedTokens();
    const punks = await getPunk();
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

async function main() {
  await rawBRE.run("set-DRE");

  await step_12(verify);
  console.log("----------------- step 12 done ----------------- ");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
