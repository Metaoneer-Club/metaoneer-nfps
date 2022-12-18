import sigPacker from "signature-packer";
import { web3 } from "components/blockchain";
import { replaceBalance } from "utils";

export interface Wallet {
  address: string;
  balance: number;
  network: number;
}

export interface Packer {
  wallet: string;
  nonce: string;
  address: string;
  network: number;
  signature: number;
}

export const setMetamaskAccount = async () => {
  const { ethereum } = window;

  const metamaskAddr: string = ethereum.selectedAddress;
  let metamaskBalance: any = metamaskAddr
    ? await web3.eth.getBalance(metamaskAddr)
    : 0;
  metamaskBalance = replaceBalance(metamaskBalance);

  return {
    address: metamaskAddr,
    balance: metamaskBalance,
    network: ethereum.networkVersion,
  };
};

export const changeNetwork = async (chainId: number) => {
  const { ethereum } = window;

  if (ethereum) {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: web3.utils.toHex(chainId) }],
    });
    return true;
  } else {
    window.open("https://metamask.io/download.html");
    return false;
  }
};

export const signCaller = async (nonce: string, account: string) => {
  const { ethereum } = window;

  const sign = await ethereum.request({
    method: "personal_sign",
    params: [nonce, account],
  });

  return sign;
};

export const getBN = async () => {
  const bn = await web3.eth.getBlockNumber();
  return bn;
};

export const toBN = (bn: number, date: Date) => {
  date.setDate(date.getDate());
  date.setHours(9, 0, 0);

  let result: number =
    bn + Math.floor((date.getTime() - Date.now()) / (3 * 1000));
  return result;
};

export const tokenPacker = (args: Packer) => {
  let token = sigPacker.encode(
    args.wallet,
    args.nonce,
    args.network,
    args.address,
    args.signature
  );

  return token;
};
