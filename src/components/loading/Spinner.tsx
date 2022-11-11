import React, { FC } from "react";

const Spinner: FC = () => {
  return (
    <div className="w-8 h-8 inline-block relative text-white animate-spin before:absolute before:bg-orange-600 before:top-1/2 before:left-1/2 before:scale-50 before:rounded"></div>
  );
};

export { Spinner };
