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
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import LoginModal from "lib/components/login";
import {
  getContentById,
  getNextQuestId,
  QuestState,
  QuestType,
} from "lib/data";
import {
  userState,
  selectedQuestState,
  questState,
  updateProfile,
} from "lib/state";
import { supabase } from "lib/util/supabase_client";

import QuestCompleteModal from "./QuestCompleteModal";
import QuestIntroModal from "./QuestIntroModal";

// Box on the left side of the screen
export default function QuestBox() {
  const [shouldOpenIntro, setShouldOpenIntro] = useState(true);
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [selectedQuestId, setSelectedQuestId] =
    useRecoilState(selectedQuestState);
  const quest = getContentById(selectedQuestId);
  const state = useRecoilValue(questState(quest.id));
  const nextId = getNextQuestId(quest.id);
  const [next, setNext] = useState(false);

  useEffect(() => {
    // Reset next if we select a new quest.
    setNext(false);
  }, [selectedQuestId]);

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
  const {
    isOpen: loginIsOpen,
    onOpen: loginOnOpen,
    onClose: loginOnClose,
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
    if (userInfo.authenticated) {
      const upsertArray = [
        {
          quest_id: selectedQuestId,
          parent_id: userInfo.id,
          created_at: new Date(),
        },
      ];

      // Complete parent quest if it exists
      if (
        quest.completeParentId &&
        selectedQuestId !== quest.completeParentId
      ) {
        upsertArray.push({
          quest_id: quest.completeParentId,
          parent_id: userInfo.id,
          created_at: new Date(),
        });
      }

      // Use upsert to just be safe. If somehow we complete the quest twice we
      // don't get repeated entries.
      const { error } = await supabase.from("quests").upsert(upsertArray, {
        returning: "minimal",
      });

      // This is duplicate completion error. We can just safely ignore this.
      // TODO(jqphu): log something, this shouldn't really happen.
      assert(!error || error.code === "23505");

      // To make sure we updated the database correctly we're going to just
      // re-read the data. This will make it clear if we messed it up.
      // Obviously, this is much slower and less than ideal but I doubt
      // performance is an issue for completing quests.
      // TODO(jqphu): only update the local state and not the entire DB.
      updateProfile(setUserInfo);

      if (quest.completeParentId) {
        completeOnOpen();
      } else if (nextId) {
        setSelectedQuestId(nextId);
      }
    } else {
      // Try to log the user in.
      loginOnOpen();
    }
  };

  // The action button for the quest.
  const questActionButton = () => {
    const { type } = quest;
    if (type === QuestType.None) {
      return null;
    }

    if (state === QuestState.Locked) {
      return (
        <Button maxHeight="40%" fontWeight="small" minWidth="full" size="lg">
          <Image boxSize="26px" src="/lock.png" />
        </Button>
      );
    }

    if (state === QuestState.Done) {
      return (
        <Button
          maxHeight="40%"
          fontWeight="small"
          minWidth="full"
          size="lg"
          isDisabled
        >
          Completed
        </Button>
      );
    }

    return (
      <Button
        boxShadow="base"
        maxHeight="40%"
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
    if (!userInfo.authenticated) {
      loginOnOpen();
    } else {
      setNext(true);
    }
  };

  const onFinishedReading = () => {
    completeQuest();
    setNext(false);
  };

  if (next) {
    assert(quest.reading);
    return (
      <Box
        px="10"
        pt="6"
        pb="6"
        borderRadius="5px"
        minHeight="60vh"
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
      px="10"
      pt="6"
      pb="6"
      borderRadius="5px"
      minHeight="60vh"
      boxShadow="lg"
      border="1px"
      borderColor="gray.100"
    >
      <LoginModal isOpen={loginIsOpen} onClose={loginOnClose} />
      <Grid templateRows="repeat(10, 1fr)" minHeight="inherit">
        <GridItem rowSpan={7}>
          <Flex
            alignItems="stretch"
            flexDir="column"
            align=""
            color="#5F5D59"
            fontSize={17}
            minHeight="full"
          >
            <HStack pb="20px">
              {quest.titleImage ? (
                <Image
                  objectFit="contain"
                  boxSize="60px"
                  src={quest.titleImage}
                />
              ) : null}
              <Text pl="1" fontWeight="semibold" fontSize={38}>
                {quest.title}
              </Text>
            </HStack>
            {quest.body(state === QuestState.Locked, onNext)}
          </Flex>
        </GridItem>
        <GridItem as={Flex} rowSpan={1} maxWidth="50%" flexDir="column">
          <HStack as={Flex} minHeight="full">
            <Flex flexDir="column" minHeight="full">
              <Spacer />
              <Text color="gray.500" fontWeight="semibold" fontSize={28}>
                Reward
              </Text>
            </Flex>
            <Spacer />
            <Flex flexDir="column" minHeight="full">
              <Spacer />
              {quest.questCompletionStep && (
                <Text color="gray.500" fontSize={16}>
                  step {quest.questCompletionStep}
                </Text>
              )}
            </Flex>
          </HStack>
        </GridItem>
        <GridItem pb="20px" as={Flex} rowSpan={2}>
          <Link href="/profile" passHref>
            <HStack
              as={Button}
              minWidth="50%"
              px="10px"
              bg="inherit"
              color="#EBEBEB"
              borderRadius="10px"
              border="2px"
              align="center"
              minHeight="full"
              fontWeight="normal"
            >
              <Image boxSize="80px" src={quest.badge.image} />
              <VStack px="5px" align="flex-start">
                <Text color="#5F5D59">{quest.badge.title}</Text>
                <Text color="#8F8E8A">{quest.badge.description}</Text>
              </VStack>
              <Spacer />
            </HStack>
          </Link>
          <Spacer />
          <VStack minWidth="25%">
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
