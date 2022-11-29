import rawBRE from "hardhat";
import {getFirstSigner} from "../../../helpers/contracts-getters";
import {
  getEthersSigners,
  getParaSpaceAdmins,
} from "../../../helpers/contracts-helpers";
import {DRE} from "../../../helpers/misc-utils";
import * as envs from "../../../helpers/hardhat-constants";
import {accounts} from "../../../wallets";
import {MarketRegistry__factory} from "../../../../types";
// import {waitForTx} from "../../../helpers/misc-utils";

const adHoc = async () => {
  await DRE.run("set-DRE");
  console.time("ad-hoc");
  const signer = await getFirstSigner();

  // const marketRegistry = MarketRegistry__factory.connect(
  //   "0x3a574baC669F3B1CB54b92cCBAefbAFd07054d96",
  //   signer
  // );

  // for (let i = 0; i < 12; i++) {
  //   console.log(await marketRegistry.markets(i.toString()));
  // }

  // console.log(accounts);

  // await waitForTx(await signer.sendTransaction({
  //   to: "0x018281853eCC543Aa251732e8FDaa7323247eBeB",
  //   value: DRE.ethers.utils.parseEther("0"),
  //   ...envs.GLOBAL_OVERRIDES
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
