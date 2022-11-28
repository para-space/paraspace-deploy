import {waitForTx} from "../../../helpers/misc-utils";
import {
  deployDelegationAwarePTokenImpl,
  deployGenericPTokenImpl,
  deployPTokenAToken,
  deployPTokenSApe,
  deployPTokenStETH,
} from "../../../helpers/contracts-deployments";
import {
  getPoolAddressesProvider,
  getPoolConfiguratorProxy,
  getProtocolDataProvider,
  getPToken,
} from "../../../helpers/contracts-getters";
import {XTokenType} from "../../../helpers/types";

import dotenv from "dotenv";
import {
  ETHERSCAN_VERIFICATION,
  GLOBAL_OVERRIDES,
} from "../../../helpers/hardhat-constants";

dotenv.config();

export const upgradePToken = async () => {
  const addressesProvider = await getPoolAddressesProvider();
  const poolAddress = await addressesProvider.getPool();
  const poolConfiguratorProxy = await getPoolConfiguratorProxy(
    await addressesProvider.getPoolConfigurator()
  );
  const protocolDataProvider = await getProtocolDataProvider();
  const allTokens = await protocolDataProvider.getAllXTokens();
  let pTokenImplementationAddress = "";
  let pTokenDelegationAwareImplementationAddress = "";
  let pTokenStETHImplementationAddress = "";
  let pTokenSApeImplementationAddress = "";
  let pTokenATokenImplementationAddress = "";
  let newImpl = "";

  for (let i = 0; i < allTokens.length; i++) {
    const token = allTokens[i];
    const pToken = await getPToken(token.tokenAddress);
    const name = await pToken.name();
    const symbol = await pToken.symbol();
    const asset = await pToken.UNDERLYING_ASSET_ADDRESS();
    const incentivesController = await pToken.getIncentivesController();
    const xTokenType = await pToken.getXTokenType();
    if (
      ![
        XTokenType.PToken,
        XTokenType.DelegationAwarePToken,
        XTokenType.PTokenStETH,
        XTokenType.PTokenSApe,
        XTokenType.PTokenAToken,
      ].includes(xTokenType)
    ) {
      continue;
    }
    const treasury = await pToken.RESERVE_TREASURY_ADDRESS();

    if (xTokenType == XTokenType.PTokenAToken) {
      if (!pTokenATokenImplementationAddress) {
        console.log("deploy PTokenAToken implementation");
        pTokenATokenImplementationAddress = (
          await deployPTokenAToken(poolAddress, ETHERSCAN_VERIFICATION)
        ).address;
      }
      newImpl = pTokenATokenImplementationAddress;
    } else if (xTokenType == XTokenType.PTokenSApe) {
      if (!pTokenSApeImplementationAddress) {
        console.log("deploy PTokenSApe implementation");
        pTokenSApeImplementationAddress = (
          await deployPTokenSApe(poolAddress, ETHERSCAN_VERIFICATION)
        ).address;
      }
      newImpl = pTokenSApeImplementationAddress;
    } else if (xTokenType == XTokenType.PTokenStETH) {
      if (!pTokenStETHImplementationAddress) {
        console.log("deploy PTokenStETH implementation");
        pTokenStETHImplementationAddress = (
          await deployPTokenStETH(poolAddress, ETHERSCAN_VERIFICATION)
        ).address;
      }
      newImpl = pTokenStETHImplementationAddress;
    } else if (xTokenType == XTokenType.DelegationAwarePToken) {
      if (!pTokenDelegationAwareImplementationAddress) {
        console.log("deploy PTokenDelegationAware implementation");
        pTokenDelegationAwareImplementationAddress = (
          await deployDelegationAwarePTokenImpl(
            poolAddress,
            ETHERSCAN_VERIFICATION
          )
        ).address;
      }
      newImpl = pTokenDelegationAwareImplementationAddress;
    } else if (xTokenType == XTokenType.PToken) {
      if (!pTokenImplementationAddress) {
        console.log("deploy PToken implementation");
        pTokenImplementationAddress = (
          await deployGenericPTokenImpl(poolAddress, ETHERSCAN_VERIFICATION)
        ).address;
      }
      newImpl = pTokenImplementationAddress;
    } else {
      continue;
    }

    const oldRevision = (await pToken.PTOKEN_REVISION()).toNumber();
    const newRevision = (
      await (await getPToken(newImpl)).PTOKEN_REVISION()
    ).toNumber();

    if (oldRevision == newRevision) {
      continue;
    }

    console.log(
      `upgrading ${token.symbol}'s version from v${oldRevision} to v${newRevision}`
    );

    await waitForTx(
      await poolConfiguratorProxy.updatePToken(
        {
          asset: asset,
          treasury: treasury,
          incentivesController: incentivesController,
          name: name,
          symbol: symbol,
          implementation: newImpl,
          params: "0x10",
        },
        GLOBAL_OVERRIDES
      )
    );
  }

  console.log("upgraded all ptoken implementation.\n");
};
