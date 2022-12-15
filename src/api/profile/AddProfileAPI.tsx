import axios from "axios";
import { IAddProfileAPI } from "api/APIModel";

const AddProfileAPI = async (args: IAddProfileAPI) => {
  const request = await axios
    .post(
      `/api/profile`,
      {
        nickname: args.nickname,
        content: args.content,
      },
      {
        headers: {
          Authorization: args.token,
        },
      }
    )
    .then((res) => res.data);

  return request;
};

export { AddProfileAPI };
