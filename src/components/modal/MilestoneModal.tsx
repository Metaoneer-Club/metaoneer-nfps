import React, { FC, Dispatch, SetStateAction, useState } from "react";
import clsx from "clsx";
import { v1 } from "uuid";

/* Hook */
import useInput from "hooks/useInput";

/* Component */
import { Button } from "components/asset/button";
import { CalendarWidget } from "components/calendar/CalendarWidget";
import { AutoSVG, formatDate } from "utils";

/* State */
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  IMilestone,
  isToastState,
  milestoneState,
  toastContentState,
} from "stores";

interface Props {
  close: Dispatch<SetStateAction<boolean>>;
}

const MilestoneModal: FC<Props> = ({ close }) => {
  const [isOpenStart, setIsOpenStart] = useState(false);
  const [isOpenEnd, setIsOpenEnd] = useState(false);
  const [title, setTitle, onChangeTitle] = useInput<string>("");
  const [content, setContent, onChangeContent] = useInput<string>("");
  const [price, setPrice, onChangePrice] = useInput<number>(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [mileStoneArray, setMilestoneArray] = useRecoilState(milestoneState);
  const setIsToast = useSetRecoilState(isToastState);
  const setToastContent = useSetRecoilState(toastContentState);

  const startOpenHandler = (e: any) => {
    setStartDate(e);
    setIsOpenStart(false);
  };

  const endOpenHandler = (e: any) => {
    setEndDate(e);
    setIsOpenEnd(false);
  };

  const addMilestoneHandler = () => {
    if (title.length === 0) {
      setToastContent({
        content: "마일스톤 제목을 입력해 주세요.",
        type: "danger",
      });
      setIsToast(true);
      return;
    }

    if (content.length === 0) {
      setToastContent({
        content: "마일스톤 내용을 입력해 주세요.",
        type: "danger",
      });
      setIsToast(true);
      return;
    }

    const inputData: IMilestone = {
      keyID: `ms${v1()}`,
      title: title,
      content: content,
      price: price,
      startDate: startDate,
      endDate: endDate,
    };

    setMilestoneArray([...mileStoneArray, inputData]);
    setTitle("");
    setContent("");
    setPrice(0);
    setStartDate(new Date());
    setEndDate(new Date());
    close(false);
  };

  return (
    <>
      <div className="py-12 bg-gray-700/50 transition duration-150 ease-in-out z-10 fixed top-0 right-0 bottom-0 left-0">
        <div className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
          <div className="relative py-4 px-1 md:px-3 bg-white shadow-md rounded border border-gray-400">
            <div className="custom-scroll py-4 px-4 md:px-7 h-[480px] overflow-auto">
              <div className="w-full flex items-center text-gray-600 mb-3">
                <AutoSVG
                  className="w-8 h-8 text-info mr-2"
                  src="/media/icons/polygon.svg"
                />
                <h1 className="text-gray-800 font-lg font-bold tracking-normal">
                  마일스톤 {mileStoneArray.length + 1}
                </h1>
              </div>
              <label
                htmlFor="name"
                className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                마일스톤 제목
              </label>
              <input
                type="text"
                value={title}
                onChange={onChangeTitle}
                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-400 rounded border"
                placeholder="앱 출시"
              />
              <label
                htmlFor="content"
                className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                마일스톤 산출물
              </label>
              <textarea
                value={content}
                onChange={onChangeContent}
                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-20 flex items-center pl-3 pt-3 text-sm border-gray-400 rounded border"
                placeholder="- M2E 앱 안드로이드 출시 (https://...)"
              />
              <label
                htmlFor="name"
                className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                <span className="font-semibold mr-2">마일스톤 중도금</span>
                <span className="text-xs text-gray-600">( 단위 : BNB )</span>
              </label>
              <input
                type="number"
                value={price}
                onChange={onChangePrice}
                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-400 rounded border"
                placeholder="10"
              />
              <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                <span className="font-semibold mr-2">마일스톤 시작일</span>
              </label>
              <div className="mb-5 mt-2">
                <div className={clsx("relative mt-2", !isOpenStart && "mb-5")}>
                  <div
                    className="absolute right-0 text-gray-600 flex items-center pr-3 h-full cursor-pointer "
                    onClick={() => setIsOpenStart(!isOpenStart)}>
                    <AutoSVG
                      className={
                        isOpenStart
                          ? "transition-transform scale-125 duration-150 text-indigo-600"
                          : ""
                      }
                      src="/media/icons/calendar.svg"
                    />
                  </div>
                  <input
                    id="expiry"
                    className={clsx(
                      "text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-400 border",
                      isOpenStart ? " rounded-t" : "rounded"
                    )}
                    placeholder={formatDate(startDate)}
                  />
                </div>
                {isOpenStart && (
                  <div className="-mt-3">
                    <CalendarWidget
                      date={startDate}
                      setDate={startOpenHandler}
                    />
                  </div>
                )}
              </div>
              <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                <span className="font-semibold mr-2">마일스톤 마감일</span>
              </label>
              <div className="mb-5 mt-2">
                <div className={clsx("relative mt-2", !isOpenEnd && "mb-5")}>
                  <div
                    className="absolute right-0 text-gray-600 flex items-center pr-3 h-full cursor-pointer"
                    onClick={() => setIsOpenEnd(!isOpenEnd)}>
                    <AutoSVG
                      className={
                        isOpenEnd
                          ? "transition-transform scale-125 duration-150 text-indigo-600"
                          : ""
                      }
                      src="/media/icons/calendar.svg"
                    />
                  </div>
                  <input
                    id="expiry"
                    className={clsx(
                      "text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-400 border",
                      isOpenStart ? " rounded-t" : "rounded"
                    )}
                    placeholder={formatDate(endDate)}
                  />
                </div>
                {isOpenEnd && (
                  <div className="-mt-3">
                    <CalendarWidget date={endDate} setDate={endOpenHandler} />
                  </div>
                )}
              </div>
            </div>
            <div className="mt-8 flex justify-center text-sm">
              <Button
                className="w-20 mr-2 rounded text-center font-bold text-white bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400"
                onClick={() => close(false)}>
                <span>취소</span>
              </Button>
              <Button
                className="w-28 rounded text-center font-bold text-white bg-indigo-700 hover:bg-indigo-900 disabled:bg-indigo-400"
                onClick={addMilestoneHandler}>
                <span>추가 완료</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { MilestoneModal };
