import React, { FC } from "react";
import { useRouter } from "next/router";

/* Component */
import { Card } from "components/asset/card";
import { AutoImage, shortAddress } from "utils";

export interface Product {
  keyID?: number;
  title: string;
  content: string;
  imgURI: string;
  category: string;
  creator: string;
  progress: number;
  amount: number;
  expired: Date;
}

const ProductCard: FC<Product> = ({
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
    <div>
      <div
        className="group cursor-pointer"
        onClick={() =>
          Number.isInteger(keyID) && router.push(`/funding/${keyID}`)
        }
      >
        <Card className="border rounded-lg min-h-96 bg-white group-hover:shadow-lg">
          <div className="relative h-56 rounded-t overflow-hidden">
            <AutoImage
              src={imgURI}
              alt={title}
              className="object-cover transition group-hover:scale-110"
            />
          </div>
          <div className="mt-2 px-4 pb-4">
            <label className="text-gray-600 text-xs">
              <span>{category}</span>
              <span className="mx-1">|</span>
              <span>{shortAddress(creator)}</span>
            </label>
            <h2 className="mt-1 truncate">{title}</h2>
            <p className="mt-2 text-gray-500 text-xs break-words truncate-3-lines">
              {content}
            </p>
            <div className="mt-3 mx-1 flex items-center justify-between text-sm">
              <div>
                <strong className="text-lg mr-2 text-indigo-600">
                  {progress}%
                </strong>
                <span>{amount} BNB</span>
              </div>
              <strong className="text-gray-500">
                {expired.getDate()}일 남음
              </strong>
            </div>
            <div className="mt-1 flex items-center">
              <div className="w-full h-2 bg-blue-200 rounded-sm">
                <div
                  style={{
                    width: progress >= 100 ? "100%" : `${progress}%`,
                  }}
                  className="h-full text-center text-xs text-white bg-blue-600 rounded-sm"
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export { ProductCard };
