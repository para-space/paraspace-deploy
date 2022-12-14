import {waitForTx} from "../../../helpers/misc-utils";
import {
  deployGenericMoonbirdNTokenImpl,
  deployGenericNTokenImpl,
  deployNTokenBAYCImpl,
  deployNTokenMAYCImpl,
  deployUniswapV3NTokenImpl,
} from "../../../helpers/contracts-deployments";
import {
  getPoolAddressesProvider,
  getPoolConfiguratorProxy,
  getProtocolDataProvider,
  getNToken,
  getApeCoinStaking,
} from "../../../helpers/contracts-getters";
import {XTokenType} from "../../../helpers/types";

import dotenv from "dotenv";
import {
  ETHERSCAN_VERIFICATION,
  GLOBAL_OVERRIDES,
} from "../../../helpers/hardhat-constants";

dotenv.config();

export const upgradeNToken = async () => {
  const addressesProvider = await getPoolAddressesProvider();
  const poolAddress = await addressesProvider.getPool();
  const poolConfiguratorProxy = await getPoolConfiguratorProxy(
    await addressesProvider.getPoolConfigurator()
  );
  const protocolDataProvider = await getProtocolDataProvider();
  const allTokens = await protocolDataProvider.getAllXTokens();
  let nTokenImplementationAddress = "";
  let nTokenBAYCImplementationAddress = "";
  let nTokenMAYCImplementationAddress = "";
  let nTokenMoonBirdImplementationAddress = "";
  let nTokenUniSwapV3ImplementationAddress = "";
  let newImpl = "";

  for (let i = 0; i < allTokens.length; i++) {
    const token = allTokens[i];
    const nToken = await getNToken(token.tokenAddress);
    const apeCoinStaking = await getApeCoinStaking();
    const asset = await nToken.UNDERLYING_ASSET_ADDRESS();
    const incentivesController = await nToken.getIncentivesController();
    const name = await nToken.name();
    const symbol = await nToken.symbol();
    const xTokenType = await nToken.getXTokenType();

    if (
      ![
        XTokenType.NToken,
        XTokenType.NTokenMoonBirds,
        XTokenType.NTokenUniswapV3,
        XTokenType.NTokenBAYC,
        XTokenType.NTokenMAYC,
      ].includes(xTokenType)
    ) {
      continue;
    }

    if (xTokenType == XTokenType.NTokenBAYC) {
      if (!nTokenBAYCImplementationAddress) {
        console.log("deploy NTokenBAYC implementation");
        nTokenBAYCImplementationAddress = (
          await deployNTokenBAYCImpl(
            apeCoinStaking.address,
            poolAddress,
            ETHERSCAN_VERIFICATION
          )
        ).address;
      }
      newImpl = nTokenBAYCImplementationAddress;
    } else if (xTokenType == XTokenType.NTokenMAYC) {
      if (!nTokenMAYCImplementationAddress) {
        console.log("deploy NTokenMAYC implementation");
        nTokenMAYCImplementationAddress = (
          await deployNTokenMAYCImpl(
            apeCoinStaking.address,
            poolAddress,
            ETHERSCAN_VERIFICATION
          )
        ).address;
      }
      newImpl = nTokenMAYCImplementationAddress;
    } else if (xTokenType == XTokenType.NTokenUniswapV3) {
      if (!nTokenUniSwapV3ImplementationAddress) {
        console.log("deploy NTokenUniswapV3 implementation");
        nTokenUniSwapV3ImplementationAddress = (
          await deployUniswapV3NTokenImpl(poolAddress, ETHERSCAN_VERIFICATION)
        ).address;
      }
      newImpl = nTokenUniSwapV3ImplementationAddress;
    } else if (xTokenType == XTokenType.NTokenMoonBirds) {
      if (!nTokenMoonBirdImplementationAddress) {
        console.log("deploy NTokenMoonBirds implementation");
        nTokenMoonBirdImplementationAddress = (
          await deployGenericMoonbirdNTokenImpl(
            poolAddress,
            ETHERSCAN_VERIFICATION
          )
        ).address;
      }
      newImpl = nTokenMoonBirdImplementationAddress;
    } else if (xTokenType == XTokenType.NToken) {
      if (!nTokenImplementationAddress) {
        console.log("deploy NToken implementation");
        nTokenImplementationAddress = (
          await deployGenericNTokenImpl(
            poolAddress,
            false,
            ETHERSCAN_VERIFICATION
          )
        ).address;
      }
      newImpl = nTokenImplementationAddress;
    } else {
      continue;
    }

    const oldRevision = (await nToken.NTOKEN_REVISION()).toNumber();
    const newRevision = (
      await (await getNToken(newImpl)).NTOKEN_REVISION()
    ).toNumber();

    if (oldRevision == newRevision) {
      continue;
    }

    console.log(
      `upgrading ${token.symbol}'s version from v${oldRevision} to v${newRevision}`
    );

    await waitForTx(
      await poolConfiguratorProxy.updateNToken(
        {
          asset: asset,
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

  console.log("upgraded all ntoken implementation.\n");
};
