import { web3, WALLET_NETWORK } from "components/blockchain/web3";

type CA = "0xed204D155f4e61eCf81aA0572Aa77d611572A8c6" | "";

const abi: any = [
  {
    inputs: [
      {
        internalType: "contract IFunding",
        name: "_NFT",
        type: "address",
      },
    ],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_limit",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "start_date",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "expired_date",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "mileston_receive",
            type: "uint256",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "pass",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "reject",
                type: "uint256",
              },
              {
                internalType: "address[]",
                name: "voter",
                type: "address[]",
              },
            ],
            internalType: "struct MetaOneerNFPS.DAO",
            name: "dao",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "address",
                name: "_user",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "allowed_vote",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "pass_vote",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "reject_vote",
                type: "uint256",
              },
            ],
            internalType: "struct MetaOneerNFPS.FunderDAO",
            name: "fdao",
            type: "tuple",
          },
        ],
        internalType: "struct MetaOneerNFPS.Mileston[]",
        name: "_mile",
        type: "tuple[]",
      },
    ],
    name: "FundRegister",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "NFT",
    outputs: [
      {
        internalType: "contract IFunding",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "fund",
    outputs: [
      {
        internalType: "uint256",
        name: "limitprice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalFundamount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "funderView",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "limitprice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalFundamount",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "funder",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "fundmoney",
            type: "uint256[]",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "start_date",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "expired_date",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "mileston_receive",
                type: "uint256",
              },
              {
                components: [
                  {
                    internalType: "uint256",
                    name: "pass",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "reject",
                    type: "uint256",
                  },
                  {
                    internalType: "address[]",
                    name: "voter",
                    type: "address[]",
                  },
                ],
                internalType: "struct MetaOneerNFPS.DAO",
                name: "dao",
                type: "tuple",
              },
              {
                components: [
                  {
                    internalType: "address",
                    name: "_user",
                    type: "address",
                  },
                  {
                    internalType: "uint256",
                    name: "allowed_vote",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "pass_vote",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "reject_vote",
                    type: "uint256",
                  },
                ],
                internalType: "struct MetaOneerNFPS.FunderDAO",
                name: "fdao",
                type: "tuple",
              },
            ],
            internalType: "struct MetaOneerNFPS.Mileston[]",
            name: "mile",
            type: "tuple[]",
          },
        ],
        internalType: "struct MetaOneerNFPS.Fund",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "fundMoney",
        type: "uint256",
      },
    ],
    name: "funding",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "Fundstep",
        type: "uint256",
      },
    ],
    name: "setFundstate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

let fundContract: any, FUND_CONTRACT_ADDRESS: CA;
if (typeof window !== "undefined") {
  FUND_CONTRACT_ADDRESS =
    WALLET_NETWORK === "56"
      ? "0xed204D155f4e61eCf81aA0572Aa77d611572A8c6"
      : "0xed204D155f4e61eCf81aA0572Aa77d611572A8c6";
  fundContract = new web3.eth.Contract(abi, FUND_CONTRACT_ADDRESS);
}

export { fundContract, FUND_CONTRACT_ADDRESS };
