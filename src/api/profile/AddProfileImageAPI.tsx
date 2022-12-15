import axios from "axios";

const AddProfileImageAPI = async (args: any) => {
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
