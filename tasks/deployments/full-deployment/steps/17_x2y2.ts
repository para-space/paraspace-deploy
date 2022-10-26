import {
  deployERC721Delegate,
  deployX2Y2Adapter,
  deployX2Y2R1,
} from "../../../../helpers/contracts-deployments";
import {getPoolAddressesProvider} from "../../../../helpers/contracts-getters";
import {X2Y2_ID} from "../../../../helpers/constants";
import {
  DRE,
  isLocalTestnet,
  isPublicTestnet,
  waitForTx,
} from "../../../../helpers/misc-utils";
import {getParaSpaceAdmins} from "../../../../helpers/contracts-helpers";

export const step_17 = async (verify = false) => {
  try {
    if (!isLocalTestnet() && !isPublicTestnet()) {
      return;
    }

    const {paraSpaceAdmin} = await getParaSpaceAdmins();
    const addressesProvider = await getPoolAddressesProvider();
    addressesProvider.getACLAdmin();
    const x2y2R1 = await deployX2Y2R1(verify);
    await waitForTx(
      await x2y2R1
        .connect(paraSpaceAdmin)
        .initialize(0, await addressesProvider.getWETH())
    );
    const erc721Delegate = await deployERC721Delegate(verify);
    await waitForTx(
      await x2y2R1
        .connect(paraSpaceAdmin)
        .updateDelegates([erc721Delegate.address], [])
    );
    await waitForTx(
      await erc721Delegate
        .connect(paraSpaceAdmin)
        .grantRole(
          "0x7630198b183b603be5df16e380207195f2a065102b113930ccb600feaf615331",
          x2y2R1.address
        )
    );
    const x2y2Adapter = await deployX2Y2Adapter(verify);

    await waitForTx(
      await addressesProvider.setMarketplace(
        X2Y2_ID,
        x2y2R1.address,
        x2y2Adapter.address,
        x2y2R1.address,
        false
      )
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
