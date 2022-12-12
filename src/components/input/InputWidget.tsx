import React, { FC } from "react";

/* Hook */
import useInput from "hooks/useInput";

/* State */
import { useRecoilState } from "recoil";
import { milestoneContentState } from "stores";

interface Props {
  index: number;
}

const InputWidget: FC<Props> = ({ index }) => {
  const [, , onChangeInputValue] = useInput<string>("");
  const [milestoneContent, setMilestoneContent] = useRecoilState(
    milestoneContentState
  );

  const changeData = (e: any) => {
    onChangeInputValue(e);

    const temp = milestoneContent;
    temp.set(index, e.target.value);
    setMilestoneContent(temp);
  };

  return (
    <input
      type="text"
      value={milestoneContent.get(index) || ""}
      onChange={changeData}
      className="mt-2 dark:bg-dark-400 text-gray-600 dark:text-gray-400 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-400 dark:border-dark-300 rounded border"
      placeholder="M2E 앱 안드로이드 출시"
    />
  );
};

export { InputWidget };
