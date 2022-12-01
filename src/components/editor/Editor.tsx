import React, { Dispatch, FC, SetStateAction } from "react";
import dynamic from "next/dynamic";

interface Props {
  content: string | undefined;
  onChangeContent: Dispatch<SetStateAction<string | undefined>>;
}

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

const Editor: FC<Props> = ({ content, onChangeContent }) => {
  return (
    <div className="mt-2 border dark:border-dark-300 border-gray-400 rounded">
      <MDEditor
        value={content}
        onChange={onChangeContent}
        className="dark:bg-dark-400 dark:text-gray-300"
      />
    </div>
  );
};

export { Editor };
