import { atom } from "recoil";
import { v1 } from "uuid";
import { Wallet } from "components/blockchain";

const authState = atom<boolean>({
  key: `authState/${v1()}`,
  default: false,
});

const walletState = atom<Wallet>({
  key: `walletState/${v1()}`,
  default: {
    address: "",
    balance: 0,
    network: 56,
  },
});

export { authState, walletState };
