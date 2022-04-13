import { Flex, Box, ChakraProvider, Spacer } from "@chakra-ui/react";
import { DefaultSeo } from "next-seo";
import Head from "next/head";
import type { ReactNode } from "react";
import { Provider } from "react-supabase";
import { RecoilRoot } from "recoil";

import defaultSEOConfig from "../../../next-seo.config";
import customTheme from "lib/styles/customTheme";
import { supabase } from "lib/util/supabase_client";

import Footer from "./Footer";
import Header from "./Header";

type LayoutProps = {
  children: ReactNode;
  useHeader: boolean;
  useFooter: boolean;
};

export const Layout = ({ children, useHeader, useFooter }: LayoutProps) => {
  return (
    <ChakraProvider theme={customTheme}>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <DefaultSeo {...defaultSEOConfig} />
      <Provider value={supabase}>
        <RecoilRoot>
          <Flex minH="100vh" flexDir="column">
            {useHeader && <Header />}
            <Box transition="0.5s ease-out">{children}</Box>
            <Spacer />
            {useFooter && <Footer />}
          </Flex>
        </RecoilRoot>
      </Provider>
    </ChakraProvider>
  );
};
