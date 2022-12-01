import React, { FC, Dispatch, SetStateAction, useState } from "react";
import { v1 } from "uuid";

/* Component */
import { Button } from "components/asset/button";
import { Badge } from "components/asset/badge";
import { AutoSVG, formatDateSlash } from "utils";

/* State */
import { useSetRecoilState } from "recoil";
import { isToastState, toastContentState } from "stores";

interface Props {
  id: string | string[] | undefined;
  isOwner: boolean;
  close: Dispatch<SetStateAction<boolean>>;
}

const MilestoneUserModal: FC<Props> = ({ id, isOwner, close }) => {
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const setIsToast = useSetRecoilState(isToastState);
  const setToastContent = useSetRecoilState(toastContentState);

  return (
    <>
      <div className="py-12 bg-gray-700/50 dark:bg-black/60 transition duration-150 ease-in-out z-30 fixed top-0 right-0 bottom-0 left-0">
        <div className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
          <div className="relative py-4 px-1 md:px-3 bg-white dark:bg-dark shadow-md rounded border border-gray-400 dark:border-dark-300">
            <div className="custom-scroll py-4 px-4 md:px-7 max-h-[360px] overflow-auto">
              <div className="w-full flex items-center text-gray-600 dark:text-gray-300 mb-3">
                <Badge className="bg-info-active mr-2">진행중</Badge>
                <h1 className="text-gray-800 dark:text-gray-300 text-lg font-bold">
                  {dummyData.title} {id}
                </h1>
              </div>
              <div className="mt-6 text-gray-800 dark:text-gray-300 font-medium">
                산출물 리스트
              </div>
              <div className="mt-3">
                {dummyData.content.map((v: any) => (
                  <div key={v1()} className="flex items-center mt-1.5">
                    {isOwner ? (
                      <input
                        type="checkbox"
                        onClick={() => setIsCheck(!isCheck)}
                      />
                    ) : (
                      <AutoSVG
                        src="/media/icons/check.svg"
                        className="text-primary-active mr-2"
                      />
                    )}
                    <span>{v}</span>
                  </div>
                ))}
              </div>
              <div className="mt-2 w-full h-10 flex items-center">
                <span className="text-gray-800 dark:text-gray-300 text-sm font-medium mr-20">
                  중도금
                </span>
                <div>
                  <span className="text-2xl font-medium mr-1 text-indigo-700">
                    {dummyData.price}
                  </span>
                  <span className="text-sm">BNB</span>
                </div>
              </div>
              <div className="text-gray-800 dark:text-gray-300">
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-5">
                    마일스톤 시작일
                  </span>
                  <span className="">{formatDateSlash(new Date())}</span>
                </div>
                <div className="mt-2 flex items-center">
                  <span className="text-sm font-medium mr-5">
                    마일스톤 마감일
                  </span>
                  <span className="">{formatDateSlash(new Date())}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 pb-2 flex justify-center text-sm">
              <Button
                className="w-28 rounded text-center font-bold text-white bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400"
                onClick={() => close(false)}
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

const dummyData: any = {
  title: "프로젝트 제목",
  content: [
    "M2E 안드로이드 어플리케이션 프로토타입 시연",
    "홈페이지 내 커뮤니티 게시판 생성",
    "현대백화점 스크린에 대형 광고",
    "와우 챌린지 참여 인원 500명 달성",
  ],
  price: 80,
};
