import React, { FC, useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { useTheme } from "next-themes";
import { setMetamaskAccount } from "components/blockchain";
import { useRecoilState } from "recoil";
import { metamaskState } from "stores";
import { shortAddress } from "~/utils";
import { Button } from "~/components/asset/button";

interface Props {
  active: boolean;
}

const Header: FC<Props> = ({ active }) => {
  const { theme, setTheme } = useTheme();
  const [wallet, setWallet] = useRecoilState(metamaskState);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(theme);
    buttonRef.current?.classList.add("animate__fadeIn");

    setTimeout(() => {
      buttonRef.current?.classList.remove("animate__fadeIn");
    }, 300);
  }, [theme]);

  const walletConnectHandler = async () => {
    setIsLoading(true);
    const { ethereum } = window;

    if (ethereum) {
      await ethereum.enable().catch(() => setIsLoading(false));
      const res = await setMetamaskAccount();
      setWallet(res);
      setIsLoading(false);

      ethereum.on("accountsChanged", async () => {
        const changed = await setMetamaskAccount();
        setWallet(changed);
        setIsLoading(false);
      });
    }

    setIsLoading(false);
  };

  return (
    <>
      {/* <div className="bg-slate-50 dark:bg-gray-900 border-b dark:border-gray-800">
        <div className="flex max-w-[1200px] px-6 py-3 mx-auto items-center justify-end">
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-sm dark:text-slate-50 animate__animated animate__faster"
          >
            {theme === "light" ? "🌞 Light" : "🌙 Dark"}
          </button>
        </div>
      </div> */}
      <div
        className={clsx(
          active && "shadow-lg",
          "sticky bg-slate-50 dark:bg-gray-900 w-full top-0 left-0 z-10"
        )}
      >
        <header
          className={clsx(
            active ? "py-2" : "py-5",
            "flex max-w-[1200px] px-6 mx-auto transition-all items-center"
          )}
        >
          <div className="flex items-center mr-24">
            <div className="relative w-[180px] h-16">
              <Image
                src="/media/logos/logo.png"
                alt="logo"
                fill
                sizes="100vw"
                priority
              />
            </div>
          </div>
          <div className="w-full flex items-center justify-between">
            <nav>
              <ul className="flex items-center">
                <li className="mx-4">HOME</li>
                <li className="mx-4">SHOP</li>
                <li className="mx-4">RANKING</li>
              </ul>
            </nav>
            <div className="flex">
              <Button
                className="text-sm border shadow rounded-2xl px-6"
                onClick={walletConnectHandler}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span>Wait...</span>
                ) : (
                  <span>{shortAddress(wallet.address) || "Connect"}</span>
                )}
              </Button>
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export { Header };
