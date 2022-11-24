import React, { FC } from "react";

/* Component */
import { Badge } from "components/asset/badge";
import { AutoSVG, formatDateSlash } from "utils";

/* State */
import { useRecoilState } from "recoil";
import { IMilestone, milestoneState } from "stores";
import { v1 } from "uuid";

const Milestone: FC<IMilestone> = ({
  keyID,
  title,
  content,
  price,
  startDate,
  endDate,
}) => {
  const [milestoneArray, setMilestoneArray] = useRecoilState(milestoneState);

  const deleteHandler = () => {
    setMilestoneArray(milestoneArray.filter((v) => v.keyID !== keyID));
  };

  return (
    <div className="relative">
      <div
        className="absolute right-0 p-3 group cursor-pointer"
        onClick={deleteHandler}
      >
        <AutoSVG
          src="/media/icons/close.svg"
          className="group-hover:text-danger"
        />
      </div>
      <div className="rounded-lg border shadow bg-white">
        <div className="px-6 py-4 border-b">
          <div className="flex items-center">
            <Badge className="w-16 text-center bg-blue-600 mr-3">시작 전</Badge>
            <div className="w-full text-xl font-medium truncate">{title}</div>
          </div>
          <div className="text-gray-500 text-sm mt-4">
            <div className="h-20 grid grid-cols-2 gap-x-4 px-4">
              {content.map((v: any) => (
                <p key={v1()} className="truncate">
                  - {v.data.content}
                </p>
              ))}
            </div>
            <div className="text-sm">
              중도금 :
              <span className="text-lg mx-1 text-blue-600 font-medium">
                {price}
              </span>{" "}
              BNB
            </div>
          </div>
        </div>
        <div className="px-6 py-4 flex justify-between items-center text-gray-500 text-sm">
          <span>{formatDateSlash(startDate)}</span>
          <span>~</span>
          <span>{formatDateSlash(endDate)}</span>
        </div>
      </div>
    </div>
  );
};

export { Milestone };
