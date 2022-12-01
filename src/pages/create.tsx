import React, { useState } from "react";
import { NextPage } from "next/types";
import clsx from "clsx";

/* Hook */
import useInput from "hooks/useInput";

/* Component */
import { fundContract, nftContract } from "components/blockchain";
import { Create01, Create02, Create03 } from "components/section";
import { hexBalance } from "utils";

/* State */
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isToastState, toastContentState, walletState } from "stores";

const Create: NextPage = () => {
  const wallet = useRecoilValue(walletState);
  const [isTap, setIsTap] = useState<number>(0);
  const [currentKey, setCurrentKey] = useState<string>("");
  const [title, setTitle, onChangeTitle] = useInput<string>("");
  const [content, setContent] = useState<string | undefined>(
    "### 여기에 설명을 입력해 주세요."
  );
  const [price, setPrice, onChangePrice] = useInput<number>(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const setIsToast = useSetRecoilState(isToastState);
  const setToastContent = useSetRecoilState(toastContentState);

  const checkRule = () => {
    if (title.length === 0) {
      setToastContent({
        content: "프로젝트 제목을 입력해 주세요.",
        type: "danger",
      });
      setIsToast(true);
      return false;
    }

    if (content?.length === 0) {
      setToastContent({
        content: "프로젝트 설명을 입력해 주세요.",
        type: "danger",
      });
      setIsToast(true);
      return false;
    }

    if (price === 0) {
      setToastContent({
        content: "펀딩 목표비용을 입력해 주세요.",
        type: "danger",
      });
      setIsToast(true);
      return false;
    }

    return true;
  };

  const continueHandler = () => {
    if (checkRule()) {
      window.scrollTo(0, 0);
      setIsTap(1);
    }
  };

  const registerHandler = async () => {
    if (!checkRule()) return;

    setIsLoading(true);
    try {
      await fundContract.methods
        .FundRegister(hexBalance(price), [
          [123, 345, 2, [0, 0, []], [wallet.address, 0, 0, 0]],
          [567, 678, 4, [0, 0, []], [wallet.address, 0, 0, 0]],
        ])
        .send({
          from: wallet.address,
          gas: 10000000,
        });
      const balanceOf = await nftContract.methods
        .balanceOf(wallet.address)
        .call();
      const lastToken = await nftContract.methods
        .tokenOfOwnerByIndex(wallet.address, Number(balanceOf - 1))
        .call();
      setCurrentKey(lastToken);

      setToastContent({
        content: "프로젝트가 성공적으로 등록되었습니다.",
        type: "success",
      });
      setIsToast(true);
    } catch (err) {
      console.log(err);
      setToastContent({
        content: "가스비가 부족하거나 네트워크 이슈가 있습니다.",
        type: "danger",
      });
      setIsToast(true);
      setIsLoading(false);
      return;
    }

    setTitle("");
    setContent("");
    setPrice(0);
    setIsLoading(false);
    setIsTap(2);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-600">
      <div className="max-w-[1200px] mx-auto pt-12 pb-40">
        <div className="grid grid-cols-7 content-center font-manrope">
          <div className="rounded-xl col-start-2 col-span-5 border shadow bg-white dark:bg-dark dark:border-dark-300">
            <div className="grid grid-cols-8 gx-4 break-words font-bold border-b dark:border-dark-300 p-8">
              <div className="col-span-2 items-center justify-center">
                <div
                  className={clsx(
                    "border w-8 h-8 mx-auto text-center leading-7 text-white font-bold rounded-full",
                    isTap === 0
                      ? "bg-indigo-700 border-indigo-700"
                      : "bg-indigo-400 border-indigo-400"
                  )}
                >
                  1
                </div>
                <div className="mt-2 text-center text-sm py-2">
                  프로젝트 정보를 입력해 주세요.
                </div>
              </div>
              <div className="col-span-1 flex items-center">
                <hr className="w-3/4 mx-auto"></hr>
              </div>
              <div className="col-span-2 items-center justify-center">
                <div
                  className={clsx(
                    "border w-8 h-8 mx-auto text-center leading-7 text-white font-bold rounded-full",
                    isTap === 1
                      ? "bg-indigo-700 border-indigo-700"
                      : "bg-indigo-400 border-indigo-400"
                  )}
                >
                  2
                </div>
                <div className="mt-2 text-center text-sm py-2">
                  프로젝트 데모를 확인해 주세요.
                </div>
              </div>
              <div className="col-span-1 flex items-center">
                <hr className="w-3/4 mx-auto"></hr>
              </div>
              <div className="col-span-2 items-center justify-center">
                <div
                  className={clsx(
                    "border w-8 h-8 mx-auto text-center leading-7 text-white font-bold rounded-full",
                    isTap === 2
                      ? "bg-indigo-700 border-indigo-700"
                      : "bg-indigo-400 border-indigo-400"
                  )}
                >
                  3
                </div>
                <div className="mt-2 text-center text-sm">
                  <div>
                    펀딩 NFT 생성 완료!<br></br> 프로젝트를 확인해 보세요.
                  </div>
                </div>
              </div>
            </div>

            {isTap === 0 ? (
              <Create01
                wallet={wallet}
                title={title}
                content={content}
                price={price}
                startDate={startDate}
                endDate={endDate}
                onChangeTitle={onChangeTitle}
                onChangeContent={setContent}
                onChangePrice={onChangePrice}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                continueHandler={continueHandler}
              />
            ) : (
              ""
            )}
            {isTap === 1 ? (
              <Create02
                wallet={wallet}
                isLoading={isLoading}
                setIsTap={setIsTap}
                registerHandler={registerHandler}
              />
            ) : (
              ""
            )}
            {isTap === 2 ? <Create03 currentKey={currentKey} /> : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
