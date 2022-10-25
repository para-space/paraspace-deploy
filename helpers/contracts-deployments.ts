import {DRE, getDb, getFunctionSignatureObjs} from "./misc-utils";
import {
  tEthereumAddress,
  eContractid,
  tStringTokenSmallUnits,
  TokenContractId,
  ERC721TokenContractId,
} from "./types";
import {
  AuctionLogic__factory,
  // IPool__factory,
  MintableERC20,
  MintableERC721,
  MockReserveAuctionStrategy__factory,
  NFTFloorOracle__factory,
  ParaProxy__factory,
  X2Y2Adapter__factory,
} from "../../types";
import {StETH, MockAToken} from "../../types";
import {MockContract} from "ethereum-waffle";
import {
  getFirstSigner,
  getMintableERC721,
  getPunk,
  getWETHMocked,
} from "./contracts-getters";
import {
  getEthersSignersAddresses,
  isLocalTestnet,
  normalizeLibraryAddresses,
} from "./contracts-helpers";
import {
  ProtocolDataProvider__factory,
  PToken__factory,
  NToken__factory,
  ReservesSetupHelper__factory,
  ParaSpaceOracle__factory,
  DefaultReserveInterestRateStrategy__factory,
  DefaultReserveAuctionStrategy__factory,
  DelegationAwarePToken__factory,
  PoolAddressesProvider__factory,
  PoolAddressesProviderRegistry__factory,
  PoolConfigurator__factory,
  MintableDelegationERC20__factory,
  MintableERC20__factory,
  MintableERC721__factory,
  MockAggregator__factory,
  MockPToken__factory,
  MockVariableDebtToken__factory,
  PriceOracle__factory,
  VariableDebtToken__factory,
  WETH9Mocked__factory,
  ConfiguratorLogic__factory,
  MockIncentivesController__factory,
  MockInitializableFromConstructorImple__factory,
  MockInitializableImple__factory,
  MockInitializableImpleV2__factory,
  InitializableImmutableAdminUpgradeabilityProxy__factory,
  WETH9Mocked,
  ACLManager__factory,
  MockReserveConfiguration__factory,
  MockReentrantInitializableImple__factory,
  UiPoolDataProvider__factory,
  UiIncentiveDataProvider__factory,
  WalletBalanceProvider__factory,
  WETHGateway__factory,
  ERC721OracleWrapper__factory,
  CryptoPunksMarket__factory,
  WPunk__factory,
  WPunkGateway__factory,
  WPunk,
  CryptoPunksMarket,
  LiquidationLogic__factory,
  BoredApeYachtClub__factory,
  MutantApeYachtClub__factory,
  Doodles__factory,
  // ParaSpaceToken__factory,
  // StakedParaSpaceV3__factory,
  // RewardsController__factory,
  // PCV__factory,
  ParaSpaceFallbackOracle__factory,
  Doodles,
  BoredApeYachtClub,
  MutantApeYachtClub,
  MockTokenFaucet__factory,
  Azuki,
  CloneX,
  Land,
  Meebits,
  Moonbirds,
  Azuki__factory,
  CloneX__factory,
  Moonbirds__factory,
  Meebits__factory,
  Land__factory,
  ConduitController__factory,
  Seaport__factory,
  PausableZoneController__factory,
  CurrencyManager__factory,
  ExecutionManager__factory,
  LooksRareExchange__factory,
  RoyaltyFeeManager__factory,
  RoyaltyFeeRegistry__factory,
  TransferSelectorNFT__factory,
  TransferManagerERC721__factory,
  TransferManagerERC1155__factory,
  StrategyStandardSaleForFixedPrice__factory,
  X2Y2R1__factory,
  ERC721Delegate__factory,
  NTokenMoonBirds__factory,
  UniswapV3OracleWrapper__factory,
  NTokenUniswapV3__factory,
  MarketplaceLogic__factory,
  SeaportAdapter__factory,
  LooksRareAdapter__factory,
  UniswapV3Factory__factory,
  UniswapV3DynamicConfigsStrategy__factory,
  StETH__factory,
  MockAToken__factory,
  PTokenAToken__factory,
  PTokenStETH__factory,
  UserFlashclaimRegistry__factory,
  MockAirdropProject__factory,
  PoolCore__factory,
  PoolParameters__factory,
  PoolMarketplace__factory,
} from "../../types";

import * as nonfungiblePositionManager from "@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json";
import * as uniSwapRouter from "@uniswap/v3-periphery/artifacts/contracts/SwapRouter.sol/SwapRouter.json";
import * as nFTDescriptor from "@uniswap/v3-periphery/artifacts/contracts/libraries/NFTDescriptor.sol/NFTDescriptor.json";
import * as nonfungibleTokenPositionDescriptor from "@uniswap/v3-periphery/artifacts/contracts/NonfungibleTokenPositionDescriptor.sol/NonfungibleTokenPositionDescriptor.json";

import {
  withSaveAndVerify,
  insertContractAddressInDb,
  registerContractInDb,
} from "./contracts-helpers";
import {MintableDelegationERC20} from "../../types";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import ParaSpaceConfig from "../market-config";
import {Address} from "hardhat-deploy/dist/types";
import {Contract} from "ethers";
import {LiquidationLogicLibraryAddresses} from "../../types/factories/protocol/libraries/logic/LiquidationLogic__factory";
import {MarketplaceLogicLibraryAddresses} from "../../types/factories/protocol/libraries/logic/MarketplaceLogic__factory";
import {PoolCoreLibraryAddresses} from "../../types/factories/protocol/pool/PoolCore__factory";
import {PoolMarketplaceLibraryAddresses} from "../../types/factories/protocol/pool/PoolMarketplace__factory";
import {PoolParametersLibraryAddresses} from "../../types/factories/protocol/pool/PoolParameters__factory";
import {FormatTypes} from "ethers/lib/utils";
import {PoolConfiguratorLibraryAddresses} from "../../types/factories/protocol/pool/PoolConfigurator__factory";
import {pick} from "lodash";

declare let hre: HardhatRuntimeEnvironment;

const readArtifact = async (id: string) => {
  return (DRE as HardhatRuntimeEnvironment).artifacts.readArtifact(id);
};

export const deployPoolAddressesProvider = async (
  marketId: string,
  owner: string,
  verify?: boolean
) => {
  return withSaveAndVerify(
    await new PoolAddressesProvider__factory(await getFirstSigner()).deploy(
      marketId,
      owner
    ),
    eContractid.PoolAddressesProvider,
    [marketId, owner],
    verify
  );
};
export const deployPoolAddressesProviderRegistry = async (
  owner: string,
  verify?: boolean
) =>
  withSaveAndVerify(
    await new PoolAddressesProviderRegistry__factory(
      await getFirstSigner()
    ).deploy(owner),
    eContractid.PoolAddressesProviderRegistry,
    [owner],
    verify
  );

export const deployACLManager = async (
  provider: tEthereumAddress,
  verify?: boolean
) =>
  withSaveAndVerify(
    await new ACLManager__factory(await getFirstSigner()).deploy(provider),
    eContractid.ACLManager,
    [provider],
    verify
  );

export const deployConfiguratorLogicLibrary = async (verify?: boolean) =>
  withSaveAndVerify(
    await new ConfiguratorLogic__factory(await getFirstSigner()).deploy(),
    eContractid.ConfiguratorLogic,
    [],
    verify
  );

export const deployPoolConfigurator = async (verify?: boolean) => {
  const configuratorLogic = await deployConfiguratorLogicLibrary(verify);
  const libraries = {
    ["contracts/protocol/libraries/logic/ConfiguratorLogic.sol:ConfiguratorLogic"]:
      configuratorLogic.address,
  };
  const poolConfiguratorImpl = await new PoolConfigurator__factory(
    libraries,
    await getFirstSigner()
  ).deploy();
  return withSaveAndVerify(
    poolConfiguratorImpl,
    eContractid.PoolConfiguratorImpl,
    [],
    verify,
    libraries
  );
};

export const deploySupplyLogic = async (verify?: boolean) => {
  const supplyLogicArtifact = await readArtifact(eContractid.SupplyLogic);

  const supplyLogicFactory = await DRE.ethers.getContractFactory(
    supplyLogicArtifact.abi,
    supplyLogicArtifact.bytecode
  );
  const supplyLogic = await (
    await supplyLogicFactory.connect(await getFirstSigner()).deploy()
  ).deployed();

  return withSaveAndVerify(supplyLogic, eContractid.SupplyLogic, [], verify);
};

export const deployFlashClaimLogic = async (verify?: boolean) => {
  const supplyLogicArtifact = await readArtifact(eContractid.FlashClaimLogic);

  const supplyLogicFactory = await DRE.ethers.getContractFactory(
    supplyLogicArtifact.abi,
    supplyLogicArtifact.bytecode
  );
  const supplyLogic = await (
    await supplyLogicFactory.connect(await getFirstSigner()).deploy()
  ).deployed();

  return withSaveAndVerify(
    supplyLogic,
    eContractid.FlashClaimLogic,
    [],
    verify
  );
};

export const deployBorrowLogic = async (verify?: boolean) => {
  const borrowLogicArtifact = await readArtifact(eContractid.BorrowLogic);

  const borrowLogicFactory = await DRE.ethers.getContractFactory(
    borrowLogicArtifact.abi,
    borrowLogicArtifact.bytecode
  );
  const borrowLogic = await (
    await borrowLogicFactory.connect(await getFirstSigner()).deploy()
  ).deployed();

  return withSaveAndVerify(borrowLogic, eContractid.BorrowLogic, [], verify);
};

export const deployLiquidationLogic = async (
  libraries: LiquidationLogicLibraryAddresses,
  verify?: boolean
) => {
  const liquidationLibrary = await new LiquidationLogic__factory(
    libraries,
    await getFirstSigner()
  ).deploy();

  return withSaveAndVerify(
    liquidationLibrary,
    eContractid.LiquidationLogic,
    [],
    verify,
    libraries
  );
};

export const deployAuctionLogic = async (verify?: boolean) => {
  const auctionLibrary = await new AuctionLogic__factory(
    await getFirstSigner()
  ).deploy();

  return withSaveAndVerify(
    auctionLibrary,
    eContractid.AuctionLogic,
    [],
    verify
  );
};

export const deployBridgeLogic = async (verify?: boolean) => {
  const bridgeLogicArtifact = await readArtifact(eContractid.BridgeLogic);
  const bridgeLogicFactory = await DRE.ethers.getContractFactory(
    bridgeLogicArtifact.abi,
    bridgeLogicArtifact.bytecode
  );
  const bridgeLogic = await (
    await bridgeLogicFactory.connect(await getFirstSigner()).deploy()
  ).deployed();

  return withSaveAndVerify(bridgeLogic, eContractid.BridgeLogic, [], verify);
};

export const deployPoolLogic = async (verify?: boolean) => {
  const poolLogicArtifact = await readArtifact(eContractid.PoolLogic);

  const poolLogicFactory = await DRE.ethers.getContractFactory(
    poolLogicArtifact.abi,
    poolLogicArtifact.bytecode
  );
  const poolLogic = await (
    await poolLogicFactory.connect(await getFirstSigner()).deploy()
  ).deployed();

  return withSaveAndVerify(poolLogic, eContractid.PoolLogic, [], verify);
};

export const deployPoolCoreLibraries = async (
  verify?: boolean
): Promise<PoolCoreLibraryAddresses> => {
  const supplyLogic = await deploySupplyLogic(verify);
  const borrowLogic = await deployBorrowLogic(verify);
  const auctionLogic = await deployAuctionLogic(verify);
  const liquidationLogic = await deployLiquidationLogic(
    {
      ["contracts/protocol/libraries/logic/SupplyLogic.sol:SupplyLogic"]:
        supplyLogic.address,
    },
    verify
  );
  const flashClaimLogic = await deployFlashClaimLogic(verify);

  return {
    ["contracts/protocol/libraries/logic/AuctionLogic.sol:AuctionLogic"]:
      auctionLogic.address,
    ["contracts/protocol/libraries/logic/LiquidationLogic.sol:LiquidationLogic"]:
      liquidationLogic.address,
    ["contracts/protocol/libraries/logic/SupplyLogic.sol:SupplyLogic"]:
      supplyLogic.address,
    ["contracts/protocol/libraries/logic/BorrowLogic.sol:BorrowLogic"]:
      borrowLogic.address,
    ["contracts/protocol/libraries/logic/FlashClaimLogic.sol:FlashClaimLogic"]:
      flashClaimLogic.address,
  };
};

export const deployPoolMarketplaceLibraries = async (
  coreLibraries: PoolCoreLibraryAddresses,
  verify?: boolean
): Promise<PoolMarketplaceLibraryAddresses> => {
  const marketplaceLogic = await deployMarketplaceLogic(
    pick(coreLibraries, [
      "contracts/protocol/libraries/logic/SupplyLogic.sol:SupplyLogic",
      "contracts/protocol/libraries/logic/BorrowLogic.sol:BorrowLogic",
    ]),
    verify
  );
  return {
    ["contracts/protocol/libraries/logic/MarketplaceLogic.sol:MarketplaceLogic"]:
      marketplaceLogic.address,
  };
};

export const deployPoolParametersLibraries = async (
  verify?: boolean
): Promise<PoolParametersLibraryAddresses> => {
  const poolLogic = await deployPoolLogic(verify);
  return {
    ["contracts/protocol/libraries/logic/PoolLogic.sol:PoolLogic"]:
      poolLogic.address,
  };
};

const checkPoolSignatures = () => {
  const poolCoreSelectors = getFunctionSignatureObjs(PoolCore__factory.abi);

  const poolParametersSelectors = getFunctionSignatureObjs(
    PoolParameters__factory.abi
  );

  const poolMarketplaceSelectors = getFunctionSignatureObjs(
    PoolMarketplace__factory.abi
  );

  const poolProxySelectors = getFunctionSignatureObjs(ParaProxy__factory.abi);

  const allSelectors = {};
  const poolSelectors = [
    ...poolCoreSelectors,
    ...poolParametersSelectors,
    ...poolMarketplaceSelectors,
    ...poolProxySelectors,
  ];
  for (const selector of poolSelectors) {
    if (!allSelectors[selector.signature]) {
      allSelectors[selector.signature] = selector;
    } else {
      throw new Error(
        `added function ${selector.name} conflict with exist function:${
          allSelectors[selector.signature].name
        }`
      );
    }
  }

  return {poolCoreSelectors, poolParametersSelectors, poolMarketplaceSelectors};
};

export const deployPoolComponents = async (
  provider: string,
  verify?: boolean
) => {
  const coreLibraries = await deployPoolCoreLibraries(verify);
  const marketplaceLibraries = await deployPoolMarketplaceLibraries(
    coreLibraries,
    verify
  );
  const parametersLibraries = await deployPoolParametersLibraries(verify);

  const poolCore = await new PoolCore__factory(
    coreLibraries,
    await getFirstSigner()
  ).deploy(provider);

  const poolParameters = await new PoolParameters__factory(
    parametersLibraries,
    await getFirstSigner()
  ).deploy(provider);

  const poolMarketplace = await new PoolMarketplace__factory(
    marketplaceLibraries,
    await getFirstSigner()
  ).deploy(provider);

  const {poolCoreSelectors, poolParametersSelectors, poolMarketplaceSelectors} =
    checkPoolSignatures();

  return {
    poolCore: await withSaveAndVerify(
      poolCore,
      eContractid.PoolCoreImpl,
      [provider],
      verify,
      coreLibraries,
      poolCoreSelectors
    ),
    poolParameters: await withSaveAndVerify(
      poolParameters,
      eContractid.PoolParametersImpl,
      [provider],
      verify,
      parametersLibraries,
      poolParametersSelectors
    ),
    poolMarketplace: await withSaveAndVerify(
      poolMarketplace,
      eContractid.PoolMarketplaceImpl,
      [provider],
      verify,
      marketplaceLibraries,
      poolMarketplaceSelectors
    ),
    poolCoreSelectors: poolCoreSelectors.map((s) => s.signature),
    poolParametersSelectors: poolParametersSelectors.map((s) => s.signature),
    poolMarketplaceSelectors: poolMarketplaceSelectors.map((s) => s.signature),
  };
};

export const deployPriceOracle = async (verify?: boolean) =>
  withSaveAndVerify(
    await new PriceOracle__factory(await getFirstSigner()).deploy(),
    eContractid.PriceOracle,
    [],
    verify
  );

export const deployMockAggregator = async (
  symbol: string,
  price: tStringTokenSmallUnits,
  verify?: boolean
) =>
  withSaveAndVerify(
    await new MockAggregator__factory(await getFirstSigner()).deploy(price),
    eContractid.MockAggregator.concat(`.${symbol}`),
    [price],
    verify
  );

export const deployParaSpaceOracle = async (
  args: [
    tEthereumAddress,
    tEthereumAddress[],
    tEthereumAddress[],
    tEthereumAddress,
    tEthereumAddress,
    string
  ],
  verify?: boolean
) =>
  withSaveAndVerify(
    await new ParaSpaceOracle__factory(await getFirstSigner()).deploy(...args),
    eContractid.ParaSpaceOracle,
    [...args],
    verify
  );

export const deployNftFloorPriceOracle = async (
  projects: tEthereumAddress[],
  verify?: boolean
) => {
  const deployer = await (await getFirstSigner()).getAddress();
  const feeders = await getEthersSignersAddresses();

  const nftFloorOracle = await withSaveAndVerify(
    await new NFTFloorOracle__factory(await getFirstSigner()).deploy(),
    eContractid.NFTFloorOracle,
    [],
    verify
  );

  await nftFloorOracle.initialize(deployer, feeders, projects);

  return nftFloorOracle;
};

export const deployProtocolDataProvider = async (
  addressesProvider: tEthereumAddress,
  verify?: boolean
) =>
  withSaveAndVerify(
    await new ProtocolDataProvider__factory(await getFirstSigner()).deploy(
      addressesProvider
    ),
    eContractid.ProtocolDataProvider,
    [addressesProvider],
    verify
  );

export const deployMintableERC20 = async (
  args: [string, string, string],
  verify?: boolean
): Promise<MintableERC20> =>
  withSaveAndVerify(
    await new MintableERC20__factory(await getFirstSigner()).deploy(...args),
    args[1],
    [...args],
    verify
  );

export const deployMintableERC721 = async (
  args: [string, string, string],
  verify?: boolean
): Promise<MintableERC721> =>
  withSaveAndVerify(
    await new MintableERC721__factory(await getFirstSigner()).deploy(...args),
    args[1],
    [...args],
    verify
  );

export const deployMintableDelegationERC20 = async (
  args: [string, string, string],
  verify?: boolean
): Promise<MintableDelegationERC20> =>
  withSaveAndVerify(
    await new MintableDelegationERC20__factory(await getFirstSigner()).deploy(
      ...args
    ),
    eContractid.MintableDelegationERC20,
    [...args],
    verify
  );

export const deployMockReserveAuctionStrategy = async (
  args: [string, string, string, string, string, string],
  verify?: boolean
) =>
  withSaveAndVerify(
    await new MockReserveAuctionStrategy__factory(
      await getFirstSigner()
    ).deploy(...args),
    eContractid.MockReserveAuctionStrategy,
    [...args],
    verify
  );

export const deployReserveAuctionStrategy = async (
  strategyName: string,
  args: [string, string, string, string, string, string],
  verify?: boolean
) =>
  withSaveAndVerify(
    await new DefaultReserveAuctionStrategy__factory(
      await getFirstSigner()
    ).deploy(...args),
    strategyName,
    [...args],
    verify
  );

export const deployReserveInterestRateStrategy = async (
  strategyName: string,
  args: [tEthereumAddress, string, string, string, string],
  verify?: boolean
) =>
  withSaveAndVerify(
    await new DefaultReserveInterestRateStrategy__factory(
      await getFirstSigner()
    ).deploy(...args),
    strategyName,
    [...args],
    verify
  );

export const deployGenericVariableDebtToken = async (
  poolAddress: tEthereumAddress,
  verify?: boolean
) =>
  withSaveAndVerify(
    await new VariableDebtToken__factory(await getFirstSigner()).deploy(
      poolAddress
    ),
    eContractid.VariableDebtTokenImpl,
    [poolAddress],
    verify
  );

export const deployGenericPToken = async (
  [
    poolAddress,
    underlyingAssetAddress,
    treasuryAddress,
    incentivesController,
    name,
    symbol,
  ]: [
    tEthereumAddress,
    tEthereumAddress,
    tEthereumAddress,
    tEthereumAddress,
    string,
    string
  ],
  verify?: boolean
) => {
  const instance = await withSaveAndVerify(
    await new PToken__factory(await getFirstSigner()).deploy(poolAddress),
    eContractid.PTokenImpl,
    [poolAddress],
    verify
  );

  await instance.initialize(
    poolAddress,
    treasuryAddress,
    underlyingAssetAddress,
    incentivesController,
    "18",
    name,
    symbol,
    "0x10"
  );

  return instance;
};

export const deployGenericPTokenImpl = async (
  poolAddress: tEthereumAddress,
  verify?: boolean
) =>
  withSaveAndVerify(
    await new PToken__factory(await getFirstSigner()).deploy(poolAddress),
    eContractid.PTokenImpl,
    [poolAddress],
    verify
  );

export const deployGenericNTokenImpl = async (
  poolAddress: tEthereumAddress,
  atomicPricing: boolean,
  verify?: boolean
) =>
  withSaveAndVerify(
    await new NToken__factory(await getFirstSigner()).deploy(
      poolAddress,
      atomicPricing
    ),
    eContractid.NTokenImpl,
    [poolAddress, atomicPricing],
    verify
  );

export const deployUniswapV3NTokenImpl = async (
  poolAddress: tEthereumAddress,
  verify?: boolean
) =>
  withSaveAndVerify(
    await new NTokenUniswapV3__factory(await getFirstSigner()).deploy(
      poolAddress
    ),
    eContractid.NTokenUniswapV3Impl,
    [poolAddress],
    verify
  );

export const deployGenericMoonbirdNTokenImpl = async (
  poolAddress: tEthereumAddress,
  verify?: boolean
) =>
  withSaveAndVerify(
    await new NTokenMoonBirds__factory(await getFirstSigner()).deploy(
      poolAddress
    ),
    eContractid.NTokenMoonBirdsImpl,
    [poolAddress],
    verify
  );

export const deployDelegationAwarePToken = async (
  [
    poolAddress,
    underlyingAssetAddress,
    treasuryAddress,
    incentivesController,
    name,
    symbol,
  ]: [
    tEthereumAddress,
    tEthereumAddress,
    tEthereumAddress,
    tEthereumAddress,
    string,
    string
  ],
  verify?: boolean
) => {
  const instance = await withSaveAndVerify(
    await new DelegationAwarePToken__factory(await getFirstSigner()).deploy(
      poolAddress
    ),
    eContractid.DelegationAwarePTokenImpl,
    [poolAddress],
    verify
  );

  await instance.initialize(
    poolAddress,
    treasuryAddress,
    underlyingAssetAddress,
    incentivesController,
    "18",
    name,
    symbol,
    "0x10"
  );

  return instance;
};

export const deployDelegationAwarePTokenImpl = async (
  poolAddress: tEthereumAddress,
  verify?: boolean
) =>
  withSaveAndVerify(
    await new DelegationAwarePToken__factory(await getFirstSigner()).deploy(
      poolAddress
    ),
    eContractid.DelegationAwarePTokenImpl,
    [poolAddress],
    verify
  );

export const deployAllERC20Tokens = async (verify?: boolean) => {
  const tokens: {
    [symbol: string]:
      | MockContract
      | MintableERC20
      | WETH9Mocked
      | StETH
      | MockAToken;
  } = {};

  const protoConfigData = ParaSpaceConfig.ReservesConfig;

  for (const tokenSymbol of Object.keys(TokenContractId)) {
    const db = getDb();
    const contractAddress = db
      .get(`${tokenSymbol}.${DRE.network.name}`)
      .value()?.address;

    // if contract address is already in db, then skip to next tokenSymbol
    if (contractAddress) {
      console.log("contract address is already in db ", tokenSymbol);
      continue;
    } else {
      console.log("deploying now ", tokenSymbol);

      if (tokenSymbol === "WETH") {
        if (isLocalTestnet(DRE)) {
          tokens[tokenSymbol] = await deployWETHMocked(verify);
        } else {
          insertContractAddressInDb(
            eContractid.WETHMocked,
            ParaSpaceConfig.WETH,
            false
          );
          tokens[tokenSymbol] = await getWETHMocked(ParaSpaceConfig.WETH);
        }
        continue;
      }

      if (tokenSymbol === "stETH") {
        tokens[tokenSymbol] = await deployStETH(
          [tokenSymbol, tokenSymbol, "18"],
          verify
        );
        continue;
      }

      if (tokenSymbol === "aWETH") {
        tokens[tokenSymbol] = await deployMockAToken(
          [tokenSymbol, tokenSymbol, "18"],
          verify
        );
        continue;
      }

      const configData = protoConfigData[tokenSymbol];
      const args: [string, string, string] = [
        tokenSymbol,
        tokenSymbol,
        configData ? configData.reserveDecimals : 18,
      ];
      tokens[tokenSymbol] = await deployMintableERC20(args, verify);
    }
  }

  return tokens;
};

export const deployAllERC721Tokens = async (verify?: boolean) => {
  const tokens: {
    [symbol: string]:
      | MockContract
      | MintableERC721
      | WPunk
      | CryptoPunksMarket
      | Doodles
      | BoredApeYachtClub
      | MutantApeYachtClub
      | Azuki
      | CloneX
      | Land
      | Meebits
      | Moonbirds
      | Contract;
  } = {};

  for (const tokenSymbol of Object.keys(ERC721TokenContractId)) {
    const db = getDb();
    const contractAddress = db
      .get(`${tokenSymbol}.${DRE.network.name}`)
      .value()?.address;

    // if contract address is already in db, then skip to next tokenSymbol
    if (contractAddress) {
      console.log("contract address is already in db ", tokenSymbol);
      continue;
    } else {
      console.log("deploying now ", tokenSymbol);

      // we are using hardhat, we want to use mock ERC721 contracts
      if (isLocalTestnet(DRE)) {
        if (tokenSymbol === "WPUNKS") {
          const cryptoPunksMarket = await deployCryptoPunksMarket([], verify);
          tokens["PUNKS"] = cryptoPunksMarket;

          const wrappedPunk = await deployWrappedPunk(
            [cryptoPunksMarket.address],
            verify
          );
          tokens[tokenSymbol] = wrappedPunk;

          continue;
        }

        if (tokenSymbol === "MOONBIRD") {
          const moonbirdContract = await deployMoonbirds(
            [
              "MOON",
              "MOON",
              "0x0000000000000000000000000000000000000000",
              "0x69C33aB569816F1D564a420490AbB894a44071Fb",
              "0x69C33aB569816F1D564a420490AbB894a44071Fb",
            ],
            verify
          );

          tokens["MOONBIRD"] = moonbirdContract;

          continue;
        }

        if (tokenSymbol === "UniswapV3") {
          const weth = await getWETHMocked();

          const positionDescriptor =
            await deployNonfungibleTokenPositionDescriptor(
              [
                weth.address,
                // 'ETH' as a bytes32 string
                "0x4554480000000000000000000000000000000000000000000000000000000000",
              ],
              verify
            );
          const factory = await deployUniswapV3([], verify);
          await deployUniswapSwapRouter(
            [factory.address, weth.address],
            verify
          );
          const nonfungiblePositionManager =
            await deployNonfungiblePositionManager(
              [factory.address, weth.address, positionDescriptor.address],
              verify
            );
          tokens["UniswapV3"] = nonfungiblePositionManager;
          continue;
        }

        tokens[tokenSymbol] = await deployMintableERC721(
          [tokenSymbol, tokenSymbol, ""],
          verify
        );
      }
      // else use actual token addresses
      else {
        switch (tokenSymbol) {
          case "WPUNKS":
            tokens["PUNKS"] = await deployCryptoPunksMarket([], verify);

            tokens[tokenSymbol] = await deployWrappedPunk(
              [tokens["PUNKS"].address],
              verify
            );

            break;
          case "BAYC":
            tokens[tokenSymbol] = await deployBAYC(
              [tokenSymbol, tokenSymbol, "8000", "0"],
              verify
            );
            // code block
            break;

          case "MAYC":
            tokens[tokenSymbol] = await deployMAYC(
              [
                tokenSymbol,
                tokenSymbol,
                "0x0000000000000000000000000000000000000000",
                "0x0000000000000000000000000000000000000000",
              ],
              verify
            );
            // code block
            break;
          case "DOODLE":
            tokens[tokenSymbol] = await deployDoodle([], verify);
            // code block
            break;
          case "AZUKI":
            tokens[tokenSymbol] = await deployAzuki(
              [5, 10000, 8900, 200],
              verify
            );
            // code block
            break;
          case "CLONEX":
            tokens[tokenSymbol] = await deployCloneX([], verify);
            // code block
            break;
          case "MOONBIRD":
            const moonbirdContract = await deployMoonbirds(
              [
                "MOON",
                "MOON",
                "0x0000000000000000000000000000000000000000",
                "0x69C33aB569816F1D564a420490AbB894a44071Fb",
                "0x69C33aB569816F1D564a420490AbB894a44071Fb",
              ],
              verify
            );

            await moonbirdContract.setNestingOpen(true);
            tokens[tokenSymbol] = moonbirdContract;

            // code block
            break;
          case "MEEBITS":
            // eslint-disable-next-line no-case-declarations
            const punk = await getPunk();
            tokens[tokenSymbol] = await deployMeebits(
              [
                punk.address,
                "0x0000000000000000000000000000000000000000",
                "0x69C33aB569816F1D564a420490AbB894a44071Fb", // shared wallet account 1
              ],
              verify
            );
            // code block
            break;
          case "OTHR":
            tokens[tokenSymbol] = await deployOTHR(
              [
                "OTHR",
                "OTHR",
                [
                  "0x0000000000000000000000000000000000000000",
                  "0x0000000000000000000000000000000000000000",
                  "0x0000000000000000000000000000000000000000",
                ],
                [10, 100, 1000, 10000],
                [["0x69C33aB569816F1D564a420490AbB894a44071Fb", 100]],
                "0x69C33aB569816F1D564a420490AbB894a44071Fb",
                "0x69C33aB569816F1D564a420490AbB894a44071Fb",
                "0x63616e6469646174653100000000000000000000000000000000000000000000",
                5,
                "0x69C33aB569816F1D564a420490AbB894a44071Fb",
              ],
              verify
            );
            // code block
            break;
          case "UniswapV3":
            insertContractAddressInDb(
              eContractid.UniswapV3,
              ParaSpaceConfig.Uniswap.V3NFTPositionManager,
              false
            );
            tokens[tokenSymbol] = await getMintableERC721(
              ParaSpaceConfig.Uniswap.V3NFTPositionManager
            );
            break;
          default:
            tokens[tokenSymbol] = await deployMintableERC721(
              [tokenSymbol, tokenSymbol, ""],
              verify
            );
        }
      }
    }
  }

  return tokens;
};

export const deployMoonbirds = async (
  args: [string, string, tEthereumAddress, tEthereumAddress, tEthereumAddress],
  verify?: boolean
) =>
  withSaveAndVerify(
    await new Moonbirds__factory(await getFirstSigner()).deploy(...args),
    eContractid.MOONBIRD,
    [...args],
    verify
  );

export const deployReservesSetupHelper = async (verify?: boolean) =>
  withSaveAndVerify(
    await new ReservesSetupHelper__factory(await getFirstSigner()).deploy(),
    eContractid.ReservesSetupHelper,
    [],
    verify
  );

export const deployInitializableImmutableAdminUpgradeabilityProxy = async (
  args: [tEthereumAddress],
  verify?: boolean
) =>
  withSaveAndVerify(
    await new InitializableImmutableAdminUpgradeabilityProxy__factory(
      await getFirstSigner()
    ).deploy(...args),
    eContractid.InitializableImmutableAdminUpgradeabilityProxy,
    [...args],
    verify
  );

export const deployWETHMocked = async (verify?: boolean) =>
  withSaveAndVerify(
    await new WETH9Mocked__factory(await getFirstSigner()).deploy(),
    eContractid.WETHMocked,
    [],
    verify
  );

export const deployMockVariableDebtToken = async (
  args: [
    tEthereumAddress,
    tEthereumAddress,
    tEthereumAddress,
    string,
    string,
    string
  ],
  verify?: boolean
) => {
  const instance = await withSaveAndVerify(
    await new MockVariableDebtToken__factory(await getFirstSigner()).deploy(
      args[0]
    ),
    eContractid.MockVariableDebtToken,
    [args[0]],
    verify
  );

  await instance.initialize(
    args[0],
    args[1],
    args[2],
    "18",
    args[3],
    args[4],
    args[5]
  );

  return instance;
};

export const deployMockPToken = async (
  args: [
    tEthereumAddress,
    tEthereumAddress,
    tEthereumAddress,
    tEthereumAddress,
    string,
    string,
    string
  ],
  verify?: boolean
) => {
  const instance = await withSaveAndVerify(
    await new MockPToken__factory(await getFirstSigner()).deploy(args[0]),
    eContractid.MockPToken,
    [args[0]],
    verify
  );

  await instance.initialize(
    args[0],
    args[2],
    args[1],
    args[3],
    "18",
    args[4],
    args[5],
    args[6]
  );

  return instance;
};

export const deployMockIncentivesController = async (verify?: boolean) =>
  withSaveAndVerify(
    await new MockIncentivesController__factory(
      await getFirstSigner()
    ).deploy(),
    eContractid.MockIncentivesController,
    [],
    verify
  );

export const deployMockReserveConfiguration = async (verify?: boolean) =>
  withSaveAndVerify(
    await new MockReserveConfiguration__factory(
      await getFirstSigner()
    ).deploy(),
    eContractid.MockReserveConfiguration,
    [],
    verify
  );

// export const deployMockPool = async (verify?: boolean) =>
//   withSaveAndVerify(
//     await new MockPool__factory(await getFirstSigner()).deploy(),
//     eContractid.MockPool,
//     [],
//     verify
//   );

export const deployMockInitializableImple = async (verify?: boolean) =>
  withSaveAndVerify(
    await new MockInitializableImple__factory(await getFirstSigner()).deploy(),
    eContractid.MockInitializableImple,
    [],
    verify
  );

export const deployMockInitializableImpleV2 = async (verify?: boolean) =>
  withSaveAndVerify(
    await new MockInitializableImpleV2__factory(
      await getFirstSigner()
    ).deploy(),
    eContractid.MockInitializableImpleV2,
    [],
    verify
  );

export const deployMockInitializableFromConstructorImple = async (
  args: [string],
  verify?: boolean
) =>
  withSaveAndVerify(
    await new MockInitializableFromConstructorImple__factory(
      await getFirstSigner()
    ).deploy(...args),
    eContractid.MockInitializableFromConstructorImple,
    [...args],
    verify
  );

export const deployMockReentrantInitializableImple = async (verify?: boolean) =>
  withSaveAndVerify(
    await new MockReentrantInitializableImple__factory(
      await getFirstSigner()
    ).deploy(),
    eContractid.MockReentrantInitializableImple,
    [],
    verify
  );

export const deployUiPoolDataProvider = async (
  arg1: string,
  arg2: string,
  verify?: boolean
) =>
  withSaveAndVerify(
    await new UiPoolDataProvider__factory(await getFirstSigner()).deploy(
      arg1,
      arg2
    ),
    eContractid.UiPoolDataProvider,
    [arg1, arg2],
    verify
  );

export const deployUiIncentiveDataProvider = async (verify?: boolean) =>
  withSaveAndVerify(
    await new UiIncentiveDataProvider__factory(await getFirstSigner()).deploy(),
    eContractid.UiIncentiveDataProvider,
    [],
    verify
  );

export const deployWalletBalanceProvider = async (verify?: boolean) =>
  withSaveAndVerify(
    await new WalletBalanceProvider__factory(await getFirstSigner()).deploy(),
    eContractid.WalletBalanceProvider,
    [],
    verify
  );

export const deployWETHGateway = async (
  weth: string,
  pool: Address,
  verify?: boolean
) =>
  withSaveAndVerify(
    await new WETHGateway__factory(await getFirstSigner()).deploy(weth, pool),
    eContractid.WETHGatewayImpl,
    [weth, pool],
    verify
  );

export const deployWETHGatewayProxy = async (
  admin: string,
  wethGateway: string,
  initData: string,
  verify?: boolean
) => {
  const wethGatewayProxy =
    await new InitializableImmutableAdminUpgradeabilityProxy__factory(
      await getFirstSigner()
    ).deploy(admin);
  await wethGatewayProxy["initialize(address,bytes)"](wethGateway, initData);
  return withSaveAndVerify(
    wethGatewayProxy,
    eContractid.WETHGatewayProxy,
    [admin],
    verify
  );
};

export const deployMoonbirdHelper = async (verify?: boolean) => {
  const moonBirdHelperArtifact = await readArtifact(eContractid.MoonBirdHelper);

  const moonBirdHelperFactory = await DRE.ethers.getContractFactory(
    moonBirdHelperArtifact.abi,
    moonBirdHelperArtifact.bytecode
  );
  const moonBirdHelper = await (
    await moonBirdHelperFactory.connect(await getFirstSigner()).deploy()
  ).deployed();

  return withSaveAndVerify(moonBirdHelper, eContractid.PoolLogic, [], verify);
};

export const deployMeebits = async (
  args: [tEthereumAddress, tEthereumAddress, tEthereumAddress],
  verify?: boolean
) =>
  withSaveAndVerify(
    await new Meebits__factory(await getFirstSigner()).deploy(...args),
    eContractid.Meebits,
    [...args],
    verify
  );

export const deployAzuki = async (
  args: [number, number, number, number],
  verify?: boolean
) =>
  withSaveAndVerify(
    await new Azuki__factory(await getFirstSigner()).deploy(...args),
    eContractid.Azuki,
    [...args],
    verify
  );

export const deployOTHR = async (
  // eslint-disable-next-line
  args: [any, any, any, any, any, any, any, any, any, any],
  verify?: boolean
) =>
  withSaveAndVerify(
    await new Land__factory(await getFirstSigner()).deploy(...args),
    eContractid.OTHR,
    [...args],
    verify
  );

export const deployCloneX = async (args: [], verify?: boolean) =>
  withSaveAndVerify(
    await new CloneX__factory(await getFirstSigner()).deploy(...args),
    eContractid.CloneX,
    [...args],
    verify
  );

export const deployDoodle = async (args: [], verify?: boolean) =>
  withSaveAndVerify(
    await new Doodles__factory(await getFirstSigner()).deploy(...args),
    eContractid.Doodles,
    [...args],
    verify
  );

export const deployMAYC = async (
  args: [string, string, string, string],
  verify?: boolean
) =>
  withSaveAndVerify(
    await new MutantApeYachtClub__factory(await getFirstSigner()).deploy(
      ...args
    ),
    eContractid.MutantApeYachtClub,
    [...args],
    verify
  );

export const deployBAYC = async (
  args: [string, string, string, string],
  verify?: boolean
) =>
  withSaveAndVerify(
    await new BoredApeYachtClub__factory(await getFirstSigner()).deploy(
      ...args
    ),
    eContractid.BoredApeYachtClub,
    [...args],
    verify
  );

export const deployERC721OracleWrapper = async (
  addressesProvider: string,
  oracleAddress: string,
  asset: string,
  verify?: boolean
) =>
  withSaveAndVerify(
    await new ERC721OracleWrapper__factory(await getFirstSigner()).deploy(
      addressesProvider,
      oracleAddress,
      asset
    ),
    eContractid.ERC721OracleWrapper,
    [addressesProvider, oracleAddress, asset],
    verify
  );

export const deployCryptoPunksMarket = async (args: [], verify?: boolean) =>
  withSaveAndVerify(
    await new CryptoPunksMarket__factory(await getFirstSigner()).deploy(
      ...args
    ),
    eContractid.CryptoPunksMarket,
    [...args],
    verify
  );

export const deployWrappedPunk = async (
  args: [tEthereumAddress],
  verify?: boolean
) =>
  withSaveAndVerify(
    await new WPunk__factory(await getFirstSigner()).deploy(...args),
    eContractid.WPunk,
    [...args],
    verify
  );

export const deployPunkGateway = async (
  args: [
    tEthereumAddress,
    tEthereumAddress,
    // tEthereumAddress,
    tEthereumAddress
  ],
  verify?: boolean
) => {
  const punkImpl = await new WPunkGateway__factory(
    await getFirstSigner()
  ).deploy(...args);
  return withSaveAndVerify(
    punkImpl,
    eContractid.WPunkGatewayImpl,
    [...args],
    verify
  );
};

export const deployPunkGatewayProxy = async (
  admin: string,
  punkGateway: string,
  initData: string,
  verify?: boolean
) => {
  const punkGatewayProxy =
    await new InitializableImmutableAdminUpgradeabilityProxy__factory(
      await getFirstSigner()
    ).deploy(admin);
  await punkGatewayProxy["initialize(address,bytes)"](punkGateway, initData);
  return withSaveAndVerify(
    punkGatewayProxy,
    eContractid.WPunkGatewayProxy,
    [admin],
    verify
  );
};

// export const deployParaSpaceToken = async (verify?: boolean) => {
//   const paraspaceToken = await new ParaSpaceToken__factory(
//     await getFirstSigner()
//   ).deploy();
//
//   return withSaveAndVerify(paraspaceToken, eContractid.ParaSpace, [], verify);
// };
//
// export const deployStakedParaSpace = async (
//   args: [string, string, string, string, string, string, string, string],
//   verify?: boolean
// ) => {
//   const paraspaceStakeV3 = await new StakedParaSpaceV3__factory(
//     await getFirstSigner()
//   ).deploy(...args);
//
//   return withSaveAndVerify(
//     paraspaceStakeV3,
//     eContractid.sParaSpace,
//     [...args],
//     verify
//   );
// };
//
// export const deployRewardsController = async (
//   emissionManager: string,
//   verify?: boolean
// ) => {
//   console.log("deploying reward controller");
//   const rewardsController = await new RewardsController__factory(
//     await getFirstSigner()
//   ).deploy(emissionManager);
//
//   return withSaveAndVerify(
//     rewardsController,
//     eContractid.RewardsController,
//     [emissionManager],
//     verify
//   );
// };
//
// export const deployPCV = async (
//   stakedParaSpace: string,
//   paraspace: string,
//   verify?: boolean
// ) => {
//   const pcv = await new PCV__factory(await getFirstSigner()).deploy(
//     stakedParaSpace,
//     paraspace
//   );
//
//   return withSaveAndVerify(
//     pcv,
//     eContractid.PCV,
//     [stakedParaSpace, paraspace],
//     verify
//   );
// };

export const deployParaSpaceFallbackOracle = async (
  args: [string, string, string, string, string],
  verify?: boolean
) => {
  const omnoFallBackOracle = await new ParaSpaceFallbackOracle__factory(
    await getFirstSigner()
  ).deploy(...args);

  return withSaveAndVerify(
    omnoFallBackOracle,
    eContractid.FallbackOracle,
    [...args],
    verify
  );
};

export const deployMockTokenFaucet = async (
  erc20configs,
  erc721configs,
  punkConfig,
  verify?: boolean
) =>
  withSaveAndVerify(
    await new MockTokenFaucet__factory(await getFirstSigner()).deploy(
      erc20configs,
      erc721configs,
      punkConfig
    ),
    eContractid.MockTokenFaucet,
    [erc20configs, erc721configs, punkConfig],
    verify
  );

export const deploySeaportAdapter = async (verify?: boolean) => {
  const seaportAdapter = await new SeaportAdapter__factory(
    await getFirstSigner()
  ).deploy();

  return withSaveAndVerify(
    seaportAdapter,
    eContractid.SeaportAdapter,
    [],
    verify
  );
};

export const deployLooksRareAdapter = async (verify?: boolean) => {
  const looksRareAdapter = await new LooksRareAdapter__factory(
    await getFirstSigner()
  ).deploy();

  return withSaveAndVerify(
    looksRareAdapter,
    eContractid.LooksRareAdapter,
    [],
    verify
  );
};

export const deployX2Y2Adapter = async (verify?: boolean) => {
  const x2y2Adapter = await new X2Y2Adapter__factory(
    await getFirstSigner()
  ).deploy();

  return withSaveAndVerify(x2y2Adapter, eContractid.X2Y2Adapter, [], verify);
};

export const deployMarketplaceLogic = async (
  libraries: MarketplaceLogicLibraryAddresses,
  verify?: boolean
) => {
  const marketplaceLogic = await new MarketplaceLogic__factory(
    libraries,
    await getFirstSigner()
  ).deploy();

  return withSaveAndVerify(
    marketplaceLogic,
    eContractid.MarketplaceLogic,
    [],
    verify,
    libraries
  );
};

export const deployConduitController = async (verify?: boolean) =>
  withSaveAndVerify(
    await new ConduitController__factory(await getFirstSigner()).deploy(),
    eContractid.ConduitController,
    [],
    verify
  );

export const deployPausableZoneController = async (
  owner: tEthereumAddress,
  verify?: boolean
) =>
  withSaveAndVerify(
    await new PausableZoneController__factory(await getFirstSigner()).deploy(
      owner
    ),
    eContractid.PausableZoneController,
    [owner],
    verify
  );

export const deploySeaport = async (
  conduitController: string,
  verify?: boolean
) =>
  withSaveAndVerify(
    await new Seaport__factory(await getFirstSigner()).deploy(
      conduitController
    ),
    eContractid.Seaport,
    [conduitController],
    verify
  );

export const deployCurrencyManager = async (verify?: boolean) =>
  withSaveAndVerify(
    await new CurrencyManager__factory(await getFirstSigner()).deploy(),
    eContractid.CurrencyManager,
    [],
    verify
  );

export const deployExecutionManager = async (verify?: boolean) =>
  withSaveAndVerify(
    await new ExecutionManager__factory(await getFirstSigner()).deploy(),
    eContractid.ExecutionManager,
    [],
    verify
  );

export const deployLooksRareExchange = async (
  currencyManager: string,
  executionManager: string,
  royaltyFeeManager: string,
  weth: string,
  protocolFeeRecipient: string,
  verify?: boolean
) =>
  withSaveAndVerify(
    await new LooksRareExchange__factory(await getFirstSigner()).deploy(
      currencyManager,
      executionManager,
      royaltyFeeManager,
      weth,
      protocolFeeRecipient
    ),
    eContractid.LooksRareExchange,
    [
      currencyManager,
      executionManager,
      royaltyFeeManager,
      weth,
      protocolFeeRecipient,
    ],
    verify
  );

export const deployRoyaltyFeeManager = async (
  royaltyFeeRegistry: string,
  verify?: boolean
) =>
  withSaveAndVerify(
    await new RoyaltyFeeManager__factory(await getFirstSigner()).deploy(
      royaltyFeeRegistry
    ),
    eContractid.RoyaltyFeeManager,
    [royaltyFeeRegistry],
    verify
  );

export const deployRoyaltyFeeRegistry = async (
  royaltyFeeLimit: string,
  verify?: boolean
) =>
  withSaveAndVerify(
    await new RoyaltyFeeRegistry__factory(await getFirstSigner()).deploy(
      royaltyFeeLimit
    ),
    eContractid.RoyaltyFeeRegistry,
    [royaltyFeeLimit],
    verify
  );

export const deployTransferSelectorNFT = async (
  transferManagerERC721: string,
  transferManagerERC1155: string,
  verify?: boolean
) =>
  withSaveAndVerify(
    await new TransferSelectorNFT__factory(await getFirstSigner()).deploy(
      transferManagerERC721,
      transferManagerERC1155
    ),
    eContractid.TransferSelectorNFT,
    [transferManagerERC721, transferManagerERC1155],
    verify
  );

export const deployTransferManagerERC721 = async (
  looksRareExchange: string,
  verify?: boolean
) =>
  withSaveAndVerify(
    await new TransferManagerERC721__factory(await getFirstSigner()).deploy(
      looksRareExchange
    ),
    eContractid.TransferManagerERC721,
    [looksRareExchange],
    verify
  );

export const deployTransferManagerERC1155 = async (
  looksRareExchange: string,
  verify?: boolean
) =>
  withSaveAndVerify(
    await new TransferManagerERC1155__factory(await getFirstSigner()).deploy(
      looksRareExchange
    ),
    eContractid.TransferManagerERC1155,
    [looksRareExchange],
    verify
  );

export const deployStrategyStandardSaleForFixedPrice = async (
  protocolFee: string,
  verify?: boolean
) =>
  withSaveAndVerify(
    await new StrategyStandardSaleForFixedPrice__factory(
      await getFirstSigner()
    ).deploy(protocolFee),
    eContractid.StrategyStandardSaleForFixedPrice,
    [protocolFee],
    verify
  );

export const deployX2Y2R1 = async (verify?: boolean) =>
  withSaveAndVerify(
    await new X2Y2R1__factory(await getFirstSigner()).deploy(),
    eContractid.X2Y2R1,
    [],
    verify
  );

export const deployERC721Delegate = async (verify?: boolean) =>
  withSaveAndVerify(
    await new ERC721Delegate__factory(await getFirstSigner()).deploy(),
    eContractid.ERC721Delegate,
    [],
    verify
  );

export const deployUniswapV3 = async (args: [], verify?: boolean) => {
  const uniswapV3Factory = await new UniswapV3Factory__factory(
    await getFirstSigner()
  ).deploy(...args);
  return withSaveAndVerify(
    uniswapV3Factory,
    eContractid.UniswapV3Factory,
    [...args],
    verify
  );
};

export const deployNonfungibleTokenPositionDescriptor = async (
  args: [string, string],
  verify?: boolean
) => {
  const nFTDescriptorFactory = await (
    await DRE.ethers.getContractFactoryFromArtifact(nFTDescriptor)
  )
    .connect(await getFirstSigner())
    .deploy();

  const nftDescriptorLibraryContract = await withSaveAndVerify(
    nFTDescriptorFactory,
    eContractid.NFTDescriptor,
    [],
    verify
  );
  const libraries = {
    NFTDescriptor: nftDescriptorLibraryContract.address,
  };
  const nonfungibleTokenPositionDescriptorFactory = await (
    await DRE.ethers.getContractFactoryFromArtifact(
      nonfungibleTokenPositionDescriptor,
      {
        libraries,
      }
    )
  )
    .connect(await getFirstSigner())
    .deploy(...args);

  return withSaveAndVerify(
    nonfungibleTokenPositionDescriptorFactory,
    eContractid.NonfungibleTokenPositionDescriptor,
    [...args],
    verify,
    libraries
  );
};

export const deployUniswapV3OracleWrapper = async (
  factory: string,
  manager: string,
  oracle: string,
  verify?: boolean
) =>
  withSaveAndVerify(
    await new UniswapV3OracleWrapper__factory(await getFirstSigner()).deploy(
      factory,
      manager,
      oracle
    ),
    eContractid.UniswapV3OracleWrapper,
    [factory, manager, oracle],
    verify
  );

export const deployNonfungiblePositionManager = async (
  args: [string, string, string],
  verify?: boolean
) => {
  const nonfungiblePositionManagerFactory = await (
    await DRE.ethers.getContractFactoryFromArtifact(nonfungiblePositionManager)
  )
    .connect(await getFirstSigner())
    .deploy(...args);

  return withSaveAndVerify(
    nonfungiblePositionManagerFactory,
    eContractid.UniswapV3,
    [...args],
    verify
  );
};

export const deployUniswapSwapRouter = async (
  args: [string, string],
  verify?: boolean
) => {
  const swapRouter = await (
    await DRE.ethers.getContractFactoryFromArtifact(uniSwapRouter)
  )
    .connect(await getFirstSigner())
    .deploy(...args);

  return withSaveAndVerify(
    swapRouter,
    eContractid.UniswapV3SwapRouter,
    [...args],
    verify
  );
};
export const deployUniswapDynamicConfigStrategy = async (
  args: [string, string],
  verify?: boolean
) =>
  withSaveAndVerify(
    await new UniswapV3DynamicConfigsStrategy__factory(
      await getFirstSigner()
    ).deploy(...args),
    eContractid.UniswapV3DynamicConfigsStrategy,
    [...args],
    verify
  );

export const deployStETH = async (
  args: [string, string, string],
  verify?: boolean
): Promise<StETH> =>
  withSaveAndVerify(
    await new StETH__factory(await getFirstSigner()).deploy(...args),
    args[1],
    [...args],
    verify
  );

export const deployMockAToken = async (
  args: [string, string, string],
  verify?: boolean
): Promise<MockAToken> =>
  withSaveAndVerify(
    await new MockAToken__factory(await getFirstSigner()).deploy(...args),
    args[1],
    [...args],
    verify
  );

export const deployPTokenAToken = async (
  poolAddress: tEthereumAddress,
  verify?: boolean
) =>
  withSaveAndVerify(
    await new PTokenAToken__factory(await getFirstSigner()).deploy(poolAddress),
    eContractid.PTokenATokenImpl,
    [poolAddress],
    verify
  );

export const deployPTokenStETH = async (
  poolAddress: tEthereumAddress,
  verify?: boolean
) =>
  withSaveAndVerify(
    await new PTokenStETH__factory(await getFirstSigner()).deploy(poolAddress),
    eContractid.PTokenStETHImpl,
    [poolAddress],
    verify
  );

export const deployFlashClaimRegistry = async (
  poolAddress: tEthereumAddress,
  verify?: boolean
) =>
  withSaveAndVerify(
    await new UserFlashclaimRegistry__factory(await getFirstSigner()).deploy(
      poolAddress
    ),
    eContractid.FlashClaimRegistry,
    [poolAddress],
    verify
  );

export const deployMockAirdropProject = async (
  underlyingAddress: tEthereumAddress,
  verify?: boolean
) =>
  withSaveAndVerify(
    await new MockAirdropProject__factory(await getFirstSigner()).deploy(
      underlyingAddress
    ),
    eContractid.MockAirdropProject,
    [underlyingAddress],
    verify
  );
