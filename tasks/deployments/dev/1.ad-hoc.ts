import rawBRE from "hardhat";
import {
  DRE,
  getParaSpaceConfig,
  isLocalTestnet,
  isMainnet,
  isPublicTestnet,
} from "../../../helpers/misc-utils";

const adHoc = async () => {
  console.time("ad-hoc");
  console.log("IS Mainnet: ", isMainnet());
  console.log("IS Local Testnet: ", isLocalTestnet());
  console.log("IS Public Testnet: ", isPublicTestnet());
  console.log(await DRE.ethers.provider.getNetwork());
  console.log(getParaSpaceConfig());

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
