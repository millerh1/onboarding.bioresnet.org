/* eslint-disable react/jsx-props-no-spreading */
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { ReactNode } from "react";

import { Layout } from "lib/layout/index";

import "lib/styles/globals.css";

// eslint-disable-next-line @typescript-eslint/ban-types
type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type Props = AppProps & {
  Component: Page;
};

const MyApp = ({ Component, pageProps }: Props) => {
  // Use the layout defined at the page level, if available.
  const getLayout =
    Component.getLayout ??
    ((page: ReactNode) => {
      return (
        <Layout useHeader={false} useFooter={false}>
          {page}
        </Layout>
      );
    });

  return getLayout(<Component {...pageProps} />);
};

export default MyApp;
