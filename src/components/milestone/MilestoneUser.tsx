import React, { FC, useState } from "react";
import { v1 } from "uuid";
import { accounting } from "~/utils";
import { MilestoneUserModal } from "../modal/MilestoneUserModal";

interface Props {
  id: string | string[] | undefined;
  blockNumber: number;
}

const MilestoneUser: FC<Props> = ({ id, blockNumber }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      {isOpen ? <MilestoneUserModal id={id} close={setIsOpen} /> : ""}
      <div className="relative">
        <div className="left-3 absolute border-opacity-20 border-indigo-400 h-full border-4" />
        {[...Array(4)].map((v, i) => (
          <div key={v1()} className="my-4 flex items-center">
            <div className="z-10 flex mr-12 items-center bg-indigo-600 shadow-xl w-8 h-8 rounded-full">
              <h1 className="mx-auto font-semibold text-lg text-white">
                {i + 1}
              </h1>
            </div>
            <div
              onClick={() => setIsOpen(true)}
              className="rounded-lg border shadow-lg w-2/3 p-6 cursor-pointer hover:bg-gray-50 hover:shadow-none">
              <div className="flex justify-between items-center">
                <div>
                  <div className="inline px-3 py-1.5 text-sm font-medium rounded bg-info mr-2 text-white">
                    완료
                  </div>
                  {i !== 3 ? (
                    <div className="inline px-3 py-1.5 text-sm font-medium rounded bg-success text-white">
                      지향
                    </div>
                  ) : (
                    <div className="inline px-3 py-1.5 text-sm font-medium rounded bg-danger text-white">
                      지양
                    </div>
                  )}
                  <h3 className="mt-3 font-bold text-gray-800 text-xl truncate">
                    마일스톤 {i + 1}
                  </h3>
                </div>
                <div className="text-sm text-center text-gray-600">
                  <span className="text-black text-3xl mr-1">
                    {i * 30 + 10}
                  </span>
                  일
                  <div className="mt-1">
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://bscscan.com/blocks"
                      className="text-gray-500 hover:text-blue-500 hover:underline">
                      {accounting(blockNumber + i * 86400)}
                    </a>
                    <span className="text-sm ml-1">블록</span>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm leading-snug tracking-wide text-gray-900 truncate-3-lines">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry`s standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
              <div className="mt-3 flex items-center text-gray-600">
                <div className="font-medium mr-4">중도금</div>
                <span className="text-blue-600 text-2xl mr-1">{i * 40}</span>
                <span className="mt-1 text-sm">BNB</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export { MilestoneUser };
