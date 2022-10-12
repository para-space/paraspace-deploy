import rawBRE from "hardhat";

import {
  getParaSpaceOracle,
  getPoolProxy,
  getPoolAddressesProvider,
} from "../../helpers/contracts-getters";
import {getUiPoolDataProvider} from "../../helpers/contracts-getters";
import {USDC} from "../deployments/full-deployment/helpers/constants";

const addhoc = async () => {
  const poolAddressesProvider = await getPoolAddressesProvider(
    "0x0cC1e31Ef750a5a9aFA1b5d25BD91f1BDf592Bdb"
  );

  await getPoolProxy(await poolAddressesProvider.getPool());

  const oracle = await getParaSpaceOracle(
    await poolAddressesProvider.getPriceOracle()
  );

  console.log(await oracle.getAssetPrice(USDC));

  const ui = await getUiPoolDataProvider(
    "0xD0147e8bB302ca4d2CD24522881668cB95c8B6B2"
  );

  const reserveData = await ui.getReservesData(poolAddressesProvider.address);

  console.log(reserveData);
};

async function main() {
  await rawBRE.run("set-DRE");

  await addhoc();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
