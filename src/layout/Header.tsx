import React, { FC, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import clsx from "clsx";

/* Component */
import { Button } from "components/asset/button";
import { Dropdown } from "components/dropdown/Dropdown";
import { changeNetwork, setMetamaskAccount } from "components/blockchain";
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
  const [isLoading, setIsLoading] = useState(false);
  const [isDrop, setIsDrop] = useState(false);
  const setIsToast = useSetRecoilState(isToastState);
  const setToastContent = useSetRecoilState(toastContentState);

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

  return (
    <>
      {/* <div className="bg-white dark:bg-gray-900 border-b dark:border-gray-800">
        <div className="flex max-w-[1200px] px-6 py-3 mx-auto items-center justify-end">
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-sm dark:text-slate-50 animate__animated animate__faster">
            <span className="flex items-center">
              <AutoSVG
                className="w-4 h-4 mr-2"
                src={`/media/icons/theme-${theme}.svg`}
              />
              {theme === "light" ? "Light" : "Dark"}
            </span>
          </button>
        </div>
      </div> */}
      <div
        className={clsx(
          active ? "shadow" : "shadow-lg",
          "sticky bg-white dark:bg-gray-900 w-full top-0 left-0 z-10"
        )}
      >
        <header className="flex max-w-[1200px] px-6 py-2 mx-auto transition-all items-center">
          <div
            className="flex items-center mr-12 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <div className="relative w-[180px] h-16">
              <AutoImage src="/media/logos/logo.png" alt="logo" />
            </div>
          </div>
          <div className="w-full flex items-center justify-between">
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
                    "group flex items-center text-sm border shadow hover:bg-dark hover:text-white",
                    router.asPath === "/create" && "bg-gray-800 text-white"
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
                    "flex items-center w-40 text-sm border shadow rounded-2xl py-3.5 group disabled:bg-gray-400 disabled:text-white hover:bg-dark hover:text-white",
                    router.asPath === "/my" && "bg-gray-800 text-white"
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
  // {
  //   name: "CREATOR",
  //   url: "/creator",
  // },
  // {
  //   name: "LOG",
  //   url: "/log",
  // },
];

export { Header };
