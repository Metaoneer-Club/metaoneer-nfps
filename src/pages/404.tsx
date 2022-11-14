import React from "react";
import { NextPage } from "next";
import Link from "next/link";

const Custom404: NextPage = () => {
  return (
    <div className="min-h-screen grid place-items-center bg-zinc-50">
      <div className="-mt-56 text-center">
        <div>
          <h2 className="font-bold text-8xl animate-pulse">4 0 4</h2>
          <h3 className="mt-8 text-2xl text-gray-600">
            This page could not founded.
          </h3>
        </div>
        <Link href="/">
          <div className="mt-12 p-4 rounded-xl border bg-primary text-white font-bold">
            <span>Return Home</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Custom404;
