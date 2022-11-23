export interface IAddProfileAPI {
  nonce: string;
  address: string;
  chain_id: number;
  signature: string;
  nickname: string;
  content: string;
}
