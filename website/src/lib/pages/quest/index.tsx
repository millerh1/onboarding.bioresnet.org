import { Box, Center, Progress, Text, HStack, Stack } from "@chakra-ui/react";
import type { ReactElement } from "react";
import { useRecoilValue } from "recoil";

import { QuestBox, QuestTable } from "lib/components/questlog";
import { Layout } from "lib/layout/index";
import { progressState } from "lib/state";

// Page itself.
const Quest = () => {
  const progress = useRecoilValue(progressState);
  const progressRounded = 5 * Math.round(progress / 5);

  return (
    <Center>
      <Stack width="95%" align="center">
        <Box width="inherit">
          <Text color="gray.400" fontWeight="medium" fontSize={17}>
            Quest Board Progress
          </Text>
          <Progress value={progressRounded} colorScheme="brand" />
          <Text color="gray.400" fontWeight="medium" fontSize={17}>
            {/* Progress rounded to nearest 5 */}
            {progressRounded}%
          </Text>
        </Box>
        <Box width="inherit" minHeight="80%">
          <HStack spacing="1px" alignItems="top">
            <Box p="4" minWidth="30%">
              <QuestTable />
            </Box>
            <Box borderRadius="5px" w="70%" minHeight="100%" p="4">
              <QuestBox />
            </Box>
          </HStack>
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
