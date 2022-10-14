// import {ZERO_ADDRESS} from "../../../../helpers/constants";
// import {
//   deployInitializableImmutableAdminUpgradeabilityProxy,
//   // deployParaSpaceToken,
//   // deployPCV,
//   // deployRewardsController,
//   // deployStakedParaSpace,
// } from "../../../../helpers/contracts-deployments";
// // import {
// //   getParaSpaceToken,
// //   getStakedParaSpaceToken,
// // } from "../../../../helpers/contracts-getters";
// import {insertContractAddressInDb} from "../../../../helpers/contracts-helpers";
// import {waitForTx} from "../../../../helpers/misc-utils";
// import {MAIN_MULTISIG, TREASURY_MULTISIG} from "../helpers/constants";
//
// export const deployParaSpaceTokenomics = async (deployer, secondaryWallet) => {
//   const tempAdmin = await deployer.getAddress();
//
//   const tempTreasury = await secondaryWallet.getAddress();

//   const paraspaceToken = await deployParaSpaceToken(true);

//   const paraspaceProxy = await deployInitializableImmutableAdminUpgradeabilityProxy([
//     MAIN_MULTISIG,
//   ]);

//   await insertContractAddressInDb("ParaSpaceProxy", paraspaceProxy.address);

//   console.log("\tInitializing ParaSpace Token and Transparent Proxy");
//   // If any other testnet, initialize for development purposes
//   const paraspaceTokenEncodedInitialize = paraspaceToken.interface.encodeFunctionData(
//     "initialize",
//     [tempAdmin]
//   );

//   await waitForTx(
//     await paraspaceProxy.initialize(paraspaceToken.address, paraspaceTokenEncodedInitialize)
//   );

//   console.log("ParaSpace Token: " + paraspaceProxy.address);

//   const COOLDOWN_SECONDS = (86400 * 21).toString();
//   const UNSTAKE_WINDOW = (86400 * 2).toString();

//   const stakedParaSpace = await deployStakedParaSpace([
//     paraspaceProxy.address,
//     paraspaceProxy.address,
//     COOLDOWN_SECONDS,
//     UNSTAKE_WINDOW,
//     tempTreasury,
//     tempAdmin,
//     (1000 * 60 * 60).toString(),
//     ZERO_ADDRESS,
//   ]);

//   const stakedParaSpaceProxy =
//     await deployInitializableImmutableAdminUpgradeabilityProxy([MAIN_MULTISIG]);

//   await insertContractAddressInDb("sParaSpaceProxy", stakedParaSpaceProxy.address);

//   console.log("\tInitializing ParaSpace Token and Transparent Proxy");
//   // If any other testnet, initialize for development purposes
//   const stakedParaSpaceTokenEncodedInitialize =
//     stakedParaSpace.interface.encodeFunctionData("initialize", [
//       tempAdmin,
//       tempAdmin,
//       tempAdmin,
//       "2000",
//       "Staked ParaSpace",
//       "sParaSpace",
//       "18",
//     ]);

//   await waitForTx(
//     await stakedParaSpaceProxy.initialize(
//       stakedParaSpace.address,
//       stakedParaSpaceTokenEncodedInitialize
//     )
//   );

//   console.log("sParaSpace: " + stakedParaSpaceProxy.address);

//   const pcv = await deployPCV(stakedParaSpace.address, paraspaceToken.address, true);

//   const pcvProxy = await deployInitializableImmutableAdminUpgradeabilityProxy([
//     tempAdmin,
//   ]);

//   await insertContractAddressInDb("PCVProxy", pcvProxy.address);

//   await waitForTx(await pcvProxy.initialize(pcv.address, []));

//   console.log("PCV: " + pcvProxy.address);

// const rewardsController = await deployRewardsController(tempAdmin, true);
//
// const rewardsControllerProxy =
//   await deployInitializableImmutableAdminUpgradeabilityProxy([tempAdmin]);
//
// await insertContractAddressInDb(
//   "RewardsControllerProxy",
//   rewardsControllerProxy.address
// );
//
// const rewardControllerEncodedInitialize =
//   rewardsController.interface.encodeFunctionData("initialize", [tempAdmin]);
//
// await waitForTx(
//   await rewardsControllerProxy.initialize(
//     rewardsController.address,
//     rewardControllerEncodedInitialize
//   )
// );

//   const paraspace = await getParaSpaceToken(paraspaceProxy.address);

//   const staked = await getStakedParaSpaceToken(stakedParaSpaceProxy.address);

//   await paraspace.transfer(tempTreasury, ethers.utils.parseEther("1000000"));
//   await paraspace.transfer(pcvProxy.address, ethers.utils.parseEther("1000000"));
//   // await paraspaceToken.transfer(
//   //   stakedTokenTransferStrategy.address,
//   //   ethers.utils.parseEther("1000000")
//   // );

//   const REWARD_VAULT = tempTreasury;

//   await paraspace
//     .connect(secondaryWallet)
//     .approve(stakedParaSpace.address, ethers.constants.MaxUint256);

//   // configure sparaspace reward
//   await staked.configureAssets([
//     {
//       emissionPerSecond: "243242400000",
//       underlyingAsset: stakedParaSpaceProxy.address,
//       totalStaked: 0,
//     },
//   ]);
// const paraspaceProxy = 0,
//   stakedParaSpaceProxy = 0,
//   pcvProxy = 0;
//
// return {
//   paraspaceProxy,
//   stakedParaSpaceProxy,
//   pcvProxy,
//   rewardsControllerProxy,
// };
// };
