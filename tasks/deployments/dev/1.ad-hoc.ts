import rawBRE from "hardhat";
import {getFirstSigner} from "../../../helpers/contracts-getters";
import {DRE} from "../../../helpers/misc-utils";
import {utils} from "ethers";
import {GLOBAL_OVERRIDES} from "../../../helpers/hardhat-constants";

const adHoc = async () => {
  await DRE.run("set-DRE");
  console.time("ad-hoc");
  console.timeEnd("ad-hoc");
};

async function main() {
  await rawBRE.run("set-DRE");
  const signer = await getFirstSigner();
  await signer.sendTransaction({
    to: "0x17816E9A858b161c3E37016D139cf618056CaCD4",
    value: utils.parseEther("3").toString(),
    ...GLOBAL_OVERRIDES,
  });
  await adHoc();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
