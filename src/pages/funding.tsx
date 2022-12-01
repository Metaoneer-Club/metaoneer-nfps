import React, { useState } from "react";
import { NextPage } from "next/types";

/* Component */
import { ProductCard } from "components/card/ProductCard";
import { Button } from "components/asset/button";
import { AutoSVG } from "utils";

/* State */
import { useSetRecoilState } from "recoil";
import { isToastState, toastContentState } from "stores";

const Funding: NextPage = () => {
  const [statusFilter, setStatusFilter] = useState<number>(0);
  const [detailFilter, setDetailFilter] = useState<number>(0);

  const setIsToast = useSetRecoilState(isToastState);
  const setToastContent = useSetRecoilState(toastContentState);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-600">
      <div className="max-w-[1200px] mx-auto pt-10 pb-40">
        <div className="flex items-center rounded border border-gray-200 dark:border-dark-300 bg-white dark:bg-dark">
          <div className="flex items-center bg-dark dark:bg-dark-600 text-white rounded-l p-6">
            <AutoSVG className="w-6 h-6 mr-2" src="/media/icons/filter.svg" />
            <span className="pr-1">필터</span>
          </div>
          <div className="text-sm pl-10 flex items-center">
            <div className="mr-2">상태별 :</div>
            <select
              onChange={(e: any) => setStatusFilter(e.target.value)}
              value={statusFilter}
              className="bg-[length:20px_20px] bg-no-repeat bg-[center_right_12px] bg-[url('/media/icons/dropdown.svg')] appearance-none text-sm border border-gray-400 rounded px-6 py-2 w-32"
            >
              <option value={0}>펀딩 비율</option>
              <option value={1}>펀딩 비용</option>
              <option value={2}>펀딩 생성</option>
            </select>
          </div>
          <div className="text-sm pl-10 flex items-center">
            <div className="mr-2">{filterItems[statusFilter].label} : </div>
            <select
              onChange={(e: any) => setDetailFilter(e.target.value)}
              value={detailFilter}
              className="bg-[length:20px_20px] bg-no-repeat bg-[center_right_12px] bg-[url('/media/icons/dropdown.svg')] appearance-none text-sm border border-gray-400 rounded px-6 py-2"
            >
              {filterItems[statusFilter].option.map((opt, i) => (
                <option key={opt} value={i}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-4 gap-6 mt-8">
            {[...Array(20)].map((v, i) => (
              <ProductCard
                key={i}
                keyID={i}
                category="NFT"
                title={`제목 예제 ${i}`}
                content="BNB 스마트 체인(BSC)은 가장 인기 있는 프로그래밍 언어, 유연한 도구를 지원하며 명확하고 표준적인 문서를 제공한다. 실제 사용을 염두에 두고 설계된 블록체인에서 애플리케이션을 빠르게 시작하고 배포할 수 있습니다."
                imgURI="/temp.png"
                creator="0x12A60872B053C009452cdb95178144c8fFbDeA4D"
                progress={66}
                amount={300}
                expired={new Date()}
              />
            ))}
          </div>
          <div className="grid justify-items-stretch pt-12">
            <Button
              className="border shadow bg-white dark:bg-dark w-2/5 p-4 justify-self-center hover:bg-dark hover:text-white"
              onClick={() => {
                setToastContent({
                  content: "Comming Soon!",
                  type: "primary",
                });
                setIsToast(true);
              }}
            >
              Read More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const filterItems = [
  {
    label: "비율",
    option: ["전체", "0% ~ 50%", "50% ~ 75%", "75% ~ 100%", "100 이상"],
  },
  {
    label: "비용",
    option: [
      "전체",
      "100BNB 미만",
      "100BNB ~ 300BNB",
      "300BNB ~ 1000BNB",
      "1000 BNB 이상",
    ],
  },
  {
    label: "기간",
    option: ["최신순", "오래된순"],
  },
];

export default Funding;
