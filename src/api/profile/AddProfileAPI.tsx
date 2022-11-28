import axios from "axios";
import { IAddProfileAPI } from "api/APIModel";

const AddProfileAPI = async (args: IAddProfileAPI) => {
  const request = await axios
    .post(`?chain_id=${args.chain_id}&address=${args.address}`, {
      nonce: args.nonce,
      address: args.address,
      chain_id: args.chain_id,
      signature: args.signature,
      nickname: args.nickname,
      content: args.content,
    })
    .then((res) => res.data);

  return request;
};

export { AddProfileAPI };
