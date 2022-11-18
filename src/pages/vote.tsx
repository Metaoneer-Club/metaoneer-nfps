import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

/* Component */

/* State */
import { isToastState, toastContentState, walletState } from "stores";
import { useRecoilValue, useSetRecoilState } from "recoil";

const Vote: NextPage = () => {
  const router = useRouter();
  const wallet = useRecoilValue(walletState);
  const setIsToast = useSetRecoilState(isToastState);
  const setToastContent = useSetRecoilState(toastContentState);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-[1200px] mx-auto pt-28 pb-40"></div>
    </div>
  );
};

export default Vote;
