import {waitForTx} from "../../../helpers/misc-utils";
import {deployGenericVariableDebtToken} from "../../../helpers/contracts-deployments";
import {
  getPoolAddressesProvider,
  getPoolConfiguratorProxy,
  getUiPoolDataProvider,
  getVariableDebtToken,
} from "../../../helpers/contracts-getters";

import dotenv from "dotenv";
import {GLOBAL_OVERRIDES} from "../../../helpers/hardhat-constants";

dotenv.config();

export const upgradeDebtToken = async (verify = false) => {
  const addressesProvider = await getPoolAddressesProvider();
  const poolAddress = await addressesProvider.getPool();
  const poolConfiguratorProxy = await getPoolConfiguratorProxy(
    await addressesProvider.getPoolConfigurator()
  );
  const uiPoolDataProvider = await getUiPoolDataProvider();
  const allReserves = (
    await uiPoolDataProvider.getReservesData(addressesProvider.address)
  )[0];
  let variableDebtTokenImplementationAddress = "";
  let newImpl = "";

  if (!variableDebtTokenImplementationAddress) {
    console.log("deploy PTokenAToken implementation");
    variableDebtTokenImplementationAddress = (
      await deployGenericVariableDebtToken(poolAddress, verify)
    ).address;
  }
  newImpl = variableDebtTokenImplementationAddress;

  for (let i = 0; i < allReserves.length; i++) {
    const reserve = allReserves[i];
    const variableDebtToken = await getVariableDebtToken(
      reserve.variableDebtTokenAddress
    );
    const name = await variableDebtToken.name();
    const symbol = await variableDebtToken.symbol();
    const asset = await variableDebtToken.UNDERLYING_ASSET_ADDRESS();
    const incentivesController =
      await variableDebtToken.getIncentivesController();

    const oldRevision = (
      await variableDebtToken.DEBT_TOKEN_REVISION()
    ).toNumber();
    const newRevision = (
      await (await getVariableDebtToken(newImpl)).DEBT_TOKEN_REVISION()
    ).toNumber();

    if (oldRevision == newRevision) {
      continue;
    }

    console.log(
      `upgrading ${reserve.symbol}'s version from v${oldRevision} to v${newRevision}`
    );
    const updateInput = {
      asset: asset,
      incentivesController: incentivesController,
      name: name,
      symbol: symbol,
      implementation: newImpl,
      params: "0x10",
    };
    await waitForTx(
      await poolConfiguratorProxy.updateVariableDebtToken(
        updateInput,
        GLOBAL_OVERRIDES
      )
    );
  }

  console.log("upgraded all ptoken implementation.\n");
};