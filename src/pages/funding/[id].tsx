import { useRouter } from "next/router";
import React, { useState } from "react";
import Payments from "metaoneer-payment";

/* Component */
import { Card } from "components/asset/card";
import { Button } from "components/asset/button";
import { AutoImage, AutoSVG, shortAddress } from "utils";

/* State */
import { useSetRecoilState } from "recoil";
import { isToastState, toastContentState } from "stores/toast";

const Product = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const setIsToast = useSetRecoilState(isToastState);
  const setToastContent = useSetRecoilState(toastContentState);

  return (
    <>
      {isOpen && (
        <Payments
          tokenId={Number(router.query.id)}
          buyCount={1}
          close={() => setIsOpen(false)}
        />
      )}
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-[1200px] mx-auto pt-16 pb-40">
          <div className="flex justify-between items-center">
            <div className="text-3xl text-center font-bold flex items-center">
              <span className="px-4 py-2 border rounded-xl text-lg bg-primary-active text-white mr-6">
                Category
              </span>
              <span>Example Title {router.query.id}</span>
            </div>
            <div className="flex">
              <Button
                className="flex items-center bg-white shadow hover:bg-dark hover:text-white mr-4"
                onClick={() => {
                  if (Number(router.query.id) > 0)
                    router.push(`/funding/${Number(router.query.id) - 1}`);
                }}
              >
                <AutoSVG className="mr-2" src="/media/icons/arrow-left.svg" />
                <span className="pr-1">이전</span>
              </Button>
              <Button
                className="flex items-center bg-white shadow hover:bg-dark hover:text-white"
                onClick={() => {
                  if (Number(router.query.id) < 20)
                    router.push(`/funding/${Number(router.query.id) + 1}`);
                }}
              >
                <span className="pl-1">다음</span>
                <AutoSVG className="ml-2" src="/media/icons/arrow-right.svg" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 pt-6">
            <div className="col-span-2">
              <div className="relative w-full h-96">
                <AutoImage
                  src="/temp.png"
                  alt="bnb"
                  className="object-cover rounded-xl"
                />
              </div>
            </div>
            <div className="flex flex-col p-8 rounded-xl border bg-white">
              <div>
                <label className="text-sm font-bold text-gray-600">Intro</label>
                <p className="mt-2 truncate">Example Intro</p>
              </div>
              <div className="pt-8">
                <label className="text-sm font-bold text-gray-600">Price</label>
                <p className="mt-2">
                  <strong className="text-xl mr-2">3</strong>klay
                </p>
              </div>
              <div className="pt-8">
                <label className="text-sm font-bold text-gray-600">Limit</label>
                <p className="mt-2">
                  <strong className="text-xl text-danger">12</strong>
                  <span className="mx-2">/</span>
                  <strong className="text-xl">50</strong>
                </p>
              </div>
              <div className="mt-auto w-full">
                <Button
                  className="bg-primary text-white w-full hover:bg-primary-active"
                  onClick={() => {
                    if (Number(router.query.id) < 9) {
                      setIsOpen(true);
                    } else {
                      setToastContent({
                        content: "Comming Soon!",
                        type: "primary",
                      });
                      setIsToast(true);
                    }
                  }}
                >
                  Buy
                </Button>
              </div>
            </div>
            <Card className="col-span-2 mt-4 border p-6 bg-white rounded-xl">
              <label className="text-sm font-bold text-gray-600">
                Description
              </label>
              <p className="mt-4 leading-relaxed">
                BNB Smart Chain (BSC) supports the most popular programming
                languages, flexible tools, and comes with clear and canonical
                documentation. You can quickly start and deploy your application
                on a blockchain designed with real use in mind. BNB Smart Chain
                (BSC) supports the most popular programming languages, flexible
                tools, and comes with clear and canonical documentation. You can
                quickly start and deploy your application on a blockchain
                designed with real use in mind. BNB Smart Chain (BSC) supports
                the most popular programming languages, flexible tools, and
                comes with clear and canonical documentation. You can quickly
                start and deploy your application on a blockchain designed with
                real use in mind.
              </p>
            </Card>
            <Card className="self-start border mt-4 bg-white rounded-xl">
              <h3 className="text-xs font-bold text-gray-600 px-6 pt-4">
                Creator Information
              </h3>
              <div className="flex items-center mt-3 px-6 pb-4 border-b">
                <div className="relative w-7 h-7 mr-2">
                  <AutoImage
                    className="rounded-full border"
                    src="/media/avatars/blank.svg"
                    alt="icon"
                  />
                </div>
                <div className="text-xs">
                  {shortAddress("0x12A60872B053C009452cdb95178144c8fFbDeA4D")}
                </div>
              </div>
              <div className="grid grid-cols-3 text-center">
                <div className="border-r">
                  <p className="text-xs my-2">All</p>
                  <p className="pb-3">5</p>
                </div>
                <div className="border-r">
                  <p className="text-xs my-2">Limit</p>
                  <p className="pb-3">4</p>
                </div>
                <div>
                  <p className="text-xs my-2">Unlimit</p>
                  <p className="pb-3">1</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;