import React, { FC, MouseEventHandler } from "react";

/* Component */
import { Button } from "components/asset/button";
import { AutoImage, AutoSVG, shortAddress } from "utils";

interface Props {
  registerHandler: MouseEventHandler<HTMLButtonElement>;
}

const Create03: FC<Props> = ({ registerHandler }) => {
  return (
    <div>
      <div className="mt-8 px-8">
        <div>
          <div className="font-semibold">Upload Image</div>
          <div className="relative w-full h-80 mt-2">
            <AutoImage
              src="temp.png"
              className="object-cover rounded border border-gray-200"
              alt="temp"
            />
          </div>
        </div>

        <div className="mt-6">
          <div className="font-semibold">Title</div>
          <div>
            <input
              className="mt-1 w-full rounded border border-gray-400 p-2"
              type="text"
              defaultValue=""
              placeholder="Example Title"
            />
          </div>
        </div>
        <div className="mt-6">
          <div className="font-semibold">Description</div>
          <div>
            <textarea
              className="mt-1 w-full rounded border border-gray-400 p-2"
              defaultValue=""
              placeholder="Example Description"
            />
          </div>
        </div>

        <div className="mt-6">
          <div className="font-semibold">Address</div>
          <div className="mt-2">
            <div className="flex items-center justify-between bg-neutral-100 p-3 rounded border border-gray-400">
              <div className="flex items-center gap-x-2">
                <AutoSVG
                  src="/media/icons/verified.svg"
                  className="w-6 h-6 text-indigo-700"
                />
                <span className="font-semibold">
                  {shortAddress("0x12A60872B053C009452cdb95178144c8fFbDeA4D")}
                </span>
              </div>
              <AutoSVG src="/media/icons/dropdown.svg" className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        <Button
          className="w-full rounded bg-indigo-700 hover:bg-indigo-900 py-4 text-center font-bold text-white"
          onClick={registerHandler}>
          Create
        </Button>
      </div>
    </div>
  );
};

export { Create03 };
