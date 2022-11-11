import { web3 } from "components/blockchain";

export const replaceBalance = (balance: number) => {
  return Number(web3.utils.toWei(String(balance), "ether"));
};
