import React, {
  Dispatch,
  FC,
  MouseEventHandler,
  SetStateAction,
  useState,
} from "react";
import clsx from "clsx";

/* Component */
import { Button } from "components/asset/button";
import { ProductCard } from "components//asset/card/ProductCard";
import { Wallet } from "components/blockchain";
import { Card } from "components/asset/card";
import { Badge } from "components/asset/badge";
import { AutoImage, AutoSVG, shortAddress } from "utils";

interface Props {
  wallet: Wallet;
  isLoading: boolean;
  setIsTap: Dispatch<SetStateAction<number>>;
  registerHandler: MouseEventHandler<HTMLButtonElement>;
}

const Create02: FC<Props> = ({
  wallet,
  isLoading,
  setIsTap,
  registerHandler,
}) => {
  const [isOpen, setIsOpen] = useState<number>(0);

  const openHandler = (tapIndex: number) => {
    if (isOpen === tapIndex) {
      setIsOpen(-1);
    } else {
      setIsOpen(tapIndex);
    }
  };

  return (
    <div>
      <div className="mt-8 px-8">
        <div>
          <div
            className={clsx(
              "flex justify-between font-semibold shadow p-4 transition-colors",
              isOpen === 0 && "rounded bg-dark text-white"
            )}
            onClick={() => {
              openHandler(0);
            }}
          >
            <span>Demo in Main</span>
            <div
              className={clsx(
                "transition-transform rotate-90 duration-300",
                isOpen === 0 && "rotate-0"
              )}
            >
              <AutoSVG src="/media/icons/dropdown.svg" className="w-6 h-6" />
            </div>
          </div>
          {isOpen === 0 ? (
            <ProductCard
              className={clsx(
                "my-2 flex bg-dark text-center text-white h-56 animate__animated animate__fast",
                isOpen === 0 ? "animate__fadeIn" : "animate__fadeOut"
              )}
            >
              <div className="relative w-1/2 h-full">
                <AutoImage
                  src={dummy.src}
                  alt={dummy.title}
                  className="rounded-l-xl object-cover"
                />
              </div>
              <div className="w-1/2 p-6">
                <h2 className="font-bold">{dummy.title}</h2>
                <p className="mt-2 text-gray-400 text-xs break-words truncate-3-lines">
                  {dummy.content}
                </p>
                <div className="flex mt-4 items-center justify-between mx-7">
                  <p>
                    <strong className="text-lg text-danger-active">100</strong>{" "}
                    BNB
                  </p>
                  <p>
                    <strong className="text-lg text-danger-active">12</strong>
                    <span className="mx-1">/</span>
                    <strong className="text-lg">50</strong>
                    <span className="mx-1">ea</span>
                  </p>
                </div>
                <Button
                  className="mt-3 w-full border text-sm hover:bg-white hover:text-dark"
                  onClick={() => {}}
                >
                  See More
                </Button>
              </div>
            </ProductCard>
          ) : (
            ""
          )}
        </div>
        <div>
          <div
            className={clsx(
              "flex justify-between font-semibold shadow p-4 transition-colors",
              isOpen === 1 && "rounded bg-dark text-white"
            )}
            onClick={() => openHandler(1)}
          >
            <span>Demo in Product List</span>
            <div
              className={clsx(
                "transition-transform rotate-90 duration-300",
                isOpen === 1 && "rotate-0"
              )}
            >
              <AutoSVG src="/media/icons/dropdown.svg" className="w-6 h-6" />
            </div>
          </div>

          {isOpen === 1 ? (
            <div
              className={clsx(
                "w-72 mx-auto group cursor-pointer my-2 animate__animated animate__fast",
                isOpen === 1 ? "animate__fadeIn" : "animate__fadeOut"
              )}
            >
              <Card className="border rounded-lg min-h-96 bg-white">
                <div className="relative h-56 rounded-t overflow-hidden">
                  <AutoImage
                    src={dummy.src}
                    alt={dummy.title}
                    className="object-cover transition group-hover:scale-110"
                  />
                </div>
                <div className="mt-2 px-4 pb-4">
                  <label className="text-gray-600 text-xs">
                    <span>NFT</span>
                    <span className="mx-1">|</span>
                    <span>{shortAddress(wallet.address)}</span>
                  </label>
                  <h2 className="mt-1 truncate">{dummy.title}</h2>
                  <p className="mt-2 text-gray-500 text-xs break-words truncate-3-lines">
                    {dummy.content}
                  </p>
                  <div className="mt-3 flex items-center">
                    <Badge className="bg-danger">Limit</Badge>
                    <Badge className="bg-danger">Hot</Badge>
                    <Badge className="bg-primary">12 / 50</Badge>
                  </div>
                </div>
              </Card>
            </div>
          ) : (
            ""
          )}
        </div>
        <div>
          <div
            className={clsx(
              "flex justify-between font-semibold shadow p-4 transition-colors",
              isOpen === 2 && "rounded bg-dark text-white"
            )}
            onClick={() => openHandler(2)}
          >
            <span>Demo in Product Detail</span>
            <div
              className={clsx(
                "transition-transform rotate-90 duration-300",
                isOpen === 2 && "rotate-0"
              )}
            >
              <AutoSVG src="/media/icons/dropdown.svg" className="w-6 h-6" />
            </div>
          </div>
          {isOpen === 2 ? (
            <div
              className={clsx(
                "my-2 animate__animated animate__fast",
                isOpen === 2 ? "animate__fadeIn" : "animate__fadeOut"
              )}
            >
              <div className="flex justify-between items-center">
                <div className="text-2xl text-center font-bold flex items-center">
                  <span className="px-4 py-2 text-sm border rounded-xl bg-primary-active text-white mr-6">
                    NFT
                  </span>
                  <span>{dummy.title}</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6 pt-3">
                <div className="col-span-2">
                  <div className="relative w-full h-64">
                    <AutoImage
                      src={dummy.src}
                      alt={dummy.title}
                      className="object-cover rounded-xl"
                    />
                  </div>
                </div>
                <div className="flex flex-col px-5 py-3 rounded-xl border bg-white">
                  <div>
                    <label className="text-xs font-bold text-gray-600">
                      Intro
                    </label>
                    <p className="mt-1 text-sm truncate">Example Intro</p>
                  </div>
                  <div className="pt-2">
                    <label className="text-xs font-bold text-gray-600">
                      Price
                    </label>
                    <p className="mt-1 text-sm">
                      <strong className="mr-2">3</strong>BNB
                    </p>
                  </div>
                  <div className="pt-2">
                    <label className="text-xs font-bold text-gray-600">
                      Limit
                    </label>
                    <p className="mt-1">
                      <strong className="text-sm text-danger">12</strong>
                      <span className="mx-2">/</span>
                      <strong className="text-sm">50</strong>
                    </p>
                  </div>
                  <div className="mt-4 w-full">
                    <Button
                      className="bg-primary py-2 text-white w-full text-xs hover:bg-primary-active"
                      onClick={() => {}}
                    >
                      Buy
                    </Button>
                  </div>
                </div>
                <Card className="col-span-2 mt-1 border p-6 bg-white rounded-xl">
                  <label className="text-xs font-bold text-gray-600">
                    Description
                  </label>
                  <p className="mt-1 text-xs leading-relaxed">
                    {dummy.content}
                  </p>
                </Card>
                <Card className="self-start border mt-1 bg-white rounded-xl">
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
                      {shortAddress(wallet.address)}
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
          ) : (
            ""
          )}
        </div>

        <div className="mt-6">
          <div className="font-semibold">Address</div>
          <div className="mt-2">
            <div className="flex items-center bg-neutral-100 p-3 rounded border border-gray-400">
              <div className="flex items-center gap-x-2">
                <AutoSVG
                  src="/media/social-logos/metamask.svg"
                  className="w-5 h-5 mx-2"
                />
                <span className="font-semibold">
                  {shortAddress(wallet.address)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 p-8">
        <Button
          className="rounded py-4 text-center font-bold border border-danger text-white bg-danger hover:bg-danger-active"
          onClick={() => setIsTap(0)}
          disabled={isLoading}
        >
          <span>BACK</span>
        </Button>
        <Button
          className={clsx(
            "col-span-2 rounded py-4 text-center font-bold text-white",
            isLoading ? "bg-indigo-400" : "bg-indigo-700 hover:bg-indigo-900"
          )}
          onClick={registerHandler}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              Please Wait...
              <div className="animate-spin ml-2">
                <AutoSVG src="/media/icons/spinner.svg" className="w-6 h-6" />
              </div>
            </span>
          ) : (
            <span>CREATE</span>
          )}
        </Button>
      </div>
    </div>
  );
};

const dummy = {
  title: "Awesome Binance",
  src: "/temp.png",
  content:
    "BNB Smart Chain (BSC) supports the most popular programming languages, flexible tools, and comes with clear and canonical documentation. You can quickly start and deploy your application on a blockchain designed with real use in mind.",
};

export { Create02 };
