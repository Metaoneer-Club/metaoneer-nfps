import React, { useState } from "react";
import { NextPage } from "next/types";

/* Hook */
import useInput from "hooks/useInput";

/* Component */
import { paymentContract } from "components/blockchain";
import { Create01, Create02, Create03 } from "components/section";
import { hexBalance } from "utils";

/* State */
import { useRecoilValue } from "recoil";
import { walletState } from "stores";

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

  const registerHandler = async () => {
    if (title.length === 0) {
      alert("Please enter your title.");
      return;
    }

    if (price === 0) {
      alert("Please enter your Price.");
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
      alert("Successfully registered");
      setCurrentKey(lastKey);
    } catch (err) {
      alert("Error! Please check for sufficient gas or network");
      setIsLoading(false);
      return;
    } finally {
      setTitle("");
      setContent("");
      setPrice(0);
      setLimit(false);
      setLimitCount(0);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-[1200px] mx-auto pt-12 pb-40">
        <div className="grid grid-cols-6 content-center font-manrope">
          <div className="rounded-xl col-start-2 col-span-4 border shadow bg-white">
            <div className="grid grid-cols-8 gx-4 break-words font-bold border-b p-8">
              <div className="col-span-2 items-center justify-center">
                <div className="bg-indigo-700 border border-indigo-700 w-8 h-8 mx-auto text-center leading-7 text-white font-bold rounded-full">
                  1
                </div>
                <div className="mt-2 text-center text-sm">
                  Enter product information.
                </div>
              </div>
              <div className="col-span-1 flex items-center">
                <hr className="w-3/4 mx-auto"></hr>
              </div>
              <div className="col-span-2 items-center justify-center">
                <div className="bg-indigo-400 border border-indigo-400 w-8 h-8 mx-auto text-center leading-7 text-white font-bold rounded-full">
                  2
                </div>
                <div className="mt-2 text-center text-sm">Check your demo.</div>
              </div>
              <div className="col-span-1 flex items-center">
                <hr className="w-3/4 mx-auto"></hr>
              </div>
              <div className="col-span-2 items-center justify-center">
                <div className="bg-indigo-400 border border-indigo-400 w-8 h-8 mx-auto text-center leading-7 text-white font-bold rounded-full">
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
                isLoading={isLoading}
                title={title}
                content={content}
                price={price}
                limit={limit}
                limitCount={limitCount}
                onChangeTitle={onChangeTitle}
                onChangeContent={onChangeContent}
                onChangePrice={onChangePrice}
                setLimit={setLimit}
                onChangeLimitCount={onChangeLimitCount}
                registerHandler={registerHandler}
              />
            ) : (
              ""
            )}
            {isTap === 1 ? <Create02 registerHandler={registerHandler} /> : ""}
            {isTap === 2 ? <Create03 registerHandler={registerHandler} /> : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
