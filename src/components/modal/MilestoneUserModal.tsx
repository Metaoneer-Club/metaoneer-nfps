import React, { FC, Dispatch, SetStateAction } from "react";
import { v1 } from "uuid";

/* Component */
import { Button } from "components/asset/button";
import { AutoSVG, formatDateSlash } from "utils";

/* State */
import { useSetRecoilState } from "recoil";
import { isToastState, toastContentState } from "stores";
import { Badge } from "../asset/badge";

interface Props {
  id: string | string[] | undefined;
  close: Dispatch<SetStateAction<boolean>>;
}

const MilestoneUserModal: FC<Props> = ({ id, close }) => {
  const setIsToast = useSetRecoilState(isToastState);
  const setToastContent = useSetRecoilState(toastContentState);

  return (
    <>
      <div className="py-12 bg-gray-700/50 transition duration-150 ease-in-out z-30 fixed top-0 right-0 bottom-0 left-0">
        <div className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
          <div className="relative py-4 px-1 md:px-3 bg-white shadow-md rounded border border-gray-400">
            <div className="custom-scroll py-4 px-4 md:px-7 max-h-[360px] overflow-auto">
              <div className="w-full flex items-center text-gray-600 mb-3">
                <Badge className="bg-info mr-2">진행중</Badge>
                <h1 className="text-gray-800 text-lg font-bold">
                  {dummyData.title} {id}
                </h1>
              </div>
              <div className="mt-6 text-gray-800 font-medium">
                산출물 리스트
              </div>
              <div className="mt-3">
                {dummyData.content.map((v: any) => (
                  <div key={v1()} className="flex items-center mt-1.5">
                    <AutoSVG
                      src="/media/icons/verified.svg"
                      className="text-primary-active mr-2"
                    />
                    <span>{v}</span>
                  </div>
                ))}
              </div>
              <div className="mt-2 w-full h-10 flex items-center">
                <span className="text-gray-800 text-sm font-medium mr-20">
                  중도금
                </span>
                <div>
                  <span className="text-2xl font-medium mr-1 text-indigo-700">
                    {dummyData.price}
                  </span>
                  <span className="text-sm">BNB</span>
                </div>
              </div>
              <div className="text-gray-800">
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
