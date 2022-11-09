import rawBRE from "hardhat";
import {DRE, getParaSpaceConfig, sleep} from "../../../helpers/misc-utils";
import {
  ERC20TokenContractId,
  ERC721TokenContractId,
} from "../../../helpers/types";
import {ERC20__factory} from "../../../../types";
import {ERC721Enumerable__factory} from "../../../../types";
import {getFirstSigner} from "../../../helpers/contracts-getters";
import {ZERO_ADDRESS} from "../../../helpers/constants";
import {impersonateAddress} from "../../../helpers/contracts-helpers";
import {BigNumber, utils} from "ethers";

const transferTokens = async () => {
  console.time("transfer-tokens");

  const paraSpaceConfig = getParaSpaceConfig();
  const tokens = paraSpaceConfig.Tokens;
  const receiver = await (await getFirstSigner()).getAddress();

  const configs = [
    {
      name: ERC20TokenContractId.USDT,
      whale: "0x5754284f345afc66a98fbb0a0afe71e0f007b949",
      address: tokens[ERC20TokenContractId.USDT],
      type: "ERC20",
      amount: "10000", // 10,000 USDT
    },
    {
      name: ERC20TokenContractId.USDC,
      whale: "0x55fe002aeff02f77364de339a1292923a15844b8",
      address: tokens[ERC20TokenContractId.USDC],
      type: "ERC20",
      amount: "10000", // 10,000 USDC
    },
    {
      name: ERC20TokenContractId.DAI,
      whale: "0xf977814e90da44bfa03b6295a0616a897441acec",
      address: tokens[ERC20TokenContractId.DAI],
      type: "ERC20",
      amount: "10000", // 10,000 DAI
    },
    {
      name: ERC20TokenContractId.WBTC,
      whale: "0x28c6c06298d514db089934071355e5743bf21d60",
      address: tokens[ERC20TokenContractId.WBTC],
      type: "ERC20",
      amount: "10000", // 10 WBTC
    },
    {
      name: ERC20TokenContractId.APE,
      whale: "0xf977814e90da44bfa03b6295a0616a897441acec",
      address: tokens[ERC20TokenContractId.APE],
      type: "ERC20",
      amount: "10000", // 10,000 APE
    },
    {
      name: "ETH",
      whale: "0xf977814e90da44bfa03b6295a0616a897441acec",
      address: ZERO_ADDRESS,
      type: "NATIVE",
      amount: "10000", // 10,000 ETH
    },
    {
      name: ERC721TokenContractId.BAYC,
      whale: "0xdbfd76af2157dc15ee4e57f3f942bb45ba84af24",
      address: tokens[ERC721TokenContractId.BAYC],
      type: "ERC721/Enumerable",
      amount: 5,
    },
    {
      name: ERC721TokenContractId.MAYC,
      whale: "0x69f37e419bd1457d2a25ed3f5d418169caae8d1f",
      address: tokens[ERC721TokenContractId.MAYC],
      type: "ERC721/Enumerable",
      amount: 5,
    },
    {
      name: ERC721TokenContractId.DOODLE,
      whale: "0x620b70123fb810f6c653da7644b5dd0b6312e4d8",
      address: tokens[ERC721TokenContractId.DOODLE],
      type: "ERC721/Enumerable",
      amount: 5,
    },
    {
      name: ERC721TokenContractId.MOONBIRD,
      whale: "0x7b557aa52d0055d84b1e3f5487d9018f318372c1",
      address: tokens[ERC721TokenContractId.MOONBIRD],
      type: "ERC721/NonEnumerable",
      amount: 5,
    },
    {
      name: ERC721TokenContractId.MEEBITS,
      whale: "0xa858ddc0445d8131dac4d1de01f834ffcba52ef1",
      address: tokens[ERC721TokenContractId.MEEBITS],
      type: "ERC721/Enumerable",
      amount: 5,
    },
    {
      name: ERC721TokenContractId.AZUKI,
      whale: "0xd46c8648f2ac4ce1a1aace620460fbd24f640853",
      address: tokens[ERC721TokenContractId.AZUKI],
      type: "ERC721/Enumerable",
      amount: 5,
    },
    {
      name: ERC721TokenContractId.OTHR,
      whale: "0xa858ddc0445d8131dac4d1de01f834ffcba52ef1",
      address: tokens[ERC721TokenContractId.OTHR],
      type: "ERC721/Enumerable",
      amount: 5,
    },
    {
      name: ERC721TokenContractId.CLONEX,
      whale: "0x5d7aaa862681920ea4f350a670816b0977c80b37",
      address: tokens[ERC721TokenContractId.CLONEX],
      type: "ERC721/Enumerable",
      amount: 5,
    },
  ];

  for (let i = 0; i < configs.length; i += 1) {
    const {name, type, whale: whaleAddress, address, amount} = configs[i];
    const whale = await impersonateAddress(whaleAddress);

    if (type.startsWith("ERC20")) {
      const token = await ERC20__factory.connect(address, whale.signer);
      const amountWithUnits = BigNumber.from("10").pow(await token.decimals());
      const balance = await token.balanceOf(whaleAddress);
      console.log(`whale ${name} balance: ${balance.toString()}`);
      if (balance.gt(amountWithUnits)) {
        console.log(
          `transfer ${amount} ${name} from ${whaleAddress} to ${receiver}`
        );
        await token.transfer(receiver, amountWithUnits.toString());
      } else {
        console.log(`insufficient ${name} balance on ${whaleAddress}`);
      }
    } else if (type.startsWith("ERC721")) {
      const token = await ERC721Enumerable__factory.connect(
        address,
        whale.signer
      );
      const balance = await token.balanceOf(whaleAddress);
      console.log(`whale ${name} balance: ${balance.toString()}`);
      if (!type.endsWith("NonEnumerable")) {
        for (let i = 0; i < Math.min(+amount, balance.toNumber()); i += 1) {
          const tokenId = await token.tokenOfOwnerByIndex(whaleAddress, i);
          console.log(
            `transfer ${name}#${tokenId} from ${whaleAddress} to ${receiver}`
          );
          await token.transferFrom(whaleAddress, receiver, tokenId);
        }
      } else {
        let transferred = 0;
        for (let i = 0; i < 10000 && transferred <= amount; i += 1) {
          if ((await token.ownerOf(i)) === whaleAddress) {
            console.log(
              `transfer ${name}#${i} from ${whaleAddress} to ${receiver}`
            );
            await token.transferFrom(whaleAddress, receiver, i);
            await sleep(2000);
            transferred += 1;
          }
        }
      }
    } else {
      const balance = await DRE.ethers.provider.getBalance(whaleAddress);
      const amountWithUnits = utils.parseEther(amount.toString());

      console.log(`whale ETH balance: ${balance.toString()}`);
      if (balance.gt(amountWithUnits)) {
        console.log(
          `transfer ${amount} ETH from ${whaleAddress} to ${receiver}`
        );
        await whale.signer.sendTransaction({
          to: receiver,
          value: amountWithUnits,
        });
      } else {
        console.log(`insufficient ETH balance on ${whaleAddress}`);
      }
    }
  }

  console.timeEnd("transfer-tokens");
};

async function main() {
  await rawBRE.run("set-DRE");
  await transferTokens();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
