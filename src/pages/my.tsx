import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import axios from "axios";

/* API */
import { AddProfileAPI, CheckProfileAPI } from "api";

/* Component */
import {
  fundContract,
  getBN,
  nftContract,
  signCaller,
  tokenPacker,
} from "components/blockchain";
import { Product, ProductCard } from "components/card/ProductCard";
import { Button } from "components/asset/button";
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
  const { isLoading: loadingProfile, data } = useQuery(
    ["Profile"],
    async () => {
      const res = await CheckProfileAPI({
        address: wallet.address,
        chain_id: wallet.network,
      });

      return res;
    },
    {
      staleTime: 500,
    }
  );
  const [projectAry, setProjectAry] = useState<Product[]>([]);
  const [blockNumber, setBlockNumber] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
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
    setIsUpdate(true);
    const sign = await signCaller(wallet.address).catch(() => {
      setToastContent({
        content: "서명이 취소되었습니다.",
        type: "danger",
      });
      setIsToast(true);
    });

    let token = tokenPacker({
      wallet: "metamask",
      nonce: "Metaoneer Service.",
      network: wallet.network,
      address: wallet.address,
      signature: sign,
    });

    try {
      await AddProfileAPI({
        token: token,
        nickname: "Orbit",
        content: "하이용",
      });
      setToastContent({
        content: "프로필이 성공적으로 업데이트 되었습니다.",
        type: "success",
      });
      setIsToast(true);
    } catch (err) {
      setToastContent({
        content: "프로필 업데이트에 실패하였습니다.",
        type: "danger",
      });
      setIsToast(true);
    }
    setIsUpdate(false);
  };

  const imageHandler = async (e: any) => {
    setIsUpdate(true);
    let sign = await signCaller(wallet.address).catch(() => {
      setToastContent({
        content: "서명이 취소되었습니다.",
        type: "danger",
      });
      setIsToast(true);
      return;
    });

    let token = tokenPacker({
      wallet: "metamask",
      nonce: "Metaoneer Service.",
      network: wallet.network,
      address: wallet.address,
      signature: sign,
    });

    const formData: any = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      await axios({
        method: "POST",
        url: "/api/profile",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
        data: formData,
      });
      setToastContent({
        content: "프로필 이미지가 성공적으로 업데이트 되었습니다.",
        type: "success",
      });
      setIsToast(true);
    } catch (err) {
      console.log(err);
      setToastContent({
        content: "프로필 이미지 업데이트에 실패하였습니다.",
        type: "danger",
      });
      setIsToast(true);
    }
    setIsUpdate(false);
  };

  if (isLoading || loadingProfile) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-dark-600">
        <div className="max-w-[1200px] mx-auto pt-12 pb-40">
          <div className="text-center mt-8">
            <div className="relative w-12 h-12 animate-spin mx-auto">
              <AutoImage src="/media/icons/spinner.svg" alt="loading" />
            </div>
            <h2 className="mt-4">로딩중 입니다...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-600">
      <div className="max-w-[1200px] mx-auto pt-12 pb-40">
        <div className="flex flex-col w-2/5 mx-auto">
          <div className="flex bg-white dark:bg-dark border border-white dark:border-dark-300 shadow-lg rounded-xl">
            <div className="border-r dark:border-dark-300 p-4">
              <div className="relative w-40">
                <div className="relative w-28 h-28 mx-auto">
                  <AutoImage
                    src={data.image_url || "/media/avatars/blank.svg"}
                    alt="profile"
                    className="object-cover rounded-full"
                  />
                  {isUpdate && (
                    <div className="absolute p-9">
                      <div className="animate-spin">
                        <AutoSVG
                          className="w-12 h-12 text-gray-300"
                          src="/media/icons/spinner.svg"
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="absolute group cursor-pointer bottom-0 right-3">
                  <input
                    type="file"
                    className="absolute inset-0 text-sm text-slate-500 opacity-0 w-8 h-8 rounded-full"
                    accept="image/jpg,impge/png,image/jpeg,image/gif"
                    onChange={imageHandler}
                  />
                  <button className="text-xs bg-gray-400 group-hover:bg-indigo-500 rounded-full transition-colors duration-300">
                    <AutoSVG
                      src="/media/icons/edit.svg"
                      className="w-8 h-8 p-1.5"
                    />
                  </button>
                </div>
              </div>
              <div className="text-center p-3">
                <div className="w-full flex-none text-lg text-gray-800 dark:text-gray-300 font-bold leading-none">
                  {data.nickname || "닉네임"}
                </div>
                <div className="mt-1 text-xs text-gray-600 truncate-5-lines">
                  {shortAddress(data.address || wallet.address)}
                </div>
              </div>
            </div>
            <div className="w-full text-gray-500 dark:text-gray-400 text-sm p-4">
              <div className="w-full h-3/4">
                <label className="font-medium text-xs">프로필 소개</label>
                <div className="mt-1">{data.content || "프로필 소개란"}</div>
              </div>
              <div className="h-1/4 flex justify-end">
                <Button onClick={editProfileHandler} className="border">
                  내용 수정하기
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-6 mt-12">
          {projectAry?.map((v: any) => (
            <ProductCard
              key={v.keyID}
              keyID={v.keyID}
              title="엄청난 제목"
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
      </div>
    </div>
  );
};

export default MyPage;
