import React, { FC, Dispatch, SetStateAction } from "react";
import { v1 } from "uuid";

/* Component */
import { Button } from "components/asset/button";
import { Badge } from "components/asset/badge";
import { AutoSVG } from "utils";

/* State */
import { useSetRecoilState } from "recoil";
import { isToastState, toastContentState } from "stores";
import useInput from "~/hooks/useInput";

interface Props {
  id: string | string[] | undefined;
  close: Dispatch<SetStateAction<boolean>>;
}

const FundingModal: FC<Props> = ({ id, close }) => {
  const [amount, setAmount, onChangeAmount] = useInput<string>("");
  const setIsToast = useSetRecoilState(isToastState);
  const setToastContent = useSetRecoilState(toastContentState);

  return (
    <>
      <div className="py-12 bg-gray-700/50 transition duration-150 ease-in-out z-30 fixed top-0 right-0 bottom-0 left-0">
        <div className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
          <div className="relative py-4 px-1 md:px-3 bg-white shadow-md rounded border border-gray-400">
            <div className="custom-scroll py-4 px-4 md:px-7 h-[480px] overflow-auto">
              <div className="text-center">
                <div className="mb-2 text-2xl font-bold">
                  펀딩 직전 유의사항
                </div>
                <div>무엇을 넣어야 할까용</div>
                <div>무엇을 넣어야 할까용</div>
                <div>무엇을 넣어야 할까용</div>
                <div>무엇을 넣어야 할까용</div>
                <div>무엇을 넣어야 할까용</div>
                <div>무엇을 넣어야 할까용</div>
                <div>무엇을 넣어야 할까용</div>
                <div>무엇을 넣어야 할까용</div>
                <div>무엇을 넣어야 할까용</div>
              </div>
              <div className="mt-2">
                <label
                  htmlFor="name"
                  className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                >
                  펀딩 금액<span className="ml-2 text-xs">( 단위 : BNB )</span>
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={onChangeAmount}
                  className="mb-5 mt-2 px-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-400 rounded border"
                  placeholder="0"
                />
              </div>
              <div className="mt-8 flex justify-center text-sm">
                <Button
                  className="w-20 mr-2 rounded text-center font-bold text-white bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400"
                  onClick={() => close(false)}
                >
                  <span>취소</span>
                </Button>
                <Button
                  className="w-28 rounded text-center font-bold text-white bg-indigo-700 hover:bg-indigo-900 disabled:bg-indigo-400"
                  onClick={() => {
                    alert("Tx보내면서 돈 보내기");
                  }}
                >
                  <span>펀딩하기</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { FundingModal };

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
