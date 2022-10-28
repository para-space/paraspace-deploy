

import rawBRE from "hardhat";
import { ZERO_ADDRESS } from "../../helpers/constants";
import { deployPoolComponents } from "../../helpers/contracts-deployments";

import {
  getPoolProxy,
  getPoolAddressesProvider,
  getFirstSigner,
} from "../../helpers/contracts-getters";

const addhoc = async () => {
  const addressesProvider = await getPoolAddressesProvider(
    "0x0cC1e31Ef750a5a9aFA1b5d25BD91f1BDf592Bdb"
  );

  const currentAddressesProviderOwner = await getFirstSigner()

  const {poolCore, poolCoreSelectors} = await deployPoolComponents(
    addressesProvider.address
  );


 // Add new selectors
  await addressesProvider
  .connect(currentAddressesProviderOwner)
  .updatePoolImpl(
    [
      {
        implAddress: poolCore.address,
        action: 0,
        functionSelectors: poolCoreSelectors,
      },
    ],
    ZERO_ADDRESS,
    '0x'
  )

  // Delete Selectors

  await addressesProvider
    .connect(currentAddressesProviderOwner)
    .updatePoolImpl(
      [
        {
          implAddress: ZERO_ADDRESS,
          action: 2,
          functionSelectors: poolCoreSelectors,
        },
      ],
      ZERO_ADDRESS,
      '0x'
    )

  // Replace Selectors

  await addressesProvider
    .connect(currentAddressesProviderOwner)
    .updatePoolImpl(
      [
        {
          implAddress: poolCore.address,
          action: 1,
          functionSelectors: poolCoreSelectors,
        },
      ],
      ZERO_ADDRESS,
      '0x'
    )
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




  