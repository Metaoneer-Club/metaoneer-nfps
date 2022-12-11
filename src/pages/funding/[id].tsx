import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";

/* Hook */
import useInput from "hooks/useInput";

/* Component */
import { Card } from "components/asset/card";
import { Button } from "components/asset/button";
import { fundContract, getBN, nftContract, web3 } from "components/blockchain";
import { MilestoneUser } from "components/milestone/MilestoneUser";
import { FundingTable } from "components/table/FundingTable";
import { FundingModal } from "components/modal/FundingModal";
import { VoteModal } from "components/modal/VoteModal";
import { StatusCard } from "components/card/StatusCard";

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
import { IProject, isToastState, toastContentState, walletState } from "stores";

type Status = 0 | 1 | 2 | 3 | 4 | 5;
// 0: 펀딩예정
// 1: 펀딩중
// 2: 마일스톤 진행중
// 3: 마일스톤 끝까지 완료
// 4: 마일스톤 도중 중단됨
// 5: 펀딩 중단됨

const Product = () => {
  const router = useRouter();
  const wallet = useRecoilValue(walletState);
  const [projectCount, setProjectCount] = useState<number>(0);
  const [project, setProject] = useState<IProject>({
    limitprice: 0,
    totalFundamount: 0,
    fundingStart: 0,
    fundingEnd: 0,
    fundingList: {},
    daoPass: 0,
    daoReject: 0,
    owner: "0x0000000000000000000000000000000000000000",
  });
  const [mileStoneAry, setMileStoneAry] = useState([]);
  const [mileStoneStep, setMileStoneStep] = useState<number>(0);
  const [daoAry, setDaoAry] = useState([]);
  const [isStatus, setIsStatus] = useState<Status>(0);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [amount, setAmount, onChangeAmount] = useInput<number>(0);
  const [blockNumber, setBlockNumber] = useState<number>(0);
  const [isCount, setIsCount] = useState<number>(0);
  const [isLoadingFund, setIsLoadingFund] = useState<boolean>(false);
  const [isLoadingVote, setIsLoadingVote] = useState<boolean>(false);
  const [isOpenFund, setIsOpenFund] = useState<boolean>(false);
  const [isOpenVote, setIsOpenVote] = useState<boolean>(false);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [isVoted, setIsVoted] = useState<number>(0);
  const [UPDATES, setUPDATES] = useState<number>(0);
  const setIsToast = useSetRecoilState(isToastState);
  const setToastContent = useSetRecoilState(toastContentState);

  const [test, , testCh] = useInput<Status>(0);

  useEffect(() => {
    const getData = async () => {
      const bn = await getBN();
      const count = await nftContract.methods.totalSupply().call();
      setBlockNumber(bn);
      setIsCount(count);
    };
    getData();
  }, []);

  useEffect(() => {
    const projectData = async () => {
      const funding = await fundContract.methods
        .fundingView(router.query.id)
        .call(); // [목표액, 모금액, 펀딩시작일, 펀딩종료일,[펀더지갑], [펀딩금액]]

      const funder = await fundContract.methods
        .funderView(
          router.query.id,
          0,
          wallet.address || "0x0000000000000000000000000000000000000000"
        )
        .call(); // [대기, 찬성, 반대]

      const milestone = await fundContract.methods
        .milestonView(router.query.id)
        .call(); // [마일갯수, [마일시작일], [마일종료일], [마일중도금], [마일중도금비율]]

      const milestep = await fundContract.methods
        .milestonStepView(router.query.id)
        .call(); // 마일스톤 단계

      const voter = await fundContract.methods.daoView(router.query.id).call(); // [[찬성], [반대]]

      const milestoneList: any = [];
      for (let m = 0; m < milestone[1].length; m++) {
        const milestoneData = [];
        for (let i = 1; i <= 4; i++) {
          milestoneData.push(milestone[i][m]);
        }
        milestoneList.push(milestoneData);
      }

      const funders = funding[4]?.map((v: any) => v.toUpperCase());
      const fundingList = funders?.reduce(
        (obj: any, key: any, index: number) => ({
          ...obj,
          [key]: funding[5][index],
        }),
        {}
      );

      const votedAry = Object.values(funder);
      const checkVoted: any = votedAry.indexOf(
        votedAry.filter((v) => v !== "0")[0]
      );

      const nftOwner = await nftContract.methods
        .ownerOf(router.query.id)
        .call();
      const nftCount = await nftContract.methods.balanceOf(nftOwner).call();

      setProject({
        limitprice: funding[0] || 0,
        totalFundamount: funding[1] || 0,
        fundingStart: funding[2] || 0,
        fundingEnd: funding[3] || 0,
        fundingList: fundingList || {},
        daoPass: voter[0][milestep], // [0번, 1번, 2번 찬성]
        daoReject: voter[1][milestep], // [0번, 1번, 2번 반대]
        owner: nftOwner,
      });
      setMileStoneAry(milestoneList);
      setDaoAry(voter);
      setMileStoneStep(milestep);
      setProjectCount(nftCount);
      setIsVoted(checkVoted < 0 ? 0 : checkVoted);
    };
    projectData();
  }, [router.query.id, wallet.address, UPDATES]);

  useEffect(() => {
    const timer = setTimeout(() => {
      blockNumber < project.fundingEnd && setBlockNumber(blockNumber + 1);
    }, 3000);

    // if (blockNumber < project.fundingStart) {
    //   setIsStatus(0);
    // } else if (blockNumber <= project.fundingEnd) {
    //   setIsStatus(1);
    // } else if (blockNumber > project.fundingEnd) {
    //   setIsStatus(2);
    // }

    return () => {
      clearInterval(timer);
    };
  }, [blockNumber, project.fundingEnd, project.fundingStart]);

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

    setUPDATES(UPDATES + 1);
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

    setUPDATES(UPDATES + 1);
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

    setUPDATES(UPDATES + 1);
    setIsToast(true);
    setIsLoadingVote(false);
    setIsOpenVote(false);
    return;
  };

  const closeHandler = () => {
    setIsOpenFund(false);
    setAmount(0);
  };

  const interHandler = async () => {
    console.log("테스트 시작");
    let beforeBalance = await web3.eth.getBalance(wallet.address);
    beforeBalance = replaceBalance(beforeBalance);

    await fundContract.methods.interMediatePayment(1, 1).send({
      from: wallet.address,
      gas: 1000000,
    });

    let afterBalance = await web3.eth.getBalance(wallet.address);
    afterBalance = replaceBalance(afterBalance);

    console.log("이전", beforeBalance);
    console.log("이후", afterBalance);
  };

  const refundHandler = async () => {
    console.log("테스트 시작");
    let beforeBalance = await web3.eth.getBalance(wallet.address);
    beforeBalance = replaceBalance(beforeBalance);

    await fundContract.methods.Refund(1).send({
      from: wallet.address,
      gas: 1000000,
    });

    let afterBalance = await web3.eth.getBalance(wallet.address);
    afterBalance = replaceBalance(afterBalance);

    console.log("이전", beforeBalance);
    console.log("이후", afterBalance);
  };

  const statusChanger = (e: any) => {
    testCh(e);
    setIsStatus(e.target.value);
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
          isVoted={isVoted}
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

              <input
                type="number"
                className="text-sm w-14 text-center mx-4 border p-2 rounded bg-gray-500 text-white hover:bg-gray-600"
                value={test}
                onChange={statusChanger}
              />

              <button
                type="button"
                className="text-sm border mr-4 p-2 rounded bg-gray-500 text-white hover:bg-gray-600"
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
                  if (Number(router.query.id) < isCount) {
                    router.push(`/funding/${Number(router.query.id) + 1}`);
                  } else {
                    setToastContent({
                      content: "마지막 펀딩입니다.",
                      type: "primary",
                    });
                    setIsToast(true);
                  }
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
                <StatusCard
                  status={Number(isStatus)}
                  blockNumber={blockNumber}
                  project={project}
                  milestep={Number(mileStoneStep)}
                  milestones={mileStoneAry}
                />
              </div>

              {Number(isStatus) <= 1 ? (
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
                    <p className="mt-1">
                      {Number(isStatus) === 0 ? "펀딩 대기중" : "펀딩 진행중"}
                    </p>
                    <p className="mt-1">2022.11.24 ~ 2022.12.03</p>
                  </div>
                </div>
              ) : (
                ""
              )}
              {Number(isStatus) === 2 ? (
                <div className="grid grid-cols-5 gap-4 px-8 py-3">
                  <div className="col-span-2 text-sm text-center dark:text-gray-300">
                    <p className="mt-1">이전 단계</p>
                    <p className="mt-1">현재 단계</p>
                    <p className="mt-1">다음 단계</p>
                  </div>
                  <div className="col-span-3 text-left text-gray-dark:text-gray-400 text-sm">
                    <p className="mt-1">펀딩 완료</p>
                    <p className="mt-1">
                      마일스톤 {Number(mileStoneStep) + 1} 진행중
                    </p>
                    <p className="mt-1">
                      마일스톤 {Number(mileStoneStep) + 2} 시작
                    </p>
                  </div>
                </div>
              ) : (
                ""
              )}
              {Number(isStatus) >= 3 ? (
                <div className="grid grid-cols-5 gap-4 px-8 py-3">
                  <div className="col-span-2 text-sm text-center dark:text-gray-300">
                    <p className="mt-1">이전 단계</p>
                    <p className="mt-1">현재 단계</p>
                    <p className="mt-1">다음 단계</p>
                  </div>
                  <div className="col-span-3 text-left text-gray-dark:text-gray-400 text-sm">
                    <p className="mt-1">마일스톤 진행</p>
                    <p className="mt-1">프로젝트 종료</p>
                    <p className="mt-1">없음</p>
                  </div>
                </div>
              ) : (
                ""
              )}

              <div className="p-8 pt-4 mt-auto w-full">
                {Number(isStatus) === 0 ? (
                  <Button
                    className="bg-blue-600 text-white w-full hover:bg-blue-700 disabled:bg-blue-400"
                    onClick={() => {}}
                    disabled
                  >
                    <span>펀딩대기</span>
                  </Button>
                ) : (
                  ""
                )}
                {Number(isStatus) === 1 ? (
                  <Button
                    className="bg-blue-600 text-white w-full hover:bg-blue-700"
                    onClick={() => setIsOpenFund(true)}
                  >
                    <span>펀딩하기</span>
                  </Button>
                ) : (
                  ""
                )}
                {Number(isStatus) === 2 ? (
                  <>
                    <Button
                      className="bg-blue-600 text-white w-full hover:bg-blue-700"
                      onClick={() => {
                        isOwner ? interHandler() : setIsOpenVote(true);
                      }}
                    >
                      <span>{isOwner ? "중도금 받기" : "투표하기"}</span>
                    </Button>
                  </>
                ) : (
                  ""
                )}
                {Number(isStatus) === 3 ? (
                  <Button
                    className="bg-blue-600 text-white w-full hover:bg-blue-700 disabled:bg-blue-400"
                    onClick={() => {
                      isOwner ? interHandler() : "";
                    }}
                    disabled={!isOwner}
                  >
                    <span>{isOwner ? "자금받기" : "프로젝트 완료"}</span>
                  </Button>
                ) : (
                  ""
                )}
                {Number(isStatus) >= 4 ? (
                  <Button
                    className="bg-danger text-white w-full hover:bg-danger-active disabled:bg-red-400"
                    onClick={() => {
                      isOwner ? "" : refundHandler();
                    }}
                    disabled={isOwner}
                  >
                    <span>{isOwner ? "환불 진행중" : "환불받기"}</span>
                  </Button>
                ) : (
                  ""
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
                    dao={daoAry}
                    milestones={mileStoneAry}
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
                    {shortAddress(project?.owner) ||
                      "0x0000000000000000000000000000000000000000"}
                  </div>
                </div>
                <p className="mt-2 text-xs">
                  BNB 체인의 랜드마크가 되겠습니다!
                </p>
              </div>
              <div className="grid grid-cols-2 text-center">
                <div className="border-r">
                  <p className="text-xs my-2">프로젝트 수</p>
                  <p className="pb-3">{projectCount || 1}</p>
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
