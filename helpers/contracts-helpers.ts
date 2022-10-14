import {constants, Contract, Signer} from "ethers";
import {signTypedData_v4} from "eth-sig-util";
import {fromRpcSig, ECDSASignature} from "ethereumjs-util";
import {DRE, getDb, waitForTx, impersonateAccountsHardhat} from "./misc-utils";
import {
  iFunctionSignature,
  tEthereumAddress,
  eContractid,
  tStringTokenSmallUnits,
  ConstructorArgs,
  LibraryAddresses,
  ParaSpaceLibraryAddresses,
} from "./types";
import {
  ConsiderationItem,
  OfferItem,
  OrderParameters,
} from "./seaport-helpers/types";
import {
  convertSignatureToEIP2098,
  randomHex,
  toBN,
} from "./seaport-helpers/encoding";
import {orderType as eip712OrderType} from ".//seaport-helpers/eip-712-types/order";
import {
  ConduitController,
  MintableERC20,
  PausableZoneController,
  Seaport,
} from "../../types";
import {MintableERC721} from "../../types";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import {getIErc20Detailed} from "./contracts-getters";
import {getDefenderRelaySigner, usingDefender} from "./defender-utils";
import {usingTenderly, verifyAtTenderly} from "./tenderly-utils";
import {SignerWithAddress} from "../../test-suites/helpers/make-suite";
import {verifyEtherscanContract} from "./etherscan-verification";
import {InitializableImmutableAdminUpgradeabilityProxy} from "../../types";
import {decodeEvents} from "./seaport-helpers/events";
import {expect} from "chai";
import ParaSpaceConfig from "../market-config";
import {LiquidationLogicLibraryAddresses} from "../../types/factories/protocol/libraries/logic/LiquidationLogic__factory";
import {PoolCoreLibraryAddresses} from "../../types/factories/protocol/pool/PoolCore__factory";
import {PoolMarketplaceLibraryAddresses} from "../../types/factories/protocol/pool/PoolMarketplace__factory";
import {PoolParametersLibraryAddresses} from "../../types/factories/protocol/pool/PoolParameters__factory";
import {PoolConfiguratorLibraryAddresses} from "../../types/factories/protocol/pool/PoolConfigurator__factory";

export type MockTokenMap = {[symbol: string]: MintableERC20};
export type MockTokenMapERC721 = {[symbol: string]: MintableERC721};

export const registerContractInJsonDb = async (
  contractId: string,
  contractInstance: Contract,
  constructorArgs: ConstructorArgs = [],
  libraries?: LibraryAddresses,
  signatures?: iFunctionSignature[]
) => {
  const currentNetwork = DRE.network.name;
  const FORK = process.env.FORK;
  if (
    FORK ||
    (currentNetwork !== "hardhat" && !currentNetwork.includes("coverage"))
  ) {
    console.log(`*** ${contractId} ***\n`);
    console.log(`Network: ${currentNetwork}`);
    console.log(`tx: ${contractInstance.deployTransaction.hash}`);
    console.log(`contract address: ${contractInstance.address}`);
    console.log(`deployer address: ${contractInstance.deployTransaction.from}`);
    console.log(`gas price: ${contractInstance.deployTransaction.gasPrice}`);
    console.log(`gas used: ${contractInstance.deployTransaction.gasLimit}`);
    console.log(`\n******`);
    console.log();
  }

  const value = {
    address: contractInstance.address,
    deployer: contractInstance.deployTransaction.from,
    constructorArgs,
    verified: false,
  };

  if (libraries) value["libraries"] = libraries;
  if (signatures?.length) value["signatures"] = signatures;

  await getDb().set(`${contractId}.${currentNetwork}`, value).write();
};

export const insertContractAddressInDb = async (
  id: eContractid | string,
  address: tEthereumAddress
) => {
  const old = (await getDb().get(`${id}.${DRE.network.name}`).value()) || {};
  await getDb()
    .set(`${id}.${DRE.network.name}`, {
      ...old,
      address,
    })
    .write();
};

export const insertFunctionSigaturesInDb = async (
  id: eContractid | string,
  functions: iFunctionSignature[]
) => {
  const old = (await getDb().get(`${id}.${DRE.network.name}`).value()) || {};
  await getDb()
    .set(`${id}.${DRE.network.name}`, {
      ...old,
      functions,
    })
    .write();
};

export const insertLibrariesInDb = async (
  id: eContractid | string,
  libraries: LibraryAddresses
) => {
  const old = (await getDb().get(`${id}.${DRE.network.name}`).value()) || {};
  await getDb()
    .set(`${id}.${DRE.network.name}`, {
      ...old,
      libraries,
    })
    .write();
};

export const rawInsertContractAddressInDb = async (
  id: string,
  address: tEthereumAddress
) => {
  const old = (await getDb().get(`${id}.${DRE.network.name}`).value()) || {};
  await getDb()
    .set(`${id}.${DRE.network.name}`, {
      ...old,
      address,
    })
    .write();
};

export const getEthersSigners = async (): Promise<Signer[]> => {
  const ethersSigners = await Promise.all(await DRE.ethers.getSigners());

  if (usingDefender()) {
    const [, ...users] = ethersSigners;
    return [await getDefenderRelaySigner(), ...users];
  }
  return ethersSigners;
};

export const getEthersSignersAddresses = async (): Promise<
  tEthereumAddress[]
> =>
  await Promise.all(
    (await getEthersSigners()).map((signer) => signer.getAddress())
  );

export const verifyContract = async (
  id: string,
  instance: Contract,
  args: ConstructorArgs,
  libraries?: LibraryAddresses
) => {
  if (usingTenderly()) {
    await verifyAtTenderly(id, instance);
  }
  await verifyEtherscanContract(id, instance.address, args, libraries);
  return instance;
};

export const normalizeLibraryAddresses = (
  libraries?: ParaSpaceLibraryAddresses
): LibraryAddresses | undefined => {
  if (libraries) {
    return Object.keys(libraries).reduce((ite, cur) => {
      const parts = cur.split(":");
      ite[parts[parts.length - 1]] = libraries[cur];
      return ite;
    }, {});
  }
};

export const withSaveAndVerify = async <ContractType extends Contract>(
  instance: ContractType,
  id: string,
  args: ConstructorArgs,
  verify = true,
  libraries?: ParaSpaceLibraryAddresses,
  signatures?: iFunctionSignature[]
): Promise<ContractType> => {
  const normalizedLibraries = normalizeLibraryAddresses(libraries);
  await waitForTx(instance.deployTransaction);
  await registerContractInJsonDb(
    id,
    instance,
    args,
    normalizedLibraries,
    signatures
  );

  if (verify) {
    await verifyContract(id, instance, args, normalizedLibraries);
  }

  return instance;
};

export const convertToCurrencyDecimals = async (
  tokenAddress: tEthereumAddress,
  amount: string
) => {
  const token = await getIErc20Detailed(tokenAddress);
  const decimals = (await token.decimals()).toString();

  return DRE.ethers.utils.parseUnits(amount, decimals);
};

export const buildPermitParams = (
  chainId: number,
  token: tEthereumAddress,
  revision: string,
  tokenName: string,
  owner: tEthereumAddress,
  spender: tEthereumAddress,
  nonce: number,
  deadline: string,
  value: tStringTokenSmallUnits
) => ({
  types: {
    EIP712Domain: [
      {name: "name", type: "string"},
      {name: "version", type: "string"},
      {name: "chainId", type: "uint256"},
      {name: "verifyingContract", type: "address"},
    ],
    Permit: [
      {name: "owner", type: "address"},
      {name: "spender", type: "address"},
      {name: "value", type: "uint256"},
      {name: "nonce", type: "uint256"},
      {name: "deadline", type: "uint256"},
    ],
  },
  primaryType: "Permit" as const,
  domain: {
    name: tokenName,
    version: revision,
    chainId: chainId,
    verifyingContract: token,
  },
  message: {
    owner,
    spender,
    value,
    nonce,
    deadline,
  },
});

export const getSignatureFromTypedData = (
  privateKey: string,
  // eslint-disable-next-line
  typedData: any // TODO: should be TypedData, from eth-sig-utils, but TS doesn't accept it
): ECDSASignature => {
  const signature = signTypedData_v4(
    Buffer.from(privateKey.substring(2, 66), "hex"),
    {
      data: typedData,
    }
  );
  return fromRpcSig(signature);
};

export const buildDelegationWithSigParams = (
  chainId: number,
  token: tEthereumAddress,
  revision: string,
  tokenName: string,
  delegatee: tEthereumAddress,
  nonce: number,
  deadline: string,
  value: tStringTokenSmallUnits
) => ({
  types: {
    EIP712Domain: [
      {name: "name", type: "string"},
      {name: "version", type: "string"},
      {name: "chainId", type: "uint256"},
      {name: "verifyingContract", type: "address"},
    ],
    DelegationWithSig: [
      {name: "delegatee", type: "address"},
      {name: "value", type: "uint256"},
      {name: "nonce", type: "uint256"},
      {name: "deadline", type: "uint256"},
    ],
  },
  primaryType: "DelegationWithSig" as const,
  domain: {
    name: tokenName,
    version: revision,
    chainId: chainId,
    verifyingContract: token,
  },
  message: {
    delegatee,
    value,
    nonce,
    deadline,
  },
});

export const getProxyImplementation = async (
  proxyAdminAddress: string,
  proxyAddress: string
) => {
  // Impersonate proxy admin
  await impersonateAccountsHardhat([proxyAdminAddress]);
  const proxyAdminSigner = await DRE.ethers.getSigner(proxyAdminAddress);

  // failing here
  const proxy = (await DRE.ethers.getContractAt(
    "InitializableImmutableAdminUpgradeabilityProxy",
    proxyAddress,
    proxyAdminSigner
  )) as InitializableImmutableAdminUpgradeabilityProxy;

  const implementationAddress = await proxy.callStatic.implementation();
  return implementationAddress;
};

export const impersonateAddress = async (
  address: tEthereumAddress
): Promise<SignerWithAddress> => {
  if (!usingTenderly()) {
    await (DRE as HardhatRuntimeEnvironment).network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [address],
    });
  }
  const signer = await DRE.ethers.provider.getSigner(address);

  return {
    signer,
    address,
  };
};

export const latest = async (): Promise<number> => {
  return (
    await DRE.ethers.provider.getBlock(
      await DRE.ethers.provider.getBlockNumber()
    )
  ).timestamp;
};

export const createSeaportOrder = async <
  T extends {signer: Signer; address: string}
>(
  seaport: Seaport,
  signer: T,
  offerItems: OfferItem[],
  considerations: ConsiderationItem[],
  orderType = 0,
  zone = constants.AddressZero,
  conduitKey = constants.HashZero
) => {
  const domainData = {
    name: "ParaSpace",
    version: "1.1",
    chainId: (await DRE.ethers.provider.getNetwork()).chainId,
    verifyingContract: seaport.address,
  };
  const constants = DRE.ethers.constants;

  const orderParameters: OrderParameters = {
    offerer: signer.address,
    zone,
    offer: offerItems,
    consideration: considerations,
    totalOriginalConsiderationItems: considerations.length,
    orderType, // FULL_OPEN
    zoneHash: constants.HashZero,
    salt: randomHex(),
    conduitKey,
    startTime: 0, // 1970-01-01T00:00:00.000Z
    endTime: toBN("2147483647000"), // 2038-01-19T03:14:07.000Z
  };

  const orderComponents = {
    ...orderParameters,
    counter: await seaport.getCounter(signer.address),
  };

  const signature = await DRE.ethers.provider
    .getSigner(signer.address)
    ._signTypedData(domainData, eip712OrderType, orderComponents);

  return {
    parameters: orderParameters,
    signature: convertSignatureToEIP2098(signature),
    numerator: 1, // only used for advanced orders
    denominator: 1, // only used for advanced orders
    extraData: "0x", // only used for advanced orders
  };
};

export const createZone = async (
  pausableZoneController: PausableZoneController,
  owner: Signer,
  salt?: string
) => {
  const tx = await pausableZoneController.createZone(salt ?? randomHex());

  const zoneContract = await DRE.ethers.getContractFactory(
    "PausableZone",
    owner
  );

  const events = await decodeEvents(tx, [
    {eventName: "ZoneCreated", contract: pausableZoneController},
    // eslint-disable-next-line
    {eventName: "Unpaused", contract: zoneContract as any},
  ]);
  expect(events.length).to.be.equal(2);

  const [unpauseEvent, zoneCreatedEvent] = events;
  expect(unpauseEvent.eventName).to.equal("Unpaused");
  expect(zoneCreatedEvent.eventName).to.equal("ZoneCreated");

  return zoneCreatedEvent.data.zone as string;
};

export const createConduit = async (
  conduitController: ConduitController,
  owner: Signer,
  conduitKey?: string
) => {
  const assignedConduitKey =
    conduitKey ?? (await owner.getAddress()) + randomHex(12).slice(2);

  const {conduit: tempConduitAddress} = await conduitController.getConduit(
    assignedConduitKey
  );

  await conduitController
    .connect(owner)
    .createConduit(assignedConduitKey, await owner.getAddress());

  return tempConduitAddress;
};

export const getParaSpaceAdmins = async (): Promise<{
  paraSpaceAdmin: Signer;
  emergencyAdmin: Signer;
  riskAdmin: Signer;
  gatewayAdmin: Signer;
}> => {
  const signers = await getEthersSigners();
  const {
    ParaSpaceAdminIndex,
    EmergencyAdminIndex,
    RiskAdminIndex,
    GatewayAdminIndex,
  } = ParaSpaceConfig;
  return {
    paraSpaceAdmin: signers[ParaSpaceAdminIndex],
    emergencyAdmin: signers[EmergencyAdminIndex],
    riskAdmin: signers[RiskAdminIndex],
    gatewayAdmin: signers[GatewayAdminIndex],
  };
};
