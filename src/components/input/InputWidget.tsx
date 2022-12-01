import React, { FC } from "react";

/* Hook */
import useInput from "hooks/useInput";

/* State */
import { useRecoilState } from "recoil";
import { milestoneContentState } from "stores";

interface Props {
  keyID: string;
  index: number;
}

const InputWidget: FC<Props> = ({ keyID, index }) => {
  const [, , onChangeInputValue] = useInput<string>("");
  const [milestoneContent, setMilestoneContent] = useRecoilState(
    milestoneContentState
  );

  const changeData = (e: any) => {
    onChangeInputValue(e);
    setMilestoneContent(
      milestoneContent.set(index, {
        ...milestoneContent,
        keyID: keyID,
        content: e.target.value,
      })
    );
  };

  return (
    <input
      type="text"
      value={milestoneContent.get(index)?.content || ""}
      onChange={changeData}
      className="mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-400 rounded border"
      placeholder="M2E 앱 안드로이드 출시"
    />
  );
};

export { InputWidget };
