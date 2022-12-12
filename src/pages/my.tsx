import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import axios from "axios";

/* API */
import { AddProfileAPI, CheckProfileAPI } from "api";

/* Component */
import {
  fundContract,
  getBN,
  nftContract,
  signCaller,
} from "components/blockchain";
import { Product, ProductCard } from "components/card/ProductCard";
import {
  AutoImage,
  AutoSVG,
  progressing,
  replaceBalance,
  shortAddress,
} from "utils";

/* State */
import { isToastState, toastContentState, walletState } from "stores";
import { useRecoilValue, useSetRecoilState } from "recoil";

const MyPage: NextPage = () => {
  const router = useRouter();
  const wallet = useRecoilValue(walletState);
  const [projectAry, setProjectAry] = useState<Product[]>([]);
  const [blockNumber, setBlockNumber] = useState<number>(0);
  const [imageData, setImageData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const setIsToast = useSetRecoilState(isToastState);
  const setToastContent = useSetRecoilState(toastContentState);

  useEffect(() => {
    const callProducts = async () => {
      if (!wallet.address) {
        setToastContent({
          content: "먼저 지갑을 연결해 주세요.",
          type: "danger",
        });
        setIsToast(true);
        router.push("/");
        return;
      }
      const count = await nftContract.methods.totalSupply().call();
      const bn = await getBN();

      const promises: Promise<void>[] = [];
      const projects: any = [];
      for (let id = 1; id <= count; id++) {
        const promise = async (index: number) => {
          const project = await fundContract.methods.fundingView(index).call();
          const owner = await nftContract.methods.ownerOf(index).call();
          projects.push({
            ...project,
            owner,
            index,
          });
        };
        promises.push(promise(id));
      }

      await Promise.all(promises);
      const after = projects.filter(
        (v: any) => v.owner.toUpperCase() === wallet.address.toUpperCase()
      );
      after.sort((a: any, b: any) => a[1] - b[1]);
      setProjectAry(after);
      setBlockNumber(bn);
      setIsLoading(false);
    };
    callProducts();
  }, [router, setIsToast, setToastContent, wallet.address]);

  const editProfileHandler = async () => {
    const sign = await signCaller(wallet.address);
    try {
      await AddProfileAPI({
        nonce: "Metaoneer Service.",
        address: wallet.address,
        chain_id: wallet.network,
        signature: sign,
        image: imageData,
        nickname: "Orbit",
        content: "하이용",
      });
    } catch (err) {
      setToastContent({
        content: "프로필 업데이트에 실패하였습니다.",
        type: "danger",
      });
      setIsToast(true);
    }
  };

  const testHandler = async () => {
    const a = await CheckProfileAPI({
      address: wallet.address,
      chain_id: wallet.network,
    });

    console.log(a);
  };

  const imageHandler = async (e: any) => {
    const url = `${process.env.NEXT_PUBLIC_HOST_API_URL}/api/profile`;
    const formData: any = new FormData();
    formData.append("image", imageData);

    // await axios({
    //   method: "POST",
    //   url: "/api/profile",
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //     Authorization: process.env.NEXT_PUBLIC_HEADER_TOKEN,
    //   },
    //   data: formData,
    // });
    const response = await fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        Authorization:
          "eyJ3YWxsZXRUeXBlIjoibWV0YW1hc2siLCJjaGFpbklkIjo4MjE3LCJub25jZSI6Ik5GVCBWZXJpZmllciBOZWVkIFlvdXIgU2lnbi4iLCJhZGRyZXNzIjoiMHg4ZmM0YTVmYTI2MmEwYWEzMTIxZGU0YTdiYzEzZGNhNTk1MmQ2NGIyIiwic2lnbmF0dXJlIjoiMHgwYmVhMGE0OWMwMGU3ODk4MDUyZDI0ZDJmYWU2MTU2YzZiMGJlNjEzODkyMzYzZjM1OWNjYzhkMjdlOGIxN2FjMDFjYTdkZmE5ZGJkMmU3NzliN2Y0MWEzZGE0OGFiMzlkM2RlNTM3M2NmYTk2NDliNGU0Y2NhNzIzMmNjMDVhYjFiIn0",
        //'Content-Type': 'application/json',
        //'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryIn@@@@@@@@@@@@',
      },
    });
    console.log(response);
  };

  console.log(imageData);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-600">
      <div className="max-w-[1200px] mx-auto pt-12 pb-40">
        <button type="button" onClick={testHandler}>
          임시 버튼
        </button>
        <div className="flex flex-col w-2/5 mx-auto">
          <div className="flex bg-white dark:bg-dark border border-white dark:border-dark-300 shadow-lg rounded-xl">
            <div className="border-r dark:border-dark-300 p-4">
              <div className="relative h-32 w-32">
                {/* <AutoImage
                  src="/team/Orbit.png"
                  alt="profile"
                  className="scale-110 w-32 h-32 object-cover rounded-2xl"
                /> */}
                <form
                  action={`${process.env.NEXT_PUBLIC_HOST_API_URL}/api/profile`}
                  method="POST"
                >
                  <input
                    type="file"
                    name="img_upload"
                    accept="image/jpg,impge/png,image/jpeg,image/gif"
                    onChange={(e: any) => setImageData(e.target.files[0])}
                  />
                </form>
                <button
                  type="submit"
                  onClick={imageHandler}
                  className="absolute cursor-pointer right-0 bottom-2 -ml-3p-1 text-xs bg-gray-400 hover:bg-indigo-500 font-medium tracking-wider rounded-full transition-colors duration-300"
                >
                  <AutoSVG
                    src="/media/icons/edit.svg"
                    className="w-8 h-8 p-1.5"
                  />
                </button>
              </div>
              <div className="text-center p-3">
                <div className="w-full flex-none text-lg text-gray-800 dark:text-gray-300 font-bold leading-none">
                  Orbit
                </div>
                <div className="mt-1 text-xs text-gray-600">
                  {shortAddress(wallet.address)}
                </div>
              </div>
            </div>
            <div className="text-gray-500 dark:text-gray-400 text-sm p-4 my-4">
              <span>안녕하세요, 뉴비 개발자 오르빗입니다.</span>
            </div>
          </div>
        </div>
        <>
          {isLoading ? (
            <div className="text-center mt-8">
              <div className="relative w-12 h-12 animate-spin mx-auto">
                <AutoImage src="/media/icons/spinner.svg" alt="loading" />
              </div>
              <h2 className="mt-4">로딩중 입니다...</h2>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-6 mt-12">
              {projectAry?.map((v: any) => (
                <ProductCard
                  key={v.keyID}
                  keyID={v.keyID}
                  title={v.title}
                  content="BNB Smart Chain (BSC) supports the most popular
              programming languages, flexible tools, and comes with
              clear and canonical documentation. You can quickly start
              and deploy your application on a blockchain designed with
              real use in mind."
                  imgURI="/temp.png"
                  category="NFT"
                  creator={v.owner}
                  progress={progressing(v[1], v[0])}
                  amount={replaceBalance(v[0])}
                  expired={v[3] - blockNumber}
                />
              ))}
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default MyPage;
