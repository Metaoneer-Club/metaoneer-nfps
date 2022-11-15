import Web3 from "web3";

declare global {
  interface Window {
    ethereum: any;
  }
}

let web3: any, WALLET_NETWORK: string;
if (typeof window !== "undefined") {
  web3 = new Web3(window.ethereum);
  WALLET_NETWORK = window.ethereum.networkVersion;
}

export { web3, WALLET_NETWORK };
