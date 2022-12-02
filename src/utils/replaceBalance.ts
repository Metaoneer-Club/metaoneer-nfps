import { web3 } from "components/blockchain";

export const replaceBalance = (balance: number | string) => {
  return Boolean(balance)
    ? Number(web3.utils.fromWei(String(balance), "ether"))
    : 0;
};

export const hexBalance = (balance: number) => {
  return Boolean(balance) ? web3.utils.toBN(balance * 10 ** 18) : 0;
};

export const accounting = (balance: number) => {
  return Boolean(balance)
    ? balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : 0;
};
