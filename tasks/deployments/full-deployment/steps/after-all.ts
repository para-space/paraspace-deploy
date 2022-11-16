import {DRE, isFork} from "../../../../helpers/misc-utils";

export const afterAll = async () => {
  console.log("running after all hook");
  if (!isFork()) {
    return;
  }
  await DRE.network.provider.send("evm_setAutomine", [false]);
  await DRE.network.provider.send("evm_setIntervalMining", [3000]);
};
