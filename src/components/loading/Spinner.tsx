import React, { FC } from "react";
import { AutoImage } from "utils";

const Spinner: FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-white z-50">
      <div className="grid place-items-center">
        <div className="animate-spin">
          <div className="relative w-8 h-8">
            <AutoImage src="/media/icons/spinner.svg" alt="loading" />
          </div>
        </div>
      </div>
    </div>
  );
};

export { Spinner };
