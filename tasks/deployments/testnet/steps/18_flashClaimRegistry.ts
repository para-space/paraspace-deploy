import {
  deployFlashClaimRegistry,
  deployMockAirdropProject,
} from "../../../../helpers/contracts-deployments";
import {
  getPoolAddressesProvider,
  getProtocolDataProvider,
} from "../../../../helpers/contracts-getters";
import rawBRE from "hardhat";
export const step_18 = async (verify = false) => {
  try {
    const addressesProvider = await getPoolAddressesProvider();
    const poolAddress = await addressesProvider.getPool();
    await deployFlashClaimRegistry(poolAddress, verify);

    const dataProvider = await getProtocolDataProvider();
    const reservesTokens = await dataProvider.getAllReservesTokens();
    const baycAddress = reservesTokens.find(
      (token) => token.symbol === "BAYC"
    )?.tokenAddress;
    if (!baycAddress) {
      return;
    }

    await deployMockAirdropProject(baycAddress, verify);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

async function main() {
  await rawBRE.run("set-DRE");

  await step_18();
  console.log("----------------- step 18 done ----------------- ");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
