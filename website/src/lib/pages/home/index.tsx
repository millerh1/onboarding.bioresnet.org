import { Box, Flex, Text, useBreakpointValue, Center } from "@chakra-ui/react";
import Image from "next/image";
import type { ReactElement } from "react";

import ButtonLink from "lib/components/flow/ButtonLink";
import { Layout } from "lib/layout/index";

const Home = () => {
  const size = useBreakpointValue([80, 120]);
  return (
    <Center
      height="100%"
      width="100%"
      minHeight={{
        base: "80vh",
        md: "80vh",
        lg: "85vh",
      }}
      px={6}
    >
      <Flex
        direction="column"
        alignContent="center"
        justifyContent="center"
        alignItems="center"
        gap={16}
      >
        <Flex
          direction="column"
          alignContent="center"
          justifyContent="center"
          alignItems="center"
          gap={8}
        >
          <Text fontSize={["xl", "3xl", "4xl", "5xl"]}>Welcome to</Text>
          <Image
            priority
            src="/labdao_logo.png"
            width={size}
            height={size}
            layout="fixed"
            alt="Launching Illustration"
          />
          <Text fontSize={["xl", "3xl", "4xl", "5xl"]}>
            <Text fontWeight="bold" as="span">
              Lab
            </Text>
            DAO
          </Text>
        </Flex>
        <Text fontSize={["lg", "xl", "2xl", "3xl"]} fontWeight="normal">
          An open, community-run network of wet & dry laboratories.
        </Text>
        <Box
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          gap={8}
        >
          <Text fontSize="md" fontWeight="normal">
            Let's complete a few quests to bring you up to speed with LabDAO
          </Text>
          <ButtonLink href="/quest" text="Begin Questing" />
        </Box>
      </Flex>
    </Center>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout useHeader={false} useFooter>
      {page}
    </Layout>
  );
};

export default Home;
