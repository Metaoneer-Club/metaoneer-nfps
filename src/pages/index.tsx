import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { NextPage } from "next/types";

/* Component */
import { Carousel } from "components/slider/Carousel";
import { ProductCard } from "~/components/asset/card/ProductCard";
import { AutoImage } from "~/utils";
import { Button } from "~/components/asset/button";

interface Product {
  src: string;
  title: string;
  content: string;
  price: number;
  count: number;
  limit: number;
}

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-zinc-50">
      <Carousel />
      <div className="max-w-[1200px] mx-auto pt-28 ">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold mr-4">A Limited-sale Product</h2>
          <div className="relative w-8 h-8">
            <AutoImage src="/media/icons/arrow-right.svg" alt="more" />
          </div>
        </div>
        <div className="grid gap-10 grid-cols-2 mt-10">
          {productItems.map((v: Product, i) => (
            <ProductCard
              key={v.src}
              className="flex bg-dark text-center text-white h-56"
            >
              <div className="relative w-1/2 h-full">
                <AutoImage
                  src={v.src}
                  alt={v.title}
                  className="rounded-l-xl object-cover"
                />
              </div>
              <div className="w-1/2 p-6">
                <h2 className="font-bold">{v.title}</h2>
                <p className="mt-2 text-gray-400 text-xs break-words truncate-3-lines">
                  {v.content}
                </p>
                <div className="flex mt-4 items-center justify-between mx-7">
                  <p>
                    <strong className="text-lg text-danger-active">
                      {v.price}
                    </strong>{" "}
                    klay
                  </p>
                  <p>
                    <strong className="text-lg text-danger-active">
                      {v.count}
                    </strong>
                    <span className="mx-1">/</span>
                    <strong className="text-lg">{v.limit}</strong>
                    <span className="mx-1">ea</span>
                  </p>
                </div>
                <Button
                  className="mt-3 w-full border text-sm hover:bg-white hover:text-dark"
                  onClick={() => router.push("/shop")}
                >
                  See More
                </Button>
              </div>
            </ProductCard>
          ))}
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto pt-28 pb-40">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold mr-4">The Best-selling Product</h2>
          <div className="relative w-8 h-8">
            <AutoImage src="/media/icons/arrow-right.svg" alt="more" />
          </div>
        </div>
        <div className="grid gap-10 grid-cols-2 mt-10">
          {productItems.map((v: Product, i) => (
            <ProductCard
              key={v.src}
              className="flex bg-dark text-center text-white h-56"
            >
              <div className="relative w-1/2 h-full">
                <AutoImage
                  src={v.src}
                  alt={v.title}
                  className="rounded-l-xl object-cover"
                />
              </div>
              <div className="w-1/2 p-6">
                <h2 className="font-bold">{v.title}</h2>
                <p className="mt-2 text-gray-400 text-xs break-words truncate-3-lines">
                  {v.content}
                </p>
                <div className="mt-4">
                  <p>
                    <strong className="text-lg text-danger-active">
                      {v.price}
                    </strong>{" "}
                    klay
                  </p>
                </div>
                <Button
                  className="mt-3 w-full border text-sm hover:bg-white hover:text-dark"
                  onClick={() => router.push("/shop")}
                >
                  See More
                </Button>
              </div>
            </ProductCard>
          ))}
        </div>
      </div>
    </div>
  );
};

const productItems: Product[] = [
  {
    src: "/dummy/forest.jpg",
    title: "Awesome Forest",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu",
    price: 100,
    count: 12,
    limit: 50,
  },
  {
    src: "/dummy/instrument.png",
    title: "Awesome Instrument",
    content:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    price: 20,
    count: 8,
    limit: 25,
  },
  {
    src: "/dummy/raspberry.png",
    title: "Awesome Raspberry",
    content:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    price: 8,
    count: 78,
    limit: 100,
  },
  {
    src: "/dummy/musicPlayer.jpg",
    title: "Awesome Music-Player",
    content:
      "Ut imperdiet et urna et tincidunt. Integer tempus tempus nisi, quis hendrerit dui rhoncus ultricies. Fusce at lobortis turpis, vitae aliquam metus. Nunc cursus euismod aliquet. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed venenatis vel sapien vel pretium. Nulla quis varius est, ut feugiat augue.",
    price: 12,
    count: 1,
    limit: 2,
  },
];

export default Home;
