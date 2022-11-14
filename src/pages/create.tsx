import React, { useState } from "react";
import { NextPage } from "next/types";

/* Hook */
import useInput from "hooks/useInput";

/* Component */
import { paymentContract } from "components/blockchain";
import { Button } from "components/asset/button";
import { hexBalance } from "utils";

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
      alert("Please enter your title");
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
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-[1200px] mx-auto pt-28 ">
        <div className="font-manrope flex w-full items-center justify-center">
          <div className="mx-auto box-border w-[365px] border bg-white p-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Create Item</span>
              <div className="cursor-pointer border rounded-[4px]"></div>
            </div>

            <div className="mt-6">
              <div className="font-semibold">Title</div>
              <div>
                <input
                  className="mt-1 w-full rounded-[4px] border border-gray-400 p-2"
                  value="100.00"
                  type="text"
                  placeholder="100.00"
                />
              </div>
            </div>
            <div className="mt-6">
              <div className="font-semibold">Description</div>
              <div>
                <textarea
                  className="mt-1 w-full rounded-[4px] border border-gray-400 p-2"
                  value="100.00"
                  placeholder="100.00"
                />
              </div>
            </div>

            <div className="mt-6">
              <div className="font-semibold">From</div>
              <div className="mt-2">
                <div className="flex w-full items-center justify-between bg-neutral-100 p-3 rounded-[4px]">
                  <div className="flex items-center gap-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-[#299D37]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="font-semibold">Checking</span>
                  </div>

                  <div className="flex items-center gap-x-2">
                    <div className="text-[#64748B]">card ending in 6678</div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 cursor-pointer"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex justify-between">
                <span className="font-semibold text-[#191D23]">Receiving</span>
                <div className="flex cursor-pointer items-center gap-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div className="font-semibold text-green-700">
                    Add recipient
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-x-[10px] bg-neutral-100 p-3 mt-2 rounded-[4px]">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://images.unsplash.com/photo-1507019403270-cca502add9f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                  alt=""
                />
                <div>
                  <div className="font-semibold">Kathy Miller</div>
                  <div className="text-[#64748B]">@KittyKatmills</div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button
                className="w-full cursor-pointer rounded bg-primary px-3 py-2 text-center font-semibold text-white"
                onClick={registerHandler}>
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
