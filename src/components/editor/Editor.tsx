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
    <div className="mt-2 border border-gray-400 rounded">
      <MDEditor value={content} onChange={onChangeContent} />
    </div>
  );
};

export { Editor };
