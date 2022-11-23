import axios from "axios";
import { InitialUserData } from "api/APIModel";

const CheckProfileAPI = async (args: InitialUserData) => {
  const request = await axios
    .post("", {
      params: {
        chain_id: args.chain_id,
        address: args.address,
      },
    })
    .then((res) => res.data);

  return request;
};

export { CheckProfileAPI };
