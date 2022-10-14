import {utils} from "ethers";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import {
  ProtocolDataProvider__factory,
  PToken__factory,
  NToken__factory,
  ReservesSetupHelper__factory,
  PoolAddressesProvider__factory,
  PoolAddressesProviderRegistry__factory,
  PoolConfigurator__factory,
  MintableERC20__factory,
  MintableERC721__factory,
  // MockFlashLoanReceiver__factory,
  MockStableDebtToken__factory,
  MockVariableDebtToken__factory,
  PriceOracle__factory,
  StableDebtToken__factory,
  VariableDebtToken__factory,
  WETH9Mocked__factory,
  ParaSpaceOracle__factory,
  MockInitializableImple__factory,
  MockInitializableImpleV2__factory,
  SupplyLogic__factory,
  BorrowLogic__factory,
  LiquidationLogic__factory,
  // BridgeLogic__factory,
  ACLManager__factory,
  // EModeLogic__factory,
  DefaultReserveInterestRateStrategy__factory,
  // FlashLoanLogic__factory,
  UiPoolDataProvider__factory,
  UiIncentiveDataProvider__factory,
  WETHGateway__factory,
  // WPunk,
  WPunk__factory,
  CryptoPunksMarket__factory,
  WPunkGateway__factory,
  MockAggregator__factory,
  // ParaSpaceToken__factory,
  // StakedParaSpaceV3__factory,
  // PCV__factory,
  ERC20__factory,
  // ERC721__factory,
  MockTokenFaucet__factory,
  IERC20Detailed__factory,
  MockIncentivesController__factory,
  ERC721__factory,
  Moonbirds__factory,
  ConduitController__factory,
  Seaport__factory,
  LooksRareExchange__factory,
  StrategyStandardSaleForFixedPrice__factory,
  TransferManagerERC721__factory,
  X2Y2R1__factory,
  ERC721Delegate__factory,
  PausableZoneController__factory,
  PausableZone__factory,
  Conduit__factory,
  NTokenMoonBirds__factory,
  UniswapV3Factory__factory,
  UniswapV3Pool__factory,
  UniswapV3Gateway__factory,
  UniswapV3OracleWrapper__factory,
  NTokenUniswapV3__factory,
  UniswapV3DynamicConfigsStrategy__factory,
  StETH__factory,
  PTokenStETH__factory,
  MockAToken__factory,
  PTokenAToken__factory,
  NFTFloorOracle__factory,
  UserFlashclaimRegistry__factory,
  MockAirdropProject__factory,
  IPool__factory,
  MockReserveAuctionStrategy__factory,
} from "../../types";
// import {PoolLibraryAddresses} from "../types/Pool__factory";
import {
  getEthersSigners,
  MockTokenMap,
  MockTokenMapERC721,
} from "./contracts-helpers";
import {DRE, getDb, notFalsyOrZeroAddress} from "./misc-utils";
import {
  eContractid,
  ERC721TokenContractId,
  tEthereumAddress,
  TokenContractId,
} from "./types";

import {
  INonfungiblePositionManager__factory,
  ISwapRouter__factory,
} from "../../types";
import {ZERO_ADDRESS} from "./constants";

declare let hre: HardhatRuntimeEnvironment;

export const getFirstSigner = async () => (await getEthersSigners())[0];

export const getPoolAddressesProvider = async (address?: tEthereumAddress) => {
  return await PoolAddressesProvider__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.PoolAddressesProvider}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );
};

export const getACLManager = async (address?: tEthereumAddress) => {
  return await ACLManager__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.ACLManager}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );
};

export const getPoolConfiguratorProxy = async (address?: tEthereumAddress) => {
  return await PoolConfigurator__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.PoolConfiguratorProxy}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );
};

export const getSupplyLogic = async (address?: tEthereumAddress) =>
  await SupplyLogic__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.SupplyLogic}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );

// export const getBridgeLogic = async (address?: tEthereumAddress) =>
//   await BridgeLogic__factory.connect(
//     address ||
//       (
//         await getDb().get(`${eContractid.Pool}.${DRE.network.name}`).value()
//       ).address,
//     await getFirstSigner()
//   );

export const getBorrowLogic = async (address?: tEthereumAddress) =>
  await BorrowLogic__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.BorrowLogic}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );

export const getLiquidationLogic = async (address?: tEthereumAddress) =>
  await LiquidationLogic__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.LiquidationLogic}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );

// export const getEModeLogic = async (address?: tEthereumAddress) =>
//   await EModeLogic__factory.connect(
//     address ||
//       (
//         await getDb()
//           .get(`${eContractid.EModeLogic}.${DRE.network.name}`)
//           .value()
//       ).address,
//     await getFirstSigner()
//   );

// export const getFlashLoanLogic = async (address?: tEthereumAddress) =>
//   await FlashLoanLogic__factory.connect(
//     address ||
//       (
//         await getDb()
//           .get(`${eContractid.FlashLoanLogic}.${DRE.network.name}`)
//           .value()
//       ).address,
//     await getFirstSigner()
//   );

export const getPoolProxy = async (address?: tEthereumAddress) =>
  await IPool__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.PoolProxy}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );

export const getPriceOracle = async (address?: tEthereumAddress) =>
  await PriceOracle__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.PriceOracle}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );

export const getUiPoolDataProvider = async (address?: tEthereumAddress) =>
  await UiPoolDataProvider__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.UiPoolDataProvider}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );

export const getUiIncentiveDataProviderV3__factory = async (
  address?: tEthereumAddress
) =>
  await UiIncentiveDataProvider__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.UiIncentiveDataProvider}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );

export const getPToken = async (address?: tEthereumAddress) =>
  await PToken__factory.connect(
    address ||
      (
        await getDb().get(`${eContractid.PToken}.${DRE.network.name}`).value()
      ).address,
    await getFirstSigner()
  );

export const getNToken = async (address?: tEthereumAddress) =>
  await NToken__factory.connect(
    address ||
      (
        await getDb().get(`${eContractid.NToken}.${DRE.network.name}`).value()
      ).address,
    await getFirstSigner()
  );

export const getStableDebtToken = async (address?: tEthereumAddress) =>
  await StableDebtToken__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.StableDebtToken}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );

export const getVariableDebtToken = async (address?: tEthereumAddress) =>
  await VariableDebtToken__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.VariableDebtToken}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );

export const getIRStrategy = async (address?: tEthereumAddress) =>
  await DefaultReserveInterestRateStrategy__factory.connect(
    address ||
      (
        await getDb()
          .get(
            `${eContractid.DefaultReserveInterestRateStrategy}.${DRE.network.name}`
          )
          .value()
      ).address,
    await getFirstSigner()
  );

export const getMintableERC20 = async (address?: tEthereumAddress) =>
  await MintableERC20__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.MintableERC20}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );

export const getMintableERC721 = async (address?: tEthereumAddress) =>
  await MintableERC721__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.MintableERC721}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );

export const getIErc20Detailed = async (address: tEthereumAddress) =>
  await IERC20Detailed__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.IERC20Detailed}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );

export const getProtocolDataProvider = async (address?: tEthereumAddress) =>
  await ProtocolDataProvider__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.ProtocolDataProvider}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );

export const getParaSpaceOracle = async (address?: tEthereumAddress) =>
  await ParaSpaceOracle__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.ParaSpaceOracle}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );

// export const getMockFlashLoanReceiver = async (address?: tEthereumAddress) =>
//   await MockFlashLoanReceiver__factory.connect(
//     address ||
//       (
//         await getDb()
//           .get(`${eContractid.MockFlashLoanReceiver}.${DRE.network.name}`)
//           .value()
//       ).address,
//     await getFirstSigner()
//   );

export const getAllMockedTokens = async () => {
  const db = getDb();
  const tokens1: MockTokenMap = await Object.keys(TokenContractId).reduce<
    Promise<MockTokenMap>
  >(async (acc, tokenSymbol) => {
    const accumulator = await acc;
    const address = db
      .get(`${tokenSymbol.toUpperCase()}.${DRE.network.name}`)
      .value()?.address;
    if (address) {
      accumulator[tokenSymbol] = await getMintableERC20(address);
      return Promise.resolve(accumulator);
    } else {
      return Promise.reject(`${tokenSymbol} is not in db`);
    }
  }, Promise.resolve({}));

  const tokens2: MockTokenMapERC721 = await Object.keys(
    ERC721TokenContractId
  ).reduce<Promise<MockTokenMapERC721>>(async (acc, tokenSymbol) => {
    const accumulator = await acc;
    const address = db
      .get(`${tokenSymbol}.${DRE.network.name}`)
      .value()?.address;
    if (address) {
      accumulator[tokenSymbol] = await getMintableERC721(address);
      return Promise.resolve(accumulator);
    } else {
      return Promise.reject(`${tokenSymbol} is not in db`);
    }
  }, Promise.resolve({}));

  return Object.assign(tokens1, tokens2);
};

export const getPairsTokenAggregator = (
  allAssetsAddresses: {
    [tokenSymbol: string]: tEthereumAddress;
  },
  aggregatorsAddresses: {[tokenSymbol: string]: tEthereumAddress}
): [string[], string[]] => {
  const {...assetsAddressesWithoutEth} = allAssetsAddresses;

  const pairs = Object.entries(assetsAddressesWithoutEth).map(
    ([tokenSymbol, tokenAddress]) => {
      const aggregatorAddressIndex = Object.keys(
        aggregatorsAddresses
      ).findIndex((value) => value === tokenSymbol);
      const [, aggregatorAddress] = (
        Object.entries(aggregatorsAddresses) as [string, tEthereumAddress][]
      )[aggregatorAddressIndex];
      return [tokenAddress, aggregatorAddress];
    }
  ) as [string, string][];

  const mappedPairs = pairs.map(([asset]) => asset);
  const mappedAggregators = pairs.map(([, source]) => source);

  return [mappedPairs, mappedAggregators];
};

export const getPoolAddressesProviderRegistry = async (
  address?: tEthereumAddress
) =>
  await PoolAddressesProviderRegistry__factory.connect(
    notFalsyOrZeroAddress(address)
      ? address
      : (
          await getDb()
            .get(
              `${eContractid.PoolAddressesProviderRegistry}.${DRE.network.name}`
            )
            .value()
        ).address,
    await getFirstSigner()
  );

export const getReservesSetupHelper = async (address?: tEthereumAddress) =>
  await ReservesSetupHelper__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.ReservesSetupHelper}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );

export const getWETHMocked = async (address?: tEthereumAddress) =>
  await WETH9Mocked__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.WETHMocked}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );

export const getPunk = async (address?: tEthereumAddress) =>
  await CryptoPunksMarket__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.CryptoPunksMarket}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );

export const getWPunk = async (address?: tEthereumAddress) =>
  await WPunk__factory.connect(
    address ||
      (
        await getDb().get(`${eContractid.WPunk}.${DRE.network.name}`).value()
      ).address,
    await getFirstSigner()
  );

export const getWETHGateway = async (address?: tEthereumAddress) =>
  await WETHGateway__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.WETHGatewayImpl}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );

export const getWETHGatewayProxy = async (address?: tEthereumAddress) =>
  await WETHGateway__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.WETHGatewayProxy}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );

export const getWPunkGateway = async (address?: tEthereumAddress) =>
  await WPunkGateway__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.WPunkGatewayImpl}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );

export const getWPunkGatewayProxy = async (address?: tEthereumAddress) =>
  await WPunkGateway__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.WPunkGatewayProxy}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );

export const getMockVariableDebtToken = async (address?: tEthereumAddress) =>
  await MockVariableDebtToken__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.MockVariableDebtToken}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );

export const getMockStableDebtToken = async (address?: tEthereumAddress) =>
  await MockStableDebtToken__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.MockStableDebtToken}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );

// export const getMockPool = async (address?: tEthereumAddress) =>
//   await MockPool__factory.connect(
//     address ||
//     (
//       await getDb().get(`${eContractid.MockPool}.${DRE.network.name}`).value()
//     ).address,
//     await getFirstSigner()
//   );

export const getMockInitializableImple = async (address?: tEthereumAddress) =>
  await MockInitializableImple__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.MockInitializableImple}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );

export const getMockInitializableImpleV2 = async (address?: tEthereumAddress) =>
  await MockInitializableImpleV2__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.MockInitializableImpleV2}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );

export const getMockAggregator = async (
  address?: tEthereumAddress,
  symbol?: string
) =>
  await MockAggregator__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.MockAggregator}.${symbol}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );

// export const getParaSpaceToken = async (address?: tEthereumAddress) =>
//   await ParaSpaceToken__factory.connect(
//     address ||
//       (
//         await getDb().get(`${eContractid.ParaSpace}.${DRE.network.name}`).value()
//       ).address,
//     await getFirstSigner()
//   );

// export const getStakedParaSpaceToken = async (address?: tEthereumAddress) =>
//   await StakedParaSpaceV3__factory.connect(
//     address ||
//       (
//         await getDb().get(`${eContractid.sParaSpace}.${DRE.network.name}`).value()
//       ).address,
//     await getFirstSigner()
//   );

// export const getPCV = async (address?: tEthereumAddress) =>
//   await PCV__factory.connect(
//     address ||
//       (
//         await getDb().get(`${eContractid.PCV}.${DRE.network.name}`).value()
//       ).address,
//     await getFirstSigner()
//   );

export const getERC20 = async (address?: tEthereumAddress) =>
  await ERC20__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.MintableERC20}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );

export const getERC721 = async (address?: tEthereumAddress) =>
  await ERC721__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.MintableERC721}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );

export const getMoonBirds = async (address?: tEthereumAddress) =>
  await Moonbirds__factory.connect(
    address ||
      (
        await getDb().get(`${eContractid.MOONBIRD}.${DRE.network.name}`).value()
      ).address,
    await getFirstSigner()
  );

export const getNTokenMoonBirds = async (address?: tEthereumAddress) =>
  await NTokenMoonBirds__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.NTokenMoonBirds}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );

export const getUniswapV3Factory = async (address?: tEthereumAddress) =>
  await UniswapV3Factory__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.UniswapV3Factory}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );

export const getNonfungiblePositionManager = async (
  address?: tEthereumAddress
) => {
  return await INonfungiblePositionManager__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.UniswapV3}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );
};

export const getUniswapV3SwapRouter = async (address?: tEthereumAddress) => {
  return await ISwapRouter__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.UniswapV3SwapRouter}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );
};

export const getUniswapV3OracleWrapper = async (address?: tEthereumAddress) => {
  return await UniswapV3OracleWrapper__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.UniswapV3OracleWrapper}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );
};

export const getNTokenUniswapV3 = async (address?: tEthereumAddress) =>
  await NTokenUniswapV3__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.NTokenUniswapV3}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );

export const getUniswapV3DynamicConfigsStrategy = async (
  address?: tEthereumAddress
) =>
  await UniswapV3DynamicConfigsStrategy__factory.connect(
    address ||
      (
        await getDb()
          .get(
            `${eContractid.UniswapV3DynamicConfigsStrategy}.${DRE.network.name}`
          )
          .value()
      ).address,
    await getFirstSigner()
  );

export const getChainId = async () =>
  (await DRE.ethers.provider.getNetwork()).chainId;

export const getProxyAdmin = async (proxyAddress: string) => {
  const EIP1967_ADMIN_SLOT =
    "0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103";
  const adminStorageSlot = await hre.ethers.provider.getStorageAt(
    proxyAddress,
    EIP1967_ADMIN_SLOT,
    "latest"
  );
  const adminAddress = utils.defaultAbiCoder
    .decode(["address"], adminStorageSlot)
    .toString();
  return utils.getAddress(adminAddress);
};

export const getMockTokenFaucet = async (address?: tEthereumAddress) =>
  await MockTokenFaucet__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.MockTokenFaucet}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );

export const getConduitController = async (address?: tEthereumAddress) =>
  await ConduitController__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.ConduitController}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );

export const getConduit = async (address?: tEthereumAddress) =>
  await Conduit__factory.connect(
    address ||
      (
        await getDb().get(`${eContractid.Conduit}.${DRE.network.name}`).value()
      ).address,
    await getFirstSigner()
  );

export const getConduitKey = async () =>
  await getDb().get(`${eContractid.ConduitKey}.${DRE.network.name}`).value()
    .address;

export const getPausableZoneController = async (address?: tEthereumAddress) =>
  await PausableZoneController__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.PausableZoneController}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );

export const getPausableZone = async (address?: tEthereumAddress) =>
  await PausableZone__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.PausableZone}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );

export const getSeaport = async (address?: tEthereumAddress) =>
  await Seaport__factory.connect(
    address ||
      (
        await getDb().get(`${eContractid.Seaport}.${DRE.network.name}`).value()
      ).address,
    await getFirstSigner()
  );

export const getLooksRareExchange = async (address?: tEthereumAddress) =>
  await LooksRareExchange__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.LooksRareExchange}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );

export const getStrategyStandardSaleForFixedPrice = async (
  address?: tEthereumAddress
) =>
  await StrategyStandardSaleForFixedPrice__factory.connect(
    address ||
      (
        await getDb()
          .get(
            `${eContractid.StrategyStandardSaleForFixedPrice}.${DRE.network.name}`
          )
          .value()
      ).address,
    await getFirstSigner()
  );

export const getTransferManagerERC721 = async (address?: tEthereumAddress) =>
  await TransferManagerERC721__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.TransferManagerERC721}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );

export const getX2Y2R1 = async (address?: tEthereumAddress) =>
  await X2Y2R1__factory.connect(
    address ||
      (
        await getDb().get(`${eContractid.X2Y2R1}.${DRE.network.name}`).value()
      ).address,
    await getFirstSigner()
  );

export const getERC721Delegate = async (address?: tEthereumAddress) =>
  await ERC721Delegate__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.ERC721Delegate}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );

export const getMockIncentivesController = async (address?: tEthereumAddress) =>
  await MockIncentivesController__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.MockIncentivesController}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );

export const getUniswapV3Gateway = async (address?: tEthereumAddress) =>
  await UniswapV3Gateway__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.UniswapV3GatewayProxy}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );

export const getUniswapDynamicConfigStrategy = async (
  address?: tEthereumAddress
) =>
  await UniswapV3DynamicConfigsStrategy__factory.connect(
    address ||
      (
        await getDb()
          .get(
            `${eContractid.UniswapV3DynamicConfigsStrategy}.${DRE.network.name}`
          )
          .value()
      ).address,
    await getFirstSigner()
  );

export const getStETH = async (address?: tEthereumAddress) =>
  await StETH__factory.connect(
    address ||
      (
        await getDb().get(`${eContractid.StETH}.${DRE.network.name}`).value()
      ).address,
    await getFirstSigner()
  );
export const getPTokenStETH = async (address?: tEthereumAddress) =>
  await PTokenStETH__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.PTokenStETH}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );

export const getMockAToken = async (address?: tEthereumAddress) =>
  await MockAToken__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.MockAToken}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );

export const getPTokenAToken = async (address?: tEthereumAddress) =>
  await PTokenAToken__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.PTokenAToken}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );

export const getNFTFloorOracle = async (address?: tEthereumAddress) =>
  await NFTFloorOracle__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.NFTFloorOracle}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );

export const getUserFlashClaimRegistry = async (address?: tEthereumAddress) =>
  await UserFlashclaimRegistry__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.FlashClaimRegistry}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );

export const getMockAirdropProject = async (address?: tEthereumAddress) =>
  await MockAirdropProject__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.MockAirdropProject}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );

export const getMockReserveAuctionStrategy = async (
  address?: tEthereumAddress
) =>
  await MockReserveAuctionStrategy__factory.connect(
    address ||
      (
        await getDb()
          .get(`${eContractid.MockReserveAuctionStrategy}.${DRE.network.name}`)
          .value()
      ).address,
    await getFirstSigner()
  );
