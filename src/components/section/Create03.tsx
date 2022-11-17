import React, { FC } from "react";
import { useRouter } from "next/router";

/* Component */
import { Button } from "components/asset/button";
import { AutoSVG, shortAddress } from "utils";

interface Props {
  currentKey: string;
}

const Create03: FC<Props> = ({ currentKey }) => {
  const router = useRouter();

  return (
    <div>
      <div className="mt-8 px-8 text-center">
        <div className="font-bold text-2xl">The Product has been created!</div>
        <div className="p-4">
          <AutoSVG
            src="/media/icons/verified.svg"
            className="w-16 h-16 mt-3 text-indigo-600 mx-auto"
          />

          <div className="mt-6 text-gray-600">
            <span>Check your product{"'"}s NFT in</span>
            <strong
              onClick={() => router.push("/my")}
              className="mx-1 text-indigo-600 cursor-pointer underline"
            >
              My Product
            </strong>
            <div>
              or Press the button below to return to <strong>Home</strong>
            </div>
          </div>
          <div className="mt-6 w-96 mx-auto border border-gray-400 rounded-lg text-sm">
            <div className="flex border-b border-gray-400 items-center">
              <div className="w-1/2 p-4 border-r border-gray-400">
                NFT TOKEN_ID (KEY)
              </div>
              <div className="w-1/2 p-4">{currentKey || "Error"}</div>
            </div>
            <div className="flex items-center">
              <div className="w-1/2 p-4 border-r border-gray-400">
                NFT Contract Address
              </div>
              <div className="w-1/2 p-4">
                <span
                  onClick={() =>
                    window.open(
                      "https://testnet.bscscan.com/address/0x690245a527dFf32Dc850A79E801F6D221eDb1A1F"
                    )
                  }
                  className="cursor-pointer underline hover:text-indigo-600"
                >
                  {shortAddress("0x690245a527dFf32Dc850A79E801F6D221eDb1A1F")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        <Button
          className="w-full rounded bg-indigo-700 hover:bg-indigo-900 py-4 text-center font-bold text-white"
          onClick={() => router.push("/")}
        >
          DONE
        </Button>
      </div>
    </div>
  );
};

export { Create03 };
