import React, { useState } from "react";
import { NextPage } from "next/types";

/* Hook */
import useInput from "hooks/useInput";

/* Component */
import { paymentContract } from "components/blockchain";
import { Button } from "components/asset/button";
import { AutoImage, AutoSVG, hexBalance, shortAddress } from "utils";

/* State */
import { useRecoilValue } from "recoil";
import { walletState } from "stores";

const Create: NextPage = () => {
  const wallet = useRecoilValue(walletState);
  const [currentKey, setCurrentKey] = useState<string>("");
  const [title, setTitle, onChangeTitle] = useInput<string>("");
  const [content, setContent, onChangeContent] = useInput<string>("");
  const [price, setPrice, onChangePrice] = useInput<number>(0);

  const registerHandler = async () => {
    if (title.length === 0) {
      alert("Please enter your title.");
      return;
    }

    if (price < 0.01) {
      alert("A minimum of 0.01 bnb is required");
      return;
    }

    try {
      await paymentContract.methods
        .prepareKeyRegister(title, content, hexBalance(price))
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
      return;
    }

    setTitle("");
    setContent("");
    setPrice(0);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-[1200px] mx-auto pt-12 pb-40">
        <div className="grid grid-cols-6 content-center font-manrope">
          <div className="rounded-xl col-start-2 col-span-4 border shadow bg-white">
            <div className="flex justify-between border-b p-8">
              <div className="flex items-center justify-center">
                <span className="bg-blue-500 w-8 h-8 text-center leading-7 text-white font-bold rounded-full mr-2">
                  1
                </span>
                <span className="text-sm">Enter product information</span>
              </div>
              <div>-</div>
              <div className="flex items-center justify-center">
                <span className="bg-blue-500 w-8 h-8 text-center leading-7 text-white font-bold rounded-full mr-2">
                  2
                </span>
                <span className="text-sm">Enter product information</span>
              </div>
              <div>-</div>
              <div className="flex items-center justify-center">
                <span className="bg-blue-500 w-8 h-8 text-center leading-7 text-white font-bold rounded-full mr-2">
                  3
                </span>
                <span className="text-sm">Enter product information</span>
              </div>
            </div>

            <div className="mt-8 px-8">
              <div>
                <div className="font-semibold">Upload Image</div>
                <div className="relative w-full h-60 mt-2">
                  <AutoImage
                    src="temp.png"
                    className="object-cover rounded border border-gray-200"
                    alt="temp"
                  />
                </div>
              </div>

              <div className="mt-6">
                <div className="font-semibold">Title</div>
                <div>
                  <input
                    className="mt-1 w-full rounded border border-gray-400 p-2"
                    type="text"
                    defaultValue=""
                    placeholder="Example Title"
                  />
                </div>
              </div>
              <div className="mt-6">
                <div className="font-semibold">Description</div>
                <div>
                  <textarea
                    className="mt-1 w-full rounded border border-gray-400 p-2"
                    defaultValue=""
                    placeholder="Example Description"
                  />
                </div>
              </div>

              <div className="mt-6">
                <div className="font-semibold">Address</div>
                <div className="mt-2">
                  <div className="flex items-center justify-between bg-neutral-100 p-3 rounded border border-gray-400">
                    <div className="flex items-center gap-x-2">
                      <AutoSVG
                        src="/media/icons/verified.svg"
                        className="w-6 h-6 text-primary"
                      />
                      <span className="font-semibold">
                        {shortAddress(
                          "0x12A60872B053C009452cdb95178144c8fFbDeA4D"
                        )}
                      </span>
                    </div>
                    <AutoSVG
                      src="/media/icons/dropdown.svg"
                      className="w-6 h-6"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8">
              <Button
                className="w-full rounded bg-primary py-4 text-center font-bold text-white"
                onClick={registerHandler}
              >
                Create
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
