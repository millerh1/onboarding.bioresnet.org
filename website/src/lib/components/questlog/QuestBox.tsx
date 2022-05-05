import {
  Button,
  Box,
  Grid,
  GridItem,
  Flex,
  Spacer,
  Text,
  Image,
  useDisclosure,
  HStack,
  VStack,
} from "@chakra-ui/react";
import assert from "assert";
import { useState, useEffect } from "react";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";

import {
  getContentById,
  getNextQuestId,
  QuestState,
  QuestType,
} from "lib/data";
import type { User } from "lib/state";
import { userState, selectedQuestState, questState } from "lib/state";

import QuestCompleteModal from "./QuestCompleteModal";
import QuestIntroModal from "./QuestIntroModal";

// Box on the left side of the screen
export default function QuestBox() {
  const [shouldOpenIntro, setShouldOpenIntro] = useState(true);
  const setUserInfo = useSetRecoilState(userState);
  const [selectedQuestId, setSelectedQuestId] =
    useRecoilState(selectedQuestState);
  const quest = getContentById(selectedQuestId);
  const state = useRecoilValue(questState(quest.id));
  const nextId = getNextQuestId(quest.id);

  // Next is set to the questId if user has pressed next.
  const [next, setNext] = useState<string>("0");

  useEffect(() => {
    setNext("");
  }, [selectedQuestId]);

  useEffect(() => {
    const localUserInfo = window.localStorage.getItem("labdao-user");
    if (localUserInfo) {
      setUserInfo(JSON.parse(localUserInfo) as User);
    }
  }, [setUserInfo]);

  useEffect(() => {
    // Load the default value from local storage.
    const value = window.localStorage.getItem("labdao-selectedQuestState");
    if (value) {
      setSelectedQuestId(value);
    }
  }, [setSelectedQuestId]);

  useEffect(() => {
    const hasOpenedIntro = window.localStorage.getItem("hasOpenedIntro");
    if (hasOpenedIntro) {
      setShouldOpenIntro(false);
    }
  }, []);

  const {
    isOpen: completeIsOpen,
    onOpen: completeOnOpen,
    onClose: completeOnClose,
  } = useDisclosure();
  const { isOpen: introIsOpen, onClose: introOnClose } = useDisclosure({
    defaultIsOpen: true,
  });

  const introModalClose = () => {
    // Set that they've seen this intro.
    window.localStorage.setItem("hasOpenedIntro", "true");

    introOnClose();
  };

  // Completing the quest is the same as just opening the modal.
  const completeQuest = async () => {
    setUserInfo((oldUserInfo) => {
      if (oldUserInfo.completedQuestIds.includes(selectedQuestId)) {
        return oldUserInfo;
      }

      return {
        ...oldUserInfo,
        completedQuestIds: [...oldUserInfo.completedQuestIds, selectedQuestId],
      } as User;
    });

    // Complete parent quest if it exists
    if (quest.completeParentId && selectedQuestId !== quest.completeParentId) {
      setUserInfo((oldUserInfo) => {
        // Just to be safe.
        if (
          quest.completeParentId &&
          oldUserInfo.completedQuestIds.includes(quest.completeParentId)
        ) {
          return oldUserInfo;
        }

        return {
          ...oldUserInfo,
          completedQuestIds: [
            ...oldUserInfo.completedQuestIds,
            quest.completeParentId,
          ],
        } as User;
      });
    }

    if (quest.completeParentId) {
      completeOnOpen();
    } else if (nextId) {
      setSelectedQuestId(nextId);
    }
  };

  // The action button for the quest.
  const questActionButton = () => {
    const { type } = quest;
    if (type === QuestType.None) {
      return null;
    }

    if (type === QuestType.Next && !nextId) {
      return null;
    }

    if (state === QuestState.Locked) {
      return (
        <Button fontWeight="small" minWidth="full" size="lg">
          <Image boxSize="26px" src="/lock.png" />
        </Button>
      );
    }

    if (state === QuestState.Done) {
      return (
        <Button fontWeight="small" minWidth="full" size="lg" isDisabled>
          Completed
        </Button>
      );
    }

    if (type === QuestType.Next && nextId) {
      return (
        <Button
          boxShadow="base"
          bg="#B7FFDC"
          color="green.700"
          fontWeight="small"
          minWidth="full"
          size="lg"
          onClick={() => setSelectedQuestId(nextId)}
        >
          Get Started
        </Button>
      );
    }

    return (
      <Button
        boxShadow="base"
        bg="#B7FFDC"
        color="green.700"
        fontWeight="small"
        minWidth="full"
        size="lg"
        onClick={() => completeQuest()}
      >
        Complete
      </Button>
    );
  };

  const onNext = () => {
    setNext(selectedQuestId);
  };

  const onFinishedReading = () => {
    completeQuest();
    setNext("");
  };

  if (next === selectedQuestId) {
    assert(quest.reading);
    return (
      <Box
        px="10"
        pt="6"
        pb="6"
        borderRadius="5px"
        minHeight="40vh"
        boxShadow="lg"
        border="1px"
        borderColor="gray.100"
      >
        {quest.reading(onFinishedReading)}
      </Box>
    );
  }

  return (
    <Box
      px={["4", "4", "10"]}
      pt="6"
      pb={["16", "16", "6"]}
      borderRadius="5px"
      minHeight="40vh"
      boxShadow="lg"
      border="1px"
      borderColor="gray.100"
      width="100%"
      flex={1}
    >
      <Grid templateRows="repeat(8, 1fr)" minHeight="inherit">
        <GridItem rowSpan={7}>
          <Flex
            alignItems="stretch"
            flexDir="column"
            color="#5F5D59"
            fontSize={17}
            minHeight="full"
          >
            <HStack pb="20px">
              {quest.titleImage ? (
                <Image
                  objectFit="contain"
                  boxSize={["30px", "60px"]}
                  src={quest.titleImage}
                />
              ) : null}
              <Text pl="1" fontWeight="semibold" fontSize={[24, 38]}>
                {quest.title}
              </Text>
            </HStack>
            <Box maxW="100%" overflow="hidden">
              {quest.body(
                state === QuestState.Locked,
                onNext,
                onFinishedReading
              )}
            </Box>
          </Flex>
        </GridItem>
        <GridItem
          pb="20px"
          as={Flex}
          rowSpan={2}
          flexDirection={["column", "column", "row"]}
        >
          <Spacer />
          <VStack minWidth="25%">
            <Spacer />
            <Spacer />
            {questActionButton()}
          </VStack>
        </GridItem>
        {/* TODO: Popup only if this is the last quest to complete the parent. */}
        {quest.completeParentId && (
          <QuestCompleteModal
            isOpen={completeIsOpen}
            onClose={completeOnClose}
            quest={quest}
          />
        )}
      </Grid>
      {/* TODO(jqphu): I couldn't get this to work with defaultIsOpen variable so instead we'll just conditionally render it. */}
      {shouldOpenIntro && (
        <QuestIntroModal isOpen={introIsOpen} onClose={introModalClose} />
      )}
    </Box>
  );
}
