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

export const zeroCount = (balance: number) => {
  return balance > 0 ? balance : 0;
};

export const progressing = (base: number, balance: number) => {
  return Number(
    ((replaceBalance(base) / replaceBalance(balance)) * 100).toFixed(5)
  );
};

export const progressingCSS = (base: number, balance: number) => {
  return progressing(base, balance) >= 100 ? 100 : progressing(base, balance);
};
