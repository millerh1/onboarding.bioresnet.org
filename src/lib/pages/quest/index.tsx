import {
  Box,
  Flex,
  Center,
  Spacer,
  Progress,
  Text,
  Image,
  Stack,
} from "@chakra-ui/react";
import type { ReactElement } from "react";
import { useRecoilValue } from "recoil";

import { QuestBox, QuestTable } from "lib/components/questlog";
import { CONTRIBUTOR_BADGE } from "lib/data";
import { Layout } from "lib/layout/index";
import { progressState } from "lib/state";

// Page itself.
const Quest = () => {
  const progress = useRecoilValue(progressState);
  const progressRounded = 5 * Math.round(progress / 5);

  return (
    <Center>
      <Stack width="95%" align="center">
        <Box width="inherit" px={2}>
          <Flex alignItems="center">
            <Text color="gray.400" fontWeight="medium" fontSize={16}>
              Progress - {progressRounded}%
            </Text>
            <Spacer />
            <Image
              alt="badge for completing onboarding"
              src={CONTRIBUTOR_BADGE.image}
              boxSize="40px"
            />
          </Flex>
          <Progress value={progressRounded} colorScheme="brand" />
        </Box>
        <Box width="inherit" minHeight="80%">
          <Stack
            spacing={4}
            alignItems="top"
            direction={["column", "column", "row"]}
          >
            <Box p="1" minWidth={["100%", "30%"]}>
              <QuestTable />
            </Box>
            <Box borderRadius="5px" flex={1} minHeight="100%" p="1">
              <QuestBox />
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Center>
  );
};

Quest.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout useHeader useFooter>
      {page}
    </Layout>
  );
};

export default Quest;
