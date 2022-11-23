import axios from "axios";

const AddProfileAPI = async () => {
  const request = await axios.get("/api/auth/user").then((res) => res.data);

  return request;
};

export { AddProfileAPI };
