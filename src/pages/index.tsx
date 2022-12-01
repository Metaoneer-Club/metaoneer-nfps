import React from "react";
import { useRouter } from "next/router";
import { NextPage } from "next/types";

/* Component */
import { Carousel } from "components/slider/Carousel";
import { MainCard } from "components/card/MainCard";
import { Product } from "components/card/ProductCard";
import { AutoImage } from "utils";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-dark-600">
      <Carousel />
      <div className="max-w-[1200px] mx-auto pt-28 ">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold mr-4">인기있는 프로젝트</h2>
          <div className="relative w-8 h-8">
            <AutoImage src="/media/icons/arrow-right.svg" alt="more" />
          </div>
        </div>
        <div className="grid gap-10 grid-cols-2 mt-10">
          {productItems.map((v: Product, i) => (
            <MainCard
              key={v.title}
              keyID={i}
              title={v.title}
              content={v.content}
              imgURI={v.imgURI}
              category={v.category}
              creator={v.creator}
              progress={v.progress}
              amount={v.amount}
              expired={v.expired}
            />
          ))}
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto pt-28 pb-40">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold mr-4">마감 임박 프로젝트</h2>
          <div className="relative w-8 h-8">
            <AutoImage src="/media/icons/arrow-right.svg" alt="more" />
          </div>
        </div>
        <div className="grid gap-10 grid-cols-2 mt-10">
          {productItems.map((v: Product, i) => (
            <MainCard
              key={v.title}
              keyID={i}
              title={v.title}
              content={v.content}
              imgURI={v.imgURI}
              category={v.category}
              creator={v.creator}
              progress={v.progress}
              amount={v.amount}
              expired={v.expired}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const productItems: Product[] = [
  {
    keyID: 1,
    imgURI: "/dummy/forest.jpg",
    title: "Awesome Forest",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu",
    category: "Land",
    creator: "0x12A60872B053C009452cdb95178144c8fFbDeA4D",
    progress: 1874,
    amount: 23421,
    expired: new Date(),
  },
  {
    keyID: 2,
    imgURI: "/dummy/instrument.png",
    title: "Awesome Instrument",
    content:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    category: "Music",
    creator: "0x12A60872B053C009452cdb95178144c8fFbDeA4D",
    progress: 213,
    amount: 4342,
    expired: new Date(),
  },
  {
    keyID: 3,
    imgURI: "/dummy/raspberry.png",
    title: "Awesome Raspberry",
    content:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    category: "Fruit",
    creator: "0x12A60872B053C009452cdb95178144c8fFbDeA4D",
    progress: 98,
    amount: 2342,
    expired: new Date(),
  },
  {
    keyID: 4,
    imgURI: "/dummy/musicPlayer.jpg",
    title: "Awesome Music-Player",
    content:
      "Ut imperdiet et urna et tincidunt. Integer tempus tempus nisi, quis hendrerit dui rhoncus ultricies. Fusce at lobortis turpis, vitae aliquam metus. Nunc cursus euismod aliquet. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed venenatis vel sapien vel pretium. Nulla quis varius est, ut feugiat augue.",
    category: "Music",
    creator: "0x12A60872B053C009452cdb95178144c8fFbDeA4D",
    progress: 87,
    amount: 1567,
    expired: new Date(),
  },
];

export default Home;
