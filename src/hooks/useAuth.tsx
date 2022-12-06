import React, { useEffect } from "react";
import axios from "axios";

/* State */
import { useRecoilState } from "recoil";
import { authState } from "stores";

const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState);

  useEffect(() => {
    const connect = sessionStorage.getItem("CONNECT");
    connect ? setAuth(true) : setAuth(false);

    const token = sessionStorage.getItem("ACCESS_TOKEN");
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_HOST_API_URL;
  }, [auth, setAuth]);

  return auth;
};

export default useAuth;
