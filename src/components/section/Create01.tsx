import React, { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import clsx from "clsx";

/* Component */
import { Button } from "components/asset/button";
import { Wallet } from "components/blockchain";
import { Editor } from "components/editor/Editor";
import { AutoImage, AutoSVG, shortAddress } from "utils";

/* State */
import { isToastState, toastContentState } from "stores";
import { useSetRecoilState } from "recoil";
import { CalendarWidget } from "../calendar/CalendarWidget";
import moment from "moment";

interface Props {
  wallet: Wallet;
  title: string;
  content: string | undefined;
  price: number;
  limit: boolean;
  limitCount: number;
  startDate: Date;
  endDate: Date;
  onChangeTitle: (e?: ChangeEvent) => void;
  onChangeContent: Dispatch<SetStateAction<string | undefined>>;
  onChangePrice: (e?: ChangeEvent) => void;
  onChangeLimitCount: (e?: ChangeEvent) => void;
  setLimit: Dispatch<SetStateAction<boolean>>;
  setStartDate: Dispatch<SetStateAction<Date>>;
  setEndDate: Dispatch<SetStateAction<Date>>;
  continueHandler: () => void;
}

const Create01: FC<Props> = ({
  wallet,
  title,
  content,
  price,
  limit,
  limitCount,
  startDate,
  endDate,
  onChangeTitle,
  onChangeContent,
  onChangePrice,
  onChangeLimitCount,
  setLimit,
  setStartDate,
  setEndDate,
  continueHandler,
}) => {
  const setIsToast = useSetRecoilState(isToastState);
  const setToastContent = useSetRecoilState(toastContentState);

  return (
    <div>
      <div className="mt-8 px-8">
        <div>
          <div className="flex items-center font-semibold">
            <span className="mr-4">메인 이미지 업로드</span>
            <div
              onClick={() => {
                setToastContent({
                  content: "Comming Soon!",
                  type: "primary",
                });
                setIsToast(true);
              }}
              className="flex group cursor-pointer transition-colors duration-300 hover:text-indigo-600 underline items-center text-xs mr-2"
            >
              <AutoSVG
                className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300 hover:text-indigo-600"
                src="/media/icons/arrow-top.svg"
              />
              <span>Upload</span>
            </div>
          </div>
          <div className="relative w-full h-80 mt-2">
            <AutoImage
              src="/temp.png"
              className="object-cover rounded"
              alt="temp"
            />
          </div>
        </div>

        <div className="mt-6">
          <div className="font-semibold">프로젝트 제목</div>
          <div>
            <input
              className="form-input mt-1 w-full rounded border border-gray-400 p-2"
              type="text"
              value={title}
              onChange={onChangeTitle}
              placeholder="여기에 제목을 입력해 주세요."
            />
          </div>
        </div>
        <div className="mt-6">
          <div className="font-semibold">프로젝트 설명</div>
          <Editor content={content} onChangeContent={onChangeContent} />
        </div>
        <div className="mt-6">
          <div>
            <span className="font-semibold mr-1">펀딩 목표액</span>
            <span className="text-xs text-gray-600">(단위 : BNB)</span>
          </div>
          <div>
            <input
              className="form-input mt-1 w-full rounded border border-gray-400 p-2"
              type="number"
              value={price}
              onChange={onChangePrice}
              placeholder="0.1"
            />
          </div>
        </div>

        <div className="mt-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div>
                <span className="font-semibold mr-2">펀딩 시작일</span>
                <span className="text-sm text-gray-600">
                  {moment(startDate).format("YYYY년 MM월 DD일")}
                </span>
              </div>
              <CalendarWidget date={startDate} setDate={setStartDate} />
            </div>
            <div>
              <div>
                <span className="font-semibold mr-2">펀딩 종료일</span>
                <span className="text-sm text-gray-600">
                  {moment(endDate).format("YYYY년 MM월 DD일")}
                </span>
              </div>
              <CalendarWidget date={endDate} setDate={setEndDate} />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center">
            <div>
              <span className="font-semibold mr-1">Limit</span>
              <span className="text-xs text-gray-600">(Option)</span>
            </div>
            <AutoSVG src="/media/icons/arrow-right.svg" className="mx-2" />
            <div
              onClick={() => setLimit(!limit)}
              className="flex items-center cursor-pointer group"
            >
              <span className="font-semibold text-sm">OFF</span>
              <div
                className={clsx(
                  "rounded-xl w-12 h-5 p-0.5 mx-1 transition-colors duration-150",
                  limit
                    ? "bg-indigo-700 group-hover:bg-indigo-900"
                    : "bg-gray-400 group-hover:bg-gray-600"
                )}
              >
                <div
                  className={clsx(
                    "rounded-full w-4 h-4 bg-white transform mx-auto duration-300 ease-in-out",
                    limit ? " translate-x-3" : "-translate-x-3"
                  )}
                ></div>
              </div>
              <span className="font-semibold text-sm ">ON</span>
            </div>
          </div>
          <div className="text-gray-600 text-sm">
            If this box is checked, there is a limit to the number of products.
          </div>
          {limit ? (
            <div
              className={clsx(
                "mt-6 animate__animated animate__fast",
                limit ? "animate__fadeIn" : "animate__fadeOut"
              )}
            >
              <div className="font-semibold">Limit Count</div>
              <div>
                <input
                  className="form-input mt-1 w-full rounded border border-gray-400 p-2"
                  type="number"
                  value={limitCount}
                  onChange={onChangeLimitCount}
                  placeholder="10"
                />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="mt-6">
          <div className="font-semibold">지갑주소</div>
          <div className="mt-2">
            <div className="flex items-center bg-neutral-100 p-3 rounded border border-gray-400">
              <div className="flex items-center gap-x-2">
                <AutoSVG
                  src="/media/social-logos/metamask.svg"
                  className="w-5 h-5 mx-2"
                />
                <span className="font-semibold">
                  {shortAddress(wallet.address) ||
                    "Please connect your wallet first."}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        <Button
          className="w-full rounded py-4 text-center font-bold text-white bg-indigo-700 hover:bg-indigo-900"
          onClick={continueHandler}
        >
          <span>다음 챕터로</span>
        </Button>
      </div>
    </div>
  );
};

export { Create01 };
