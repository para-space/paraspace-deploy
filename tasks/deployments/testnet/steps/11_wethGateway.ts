import {
  deployWETHGateway,
  deployWETHGatewayProxy,
} from "../../../../helpers/contracts-deployments";
import {
  getAllMockedTokens,
  getPoolProxy,
  getPoolAddressesProvider,
} from "../../../../helpers/contracts-getters";
import {getParaSpaceAdmins} from "../../../../helpers/contracts-helpers";
import rawBRE from "hardhat";

import dotenv from "dotenv";

dotenv.config();

const verify = process.env.ETHERSCAN_VERIFICATION === "true" ? true : false;

export const step_11 = async (verify = false) => {
  const {gatewayAdmin} = await getParaSpaceAdmins();

  try {
    const mockTokens = await getAllMockedTokens();
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

async function main() {
  await rawBRE.run("set-DRE");

  await step_11(verify);
  console.log("----------------- step 11 done ----------------- ");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
