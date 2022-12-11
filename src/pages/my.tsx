import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

/* API */
import { AddProfileAPI, CheckProfileAPI } from "api";
import { IAddProfileAPI, InitialUserData } from "api/APIModel";

/* Component */
import { paymentContract, signCaller } from "components/blockchain";
import { ProductCard } from "components/card/ProductCard";
import { AutoImage, AutoSVG, shortAddress } from "utils";

/* State */
import { isToastState, toastContentState, walletState } from "stores";
import { useRecoilValue, useSetRecoilState } from "recoil";
import axios from "axios";

interface KeyData {
  key: number;
  title: string;
  price: number;
  count: number;
  owner: string;
}

const MyPage: NextPage = () => {
  const router = useRouter();
  const wallet = useRecoilValue(walletState);
  const [products, setProducts] = useState<KeyData[]>([]);
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

      const keyList = await paymentContract.methods
        .myKeyList(wallet.address)
        .call();

      const promises: Promise<void>[] = [];
      const keyAry: KeyData[] = [];
      for (let id = 0; id < keyList.length; id++) {
        const promise = async (index: number) => {
          const keypool = await paymentContract.methods
            .prepareKeypool(keyList[index])
            .call();
          keyAry.push(keypool);
        };
        promises.push(promise(id));
      }
      await Promise.all(promises);

      setProducts(keyAry);
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
    const formData: any = new FormData();
    formData.append("nonce", "Metaoneer Service.");
    formData.append("image", imageData);
    formData.append("address", wallet.address);

    await axios({
      method: "POST",
      url: "/api/profile",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });
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
                <input
                  type="file"
                  name="img_upload"
                  accept="image/jpg,impge/png,image/jpeg,image/gif"
                  onChange={(e: any) => setImageData(e.target.files[0])}
                />
                <button
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
              {products?.map((v: KeyData) => (
                <ProductCard
                  key={v.key}
                  keyID={v.key}
                  title={v.title}
                  content="BNB Smart Chain (BSC) supports the most popular
              programming languages, flexible tools, and comes with
              clear and canonical documentation. You can quickly start
              and deploy your application on a blockchain designed with
              real use in mind."
                  imgURI="/temp.png"
                  category="NFT"
                  creator={v.owner}
                  progress={66}
                  amount={300}
                  expired={new Date()}
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
