import React, { useState } from "react";
import { useRouter } from "next/router";
import Payments from "metaoneer-payment";
import clsx from "clsx";

/* Component */
import { Card } from "components/asset/card";
import { Button } from "components/asset/button";
import { accounting, AutoImage, AutoSVG, shortAddress } from "utils";

/* State */
import { useSetRecoilState } from "recoil";
import { isToastState, toastContentState } from "stores";

const Product = () => {
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [blockNumber, setBlockNumber] = useState<number>(864000);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isVote, setIsVote] = useState<boolean>(false);
  const setIsToast = useSetRecoilState(isToastState);
  const setToastContent = useSetRecoilState(toastContentState);

  setTimeout(() => {
    blockNumber > 0 && setBlockNumber(blockNumber - 1);
  }, 3000);

  return (
    <>
      {isOpen && (
        <Payments
          tokenId={Number(router.query.id)}
          buyCount={1}
          close={() => setIsOpen(false)}
        />
      )}
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-[1200px] mx-auto pt-16 pb-40">
          <div className="flex justify-between items-center">
            <div className="text-3xl text-center font-bold flex items-center">
              <span className="px-4 py-2 border rounded-xl text-lg bg-primary-active text-white mr-6">
                NFT
              </span>
              <span>프로젝트 제목 {router.query.id}</span>
              <button
                type="button"
                className="text-sm mx-2 border p-2 rounded bg-gray-500 text-white hover:bg-gray-600"
                onClick={() => setIsVote(!isVote)}
              >
                임시 버튼
              </button>
            </div>
            <div className="flex">
              <Button
                className="flex items-center bg-white shadow hover:bg-dark hover:text-white mr-4"
                onClick={() => {
                  if (Number(router.query.id) > 0)
                    router.push(`/funding/${Number(router.query.id) - 1}`);
                }}
              >
                <AutoSVG className="mr-2" src="/media/icons/arrow-left.svg" />
                <span className="pr-1">이전</span>
              </Button>
              <Button
                className="flex items-center bg-white shadow hover:bg-dark hover:text-white"
                onClick={() => {
                  if (Number(router.query.id) < 20)
                    router.push(`/funding/${Number(router.query.id) + 1}`);
                }}
              >
                <span className="pl-1">다음</span>
                <AutoSVG className="ml-2" src="/media/icons/arrow-right.svg" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-6 pt-6">
            <div className="col-span-3">
              <div className="relative w-full h-96">
                <AutoImage
                  src="/temp.png"
                  alt="bnb"
                  className="object-cover rounded-xl"
                />
              </div>
            </div>
            <div className="col-span-2 flex flex-col text-center rounded-xl border bg-white">
              <div className="grid grid-cols-2 gap-4 p-6 items-center">
                <div className="mt-4">
                  <label className="text-gray-600">펀딩 금액</label>
                  <p className="mt-2">
                    <span className="text-3xl mr-1">{accounting(1802)}</span>
                    <span className="text-gray-600">BNB</span>
                  </p>
                </div>
                <div className="mt-4">
                  <label className="text-gray-600">후원자 수</label>
                  <p className="mt-2">
                    <span className="text-3xl mr-1">{accounting(143)}</span>
                    <span className="text-gray-600">명</span>
                  </p>
                </div>
                {isVote ? (
                  <>
                    <div className="mt-8">
                      <label className="text-gray-600">
                        마일스톤 1 종료까지
                      </label>
                      <p className="text-gray-600 mt-1">
                        <span className="text-black text-3xl mr-1">30</span>일
                        <div className="mt-2">
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://bscscan.com/blocks"
                            className="text-gray-500 hover:text-blue-500 hover:underline"
                          >
                            {accounting(blockNumber)}
                          </a>
                          <span className="text-sm ml-1">블록</span>
                        </div>
                      </p>
                    </div>
                    <div className="mt-8">
                      <label className="text-gray-600">투표 현황</label>
                      <div className="mt-2 flex justify-center items-center">
                        <p className="text-blue-600 text-3xl mr-1">56</p>
                        <p className="mx-2">:</p>
                        <p className="text-red-600 text-3xl mr-1">28</p>
                      </div>
                      <div className="mt-3 flex items-center">
                        <div className="w-full flex h-4 bg-blue-200 rounded-sm">
                          <div
                            style={{
                              // width: progress >= 100 ? "100%" : `${progress}%`,
                              width: "40%",
                            }}
                            className="h-full text-center text-[10px] text-white bg-blue-600 rounded-l-sm"
                          >
                            40%
                          </div>
                          <div
                            style={{
                              // width: progress >= 100 ? "100%" : `${progress}%`,
                              width: "40%",
                            }}
                            className="h-full bg-gray-400"
                          />
                          <div
                            style={{
                              // width: progress >= 100 ? "100%" : `${progress}%`,
                              width: "20%",
                            }}
                            className="h-full text-[10px] text-white bg-red-600 rounded-r-sm"
                          >
                            20%
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mt-8">
                      <label className="text-gray-600">펀딩 종료까지</label>
                      <p className="text-gray-600 mt-1">
                        <span className="text-black text-3xl mr-1">30</span>일
                        <div className="mt-2">
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://bscscan.com/blocks"
                            className="text-gray-500 hover:text-blue-500 hover:underline"
                          >
                            {accounting(blockNumber)}
                          </a>
                          <span className="text-sm ml-1">블록</span>
                        </div>
                      </p>
                    </div>
                    <div className="mt-8">
                      <label className="text-gray-600">펀딩 달성률</label>
                      <p className="mt-3">
                        <span className="text-blue-600 text-3xl mr-1">90</span>%
                      </p>
                      <div className="mt-3 flex items-center">
                        <div className="w-full h-3 mb-1 bg-blue-200 rounded-sm">
                          <div
                            style={{
                              // width: progress >= 100 ? "100%" : `${progress}%`,
                              width: "90%",
                            }}
                            className="h-full text-center text-xs text-white bg-blue-600 rounded-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              {isVote ? (
                <div className="grid grid-cols-5 gap-4 px-8 py-3">
                  <div className="col-span-2 text-sm text-center">
                    <p className="mt-1">이전 단계</p>
                    <p className="mt-1">현재 단계</p>
                    <p className="mt-1">다음 단계까지</p>
                  </div>
                  <div className="col-span-3 text-left text-gray-600 text-sm">
                    <p className="mt-1">펀딩 완료</p>
                    <p className="mt-1">마일스톤 1 진행중</p>
                    <p className="mt-1">2022.12.04 ~ 2022.12.12</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-5 gap-4 px-8 py-3">
                  <div className="col-span-2 text-sm text-center">
                    <p>펀딩 목표액</p>
                    <p className="mt-1">현재 단계</p>
                    <p className="mt-1">펀딩 기간</p>
                  </div>
                  <div className="col-span-3 text-left text-gray-600 text-sm">
                    <p>{accounting(2000)} BNB</p>
                    <p className="mt-1">펀딩 진행중</p>
                    <p className="mt-1">2022.11.24 ~ 2022.12.03</p>
                  </div>
                </div>
              )}

              <div className="p-8 pt-4 mt-auto w-full">
                <Button
                  className="bg-blue-600 text-white w-full hover:bg-blue-700"
                  onClick={() => {
                    if (Number(router.query.id) < 9) {
                      setIsOpen(true);
                    } else {
                      setToastContent({
                        content: "Comming Soon!",
                        type: "primary",
                      });
                      setIsToast(true);
                    }
                  }}
                >
                  {isVote ? <span>투표하기</span> : <span>펀딩하기</span>}
                </Button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 pt-4">
            <div className="col-span-2 -mt-10">
              <nav className="inline-flex flex-row bg-white border border-b-0 rounded rounded-b-none">
                <button
                  type="button"
                  onClick={() => setTabIndex(0)}
                  className={clsx(
                    "text-gray-600 w-40 py-4 px-6 block hover:text-blue-500 focus:outline-none",
                    tabIndex === 0 && "font-medium border-b-2 border-blue-500"
                  )}
                >
                  프로젝트 소개
                </button>
                <button
                  type="button"
                  onClick={() => setTabIndex(1)}
                  className={clsx(
                    "text-gray-600 w-40 py-4 px-6 block hover:text-blue-500 focus:outline-none",
                    tabIndex === 1 && "font-medium border-b-2 border-blue-500"
                  )}
                >
                  마일스톤
                </button>
              </nav>
              <Card className="border p-6 bg-white rounded-tl-none rounded-xl">
                {tabIndex === 0 ? (
                  <p className="leading-relaxed">
                    BNB Smart Chain (BSC) supports the most popular programming
                    languages, flexible tools, and comes with clear and
                    canonical documentation. You can quickly start and deploy
                    your application on a blockchain designed with real use in
                    mind. BNB Smart Chain (BSC) supports the most popular
                    programming languages, flexible tools, and comes with clear
                    and canonical documentation. You can quickly start and
                    deploy your application on a blockchain designed with real
                    use in mind. BNB Smart Chain (BSC) supports the most popular
                    programming languages, flexible tools, and comes with clear
                    and canonical documentation. You can quickly start and
                    deploy your application on a blockchain designed with real
                    use in mind.
                  </p>
                ) : (
                  ""
                )}
              </Card>
            </div>
            <Card className="self-start border mt-5 bg-white rounded-xl">
              <h3 className="text-xs font-medium text-gray-600 px-6 pt-4">
                프로젝트 생성자 정보
              </h3>
              <div className="mt-3 px-6 pb-4 border-b">
                <div className="flex items-center">
                  <div className="relative w-7 h-7 mr-2">
                    <AutoImage
                      className="rounded-full border"
                      src="/media/avatars/blank.svg"
                      alt="icon"
                    />
                  </div>
                  <div className="text-xs">
                    {shortAddress("0x12A60872B053C009452cdb95178144c8fFbDeA4D")}
                  </div>
                </div>
                <p className="mt-2 text-xs">
                  BNB 체인의 랜드마크가 되겠습니다!
                </p>
              </div>
              <div className="grid grid-cols-2 text-center">
                <div className="border-r">
                  <p className="text-xs my-2">프로젝트 수</p>
                  <p className="pb-3">5</p>
                </div>
                <div>
                  <p className="text-xs my-2">받은 펀딩 금액</p>
                  <p className="pb-3">400 BNB</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
