import axios from "axios";
import { ICreateFundingAPI } from "api/APIModel";

const CreateFundingAPI = async (args: ICreateFundingAPI) => {
  const request = await axios
    .post("/create", {
      image: args.image,
      metadata: args.metadata,
      address: args.address,
      token_id: args.token_id,
    })
    .then((res) => res.data);

  return request;
};

export { CreateFundingAPI };
