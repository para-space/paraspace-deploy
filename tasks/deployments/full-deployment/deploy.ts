import rawBRE from "hardhat";

import {Contract, Signer} from "ethers";
import {
  getEthersSigners,
  insertContractAddressInDb,
} from "../../../helpers/contracts-helpers";
import {printContracts, waitForTx} from "../../../helpers/misc-utils";
// import {deployNFTFOracle} from "./steps/0_nft_oracle";
import {
  deployACLManager,
  deployPoolAddressesProvider,
  deployPoolAddressesProviderRegistry,
  deployPoolComponents,
  deployPoolConfigurator,
  deployProtocolDataProvider,
  deployPunkGateway,
  deployPunkGatewayProxy,
  deployReservesSetupHelper,
  deployUiPoolDataProvider,
  deployWalletBalanceProvider,
  deployWETHGateway,
  deployWETHGatewayProxy,
} from "../../../helpers/contracts-deployments";
// import {deployParaSpaceTokenomics} from "./steps/1_tokens";
import {eContractid, tEthereumAddress} from "../../../helpers/types";
import {deployOracles} from "./steps/2_oracles";
import {
  getPoolProxy,
  getPoolConfiguratorProxy,
} from "../../../helpers/contracts-getters";
import ParaSpaceConfig from "../../../market-config";
import {
  configureReservesByHelper,
  initReservesByHelper,
} from "../../../helpers/init-helpers";
import {getMainnetDeployedContracts} from "./steps/0.5_deployed_tokens";
import {ETH_USD_ORACLE, PUNKS, WPUNKS} from "./helpers/constants";

import dotenv from "dotenv";
import {ZERO_ADDRESS} from "../../../helpers/constants";

dotenv.config();

const verify = process.env.ETHERSCAN_VERIFICATION === "true" ? true : false;

const deployAll = async (main: Signer, treasury: Signer) => {
  const mainAdmin = await main.getAddress();

  // STEP 1 - Deploy Parallel's NFT TWAP Oracle. should be done first and then use the returned address
  // to update the constant NFT_FLOOR_ORACLE

  console.log("deployer", mainAdmin);

  // const oracle = await deployNFTFOracle();

  // console.log("Oracle deployed to", oracle.address);

  const addressesProvider = await deployPoolAddressesProvider(
    "ParaSpaceMM",
    mainAdmin,
    verify
  );

  // const deployedTokens = await deployAllMockTokens(true);

  const deployedTokens: {[tokenSymbol: string]: Contract} =
    await getMainnetDeployedContracts();

  // const {
  //   paraspaceProxy,
  //   stakedParaSpaceProxy,
  //   pcvProxy,
  //   rewardsControllerProxy,
  // } = await deployParaSpaceTokenomics(main, treasury);

  const {paraspaceOracle} = await deployOracles(
    deployedTokens,
    addressesProvider
  );

  // Set ACL Admin
  await waitForTx(await addressesProvider.setACLAdmin(mainAdmin));

  //   // Set ACL configuration
  //   // ACL Admin should be fixed beforehand
  const aclManager = await deployACLManager(addressesProvider.address, verify);
  await waitForTx(await addressesProvider.setACLManager(aclManager.address));

  await waitForTx(await aclManager.addPoolAdmin(mainAdmin));
  await waitForTx(await aclManager.addAssetListingAdmin(mainAdmin));

  await waitForTx(await aclManager.addEmergencyAdmin(mainAdmin));

  const addressesProviderRegistry = await deployPoolAddressesProviderRegistry(
    mainAdmin,
    verify
  );
  await waitForTx(
    await addressesProviderRegistry.registerAddressesProvider(
      addressesProvider.address,
      1
    )
  );

  const {
    poolCore,
    poolParameters,
    poolMarketplace,
    poolCoreSelectors,
    poolParametersSelectors,
    poolMarketplaceSelectors,
  } = await deployPoolComponents(addressesProvider.address, verify);

  await waitForTx(
    await addressesProvider.updatePoolImpl(
      [
        {
          implAddress: poolParameters.address,
          action: 0,
          functionSelectors: poolParametersSelectors,
        },
      ],
      ZERO_ADDRESS,
      "0x"
    )
  );

  await waitForTx(
    await addressesProvider.updatePoolImpl(
      [
        {
          implAddress: poolMarketplace.address,
          action: 0,
          functionSelectors: poolMarketplaceSelectors,
        },
      ],
      ZERO_ADDRESS,
      "0x"
    )
  );

  const poolAddress = await addressesProvider.getPool();

  await waitForTx(
    await addressesProvider.updatePoolImpl(
      [
        {
          implAddress: poolCore.address,
          action: 0,
          functionSelectors: poolCoreSelectors,
        },
      ],
      poolAddress,
      poolCore.interface.encodeFunctionData("initialize", [
        addressesProvider.address,
      ])
    )
  );

  const poolProxy = await getPoolProxy(poolAddress);

  await insertContractAddressInDb(eContractid.PoolProxy, poolProxy.address);

  const poolConfiguratorImpl = await deployPoolConfigurator(verify);
  await waitForTx(
    await addressesProvider.setPoolConfiguratorImpl(
      poolConfiguratorImpl.address
    )
  );
  const poolConfiguratorProxy = await getPoolConfiguratorProxy(
    await addressesProvider.getPoolConfigurator()
  );
  await insertContractAddressInDb(
    eContractid.PoolConfiguratorProxy,
    poolConfiguratorProxy.address
  );

  await waitForTx(await aclManager.addRiskAdmin(mainAdmin));

  // Deploy deployment helpers
  await deployReservesSetupHelper(verify);

  await waitForTx(
    await addressesProvider.setPriceOracle(paraspaceOracle.address)
  );

  const allTokenAddresses = Object.entries(deployedTokens).reduce(
    (
      accum: {[tokenSymbol: string]: tEthereumAddress},
      [tokenSymbol, tokenContract]
    ) => ({
      ...accum,
      [tokenSymbol]: tokenContract.address,
    }),
    {}
  );

  const {...tokensAddressesWithoutUsd} = allTokenAddresses;
  const allReservesAddresses = {
    ...tokensAddressesWithoutUsd,
  };

  const reservesParams = ParaSpaceConfig.ReservesConfig;

  const testHelpers = await deployProtocolDataProvider(
    addressesProvider.address,
    verify
  );

  await insertContractAddressInDb(
    eContractid.ProtocolDataProvider,
    testHelpers.address
  );

  await addressesProvider.setProtocolDataProvider(testHelpers.address, {
    gasLimit: 1000000,
  });

  console.log("Initialize configuration");

  const config = ParaSpaceConfig;

  const {PTokenNamePrefix, VariableDebtTokenNamePrefix, SymbolPrefix} = config;
  // const treasuryAddress = config.ReserveFactorTreasuryAddress;

  // Add an IncentivesController
  // const mockIncentivesController = "0x6626ff0C451Dec65Bf4CFD95919aD5a66f59620C"; //await deployMockIncentivesController();

  await initReservesByHelper(
    reservesParams,
    allReservesAddresses,
    PTokenNamePrefix,
    VariableDebtTokenNamePrefix,
    SymbolPrefix,
    mainAdmin,
    await treasury.getAddress(),
    "0x6626ff0c451dec65bf4cfd95919ad5a66f59620c",
    // rewardsControllerProxy.address,
    verify
  );

  await configureReservesByHelper(
    reservesParams,
    allReservesAddresses,
    testHelpers,
    mainAdmin
  );

  // const uiIncentiveDataProvider = await deployUiIncentiveDataProviderV3Factory(
  //   true
  // );

  await deployUiPoolDataProvider(
    ParaSpaceConfig.Oracle.ETH_USD_ORACLE,
    ParaSpaceConfig.Oracle.ETH_USD_ORACLE,
    verify
  );

  await deployWalletBalanceProvider(verify);

  const wethGateway = await deployWETHGateway(
    deployedTokens["WETH"].address,
    poolProxy.address,
    verify
  );

  const wethGatewayEncodedInitialize =
    wethGateway.interface.encodeFunctionData("initialize");

  await deployWETHGatewayProxy(
    await mainAdmin,
    wethGateway.address,
    wethGatewayEncodedInitialize,
    verify
  );

  const punkGateway = await deployPunkGateway(
    [PUNKS, WPUNKS, poolProxy.address],
    verify
  );

  const punkGatewayEncodedInitialize =
    punkGateway.interface.encodeFunctionData("initialize");

  await deployPunkGatewayProxy(
    await mainAdmin,
    punkGateway.address,
    punkGatewayEncodedInitialize,
    verify
  );

  console.log("deployment ended!");
};

async function main() {
  await rawBRE.run("set-DRE");

  const [deployer, secondaryWallet] = await getEthersSigners();
  await deployAll(deployer, secondaryWallet);

  printContracts();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
