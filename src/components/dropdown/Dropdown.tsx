import React, { FC, MouseEventHandler } from "react";
import { useRouter } from "next/router";

/* Component */
import { AutoSVG } from "utils";

interface Props {
  close: MouseEventHandler<HTMLDivElement>;
  onLogOut: MouseEventHandler<HTMLButtonElement>;
}

const Dropdown: FC<Props> = ({ close, onLogOut }) => {
  const router = useRouter();
  return (
    <>
      <div onClick={close} className="fixed inset-0 h-full w-full z-10"></div>
      <div className="absolute right-0 mt-2 w-44 text-sm border bg-white rounded-md shadow-xl z-20">
        <button
          type="button"
          onClick={(e: any) => {
            router.push("/my");
            close(e);
          }}
          className="w-full px-4 py-3 text-gray-700  rounded-t hover:bg-primary-light hover:text-primary"
        >
          <span className="flex items-center justify-center">
            <AutoSVG src="/media/icons/star.svg" className="w-5 h-5 mr-2" />
            My Product
          </span>
        </button>
        <button
          type="button"
          onClick={onLogOut}
          className="w-full px-4 py-3 text-gray-700 rounded-b hover:bg-danger-light hover:text-danger"
        >
          <span className="flex items-center justify-center">
            <AutoSVG src="/media/icons/close.svg" className="w-5 h-5 mr-2" />
            Disconnect
          </span>
        </button>
      </div>
    </>
  );
};

export { Dropdown };
