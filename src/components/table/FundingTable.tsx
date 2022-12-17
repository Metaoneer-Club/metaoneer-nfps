import React, { FC } from "react";

/* Component */
import {
  AutoImage,
  AutoSVG,
  replaceBalance,
  shortAddress,
  zeroCount,
} from "utils";

interface Props {
  fundingList: any;
}

const FundingTable: FC<Props> = ({ fundingList }) => {
  return (
    <div className="mt-2 dark:bg-dark-700 overflow-x-auto">
      <table className="table-auto w-full">
        <thead className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-300 bg-gray-50 dark:bg-dark-600">
          <tr className="font-medium text-left">
            <th className="p-2 pr-4 whitespace-nowrap">
              <div>순위</div>
            </th>
            <th className="p-2 whitespace-nowrap">
              <div>이름</div>
            </th>
            <th className="p-2 whitespace-nowrap">
              <div>지갑주소</div>
            </th>
            <th className="p-2 whitespace-nowrap">
              <div>펀딩 금액</div>
            </th>
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-gray-100 dark:divide-dark-300">
          {Object.keys(fundingList).length > 0 ? (
            Object.keys(fundingList).map((v, i) => (
              <tr key={v}>
                <td className="p-2 whitespace-nowrap">
                  <div className="text-sm px-1">{i + 1}</div>
                </td>
                <td className="p-2 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="relative w-10 h-10 mr-2">
                      <AutoImage
                        className="rounded-full"
                        src={`/media/avatars/blank.svg`}
                        alt={"blank"}
                      />
                    </div>
                    <div className="font-medium dark:text-gray-300 text-gray-800">
                      {"이름없음"}
                    </div>
                  </div>
                </td>
                <td className="p-2 whitespace-nowrap">
                  <div className="text-sm">{shortAddress(v)}</div>
                </td>
                <td className="p-2 whitespace-nowrap">
                  <div className="font-medium text-indigo-600">
                    {zeroCount(replaceBalance(fundingList[v]))} BNB
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <div className="bg-white dark:bg-dark  p-4 rounded flex items-center">
              <div className="flex items-center">
                <div className="w-1 h-5 mr-2 bg-dark rounded-sm" />
                <p className="">후원자가 없습니다...</p>
              </div>
            </div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export { FundingTable };
