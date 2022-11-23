import React, { FC } from "react";
import { AutoSVG } from "~/utils";

interface Props {
  index: number;
  status: string;
}

const MilestoneUser: FC<Props> = ({ index, status }) => {
  return (
    <div className="flex">
      <div className="h-full bg-gray-600 w-px mr-2"></div>
      <div className="rounded-lg border shadow bg-white p-4">
        <div className="inline-block rounded px-4 py-2 text-white bg-warning">
          시작 전
        </div>
        <h2 className="text-xl mt-2">Milestone</h2>
        <div className="grid grid-cols-3 border text-center text-sm mt-2">
          <div>중도금</div>
          <div className="col-span-2">100 BNB</div>
          <div>산출물</div>
          <div className="col-span-2 truncate">
            M2E NFT 및 토큰 발행 + 프로토타입 앱 출시
          </div>
          {/* <div className="flex items-center">
            <span>투표 결과 :</span>
            <AutoSVG src="/media/icons/circle.svg" className="text-success" />
            <span>지향</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export { MilestoneUser };
