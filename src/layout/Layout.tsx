import React, { FC, ReactNode, useEffect, useState } from "react";

/* Component */
import SEO from "layout/SEO";
import { Header } from "layout/Header";
import { Footer } from "layout/Footer";
import { ScrollTop } from "./ScrollTop";
import { setMetamaskAccount } from "components/blockchain";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollActive, setScrollActive] = useState(false);

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

  return (
    <div className="dark:bg-dark">
      <SEO />
      <Header active={scrollActive} />
      {children}
      <ScrollTop active={scrollActive} />
      <Footer />
    </div>
  );
};

export default Layout;
