import React, { FC, ReactNode } from "react";
import clsx from "clsx";

interface Props {
  className?: string;
  url: string;
  children: ReactNode;
}

const External: FC<Props> = ({ className, url, children }) => {
  return (
    <a
      target="_blank"
      href={url}
      className={clsx("hover:text-primary-active", className)}
      rel="noreferrer"
    >
      {children}
    </a>
  );
};

export { External };
