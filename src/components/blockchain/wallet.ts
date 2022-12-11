import { web3 } from "components/blockchain";
import { replaceBalance } from "utils";

export interface Wallet {
  address: string;
  balance: number;
  network: number;
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

export const signCaller = async (account: string) => {
  const { ethereum } = window;

  const sign = await ethereum
    .request({
      method: "personal_sign",
      params: ["Metaoneer Service.", account],
    })
    .catch(() => {
      throw new Error("Sign has been Canceled.");
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
