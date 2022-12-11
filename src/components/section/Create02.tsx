import React, {
  Dispatch,
  FC,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import clsx from "clsx";

/* Component */
import { Button } from "components/asset/button";
import { Card } from "components/asset/card";
import { Wallet } from "components/blockchain";
import { ProductCard } from "components/card/ProductCard";
import { MainCard } from "components/card/MainCard";
import { FormWallet } from "components/wallet/FormWallet";
import { MilestoneUser } from "components/milestone/MilestoneUser";
import { accounting, AutoImage, AutoSVG, shortAddress } from "utils";

interface Props {
  wallet: Wallet;
  isLoading: boolean;
  setIsTap: Dispatch<SetStateAction<number>>;
  registerHandler: MouseEventHandler<HTMLButtonElement>;
}

const Create02: FC<Props> = ({
  wallet,
  isLoading,
  setIsTap,
  registerHandler,
}) => {
  const [isOpen, setIsOpen] = useState<number>(0);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [blockNumber, setBlockNumber] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBlockNumber(blockNumber + 1);
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, [blockNumber]);

  const openHandler = (tapIndex: number) => {
    if (isOpen === tapIndex) {
      setIsOpen(-1);
    } else {
      setIsOpen(tapIndex);
    }
  };

  return (
    <div>
      <div className="mt-8 px-8">
        <div>
          <div
            className={clsx(
              "flex justify-between shadow p-4 transition-colors duration-300",
              isOpen === 0
                ? "rounded bg-dark text-white"
                : "hover:bg-gray-700 hover:text-white"
            )}
            onClick={() => {
              openHandler(0);
            }}
          >
            <span>홈 화면 데모</span>
            <div
              className={clsx(
                "transition-transform rotate-90 duration-300",
                isOpen === 0 && "rotate-0"
              )}
            >
              <AutoSVG src="/media/icons/dropdown.svg" className="w-6 h-6" />
            </div>
          </div>
          {isOpen === 0 ? (
            <div
              className={clsx(
                "my-2 w-4/5 mx-auto h-56 animate__animated animate__fast",
                isOpen === 0 ? "animate__fadeIn" : "animate__fadeOut"
              )}
            >
              <MainCard
                title={dummy.title}
                content={dummy.content}
                imgURI={dummy.src}
                category="NFT"
                creator="0x12A60872B053C009452cdb95178144c8fFbDeA4D"
                progress={66}
                amount={300}
                expired={24}
              />
            </div>
          ) : (
            ""
          )}
        </div>
        <div>
          <div
            className={clsx(
              "flex justify-between shadow p-4 transition-colors duration-300",
              isOpen === 1
                ? "rounded bg-dark text-white"
                : "hover:bg-gray-700 hover:text-white"
            )}
            onClick={() => openHandler(1)}
          >
            <span>펀딩 목록 데모</span>
            <div
              className={clsx(
                "transition-transform rotate-90 duration-300",
                isOpen === 1 && "rotate-0"
              )}
            >
              <AutoSVG src="/media/icons/dropdown.svg" className="w-6 h-6" />
            </div>
          </div>

          {isOpen === 1 ? (
            <div
              className={clsx(
                "w-72 mx-auto group cursor-pointer my-4 animate__animated animate__fast",
                isOpen === 1 ? "animate__fadeIn" : "animate__fadeOut"
              )}
            >
              <ProductCard
                category="NFT"
                title={dummy.title}
                content={dummy.content}
                imgURI={dummy.src}
                creator="0x12A60872B053C009452cdb95178144c8fFbDeA4D"
                progress={66}
                amount={300}
                expired={24}
              />
            </div>
          ) : (
            ""
          )}
        </div>
        <div>
          <div
            className={clsx(
              "flex justify-between shadow p-4 transition-colors duration-300",
              isOpen === 2
                ? "rounded bg-dark text-white"
                : "hover:bg-gray-700 hover:text-white"
            )}
            onClick={() => openHandler(2)}
          >
            <span>펀딩 세부정보 화면 데모</span>
            <div
              className={clsx(
                "transition-transform rotate-90 duration-300",
                isOpen === 2 && "rotate-0"
              )}
            >
              <AutoSVG src="/media/icons/dropdown.svg" className="w-6 h-6" />
            </div>
          </div>
          {isOpen === 2 ? (
            <div
              className={clsx(
                "my-4 animate__animated animate__fast",
                isOpen === 2 ? "animate__fadeIn" : "animate__fadeOut"
              )}
            >
              <div className="flex justify-between items-center">
                <div className="text-lg text-center font-bold flex items-center">
                  <span className="px-4 py-2 text-xs border rounded-lg bg-primary-active text-white mr-4">
                    NFT
                  </span>
                  <span className="text-lg">{dummy.title}</span>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-6 pt-4">
                <div className="col-span-3">
                  <div className="relative w-full h-72">
                    <AutoImage
                      src="/temp.png"
                      alt="bnb"
                      className="object-cover rounded-xl"
                    />
                  </div>
                </div>
                <div className="col-span-2 flex flex-col text-center rounded-xl border bg-white">
                  <div className="grid grid-cols-2 gap-4 p-4 items-center text-sm">
                    <div className="mt-4">
                      <label className="text-gray-600">펀딩 금액</label>
                      <p className="mt-2">
                        <span className="text-xl mr-1">
                          {accounting(0) || 0}
                        </span>
                        <span className="text-gray-600">BNB</span>
                      </p>
                    </div>
                    <div className="mt-4">
                      <label className="text-gray-600">후원자 수</label>
                      <p className="mt-2">
                        <span className="text-xl mr-1">
                          {accounting(0) || 0}
                        </span>
                        <span className="text-gray-600">명</span>
                      </p>
                    </div>
                    <div className="mt-2">
                      <label className="text-gray-600">펀딩 종료까지</label>
                      <div className="text-gray-600 mt-1">
                        <span className="text-black text-xl mr-1">30</span>일
                        <div className="mt-2">
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://bscscan.com/blocks"
                            className="text-gray-500 hover:text-blue-500 hover:underline"
                          >
                            {accounting(86400)}
                          </a>
                          <span className="text-xs ml-1">블록</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <label className="text-gray-600">펀딩 달성률</label>
                      <p className="mt-3">
                        <span className="text-blue-600 text-xl mr-1">30</span>%
                      </p>
                      <div className="mt-3 flex items-center">
                        <div className="w-full h-3 mb-1 bg-blue-200 rounded-sm">
                          <div
                            style={{
                              // width: progress >= 100 ? "100%" : `${progress}%`,
                              width: "30%",
                            }}
                            className="h-full text-center text-xs text-white bg-blue-600 rounded-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-5 gap-4 px-8">
                    <div className="col-span-2 text-xs text-center">
                      <p>펀딩 목표액</p>
                      <p className="mt-1">현재 단계</p>
                      <p className="mt-1">펀딩 기간</p>
                    </div>
                    <div className="col-span-3 text-left text-gray-600 text-xs">
                      <p>{accounting(2000)} BNB</p>
                      <p className="mt-1">펀딩 진행중</p>
                      <p className="mt-1">2022.11.24 ~ 2022.12.03</p>
                    </div>
                  </div>

                  <div className="px-8 p-4 mt-auto w-full">
                    <Button
                      className="bg-blue-600 text-white w-full text-sm hover:bg-blue-700"
                      onClick={() => {}}
                    >
                      <span>펀딩하기</span>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-4">
                <div className="col-span-2 -mt-12">
                  <nav className="inline-flex flex-row bg-white border border-b-0 rounded rounded-b-none">
                    <button
                      type="button"
                      onClick={() => setTabIndex(0)}
                      className={clsx(
                        "text-gray-600 text-sm w-40 py-4 px-6 block hover:text-blue-500 focus:outline-none",
                        tabIndex === 0 &&
                          "font-medium border-b-2 border-blue-500"
                      )}
                    >
                      프로젝트 소개
                    </button>
                    <button
                      type="button"
                      onClick={() => setTabIndex(1)}
                      className={clsx(
                        "text-gray-600 text-sm w-40 py-4 px-6 block hover:text-blue-500 focus:outline-none",
                        tabIndex === 1 &&
                          "font-medium border-b-2 border-blue-500"
                      )}
                    >
                      마일스톤
                    </button>
                  </nav>
                  <Card className="border p-6 bg-white rounded-tl-none text-sm rounded-xl">
                    {tabIndex === 0 ? (
                      <p className="leading-relaxed">
                        BNB Smart Chain (BSC) supports the most popular
                        programming languages, flexible tools, and comes with
                        clear and canonical documentation. You can quickly start
                        and deploy your application on a blockchain designed
                        with real use in mind. BNB Smart Chain (BSC) supports
                        the most popular programming languages, flexible tools,
                        and comes with clear and canonical documentation. You
                        can quickly start and deploy your application on a
                        blockchain designed with real use in mind. BNB Smart
                        Chain (BSC) supports the most popular programming
                        languages, flexible tools, and comes with clear and
                        canonical documentation. You can quickly start and
                        deploy your application on a blockchain designed with
                        real use in mind.
                      </p>
                    ) : (
                      <MilestoneUser
                        id="0"
                        blockNumber={86400}
                        title={""}
                        content={[]}
                        price={0}
                        isOwner={false}
                        dao={[]}
                        milestones={[]}
                      />
                    )}
                  </Card>
                </div>
                <Card className="self-start border mt-1 bg-white rounded-xl">
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
                        {shortAddress(
                          "0x12A60872B053C009452cdb95178144c8fFbDeA4D"
                        )}
                      </div>
                    </div>
                    <p className="mt-2 text-xs">
                      BNB 체인의 랜드마크가 되겠습니다!
                    </p>
                  </div>
                  <div className="grid grid-cols-2 text-center">
                    <div className="border-r">
                      <p className="text-xs my-2">프로젝트 수</p>
                      <p className="text-sm pb-3">5</p>
                    </div>
                    <div>
                      <p className="text-xs my-2">받은 펀딩 금액</p>
                      <p className="text-sm pb-3">0 BNB</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        <FormWallet address={wallet.address} />
      </div>

      <div className="grid grid-cols-3 gap-4 p-8">
        <Button
          className="rounded py-4 text-center font-bold text-white disabled:bg-rose-400 bg-danger hover:bg-danger-active"
          onClick={() => setIsTap(0)}
          disabled={isLoading}
        >
          <span>이전 챕터로</span>
        </Button>
        <Button
          className="col-span-2 rounded py-4 text-center font-bold text-white disabled:bg-indigo-400 bg-indigo-700 hover:bg-indigo-900"
          onClick={registerHandler}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <span className="mr-2">프로젝트 생성중...</span>
              <div className="animate-spin">
                <AutoSVG src="/media/icons/spinner.svg" className="w-6 h-6" />
              </div>
            </span>
          ) : (
            <span>프로젝트 생성 완료</span>
          )}
        </Button>
      </div>
    </div>
  );
};

const dummy = {
  title: "Awesome Binance",
  src: "/temp.png",
  content:
    "BNB Smart Chain (BSC) supports the most popular programming languages, flexible tools, and comes with clear and canonical documentation. You can quickly start and deploy your application on a blockchain designed with real use in mind.",
};

export { Create02 };
