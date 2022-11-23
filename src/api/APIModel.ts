export interface InitialUserData {
  address: string;
  chain_id: number;
}

export interface IAddProfileAPI extends InitialUserData {
  nonce: string;
  signature: string;
  nickname: string;
  content: string;
}
