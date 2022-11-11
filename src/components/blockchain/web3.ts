import Web3 from "web3";

declare global {
  interface Window {
    ethereum: any;
  }
}

let web3: any;
if (typeof window !== "undefined") {
  web3 = new Web3(window.ethereum);
}

export { web3 };
