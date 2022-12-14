import rawBRE from "hardhat";
import {getFirstSigner} from "../../../helpers/contracts-getters";
import {
  getEthersSigners,
  getParaSpaceAdmins,
} from "../../../helpers/contracts-helpers";
import {DRE} from "../../../helpers/misc-utils";
import * as envs from "../../../helpers/hardhat-constants";
import {accounts} from "../../../wallets";

const info = async () => {
  await DRE.run("set-DRE");
  console.time("info");

  console.log(await DRE.ethers.provider.getNetwork());
  console.log(envs);
  console.log(await getParaSpaceAdmins());
  console.log(accounts);
  console.log(await (await getFirstSigner()).getAddress());
  console.log(
    await Promise.all((await getEthersSigners()).map((x) => x.getAddress()))
  );

  console.timeEnd("info");
};

async function main() {
  await rawBRE.run("set-DRE");
  await info();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
