import {ZERO_ADDRESS} from "../../../../helpers/constants";
import {
  deployMockIncentivesController,
  deployMockReserveAuctionStrategy,
} from "../../../../helpers/contracts-deployments";
import {
  getAllERC721Tokens,
  getAllTokens,
  getPoolProxy,
  getProtocolDataProvider,
  getPTokenSApe,
} from "../../../../helpers/contracts-getters";
import {
  getContractAddresses,
  getParaSpaceAdmins,
} from "../../../../helpers/contracts-helpers";
import {GLOBAL_OVERRIDES} from "../../../../helpers/hardhat-constants";
import {
  configureReservesByHelper,
  initReservesByHelper,
} from "../../../../helpers/init-helpers";
import {
  getParaSpaceConfig,
  isLocalTestnet,
} from "../../../../helpers/misc-utils";
import {tEthereumAddress} from "../../../../helpers/types";
import {auctionStrategyLinear} from "../../../../market-config/auctionStrategies";

export const step_11 = async (verify = false) => {
  try {
    const allTokens = await getAllTokens();
    const {paraSpaceAdminAddress} = await getParaSpaceAdmins();
    const reservesParams = getParaSpaceConfig().ReservesConfig;
    const protocolDataProvider = await getProtocolDataProvider();

    const allTokenAddresses = getContractAddresses(allTokens);

    console.log("Initialize configuration");

    const config = getParaSpaceConfig();

    const {PTokenNamePrefix, VariableDebtTokenNamePrefix, SymbolPrefix} =
      config;
    const treasuryAddress = config.Treasury;

    // Add an IncentivesController
    let incentivesController = ZERO_ADDRESS;
    let auctionStrategy: tEthereumAddress | undefined = undefined;

    if (isLocalTestnet()) {
      incentivesController = (await deployMockIncentivesController(verify))
        .address;
      const {
        maxPriceMultiplier,
        minExpPriceMultiplier,
        minPriceMultiplier,
        stepLinear,
        stepExp,
        tickLength,
      } = auctionStrategyLinear;
      auctionStrategy = (
        await deployMockReserveAuctionStrategy(
          [
            maxPriceMultiplier,
            minExpPriceMultiplier,
            minPriceMultiplier,
            stepLinear,
            stepExp,
            tickLength,
          ],
          verify
        )
      ).address;
    }

    await initReservesByHelper(
      reservesParams,
      allTokenAddresses,
      PTokenNamePrefix,
      VariableDebtTokenNamePrefix,
      SymbolPrefix,
      paraSpaceAdminAddress,
      treasuryAddress,
      incentivesController,
      verify,
      undefined,
      undefined,
      undefined,
      undefined,
      auctionStrategy
    );

    await configureReservesByHelper(
      reservesParams,
      allTokenAddresses,
      protocolDataProvider,
      paraSpaceAdminAddress
    );

    const sApe = await getPTokenSApe();
    const pool = await getPoolProxy();
    const erc721Tokens = await getAllERC721Tokens();
    await sApe.setNToken(
      (
        await pool.getReserveData(erc721Tokens.BAYC.address)
      ).xTokenAddress,
      (
        await pool.getReserveData(erc721Tokens.MAYC.address)
      ).xTokenAddress,
      GLOBAL_OVERRIDES
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
