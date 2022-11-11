import React, { useState } from "react";
import Image from "next/image";
import { NextPage } from "next/types";

/* Component */
import { Carousel } from "components/slider/Carousel";

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-zinc-50">
      <Carousel />
      <div className="max-w-[1200px] mx-auto pt-28 ">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold mr-4">A Limited-sale Product</h2>
          <div className="relative w-8 h-8">
            <Image
              src="/media/icons/arrow-right.svg"
              alt="more"
              fill
              sizes="100vw"
            />
          </div>
        </div>
        <div className="grid gap-10 grid-cols-2 mt-10">
          <div className="border bg-white rounded-2xl p-8 text-center h-48">
            <p className="mt-10">상품 1</p>
          </div>
          <div className="border bg-white rounded-2xl p-8 text-center h-48">
            <p className="mt-10">상품 2</p>
          </div>
          <div className="border bg-white rounded-2xl p-8 text-center h-48">
            <p className="mt-10">상품 3</p>
          </div>
          <div className="border bg-white rounded-2xl p-8 text-center h-48">
            <p className="mt-10">상품 4</p>
          </div>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto pt-28 pb-40">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold mr-4">The Best-selling Product</h2>
          <div className="relative w-8 h-8">
            <Image
              src="/media/icons/arrow-right.svg"
              alt="more"
              fill
              sizes="100vw"
            />
          </div>
        </div>
        <div className="grid gap-10 grid-cols-2 mt-10">
          <div className="border bg-white rounded-2xl p-8 text-center h-48">
            <p className="mt-10">상품 1</p>
          </div>
          <div className="border bg-white rounded-2xl p-8 text-center h-48">
            <p className="mt-10">상품 2</p>
          </div>
          <div className="border bg-white rounded-2xl p-8 text-center h-48">
            <p className="mt-10">상품 3</p>
          </div>
          <div className="border bg-white rounded-2xl p-8 text-center h-48">
            <p className="mt-10">상품 4</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
