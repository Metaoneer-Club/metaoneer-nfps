import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import router, { useRouter } from "next/router";

/* Component */
import { Badge } from "components/asset/badge";
import { Card } from "components/asset/card";
import { AutoImage, shortAddress } from "utils";
import { paymentContract } from "~/components/blockchain";

/* State */
import { isToastState, toastContentState, walletState } from "stores";
import { useRecoilValue, useSetRecoilState } from "recoil";

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
  const setIsToast = useSetRecoilState(isToastState);
  const setToastContent = useSetRecoilState(toastContentState);

  useEffect(() => {
    const callProducts = async () => {
      if (!wallet.address) {
        setToastContent({
          content: "Please connect your wallet first.",
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
            .prepareKeypool(index)
            .call();
          keyAry.push(keypool);
        };
        promises.push(promise(id));
      }
      await Promise.all(promises);

      setProducts(keyAry);
    };
    callProducts();
  }, [wallet.address]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-[1200px] mx-auto pt-28 pb-40">
        <div className="font-sans w-full flex justify-center items-center">
          <div className="w-96 mx-auto bg-white shadow-xl hover:shadow">
            <div className="relative w-32 h-32 mx-auto -mt-20 border-8 border-white rounded-full overflow-hidden">
              <AutoImage
                src="/team/Orbit.png"
                alt="profile"
                className="scale-[140%] -mt-3 object-contain"
              />
            </div>
            <div className="text-center mt-2 text-3xl font-bold">Orbit</div>
            <div className="text-center mt-2 font-light text-sm">
              @orbit__dev
            </div>
            <div className="text-center font-normal text-lg">Metaoneer</div>
            <div className="px-6 text-center mt-2 font-light text-sm">
              <p>Front-end Developer</p>
            </div>
            <hr className="mt-8" />
            <div className="flex p-4">
              <div className="w-1/2 text-center">
                <span className="font-bold">1.8 k</span> Followers
              </div>
              <div className="w-0 border border-gray-300"></div>
              <div className="w-1/2 text-center">
                <span className="font-bold">2.0 k</span> Following
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-6 mt-12">
          <>
            {products?.map((v: KeyData) => (
              <div
                key={v.key}
                className="group cursor-pointer"
                onClick={() => router.push(`/shop/${v.key}`)}
              >
                <Card className="border rounded-lg min-h-96 bg-white">
                  <div className="relative h-56 rounded-t overflow-hidden">
                    <AutoImage
                      src="/temp.png"
                      alt={v.title}
                      className="object-cover transition group-hover:scale-110"
                    />
                  </div>
                  <div className="mt-2 px-4 pb-4">
                    <label className="text-gray-600 text-xs">
                      <span>NFT</span>
                      <span className="mx-1">|</span>
                      <span>{shortAddress(v.owner)}</span>
                    </label>
                    <h2 className="mt-1 truncate">{v.title}</h2>
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
          </>
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
                    <span>NFT</span>
                    <span className="mx-1">|</span>
                    <span>
                      {shortAddress(
                        "0x12A60872B053C009452cdb95178144c8fFbDeA4D"
                      )}
                    </span>
                  </label>
                  <h2 className="mt-1 truncate">Example Title {i}</h2>
                  <p className="mt-2 text-gray-500 text-xs break-words truncate-3-lines">
                    BNB Smart Chain (BSC) supports the most popular programming
                    languages, flexible tools, and comes with clear and
                    canonical documentation. You can quickly start and deploy
                    your application on a blockchain designed with real use in
                    mind.
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
      </div>
    </div>
  );
};

export default MyPage;
