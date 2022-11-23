import React, { FC } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";

/* Component */
import { AutoImage } from "utils";
import { Product } from "components/card/ProductCard";
import { Button } from "../asset/button";

const MainCard: FC<Product> = ({
  keyID,
  title,
  content,
  imgURI,
  category,
  creator,
  progress,
  amount,
  expired,
}) => {
  const router = useRouter();
  return (
    <div className="group flex bg-dark text-center text-white h-56 border rounded-2xl">
      <div className="relative w-1/2 h-full">
        <AutoImage
          src={imgURI}
          alt={title}
          className="rounded-l-xl object-cover"
        />
      </div>
      <div className="w-1/2 p-6">
        <h2 className="font-bold text-base">{title}</h2>
        <p className="mt-2 text-gray-400 text-xs break-words truncate-3-lines">
          {content}
        </p>
        <div className="mt-3 mx-1 flex items-center justify-between text-xs">
          <div>
            <strong className="text-sm mr-2 text-danger-active">
              {progress} %
            </strong>
            <span>{amount} BNB</span>
          </div>
          <strong className="text-gray-300">{expired.getDate()}일 남음</strong>
        </div>
        <div className="mt-1 flex items-center">
          <div className="w-full h-2 bg-danger-light rounded-sm">
            <div
              style={{
                width: progress >= 100 ? "100%" : `${progress}%`,
              }}
              className="h-full text-center text-xs text-white bg-danger rounded-sm"
            />
          </div>
        </div>
        <Button
          className="mt-3 w-full border text-sm group-hover:border-danger group-hover:text-danger"
          onClick={() =>
            Number.isInteger(keyID) && router.push(`/funding/${keyID}`)
          }
        >
          See More
        </Button>
      </div>
    </div>
  );
};

export { MainCard };