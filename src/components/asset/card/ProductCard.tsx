import React, { FC, ReactNode } from "react";
import clsx from "clsx";

interface Props {
  className?: string;
  children: ReactNode;
}

const ProductCard: FC<Props> = ({ className, children }) => {
  return (
    <div className={clsx("border bg-white rounded-2xl", className)}>
      {children}
    </div>
  );
};

export { ProductCard };
