import React, { FC } from "react";

/* Component */
import { AutoImage, shortAddress } from "utils";

interface Props {
  fundingList: any;
}

const FundingTable: FC<Props> = ({ fundingList }) => {
  return (
    <div className="mt-2 overflow-x-auto">
      <table className="table-auto w-full">
        <thead className="text-xs font-semibold uppercase text-gray-500 bg-gray-50">
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
        <tbody className="text-sm divide-y divide-gray-100">
          {members.map((v, i) => (
            <tr key={v.name}>
              <td className="p-2 whitespace-nowrap">
                <div className="text-sm px-1">{i + 1}</div>
              </td>
              <td className="p-2 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="relative w-10 h-10 mr-2">
                    <AutoImage
                      className="rounded-full"
                      src={`/team/${v.name.toLowerCase()}.png`}
                      alt={v.name}
                    />
                  </div>
                  <div className="font-medium text-gray-800">{v.name}</div>
                </div>
              </td>
              <td className="p-2 whitespace-nowrap">
                <div className="text-sm">
                  {shortAddress("0x12A60872B053C009452cdb95178144c8fFbDeA4D")}
                </div>
              </td>
              <td className="p-2 whitespace-nowrap">
                <div className="font-medium text-indigo-600">
                  {((i * 7) % 4) * 11}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const members = [
  {
    name: "Ramp",
  },
  {
    name: "SungBae",
  },
  {
    name: "Ursla",
  },
  {
    name: "Orbit",
  },
];

export { FundingTable };
