import rawBRE from "hardhat";
import {
  getFirstSigner,
  getNFTFloorOracle,
  getParaSpaceOracle,
  getPoolAddressesProvider,
} from "../../../helpers/contracts-getters";
import {
  getEthersSigners,
  getParaSpaceAdmins,
} from "../../../helpers/contracts-helpers";
import {DRE, waitForTx} from "../../../helpers/misc-utils";
import * as envs from "../../../helpers/hardhat-constants";
import {deployERC721OracleWrapper} from "../../../helpers/contracts-deployments";
import {eContractid} from "../../../helpers/types";
// import {waitForTx} from "../../../helpers/misc-utils";
// import {GLOBAL_OVERRIDES} from "../../../helpers/hardhat-constants";

const adHoc = async () => {
  await DRE.run("set-DRE");
  console.time("ad-hoc");

  const paraSpaceOracle = await getParaSpaceOracle();
  const addressesProvider = await getPoolAddressesProvider();
  const nftFloorOracle = await getNFTFloorOracle();

  console.log(
    await paraSpaceOracle.getSourceOfAsset(
      "0xb7F7F6C52F2e2fdb1963Eab30438024864c313F6"
    )
  );
  // console.log(
  //   await nftFloorOracle.getPrice("0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB")
  // );

  const aggregator = await deployERC721OracleWrapper(
    addressesProvider.address,
    nftFloorOracle.address,
    "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB",
    eContractid.PUNKS,
    false
  );

  await waitForTx(
    await paraSpaceOracle.setAssetSources(
      ["0xb7F7F6C52F2e2fdb1963Eab30438024864c313F6"],
      [aggregator.address]
    )
  );

  // const signer = await getFirstSigner()
  // await waitForTx(await signer.sendTransaction({
  //   to: "0x018281853eCC543Aa251732e8FDaa7323247eBeB",
  //   nonce: 2566,
  //   value: DRE.ethers.utils.parseEther("0"),
  //   ...GLOBAL_OVERRIDES
  // }))

  // console.log(await DRE.ethers.provider.getNetwork());
  // console.log(await (await getFirstSigner()).getAddress());
  // console.log(await getParaSpaceAdmins());
  // console.log(
  //   await Promise.all((await getEthersSigners()).map((x) => x.getAddress()))
  // );
  // console.log(envs);

  // Your main logic
  console.timeEnd("ad-hoc");
};

async function main() {
  await rawBRE.run("set-DRE");
  await adHoc();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
