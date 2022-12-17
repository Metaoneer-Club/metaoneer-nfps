import axios from "axios";
import { ImageUpload } from "api/APIModel";

const AddProfileImageAPI = async (args: ImageUpload) => {
  const request = await axios
    .post(`/api/profile`, args.formData, {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: args.token,
      },
    })
    .then((res) => res.data);

  return request;
};

export { AddProfileImageAPI };
