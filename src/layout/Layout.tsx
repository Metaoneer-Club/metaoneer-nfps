import React, { FC, ReactNode, useEffect, useState } from "react";

/* Component */
import SEO from "layout/SEO";
import { Header } from "layout/Header";
import { Footer } from "layout/Footer";
import { ScrollTop } from "layout/ScrollTop";
import { setMetamaskAccount } from "components/blockchain";
import { ToastWidget } from "components/toast/ToastWidget";

/* State */
import { useRecoilState } from "recoil";
import { isToastState } from "stores/toast";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollActive, setScrollActive] = useState(false);
  const [isToast, setIsToast] = useRecoilState(isToastState);

  const handleScroll = () => {
    setScrollY(window.scrollY);
    if (scrollY > 99) {
      setScrollActive(true);
    } else {
      setScrollActive(false);
    }
  };

  useEffect(() => {
    const scrollListener = () => {
      window.addEventListener("scroll", handleScroll);
    };
    scrollListener();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  useEffect(() => {
    const { ethereum } = window;

    if (ethereum) {
      ethereum.on("accountsChanged", async () => {
        setMetamaskAccount();
      });
    }
  }, []);

  useEffect(() => {
    let timer;
    if (isToast) {
      timer = setTimeout(() => {
        setIsToast(false);
      }, 4000);
    } else {
      clearTimeout(timer);
    }
  }, [isToast, setIsToast]);

  return (
    <div className="dark:bg-dark">
      <SEO />
      <Header active={scrollActive} />
      {children}
      <ScrollTop active={scrollActive} />
      {isToast && <ToastWidget />}
      <Footer />
    </div>
  );
};

export default Layout;
