import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

/* Component */
import { paymentContract } from "components/blockchain";
import { ProductCard } from "components/card/ProductCard";
import { AutoImage } from "utils";

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
  const [isLoading, setIsLoading] = useState(true);
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
          console.log(index);
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
              @Orbit__dev
            </div>
            <div className="text-center font-normal text-lg">Metaoneer</div>
            <div className="px-6 text-center mt-2 font-light text-sm">
              <p>Front-end Developer</p>
            </div>
            <hr className="mt-4" />
            <div className="flex text-center">
              <div className="w-1/2 p-4 border-r">
                <span className="font-bold">{products.length || 0}</span>{" "}
                Products
              </div>
              <div className="w-1/2 p-4">
                <span className="font-bold">2.0 k</span> Sales
              </div>
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
