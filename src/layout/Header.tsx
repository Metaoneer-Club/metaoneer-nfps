import React, { FC, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import clsx from "clsx";

/* Component */
import { Button } from "components/asset/button";
import { Dropdown } from "components/dropdown/Dropdown";
import { changeNetwork, setMetamaskAccount } from "components/blockchain";
import { Hamburger } from "components/dropdown/Hamburger";
import { AutoImage, AutoSVG, checkIsActive, shortAddress } from "utils";

/* State */
import { useRecoilState, useSetRecoilState } from "recoil";
import { walletState, isToastState, toastContentState } from "stores";

interface Props {
  active: boolean;
}

const Header: FC<Props> = ({ active }) => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [wallet, setWallet] = useRecoilState(walletState);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDrop, setIsDrop] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const setIsToast = useSetRecoilState(isToastState);
  const setToastContent = useSetRecoilState(toastContentState);

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    buttonRef.current?.classList.add("animate__fadeIn");

    setTimeout(() => {
      buttonRef.current?.classList.remove("animate__fadeIn");
    }, 300);
  }, [theme]);

  const moveCreateHandler = () => {
    if (wallet.address === "") {
      setToastContent({
        content: "Please connect the wallet first.",
        type: "danger",
      });
      setIsToast(true);
      return;
    }

    router.push("/create");
  };

  const walletConnectHandler = async () => {
    setIsLoading(true);
    const { ethereum } = window;

    if (ethereum) {
      await ethereum
        .request({ method: "eth_requestAccounts" })
        .catch(() => setIsLoading(false));
      const res = await setMetamaskAccount();
      if (res.network !== 97)
        await changeNetwork(97).catch(() => setIsLoading(false));
      setWallet(res);
      setIsLoading(false);

      ethereum.on("accountsChanged", async () => {
        const changed = await setMetamaskAccount();
        if (res.network !== 97)
          await changeNetwork(97).catch(() => setIsLoading(false));
        setWallet(changed);
        setIsLoading(false);
      });
    } else {
      setToastContent({
        content: "Metamask Wallet is required.",
        type: "danger",
      });
      setIsToast(true);
      window.open("https://metamask.io/download.html");
    }

    setIsLoading(false);
  };

  const walletDisconnectHandler = () => {
    setIsDrop(false);
    setWallet({
      address: "",
      network: 0,
      balance: 0,
    });

    router.push("/");
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <div className="bg-white dark:bg-dark-500 border-b dark:border-dark-600">
        <div className="flex max-w-[1200px] px-6 py-3 mx-auto items-center justify-end">
          <p className="text-white font-bold text-sm mr-8">
            다크모드는 현재 미완성입니다.
          </p>
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-xs font-medium dark:text-slate-50 animate__animated animate__faster"
          >
            <span className="flex items-center">
              <AutoSVG
                className="w-4 h-4 mr-2"
                src={`/media/icons/theme-${
                  theme === "dark" ? "light" : "dark"
                }.svg`}
              />
              {theme === "light" ? "다크 모드 켜기" : "라이트 모드 켜기"}
            </span>
          </button>
        </div>
      </div>
      <div
        className={clsx(
          active ? "shadow" : "shadow-lg",
          "sticky bg-white dark:bg-dark-500 w-full top-0 left-0 z-20 transition-shadow duration-300"
        )}
      >
        <header className="flex max-w-[1200px] px-6 py-2 mx-auto transition-all items-center justify-between">
          <div
            className="flex items-center mr-12 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <div className="relative w-[180px] h-16">
              <AutoImage
                src="/media/logos/logo.png"
                alt="logo"
                priority={true}
              />
            </div>
          </div>
          <div className="hidden md:flex w-full items-center justify-between">
            <nav>
              <ul className="flex items-center">
                {navItems.map((v, i) => (
                  <li
                    key={v.url}
                    className={clsx(
                      "mx-4 text-lg",
                      (router.asPath === v.url ||
                        (i !== 0 && checkIsActive(router.asPath, v.url))) &&
                        "underline underline-offset-4 decoration-2"
                    )}
                  >
                    <Link href={v.url}>{v.name}</Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex items-center">
              <div className="flex mr-4 items-center">
                <Button
                  className={clsx(
                    "group flex items-center text-sm border dark:border-dark-300 shadow hover:bg-dark dark:hover:bg-dark-600 hover:text-white",
                    router.asPath === "/create" &&
                      "bg-gray-800 dark:bg-dark-600 text-white"
                  )}
                  onClick={moveCreateHandler}
                >
                  <div className="relative w-6 h-6 mr-1 transition-transform group-hover:rotate-[360deg]">
                    <AutoSVG
                      src="/media/icons/block.svg"
                      className="group-hover:white"
                    />
                  </div>
                  <span className="pr-1">프로젝트 생성</span>
                </Button>
              </div>

              <div className="relative">
                <Button
                  className={clsx(
                    "flex items-center w-40 text-sm border dark:border-dark-300 shadow rounded-2xl py-3.5 group disabled:bg-gray-400 disabled:text-white hover:bg-dark dark:hover:bg-dark-600 hover:text-white",
                    router.asPath === "/my" &&
                      "bg-gray-800 dark:bg-dark-600 text-white"
                  )}
                  onClick={() => {
                    Boolean(!wallet.address)
                      ? walletConnectHandler()
                      : setIsDrop(!isDrop);
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center mx-auto">
                      <span className="mr-2">연결중...</span>
                      <div className="animate-spin ">
                        <AutoSVG
                          src="/media/icons/spinner.svg"
                          className="w-5 h-5"
                        />
                      </div>
                    </div>
                  ) : wallet.address ? (
                    <div className="flex items-center mx-auto">
                      <span className="pl-1">
                        {shortAddress(wallet.address)}
                      </span>
                      <div className="relative h-5 w-5 ml-1">
                        <AutoSVG
                          className="group-hover:text-white"
                          src="/media/icons/dropdown.svg"
                        />
                      </div>
                    </div>
                  ) : (
                    <span className="flex itens-center mx-auto">
                      <AutoSVG
                        className="h-5 w-5 text-gray-800 mr-2"
                        src="/media/social-logos/metamask.svg"
                      />
                      지갑 연결하기
                    </span>
                  )}
                </Button>
                {wallet.address && isDrop ? (
                  <Dropdown
                    close={() => setIsDrop(false)}
                    onLogOut={walletDisconnectHandler}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="relative w-12 h-12 flex items-center md:hidden">
            <div
              onClick={() => setIsOpen(!isOpen)}
              className={clsx(
                "absolute top-0 p-2 cursor-pointer transition-all duration-150",
                isOpen ? "rotate-90 opacity-0" : ""
              )}
            >
              <AutoSVG src="/media/icons/hamburger.svg" className="w-8 h-8" />
            </div>
            <div
              onClick={() => setIsOpen(!isOpen)}
              className={clsx(
                "absolute top-0 p-2 opacity-0 cursor-pointer transition-all duration-150",
                isOpen ? "-rotate-90 opacity-100" : ""
              )}
            >
              <AutoSVG src="/media/icons/close.svg" className="w-8 h-8" />
            </div>
          </div>
          {isOpen ? (
            <Hamburger
              isLoading={isLoading}
              address={wallet.address}
              onMove={moveCreateHandler}
              connectWallet={walletConnectHandler}
              close={() => setIsOpen(!isOpen)}
              onLogOut={walletDisconnectHandler}
            />
          ) : (
            ""
          )}
        </header>
      </div>
    </>
  );
};

const navItems: {
  name: string;
  url: string;
}[] = [
  {
    name: "홈",
    url: "/",
  },
  {
    name: "펀딩",
    url: "/funding",
  },
  {
    name: "투표",
    url: "/vote",
  },
];

export { Header };
