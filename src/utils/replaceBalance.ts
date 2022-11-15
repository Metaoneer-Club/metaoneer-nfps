import { web3 } from "components/blockchain";

export const replaceBalance = (balance: number) => {
  return Number(web3.utils.fromWei(String(balance), "ether"));
};

export const hexBalance = (balance: number) => {
  return web3.utils.toBN(balance * 10 ** 18);
};
