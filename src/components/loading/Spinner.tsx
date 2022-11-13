import React, { FC } from "react";
import { AutoImage } from "utils";

const Spinner: FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen z-50">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin">
        <div className="relative w-8 h-8">
          <AutoImage src="/media/icons/spinner.svg" alt="loading" />
        </div>
      </div>
    </div>
  );
};

export { Spinner };
