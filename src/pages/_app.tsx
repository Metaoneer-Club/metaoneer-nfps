import React, { Suspense } from "react";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "next-themes";

/* Component */
import { Spinner } from "components/loading/Spinner";
import Layout from "layout/Layout";

/* Style */
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import "~/styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute="class">
      <Suspense fallback={<Spinner />}>
        <RecoilRoot>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RecoilRoot>
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
