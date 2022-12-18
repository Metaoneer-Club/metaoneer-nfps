import React, { FC, MouseEventHandler } from "react";
import { v1 } from "uuid";
import { useRouter } from "next/router";

/* API */
import { IMileData } from "api/APIModel";
import { FundingOutputAPI } from "api";

/* Component */
import { Button } from "components/asset/button";
import { Badge } from "components/asset/badge";
import { AutoSVG } from "utils";

interface Props {
  mileData: IMileData;
  price: number;
  isOwner: boolean;
  isIndex: number;
  startBN: number;
  endBN: number;
  close: MouseEventHandler<HTMLButtonElement>;
}

const MilestoneUserModal: FC<Props> = ({
  mileData,
  price,
  isOwner,
  startBN,
  endBN,
  close,
}) => {
  const router = useRouter();

  const outputHandler = async (id: number, done: boolean) => {
    await FundingOutputAPI({
      token_id: Number(router.query.id),
      output_id: id,
      done: !done,
    });
  };

  return (
    <>
      <div className="py-12 bg-gray-700/50 dark:bg-black/60 transition duration-150 ease-in-out z-30 fixed top-0 right-0 bottom-0 left-0">
        <div className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
          <div className="relative py-4 px-1 md:px-3 bg-white dark:bg-dark shadow-md rounded border border-gray-400 dark:border-dark-300">
            <div className="custom-scroll py-4 px-4 md:px-7 max-h-[360px] overflow-auto">
              <div className="w-full flex items-center text-gray-600 dark:text-gray-300 mb-3">
                <Badge className="bg-info-active mr-2">진행중</Badge>
                <h1 className="text-gray-800 dark:text-gray-300 text-lg font-bold">
                  {mileData.title}
                </h1>
              </div>
              <div className="mt-6 text-gray-800 dark:text-gray-300 font-medium">
                산출물 리스트
              </div>
              <div className="mt-3 mb-4 min-h-[80px]">
                {mileData.output.map((v: any) => (
                  <div key={v1()} className="flex items-center mt-2">
                    {isOwner ? (
                      <input
                        type="checkbox"
                        className="w-5 h-5 mr-2"
                        checked={v.done}
                        onClick={() => outputHandler(v.output_id, v.done)}
                      />
                    ) : v.done ? (
                      <AutoSVG
                        src="/media/icons/check.svg"
                        className="w-5 h-5 text-primary-active mr-2"
                      />
                    ) : (
                      <AutoSVG
                        src="/media/icons/warning.svg"
                        className="w-5 h-5 text-danger-active mr-2"
                      />
                    )}
                    <span>{v.title}</span>
                  </div>
                ))}
              </div>
              <div className="mt-2 w-full h-10 flex items-center">
                <span className="text-gray-800 dark:text-gray-300 text-sm font-medium mr-12">
                  중도금 비율
                </span>
                <div>
                  <span className="text-2xl font-medium mr-1 text-indigo-700">
                    {price}
                  </span>
                  <span className="text-sm">%</span>
                </div>
              </div>
              <div className="text-gray-800 dark:text-gray-300">
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-5">
                    마일스톤 시작 블럭
                  </span>
                  <span className="">{startBN}</span>
                </div>
                <div className="mt-2 flex items-center">
                  <span className="text-sm font-medium mr-5">
                    마일스톤 마감 블럭
                  </span>
                  <span className="">{endBN}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 pb-2 flex justify-center text-sm">
              <Button
                className="w-28 rounded text-center font-bold text-white bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400"
                onClick={close}
              >
                <span>확인</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { MilestoneUserModal };
