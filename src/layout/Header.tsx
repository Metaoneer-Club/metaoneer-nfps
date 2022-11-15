import React, { FC, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";
import { useTheme } from "next-themes";

/* Component */
import { Button } from "components/asset/button";
import { changeNetwork, setMetamaskAccount } from "components/blockchain";
import { AutoImage, AutoSVG, shortAddress } from "utils";

/* State */
import { useRecoilState, useSetRecoilState } from "recoil";
import { walletState } from "stores";
import { isToastState, toastContentState } from "stores/toast";
import Dropdown from "~/components/dropdown/Dropdown";

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
      await ethereum.enable().catch(() => setIsLoading(false));
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
        <header
          className={clsx(
            active ? "py-2" : "py-5",
            "flex max-w-[1200px] px-6 mx-auto transition-all items-center"
          )}
        >
          <div
            className="flex items-center mr-24 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <div className="relative w-[180px] h-16">
              <AutoImage src="/media/logos/logo.png" alt="logo" />
            </div>
          </div>
          <div className="w-full flex items-center justify-between">
            <nav>
              <ul className="flex items-center">
                {navItems.map((v) => (
                  <li
                    key={v.url}
                    className={clsx(
                      "mx-4",
                      v.url === router.asPath &&
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
                  className="group flex items-center text-sm border shadow hover:bg-dark hover:text-white"
                  onClick={moveCreateHandler}
                >
                  <div className="relative w-6 h-6 mr-1 transition-transform group-hover:rotate-[360deg]">
                    <AutoSVG
                      src="/media/icons/block.svg"
                      className=" group-hover:white"
                    />
                  </div>
                  <span className="pr-1">To Create</span>
                </Button>
              </div>

              <div className="relative">
                <Button
                  className="flex items-center w-40 text-sm border shadow rounded-2xl py-3.5 group hover:bg-dark hover:text-white"
                  onClick={() => {
                    if (Boolean(!wallet.address)) walletConnectHandler();
                    setIsDrop(!isDrop);
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center mx-auto">
                      <span className="mr-2">Connecting...</span>
                      <div className="animate-spin ">
                        <AutoSVG
                          src="/media/icons/spinner.svg"
                          className="w-5 h-5"
                        />
                      </div>
                    </div>
                  ) : wallet.address ? (
                    <div className="flex items-center mx-auto">
                      {shortAddress(wallet.address)}
                      <AutoSVG
                        className="h-5 w-5 text-gray-800 transition-colors group-hover:text-white ml-1"
                        src="/media/icons/dropdown.svg"
                      />
                    </div>
                  ) : (
                    <span className="flex itens-center mx-auto">
                      <AutoSVG
                        className="h-5 w-5 text-gray-800 mr-2"
                        src="/media/social-logos/metamask.svg"
                      />
                      Connect
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
    name: "HOME",
    url: "/",
  },
  {
    name: "SHOP",
    url: "/shop",
  },
  {
    name: "CREATOR",
    url: "/creator",
  },
  {
    name: "LOG",
    url: "/log",
  },
];

export { Header };
