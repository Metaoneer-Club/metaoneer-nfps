import React, { FC } from "react";
import Image from "next/image";
import { External } from "~/components/asset/link";
import { v1 } from "uuid";

interface ALink {
  name: string;
  url: string;
}

const Footer: FC = () => {
  return (
    <div className="bg-zinc-800 text-neutral-300">
      <footer className="max-w-[1200px] mx-auto py-10">
        <nav className="flex items-start text-sm">
          <ul className="w-1/5">
            <li className="mb-4 m-2 text-base text-white">
              <strong>Section</strong>
            </li>
            {navItems.map((v) => (
              <li key={v1()} className="m-2">
                <External url={v.url}>{v.name}</External>
              </li>
            ))}
          </ul>
          <ul className="w-1/5">
            <li className="mb-4 m-2 text-base text-white">
              <strong>Contact</strong>
            </li>
            {contactItems.map((v) => (
              <li key={v1()} className="m-2">
                <External url={v.url}>{v.name}</External>
              </li>
            ))}
          </ul>
          <ul className="w-1/5">
            <li className="mb-4 m-2 text-base text-white">
              <strong>Others</strong>
            </li>
            {otherItems.map((v) => (
              <li key={v1()} className="m-2">
                <External url={v.url}>{v.name}</External>
              </li>
            ))}
          </ul>
          <ul className="w-1/5">
            <li className="mb-4 m-2 text-base text-white">
              <strong>Docs</strong>
            </li>
            <li key={v1()} className="m-2">
              <External url="https://docs.metaoneer.club">Document</External>
            </li>
          </ul>
        </nav>
        <hr className="my-8" />
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center">
              <div className="relative w-6 h-6 mr-2">
                <Image src="/favicon.ico" alt="logo" fill sizes="100vw" />
              </div>
              <h2 className="font-bold">METAONEER</h2>
            </div>
            <div className="text-sm mt-3">
              <span className="mr-2">2021 - 2022 &copy;</span>
              <span>METAONEER. ALL RIGHTS RESERVED.</span>
            </div>
          </div>
          <div>
            <ul className="flex">
              {contactItems.map((v) => (
                <li key={v1()} className="m-2">
                  <External url={v.url}>
                    <div className="relative w-9 h-9 transition hover:scale-110">
                      <Image
                        src={`/media/logos/${v.name.toLowerCase()}.svg`}
                        alt={v.name}
                        className="rounded-full"
                        fill
                        sizes="100vw"
                      />
                    </div>
                  </External>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

const navItems: ALink[] = [
  {
    name: "HOME",
    url: "/",
  },
  {
    name: "SHOP",
    url: "/shop",
  },
  {
    name: "RANKING",
    url: "/ranking",
  },
];

const contactItems: ALink[] = [
  {
    name: "Email",
    url: "mailto:contact@metaoneer.club",
  },
  {
    name: "Telegram",
    url: "https://t.me/Ramp_me",
  },
  {
    name: "Discord",
    url: "https://discord.gg/zeGnHn6byA",
  },
];

const otherItems: ALink[] = [
  {
    name: "Official Website",
    url: "https://metaoneer.club",
  },
  {
    name: "BIMS",
    url: "https://bims.metaoneer.club",
  },
  {
    name: "Payment Module",
    url: "https://www.npmjs.com/package/metaoneer-payment",
  },
];

export { Footer };
