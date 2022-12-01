import { web3 } from "components/blockchain";

export const replaceBalance = (balance: number | string) => {
  return Number(web3.utils.fromWei(String(balance), "ether"));
};

export const hexBalance = (balance: number) => {
  return web3.utils.toBN(balance * 10 ** 18);
};

export const accounting = (balance: number) => {
  return balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
