import React, { Fragment, useEffect, useState } from "react";
import { NextPage } from "next/types";
import clsx from "clsx";

/* API */
import { ICreateFundingAPI } from "api/APIModel";
import { CreateFundingAPI } from "api";

/* Hook */
import useInput from "hooks/useInput";

/* Component */
import { fundContract, getBN, nftContract, toBN } from "components/blockchain";
import { Create01, Create02, Create03 } from "components/section";
import { hexBalance } from "utils";

/* State */
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import {
  isToastState,
  milestoneState,
  toastContentState,
  walletState,
} from "stores";

const Create: NextPage = () => {
  const wallet = useRecoilValue(walletState);
  const [mileStoneArray, setMileStoneArray] = useRecoilState(milestoneState);
  const [isTap, setIsTap] = useState<number>(0);
  const [currentKey, setCurrentKey] = useState<string>("");
  const [title, setTitle, onChangeTitle] = useInput<string>("");
  const [content, setContent] = useState<string | undefined>(
    "### 여기에 설명을 입력해 주세요."
  );
  const [price, setPrice, onChangePrice] = useInput<number>(0);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [lastDate, setLastDate] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setIsToast = useSetRecoilState(isToastState);
  const setToastContent = useSetRecoilState(toastContentState);

  console.log(mileStoneArray);

  useEffect(() => {
    let stDt = new Date();
    let endDt = new Date();
    stDt.setDate(stDt.getDate() + 1);
    endDt.setDate(endDt.getDate() + 2);

    setStartDate(stDt);
    setEndDate(endDt);
  }, []);

  useEffect(() => {
    if (mileStoneArray.length > 0) {
      const dates = mileStoneArray
        .map((v) => v.expired)
        .reduce((prev, curr) =>
          new Date(prev).getTime() <= new Date(curr).getTime() ? curr : prev
        );
      console.log(dates);
      setLastDate(dates);
    } else {
      setLastDate(endDate);
    }
  }, [endDate, mileStoneArray]);

  const checkRule = () => {
    if (title.length === 0) {
      setToastContent({
        content: "프로젝트 제목을 입력해 주세요.",
        type: "danger",
      });
      setIsToast(true);
      return false;
    }

    if (content?.length === 0) {
      setToastContent({
        content: "프로젝트 설명을 입력해 주세요.",
        type: "danger",
      });
      setIsToast(true);
      return false;
    }

    if (price <= 0) {
      setToastContent({
        content: "펀딩 목표비용은 0보다 커야합니다.",
        type: "danger",
      });
      setIsToast(true);
      return false;
    }

    if (startDate.getTime() < Date.now()) {
      setToastContent({
        content: "시작 날짜는 금일보다 커야합니다.",
        type: "danger",
      });
      setIsToast(true);
      return false;
    }

    const middle: number = mileStoneArray?.reduce(
      (prev, curr) => Number(prev) + Number(curr.price),
      0
    );
    if (middle !== 100) {
      setToastContent({
        content: "중도금은 100%로 설정돼야 합니다.",
        type: "danger",
      });
      setIsToast(true);
      return false;
    }

    return true;
  };

  const continueHandler = () => {
    if (checkRule()) {
      window.scrollTo(0, 0);
      setIsTap(1);
    }
  };

  const uploadContract = async () => {
    const blockNumber = await getBN();
    const stdt = toBN(blockNumber, startDate);
    const edt = toBN(blockNumber, endDate);

    const milestoneSdt = mileStoneArray.map((v) =>
      toBN(blockNumber, v.startDate)
    );
    const milestoneEdt = mileStoneArray.map((v) =>
      toBN(blockNumber, v.expired)
    );
    const milestonePrice = mileStoneArray.map((v) => v.price);

    try {
      await fundContract.methods
        .FundRegister(
          hexBalance(price),
          stdt,
          edt,
          milestoneSdt,
          milestoneEdt,
          milestonePrice
        )
        .send({
          from: wallet.address,
          gas: 10000000,
        });
      const balanceOf = await nftContract.methods
        .balanceOf(wallet.address)
        .call();
      const lastToken = await nftContract.methods
        .tokenOfOwnerByIndex(wallet.address, Number(balanceOf - 1))
        .call();
      setCurrentKey(lastToken);
    } catch (err) {
      console.log(err);
      setToastContent({
        content: "가스비가 부족하거나 네트워크 이슈가 있습니다.",
        type: "danger",
      });
      setIsToast(true);
      setIsLoading(false);
      return false;
    }
    return true;
  };

  const uploadBackend = async () => {
    const mileStoneContent: any = mileStoneArray.map((v) => v.content);
    const fundingData: ICreateFundingAPI = {
      address: wallet.address,
      metadata: {
        title: title,
        content: String(content),
        milestones: [mileStoneContent],
      },
      token_id: Number(currentKey),
    };

    try {
      await CreateFundingAPI(fundingData);
      setToastContent({
        content: "프로젝트가 성공적으로 등록되었습니다.",
        type: "success",
      });
      setIsToast(true);
    } catch (err) {
      setToastContent({
        content: "입력 데이터에 오류가 있습니다.",
        type: "danger",
      });
      setIsToast(true);
      setIsLoading(false);
      return false;
    }

    return true;
  };

  const registerHandler = async () => {
    if (!checkRule()) return;

    setIsLoading(true);
    const contract = await uploadContract();
    // const backend = contract && (await uploadBackend());
    if (contract) {
      setTitle("");
      setContent("");
      setPrice(0);
      setMileStoneArray([]);
      setIsTap(2);
      window.scrollTo(0, 0);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-600">
      <div className="max-w-[1200px] mx-auto pt-12 pb-40">
        <div className="grid grid-cols-7 content-center font-manrope">
          <div className="rounded-xl col-start-2 col-span-5 border shadow bg-white dark:bg-dark dark:border-dark-300">
            <div className="grid grid-cols-8 gx-4 break-words font-bold border-b dark:border-dark-300 p-8">
              {chapter.map((v, i) => (
                <Fragment key={v}>
                  <div className="col-span-2 items-center justify-center">
                    <div
                      className={clsx(
                        "border w-8 h-8 mx-auto text-center leading-7 text-white font-bold rounded-full",
                        isTap === i
                          ? "bg-indigo-700 border-indigo-700"
                          : "bg-indigo-400 border-indigo-400"
                      )}
                    >
                      {i + 1}
                    </div>
                    <div className="mt-2 text-center text-sm py-2 whitespace-pre-wrap">
                      {v}
                    </div>
                  </div>
                  {i !== 2 ? (
                    <div className="col-span-1 flex items-center">
                      <hr className="w-3/4 mx-auto"></hr>
                    </div>
                  ) : (
                    ""
                  )}
                </Fragment>
              ))}
            </div>

            {isTap === 0 ? (
              <Create01
                wallet={wallet}
                title={title}
                content={content}
                price={price}
                startDate={startDate}
                endDate={endDate}
                lastDate={lastDate}
                onChangeTitle={onChangeTitle}
                onChangeContent={setContent}
                onChangePrice={onChangePrice}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                continueHandler={continueHandler}
              />
            ) : (
              ""
            )}
            {isTap === 1 ? (
              <Create02
                wallet={wallet}
                isLoading={isLoading}
                setIsTap={setIsTap}
                registerHandler={registerHandler}
              />
            ) : (
              ""
            )}
            {isTap === 2 ? <Create03 currentKey={currentKey} /> : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

const chapter = [
  "프로젝트 정보를 입력해 주세요.",
  "프로젝트 데모를 확인해 주세요.",
  "펀딩 NFT 생성 완료!\n프로젝트를 확인해 보세요.",
];

export default Create;
