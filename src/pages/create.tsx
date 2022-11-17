import React, { useState } from "react";
import { NextPage } from "next/types";

/* Hook */
import useInput from "hooks/useInput";

/* Component */
import { paymentContract } from "components/blockchain";
import { Create01, Create02, Create03 } from "components/section";
import { hexBalance } from "utils";

/* State */
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isToastState, toastContentState, walletState } from "stores";
import clsx from "clsx";

const Create: NextPage = () => {
  const wallet = useRecoilValue(walletState);
  const [isTap, setIsTap] = useState<number>(0);
  const [currentKey, setCurrentKey] = useState<string>("");
  const [title, setTitle, onChangeTitle] = useInput<string>("");
  const [content, setContent, onChangeContent] = useInput<string>("");
  const [price, setPrice, onChangePrice] = useInput<number>(0);
  const [limit, setLimit] = useInput<boolean>(false);
  const [limitCount, setLimitCount, onChangeLimitCount] = useInput<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const setIsToast = useSetRecoilState(isToastState);
  const setToastContent = useSetRecoilState(toastContentState);

  const registerHandler = async () => {
    if (title.length === 0) {
      setToastContent({
        content: "Please enter your title.",
        type: "danger",
      });
      setIsToast(true);
      return;
    }

    if (content.length === 0) {
      setToastContent({
        content: "Please enter your description.",
        type: "danger",
      });
      setIsToast(true);
      return;
    }

    if (price === 0) {
      setToastContent({
        content: "Please enter your price.",
        type: "danger",
      });
      setIsToast(true);
      return;
    }

    setIsLoading(true);
    try {
      await paymentContract.methods
        .prepareKeyRegister(title, hexBalance(price), limitCount, Number(limit))
        .send({
          from: wallet.address,
          gas: 10000000,
        });
      const lastKey = await paymentContract.methods
        .lastKey(wallet.address)
        .call();
      setCurrentKey(lastKey);

      setToastContent({
        content: "Successfully registered.",
        type: "success",
      });
      setIsToast(true);
    } catch (err) {
      setToastContent({
        content: "Error! Please check for sufficient gas or network.",
        type: "danger",
      });
      setIsToast(true);
      setIsLoading(false);
      return;
    } finally {
      setTitle("");
      setContent("");
      setPrice(0);
      setLimit(false);
      setLimitCount(0);
      setIsLoading(false);
      setIsTap(2);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-[1200px] mx-auto pt-12 pb-40">
        <div className="grid grid-cols-7 content-center font-manrope">
          <div className="rounded-xl col-start-2 col-span-5 border shadow bg-white">
            <div className="grid grid-cols-8 gx-4 break-words font-bold border-b p-8">
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
                  Enter product information.
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
                  Check your demo.
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
                    Done!<br></br> Check your NFT.
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
                limit={limit}
                limitCount={limitCount}
                onChangeTitle={onChangeTitle}
                onChangeContent={onChangeContent}
                onChangePrice={onChangePrice}
                onChangeLimitCount={onChangeLimitCount}
                setLimit={setLimit}
                setIsTap={setIsTap}
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
