import axios from "axios";
import { ImageUpload } from "api/APIModel";

const AddFundingImageFundingAPI = async (args: ImageUpload) => {
  const request = await axios
    .post(`/api/funding/${args.tokenId}`, args.formData, {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: args.token,
      },
    })
    .then((res) => res.data);

  return request;
};

export { AddFundingImageFundingAPI };
