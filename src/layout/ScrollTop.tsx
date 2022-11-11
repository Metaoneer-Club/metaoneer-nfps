import React, { FC } from "react";
import Image from "next/image";
import clsx from "clsx";

interface Props {
  active: boolean;
}

const ScrollTop: FC<Props> = ({ active }) => {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo(0, 0)}
      className={clsx(
        active ? "ease-out-in" : "opacity-0 ease-in-out",
        "fixed bottom-6 right-6 w-10 h-10 rounded-full transition duration-300 bg-indigo-400 text-white animate-bounce hover:pause  hover:bg-indigo-500"
      )}
    >
      <Image
        src="/media/icons/arrow-top.svg"
        alt="top"
        fill
        sizes="100vw"
        className="p-1"
      />
    </button>
  );
};

export { ScrollTop };
