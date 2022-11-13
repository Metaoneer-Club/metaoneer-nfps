import { atom } from "recoil";
import { v1 } from "uuid";
import { Wallet } from "components/blockchain";

const walletState = atom<Wallet>({
  key: `walletState/${v1()}`,
  default: {
    address: "",
    balance: 0,
    network: 56,
  },
});

export { walletState };
