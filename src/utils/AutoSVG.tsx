import React, { FC } from "react";
import SVG from "react-inlinesvg";
import clsx from "clsx";

interface Props {
  className?: string;
  src: string;
}

const AutoSVG: FC<Props> = ({ className, src }) => {
  return <SVG src={src} className={className} />;
};

export { AutoSVG };
