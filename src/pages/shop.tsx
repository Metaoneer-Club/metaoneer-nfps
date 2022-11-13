import React from "react";
import { NextPage } from "next/types";
import { useRouter } from "next/router";

/* Component */
import { Card } from "components/asset/card";
import { Badge } from "components/asset/badge";
import { AutoImage, shortAddress } from "utils";
import { Button } from "components/asset/button";

/* State */
import { useSetRecoilState } from "recoil";
import { isToastState, toastContentState } from "stores/toast";

const Shop: NextPage = () => {
  const router = useRouter();
  const setIsToast = useSetRecoilState(isToastState);
  const setToastContent = useSetRecoilState(toastContentState);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-[1200px] mx-auto pt-10 pb-40">
        <div className="text-sm flex">
          <div className="flex items-center mr-4">
            <div className="mr-2 rounded bg-dark text-white border py-2 px-3">
              Category
            </div>
            <select
              onChange={() => {}}
              defaultValue={0}
              className="border rounded p-2 w-28"
            >
              <option value={0}>All</option>
              <option value={1}>Food</option>
              <option value={2}>Game</option>
              <option value={3}>Goods</option>
              <option value={4}>Home</option>
              <option value={5}>Jewelry</option>
              <option value={6}>NFT</option>
              <option value={7}>Toon</option>
              <option value={8}>Travel</option>
            </select>
          </div>
          <div className="flex items-center">
            <div className="mr-2 rounded bg-dark text-white border py-2 px-3">
              Type
            </div>
            <select
              onChange={() => {}}
              defaultValue={0}
              className="border rounded p-2 w-28"
            >
              <option value={0}>All</option>
              <option value={1}>Limit</option>
              <option value={2}>Unlimit</option>
            </select>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-4 gap-6 mt-8">
            {[...Array(20)].map((v, i) => (
              <div
                key={i}
                className="group cursor-pointer"
                onClick={() => router.push(`/shop/${i}`)}
              >
                <Card className="border rounded-lg min-h-96 bg-white">
                  <div className="relative h-56 rounded-t overflow-hidden">
                    <AutoImage
                      src="/temp.png"
                      alt={"" + i}
                      className="object-cover transition group-hover:scale-110"
                    />
                  </div>
                  <div className="mt-2 px-4 pb-4">
                    <label className="text-gray-600 text-xs">
                      <span>Travel</span>
                      <span className="mx-1">|</span>
                      <span>
                        {shortAddress(
                          "0x12A60872B053C009452cdb95178144c8fFbDeA4D"
                        )}
                      </span>
                    </label>
                    <h2 className="mt-1 truncate">Example Title {i}</h2>
                    <p className="mt-2 text-gray-500 text-xs break-words truncate-3-lines">
                      BNB Smart Chain (BSC) supports the most popular
                      programming languages, flexible tools, and comes with
                      clear and canonical documentation. You can quickly start
                      and deploy your application on a blockchain designed with
                      real use in mind.
                    </p>
                    <div className="mt-3 flex items-center">
                      <Badge className="bg-danger">Limit</Badge>
                      <Badge className="bg-danger">Hot</Badge>
                      <Badge className="bg-primary">12 / 50</Badge>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
          <div className="grid justify-items-stretch pt-12">
            <Button
              className="border shadow bg-white w-2/5 p-4 justify-self-center hover:bg-dark hover:text-white"
              onClick={() => {
                setToastContent({
                  content: "Comming Soon!",
                  type: "primary",
                });
                setIsToast(true);
              }}
            >
              Read More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
