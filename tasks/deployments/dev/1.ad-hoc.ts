import rawBRE from "hardhat";
import {getFirstSigner} from "../../../helpers/contracts-getters";
import {
  getEthersSigners,
  getParaSpaceAdmins,
} from "../../../helpers/contracts-helpers";
import {DRE} from "../../../helpers/misc-utils";
import * as envs from "../../../helpers/hardhat-constants";

const adHoc = async () => {
  await DRE.run("set-DRE");
  console.time("ad-hoc");
  console.log(await DRE.ethers.provider.getNetwork());
  console.log(await (await getFirstSigner()).getAddress());
  console.log(await getParaSpaceAdmins());
  console.log(
    await Promise.all((await getEthersSigners()).map((x) => x.getAddress()))
  );
  console.log(envs);

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
