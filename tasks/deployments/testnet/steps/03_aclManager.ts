import {deployACLManager} from "../../../../helpers/contracts-deployments";
import {getParaSpaceAdmins} from "../../../../helpers/contracts-helpers";
import {waitForTx} from "../../../../helpers/misc-utils";
import {getPoolAddressesProvider} from "../../../../helpers/contracts-getters";
import rawBRE from "hardhat";
import dotenv from "dotenv";

dotenv.config();

const verify = process.env.ETHERSCAN_VERIFICATION === "true" ? true : false;

export const step_03 = async (verify = false) => {
  const {paraSpaceAdmin, emergencyAdmin} = await getParaSpaceAdmins();
  const paraspaceAdmin = await paraSpaceAdmin.getAddress();
  const emergencyAdminAddress = await emergencyAdmin.getAddress();
  const addressesProvider = await getPoolAddressesProvider();

  try {
    const aclManager = await deployACLManager(
      addressesProvider.address,
      verify
    );
    await waitForTx(await addressesProvider.setACLManager(aclManager.address));

    await waitForTx(await aclManager.addPoolAdmin(paraspaceAdmin));
    await waitForTx(await aclManager.addAssetListingAdmin(paraspaceAdmin));
    await waitForTx(await aclManager.addEmergencyAdmin(emergencyAdminAddress));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

async function main() {
  await rawBRE.run("set-DRE");

  await step_03(verify);
  console.log("----------------- step 03 done ----------------- ");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
