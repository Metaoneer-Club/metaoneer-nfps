import React, {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useState,
} from "react";

/* Component */
import { Button } from "components/asset/button";
import { Wallet } from "components/blockchain";
import { Editor } from "components/editor/Editor";
import { CalendarWidget } from "components/calendar/CalendarWidget";
import { Milestone } from "components/milestone/Milestone";
import { MilestoneModal } from "components/modal/MilestoneModal";
import { AutoImage, AutoSVG, formatDate, shortAddress } from "utils";

/* State */
import { isToastState, milestoneState, toastContentState } from "stores";
import { useRecoilValue, useSetRecoilState } from "recoil";

interface Props {
  wallet: Wallet;
  title: string;
  content: string | undefined;
  price: number;
  startDate: Date;
  endDate: Date;
  onChangeTitle: (e?: ChangeEvent) => void;
  onChangeContent: Dispatch<SetStateAction<string | undefined>>;
  onChangePrice: (e?: ChangeEvent) => void;
  setStartDate: Dispatch<SetStateAction<Date>>;
  setEndDate: Dispatch<SetStateAction<Date>>;
  continueHandler: () => void;
}

const Create01: FC<Props> = ({
  wallet,
  title,
  content,
  price,
  startDate,
  endDate,
  onChangeTitle,
  onChangeContent,
  onChangePrice,
  setStartDate,
  setEndDate,
  continueHandler,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const mileStoneArray = useRecoilValue(milestoneState);
  const setIsToast = useSetRecoilState(isToastState);
  const setToastContent = useSetRecoilState(toastContentState);

  const commingSoonHandler = () => {
    setToastContent({
      content: "Comming Soon!",
      type: "primary",
    });
    setIsToast(true);
  };

  return (
    <div>
      {isOpen ? <MilestoneModal close={setIsOpen} /> : ""}
      <div className="mt-8 p-8 pt-0 border-b">
        <div>
          <div className="flex items-center font-semibold">
            <span className="mr-4">메인 이미지 업로드</span>
            <div
              onClick={commingSoonHandler}
              className="flex group cursor-pointer transition-colors duration-300 hover:text-indigo-600 underline items-center text-xs mr-2">
              <AutoSVG
                className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300 group-hover:text-indigo-600"
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
                  {formatDate(startDate)}
                </span>
              </div>
              <CalendarWidget date={startDate} setDate={setStartDate} />
            </div>
            <div>
              <div>
                <span className="font-semibold mr-2">펀딩 종료일</span>
                <span className="text-sm text-gray-600">
                  {formatDate(endDate)}
                </span>
              </div>
              <CalendarWidget date={endDate} setDate={setEndDate} />
            </div>
          </div>
        </div>
      </div>
      <div className="px-8">
        <div className="mt-6">
          <div className="flex items-center">
            <span className="font-semibold mr-2">마일스톤</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {mileStoneArray.length !== 0 ? (
              mileStoneArray.map((v) => (
                <div key={v.keyID} className="items-start">
                  <Milestone
                    keyID={v.keyID}
                    title={v.title}
                    content={v.content}
                    price={v.price}
                    startDate={v.startDate}
                    endDate={v.endDate}
                  />
                </div>
              ))
            ) : (
              <div className="inline-flex text-sm mt-2 rounded-lg border p-3 items-center">
                <AutoSVG className="mr-2" src="/media/icons/warning.svg" />
                <span className="pr-1 ">마일스톤을 추가해 주세요.</span>
              </div>
            )}
          </div>
          <Button
            onClick={() => setIsOpen(true)}
            className="inline-flex mt-4 group cursor-pointer border shadow px-4 py-3 rounded-lg bg-indigo-600 transition-all duration-300 items-center text-sm mr-2 hover:bg-indigo-700 text-white">
            <AutoSVG className="w-6 h-6 mr-1" src="/media/icons/plus.svg" />
            <span className="pr-1">마일스톤 추가</span>
          </Button>
          <div className="mt-4 text-gray-600 text-sm">
            <p>
              ※ 마일스톤은 달성 목표와 산출물의 발표 기간이 작성돼야 합니다.
            </p>
            <p>
              ※ 매 발표 기간마다 펀딩 지속 여부를 투표하니 신중하게 작성해
              주시기 바랍니다.
            </p>
            <p>※ 마일스톤은 수정할 수 있으나 변경 내역이 모두 기록됩니다.</p>
          </div>
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

      <div className="grid grid-cols-3 gap-4 p-8">
        <Button
          className="rounded py-4 text-center font-bold text-white bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400"
          onClick={commingSoonHandler}
          disabled={!wallet.address}>
          <span>임시 저장</span>
        </Button>
        <Button
          className="col-span-2 rounded py-4 text-center font-bold text-white bg-indigo-700 hover:bg-indigo-900 disabled:bg-indigo-400"
          onClick={continueHandler}
          disabled={!wallet.address}>
          <span>다음 챕터로</span>
        </Button>
      </div>
    </div>
  );
};

export { Create01 };
