import { Box, Spacer, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import type { ReactElement } from "react";

import ButtonLink from "lib/components/flow/ButtonLink";
import { Layout } from "lib/layout/index";

const Home = () => {
  return (
    <Flex direction="column" align="center" h="90vh">
      <Spacer />
      <Flex alignItems="center" direction="column" gap={20} textAlign="center">
        <Flex alignItems="center" direction="column" gap={4}>
          <Text fontSize="5xl">Welcome to</Text>
          <Image
            priority
            src="/labdao_logo.png"
            width={198}
            height={198}
            layout="fixed"
            alt="Launching Illustration"
          />
          <Text fontSize="5xl">
            <Text fontWeight="bold" as="span">
              Lab
            </Text>
            DAO
          </Text>
        </Flex>
        <Text fontSize="3xl" fontWeight="normal">
          An open, community-run network of wet & dry laboratories.
        </Text>
        <Box>
          <Text fontSize="md" fontWeight="normal">
            Let's complete a few quests to bring you up to speed with LabDAO
          </Text>
          <ButtonLink href="/quest" text="Begin Questing" />
        </Box>
      </Flex>
      <Spacer />
    </Flex>
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
