import React, { FC } from "react";

/* Component */
import { AutoSVG, formatDate } from "utils";

/* State */
import { useRecoilState } from "recoil";
import { IMilestone, milestoneState } from "stores";

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
        className="absolute right-0 p-2 group cursor-pointer"
        onClick={deleteHandler}>
        <AutoSVG
          src="/media/icons/close.svg"
          className="group-hover:text-danger"
        />
      </div>
      <div className="rounded-lg border shadow bg-white p-4">
        <div className="mt-2 px-4 pb-4">
          <h2 className="mt-1 text-lg font-bold truncate">{title}</h2>
          <p className="mt-2 text-gray-500 text-sm break-words truncate-3-lines">
            {content}
          </p>
          <div className="mt-3 mx-1 flex items-center text-sm">
            <div>
              <strong className="text-lg mr-2 text-indigo-600">{20}%</strong>
              <span>{price} BNB</span>
            </div>
          </div>
          <div className="mt-2 flex justify-between items-center text-gray-500 text-sm">
            <span>{formatDate(startDate)}</span>
            <span>{formatDate(endDate)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Milestone };
