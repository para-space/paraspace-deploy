import {constants} from "ethers";
import {
  deployCurrencyManager,
  deployExecutionManager,
  deployLooksRareAdapter,
  deployLooksRareExchange,
  deployRoyaltyFeeManager,
  deployRoyaltyFeeRegistry,
  deployStrategyStandardSaleForFixedPrice,
  deployTransferManagerERC1155,
  deployTransferManagerERC721,
  deployTransferSelectorNFT,
} from "../../../../helpers/contracts-deployments";
import {
  getAllTokens,
  getPoolAddressesProvider,
} from "../../../../helpers/contracts-getters";
import {LOOKSRARE_ID} from "../../../../helpers/constants";
import {
  waitForTx,
  isLocalTestnet,
  isPublicTestnet,
} from "../../../../helpers/misc-utils";

export const step_16 = async (verify = false) => {
  try {
    if (!isLocalTestnet() && !isPublicTestnet()) {
      return;
    }

    const allTokens = await getAllTokens();
    const currencyManager = await deployCurrencyManager(verify);
    const addressesProvider = await getPoolAddressesProvider();

    await waitForTx(await currencyManager.addCurrency(allTokens.DAI.address));
    await waitForTx(await currencyManager.addCurrency(allTokens.WETH.address));

    const executionManager = await deployExecutionManager(verify);

    const royaltyFeeRegistry = await deployRoyaltyFeeRegistry("0", verify);
    const royaltyFeeManager = await deployRoyaltyFeeManager(
      royaltyFeeRegistry.address,
      verify
    );

    const protocolFeeRecipient = constants.AddressZero;
    const looksRareExchange = await deployLooksRareExchange(
      currencyManager.address,
      executionManager.address,
      royaltyFeeManager.address,
      allTokens.WETH.address,
      protocolFeeRecipient,
      verify
    );
    const looksRareAdapter = await deployLooksRareAdapter(verify);
    await waitForTx(
      await addressesProvider.setMarketplace(
        LOOKSRARE_ID,
        looksRareExchange.address,
        looksRareAdapter.address,
        looksRareExchange.address,
        false
      )
    );

    const transferManagerERC721 = await deployTransferManagerERC721(
      looksRareExchange.address,
      verify
    );
    const transferManagerERC1155 = await deployTransferManagerERC1155(
      looksRareExchange.address,
      verify
    );
    const transferSelectorNFT = await deployTransferSelectorNFT(
      transferManagerERC721.address,
      transferManagerERC1155.address,
      verify
    );
    await waitForTx(
      await looksRareExchange.updateTransferSelectorNFT(
        transferSelectorNFT.address
      )
    );
    const standardSaleForFixedPrice =
      await deployStrategyStandardSaleForFixedPrice("0", verify);
    await waitForTx(
      await executionManager.addStrategy(standardSaleForFixedPrice.address)
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
