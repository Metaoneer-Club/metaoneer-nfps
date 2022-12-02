import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";

/* Hook */
import useInput from "hooks/useInput";

/* Component */
import { Card } from "components/asset/card";
import { Button } from "components/asset/button";
import { fundContract } from "components/blockchain";
import { MilestoneUser } from "components/milestone/MilestoneUser";
import { FundingTable } from "components/table/FundingTable";
import { FundingModal } from "components/modal/FundingModal";
import { VoteModal } from "components/modal/VoteModal";

import {
  accounting,
  AutoImage,
  AutoSVG,
  hexBalance,
  replaceBalance,
  shortAddress,
} from "utils";

/* State */
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isToastState, toastContentState, walletState } from "stores";
interface Project {
  limitprice: number;
  totalFundamount: number;
  fundingStart: number;
  fundingEnd: number;
  fundingList: any;
  daoPass: number;
  daoReject: number;
}

const Product = () => {
  const router = useRouter();
  const wallet = useRecoilValue(walletState);
  const [project, setProject] = useState<Project>({
    limitprice: 0,
    totalFundamount: 0,
    fundingStart: 0,
    fundingEnd: 0,
    fundingList: {},
    daoPass: 0,
    daoReject: 0,
  });
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [amount, setAmount, onChangeAmount] = useInput<number>(0);
  const [blockNumber, setBlockNumber] = useState<number>(864000);
  const [isLoadingFund, setIsLoadingFund] = useState<boolean>(false);
  const [isLoadingVote, setIsLoadingVote] = useState<boolean>(false);
  const [isOpenFund, setIsOpenFund] = useState<boolean>(false);
  const [isOpenVote, setIsOpenVote] = useState<boolean>(false);
  const [isVote, setIsVote] = useState<boolean>(false);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const setIsToast = useSetRecoilState(isToastState);
  const setToastContent = useSetRecoilState(toastContentState);

  useEffect(() => {
    const projectData = async () => {
      const funding = await fundContract.methods
        .fundingView(router.query.id)
        .call();
      console.log("fundingView : ", funding); // [목표액, 모금액, 펀딩시작일, 펀딩종료일,[펀더지갑], [펀딩금액]]
      const funder = await fundContract.methods
        .funderView(
          router.query.id,
          0,
          wallet.address || "0x0000000000000000000000000000000000000000"
        )
        .call();
      console.log("funderView : ", funder); // [대기, 찬성, 반대]
      const milestone = await fundContract.methods
        .milestonView(router.query.id)
        .call();
      console.log("milestonView : ", milestone); // [마일갯수, [마일시작일], [마일종료일], [마일중도금], [마일중도금비율]]
      const voter = await fundContract.methods.daoView(router.query.id).call();
      console.log("daoView : ", voter); // [[찬성], [반대]]
      const funders = funding[4]?.map((v: any) => v.toUpperCase());
      const fundingList = funders?.reduce(
        (obj: any, key: any, index: number) => ({
          ...obj,
          [key]: funding[5][index],
        }),
        {}
      );

      setProject({
        limitprice: funding[0] || 0,
        totalFundamount: funding[1] || 0,
        fundingStart: funding[2] || 0,
        fundingEnd: funding[3] || 0,
        fundingList: fundingList || {},
        daoPass: voter[0][0], // 마일스톤 위치 0
        daoReject: voter[0][1],
      });
    };
    projectData();
  }, [router.query.id, wallet.address]);

  setTimeout(() => {
    blockNumber > 0 && setBlockNumber(blockNumber - 1);
  }, 3000);

  const fundingHandler = async (id: string) => {
    if (amount === 0) {
      setToastContent({
        content: "펀딩 금액을 입력해 주세요.",
        type: "primary",
      });
      setIsToast(true);
      return;
    }

    setIsLoadingFund(true);
    try {
      await fundContract.methods.funding(id).send({
        from: wallet.address,
        gas: 10000000,
        value: hexBalance(amount),
      });
    } catch (err) {
      console.log(err);
      setToastContent({
        content: "에러! 펀딩이 취소되었습니다.",
        type: "danger",
      });
      setIsToast(true);
      setIsLoadingFund(false);
      return;
    }

    setToastContent({
      content: "펀딩이 완료되었습니다.",
      type: "success",
    });

    const funding = await fundContract.methods
      .fundingView(router.query.id)
      .call();
    const fundingList = funding[4]?.reduce(
      (obj: any, key: string, index: number) => ({
        ...obj,
        [key.toUpperCase()]: funding[5][index],
      }),
      {}
    );
    setProject({
      ...project,
      limitprice: funding[0] || 0,
      totalFundamount: funding[1] || 0,
      fundingStart: funding[2] || 0,
      fundingEnd: funding[3] || 0,
      fundingList: fundingList || {},
    });
    setIsToast(true);
    setIsLoadingFund(false);
    setIsOpenFund(false);
    setAmount(0);
    return;
  };

  const passHandler = async (id: string) => {
    setIsLoadingVote(true);
    try {
      await fundContract.methods.DAOMilestonPass(id, 0).send({
        from: wallet.address,
        gas: 10000000,
      });
    } catch (err) {
      console.log(err);
      setToastContent({
        content: "에러! 찬성 투표가 취소되었습니다.",
        type: "danger",
      });
      setIsToast(true);
      setIsLoadingVote(false);
      return;
    }

    setToastContent({
      content: "찬성 투표가 완료되었습니다.",
      type: "success",
    });

    const voter = await fundContract.methods.daoView(router.query.id).call();
    setProject({
      ...project,
      daoPass: voter[0][0],
      daoReject: voter[0][1],
    });
    setIsToast(true);
    setIsLoadingVote(false);
    setIsOpenVote(false);
    return;
  };

  const rejectHandler = async (id: string) => {
    setIsLoadingVote(true);
    try {
      await fundContract.methods.DAOMilestonReject(id, 0).send({
        from: wallet.address,
        gas: 10000000,
      });
    } catch (err) {
      console.log(err);
      setToastContent({
        content: "에러! 반대 투표가 취소되었습니다.",
        type: "danger",
      });
      setIsToast(true);
      setIsLoadingVote(false);
      return;
    }

    setToastContent({
      content: "반대 투표가 완료되었습니다.",
      type: "danger",
    });

    const voter = await fundContract.methods.daoView(router.query.id).call();
    setProject({
      ...project,
      daoPass: voter[0][0],
      daoReject: voter[0][1],
    });
    setIsToast(true);
    setIsLoadingVote(false);
    setIsOpenVote(false);
    return;
  };

  const closeHandler = () => {
    setIsOpenFund(false);
    setAmount(0);
  };

  return (
    <>
      {isOpenFund && (
        <FundingModal
          isLoading={isLoadingFund}
          id={router.query.id}
          amount={amount}
          onChangeAmount={onChangeAmount}
          onFunding={fundingHandler}
          close={closeHandler}
        />
      )}
      {isOpenVote && (
        <VoteModal
          isLoading={isLoadingVote}
          id={router.query.id}
          voting={project.fundingList[wallet.address.toUpperCase()]}
          onChangeAmount={onChangeAmount}
          onPass={passHandler}
          onReject={rejectHandler}
          close={() => setIsOpenVote(false)}
        />
      )}
      <div className="min-h-screen bg-slate-50 dark:bg-dark-600">
        <div className="max-w-[1200px] mx-auto pt-16 pb-40">
          <div className="flex justify-between items-center">
            <div className="text-3xl text-center font-bold flex items-center">
              <span className="px-4 py-2 border rounded-xl text-lg bg-primary-active text-white mr-6">
                NFT
              </span>
              <span>프로젝트 제목 {router.query.id}</span>

              <button
                type="button"
                className="text-sm mx-4 border p-2 rounded bg-gray-500 text-white hover:bg-gray-600"
                onClick={() => setIsVote(!isVote)}
              >
                임시 버튼 (투표)
              </button>

              <button
                type="button"
                className="text-sm border p-2 rounded bg-gray-500 text-white hover:bg-gray-600"
                onClick={() => setIsOwner(!isOwner)}
              >
                임시 버튼 (오너)
              </button>
            </div>
            <div className="flex">
              <Button
                className="flex items-center bg-white dark:bg-dark shadow hover:bg-dark dark:hover:bg-dark-600 hover:text-white mr-4"
                onClick={() => {
                  if (Number(router.query.id) > 0)
                    router.push(`/funding/${Number(router.query.id) - 1}`);
                }}
              >
                <AutoSVG className="mr-2" src="/media/icons/arrow-left.svg" />
                <span className="pr-1">이전</span>
              </Button>
              <Button
                className="flex items-center bg-white dark:bg-dark shadow hover:bg-dark dark:hover:bg-dark-600 hover:text-white"
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
            <div className="col-span-2 flex flex-col text-center rounded-xl border dark:border-dark-300 bg-white dark:bg-dark">
              <div className="grid grid-cols-2 gap-4 p-6 items-center">
                <div className="mt-4">
                  <label className="text-gray-600 dark:text-gray-400">
                    펀딩 금액
                  </label>
                  <p className="mt-2">
                    <span className="text-3xl mr-1">
                      {Number(
                        replaceBalance(project.totalFundamount).toFixed(5)
                      )}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      BNB
                    </span>
                  </p>
                </div>
                <div className="mt-4">
                  <label className="text-gray-600 dark:text-gray-400">
                    후원자 수
                  </label>
                  <p className="mt-2">
                    <span className="text-3xl mr-1">
                      {accounting(Object.keys(project.fundingList).length) || 0}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">명</span>
                  </p>
                </div>
                {isVote ? (
                  <>
                    <div className="mt-8">
                      <label className="text-gray-600 dark:text-gray-400">
                        마일스톤 1 마감까지
                      </label>
                      <div className="text-gray-dark:text-gray-400 mt-1">
                        <span className="text-black dark:text-gray-300 text-3xl mr-1">
                          30
                        </span>
                        일
                        <div className="mt-2">
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://bscscan.com/blocks"
                            className="text-gray-500 dark:text-gray-300 hover:text-blue-500 hover:underline"
                          >
                            {accounting(blockNumber)}
                          </a>
                          <span className="dark:text-gray-500 text-sm ml-1">
                            블록
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-8">
                      <label className="text-gray-600 dark:text-gray-400">
                        투표 현황
                      </label>
                      <div className="mt-3 flex justify-center items-center">
                        <p className="text-blue-600 text-3xl mr-1">
                          {Number(
                            (project.daoPass > 0
                              ? (project.daoPass / project.totalFundamount) *
                                100
                              : 0
                            ).toFixed(2)
                          ) || 0}
                        </p>
                        <p className="mx-2">:</p>
                        <p className="text-red-600 text-3xl mr-1">
                          {Number(
                            (project.daoReject > 0
                              ? (project.daoReject / project.totalFundamount) *
                                100
                              : 0
                            ).toFixed(2)
                          ) || 0}
                        </p>
                      </div>
                      <div className="mt-3 flex items-center">
                        <div className="w-full flex items-center justify-between h-3 mb-1 bg-gray-300 rounded-sm">
                          <div
                            style={{
                              width: `${
                                project.daoPass > 0
                                  ? (project.daoPass /
                                      project.totalFundamount) *
                                    100
                                  : 0
                              }%`,
                            }}
                            className="h-full bg-blue-600 rounded-l-sm"
                          />
                          <div
                            style={{
                              width: `${
                                project.daoReject > 0
                                  ? (project.daoReject /
                                      project.totalFundamount) *
                                    100
                                  : 0
                              }%`,
                            }}
                            className="h-full bg-red-600 rounded-r-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mt-8">
                      <label className="text-gray-600 dark:text-gray-400">
                        펀딩 종료까지
                      </label>
                      <div className="text-gray-dark:text-gray-400 mt-1">
                        <span className="text-black dark:text-gray-300 text-3xl mr-1">
                          30
                        </span>
                        일
                        <div className="mt-2">
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://bscscan.com/blocks"
                            className="text-gray-500 dark:text-gray-300 hover:text-blue-500 hover:underline"
                          >
                            {accounting(blockNumber)}
                          </a>
                          <span className="dark:text-gray-500 text-sm ml-1">
                            블록
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-8">
                      <label className="text-gray-600 dark:text-gray-400">
                        펀딩 달성률
                      </label>
                      <div className="mt-3">
                        <span className="text-blue-600 text-3xl mr-1">
                          {Number(
                            (
                              (replaceBalance(project.totalFundamount) /
                                replaceBalance(project.limitprice)) *
                              100
                            ).toFixed(5)
                          ) || 0}
                        </span>
                        %
                      </div>
                      <div className="mt-3 flex items-center">
                        <div className="w-full h-3 mb-1 bg-blue-200 rounded-sm">
                          <div
                            style={{
                              // width: project.limitprice ? project.totalFundamount/ project.limitprice
                              width: `${
                                Number(
                                  (
                                    (replaceBalance(project.totalFundamount) /
                                      replaceBalance(project.limitprice)) *
                                    100
                                  ).toFixed(5)
                                ) >= 100
                                  ? "100%"
                                  : Number(
                                      (
                                        (replaceBalance(
                                          project.totalFundamount
                                        ) /
                                          replaceBalance(project.limitprice)) *
                                        100
                                      ).toFixed(5)
                                    )
                              }%`,
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
                  <div className="col-span-2 text-sm text-center dark:text-gray-300">
                    <p className="mt-1">이전 단계</p>
                    <p className="mt-1">현재 단계</p>
                    <p className="mt-1">다음 단계</p>
                  </div>
                  <div className="col-span-3 text-left text-gray-dark:text-gray-400 text-sm">
                    <p className="mt-1">펀딩 완료</p>
                    <p className="mt-1">마일스톤 1 진행중</p>
                    <p className="mt-1">마일스톤 1 투표</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-5 gap-4 px-8 py-3">
                  <div className="col-span-2 text-sm text-center dark:text-gray-300">
                    <p className="mt-1">펀딩 목표액</p>
                    <p className="mt-1">현재 단계</p>
                    <p className="mt-1">펀딩 기간</p>
                  </div>
                  <div className="col-span-3 text-left text-gray-dark:text-gray-400 text-sm">
                    <p className="mt-1">
                      {project.limitprice
                        ? accounting(replaceBalance(project.limitprice))
                        : 0}{" "}
                      BNB
                    </p>
                    <p className="mt-1">펀딩 진행중</p>
                    <p className="mt-1">2022.11.24 ~ 2022.12.03</p>
                  </div>
                </div>
              )}

              <div className="p-8 pt-4 mt-auto w-full">
                {isVote ? (
                  <Button
                    className="bg-blue-600 text-white w-full hover:bg-blue-700"
                    onClick={() => setIsOpenVote(true)}
                  >
                    <span>투표하기</span>
                  </Button>
                ) : (
                  <Button
                    className="bg-blue-600 text-white w-full hover:bg-blue-700"
                    onClick={() => setIsOpenFund(true)}
                  >
                    <span>펀딩하기</span>
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 pt-4">
            <div className="col-span-2 -mt-10">
              <nav className="inline-flex flex-row bg-white dark:bg-dark dark:border-dark-300 border border-b-0 rounded rounded-b-none">
                <button
                  type="button"
                  onClick={() => setTabIndex(0)}
                  className={clsx(
                    "text-gray-dark:text-gray-400 w-40 py-4 px-6 block hover:text-blue-500 focus:outline-none",
                    tabIndex === 0 &&
                      "font-medium border-b-2 border-blue-500 dark:border-primary"
                  )}
                >
                  프로젝트 소개
                </button>
                <button
                  type="button"
                  onClick={() => setTabIndex(1)}
                  className={clsx(
                    "text-gray-dark:text-gray-400 w-40 py-4 px-6 block hover:text-blue-500 focus:outline-none",
                    tabIndex === 1 &&
                      "font-medium border-b-2 border-blue-500 dark:border-primary"
                  )}
                >
                  마일스톤
                </button>
                {isOwner ? (
                  <button
                    type="button"
                    onClick={() => setTabIndex(2)}
                    className={clsx(
                      "text-gray-dark:text-gray-400 w-40 py-4 px-6 block hover:text-blue-500 focus:outline-none",
                      tabIndex === 2 &&
                        "font-medium border-b-2 border-blue-500 dark:border-primary"
                    )}
                  >
                    펀딩 현황
                  </button>
                ) : (
                  ""
                )}
              </nav>
              <Card className="border p-6 bg-white dark:bg-dark dark:border-dark-300 rounded-tl-none rounded-xl">
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
                {tabIndex === 1 ? (
                  <MilestoneUser
                    id={router.query.id}
                    title={""}
                    content={[]}
                    price={0}
                    blockNumber={blockNumber}
                    isOwner={isOwner}
                  />
                ) : (
                  ""
                )}
                {tabIndex === 2 ? (
                  <FundingTable fundingList={project.fundingList} />
                ) : (
                  ""
                )}
              </Card>
            </div>
            <Card className="self-start border mt-5 bg-white dark:bg-dark dark:border-dark-300 rounded-xl">
              <h3 className="text-xs font-medium text-gray-dark:text-gray-400 px-6 pt-4">
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
                  <p className="pb-3">1</p>
                </div>
                <div>
                  <p className="text-xs my-2">받은 펀딩 금액</p>
                  <p className="pb-3">
                    {Number(
                      (
                        32.4 + (replaceBalance(project.totalFundamount) || 0)
                      ).toFixed(5)
                    )}{" "}
                    BNB
                  </p>
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
