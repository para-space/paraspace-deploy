import {deployPoolAddressesProvider} from "../../../../helpers/contracts-deployments";
import {getParaSpaceAdmins} from "../../../../helpers/contracts-helpers";
import {waitForTx} from "../../../../helpers/misc-utils";
import ParaSpaceConfig from "../../../../market-config";
import rawBRE from "hardhat";
import dotenv from "dotenv";

dotenv.config();

const verify = process.env.ETHERSCAN_VERIFICATION === "true" ? true : false;

export const step_02 = async (verify = false) => {
  const {paraSpaceAdmin} = await getParaSpaceAdmins();
  const paraSpaceAdminAddress = await paraSpaceAdmin.getAddress();

  try {
    const addressesProvider = await deployPoolAddressesProvider(
      ParaSpaceConfig.MarketId,
      paraSpaceAdminAddress,
      verify
    );
    await waitForTx(await addressesProvider.setACLAdmin(paraSpaceAdminAddress));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

async function main() {
  await rawBRE.run("set-DRE");

  await step_02(verify);
  console.log("----------------- step 02 done ----------------- ");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
