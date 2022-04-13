import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Button,
  VStack,
  Image,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { QUESTS, QuestState } from "lib/data";
import type { IQuestCategory, ISubQuest } from "lib/data";
import {
  selectedQuestState,
  questState,
  selectedAccordionIndexState,
} from "lib/state";

function categorySwitch(
  categoryState: QuestState,
  doneReturn: string,
  lockedReturn: string,
  currentReturn: string
) {
  switch (+categoryState) {
    case QuestState.Done:
      return doneReturn;
    case QuestState.Locked:
      return lockedReturn;
    case QuestState.Unlocked:
      return currentReturn;
    default:
      return "";
  }
}

const DONE_CHECK = "/done_check.png";
const EMPTY_CHECK = "/empty_check.png";
const LOCK = "/lock.png";

// Quest itself.
function QuestTableEntry({
  quest,
  parent,
}: {
  quest: ISubQuest;
  parent: IQuestCategory;
}) {
  const [selectedQuestId, setSelectedQuestId] =
    useRecoilState(selectedQuestState);
  const [isCurrentlySelected, setIsCurrentlySelected] = useState(false);

  useEffect(() => {
    if (selectedQuestId === quest.content.id) {
      setIsCurrentlySelected(true);
    } else {
      setIsCurrentlySelected(false);
    }
  }, [selectedQuestId, quest.content.id]);

  const state = useRecoilValue(questState(quest.content.id));
  const parentState = useRecoilValue(questState(parent.content.id));

  return (
    <Button
      variant="ghost"
      isActive={isCurrentlySelected}
      justifyContent="flex-start"
      width="full"
      // Make it grey only if both the parent AND the child is done.
      bg={
        parentState === QuestState.Done && state === QuestState.Done
          ? "gray.50"
          : "inherit"
      }
      leftIcon={
        <Image
          boxSize="25px"
          src={categorySwitch(state, DONE_CHECK, LOCK, EMPTY_CHECK)}
        />
      }
      onClick={() => {
        setSelectedQuestId(quest.content.id);
      }}
    >
      <Text
        fontWeight="normal"
        color={categorySwitch(state, "gray.400", "gray.400", "gray.700")}
      >
        {quest.listTitle}
      </Text>
    </Button>
  );
}

// Quest catetory with more than one quest entry.
function QuestTableCategory({
  questCategory,
}: {
  questCategory: IQuestCategory;
}) {
  const [selectedQuestId, setSelectedQuestId] =
    useRecoilState(selectedQuestState);
  const state = useRecoilValue(questState(questCategory.content.id));
  const [isCurrentlySelected, setIsCurrentlySelected] = useState(false);

  useEffect(() => {
    if (selectedQuestId === questCategory.content.id) {
      setIsCurrentlySelected(true);
    } else {
      setIsCurrentlySelected(false);
    }
  }, [selectedQuestId, questCategory.content.id]);

  const hasChildQuests =
    questCategory.subQuests && questCategory.subQuests.length !== 0;

  return (
    <AccordionItem bg={state === QuestState.Done ? "gray.50" : "inherit"}>
      <AccordionButton
        bg={isCurrentlySelected ? "gray.100" : "inherit"}
        onClick={() => {
          setSelectedQuestId(questCategory.content.id);
        }}
      >
        <Image
          boxSize="10"
          objectFit="contain"
          src={categorySwitch(
            state,
            questCategory.image_unlocked,
            questCategory.image_locked,
            questCategory.image_unlocked
          )}
        />
        <Box
          flex="1"
          textAlign="left"
          pl={4}
          color={categorySwitch(state, "gray.400", "gray.400", "gray.700")}
        >
          {questCategory.listTitle}
        </Box>
        <Image
          boxSize="19px"
          src={categorySwitch(state, DONE_CHECK, LOCK, EMPTY_CHECK)}
        />
      </AccordionButton>
      {hasChildQuests && (
        <AccordionPanel>
          <VStack spacing={4} align="stretch">
            {questCategory.subQuests?.map((quest: ISubQuest) => {
              return (
                <QuestTableEntry
                  key={quest.content.id}
                  quest={quest}
                  parent={questCategory}
                />
              );
            })}
          </VStack>
        </AccordionPanel>
      )}
    </AccordionItem>
  );
}

// Outer table that holds the quest categories and quests.
export default function QuestTable() {
  const [lastIndex, setIndex] = useRecoilState(selectedAccordionIndexState);

  return (
    <Accordion
      boxShadow="base"
      allowToggle
      defaultIndex={lastIndex}
      onChange={(expandedIndex: number) => {
        setIndex(expandedIndex);
      }}
    >
      <Box
        flex="1"
        textAlign="center"
        p={1}
        fontSize={{ base: "xl", sm: "xl" }}
        bg="gray.50"
        borderRadius="5px"
        borderBottomEndRadius="0px"
        borderBottomLeftRadius="0px"
        border="1px"
        borderColor="gray.100"
        color="gray.700"
      >
        Quest Log
      </Box>
      {QUESTS.map((item: IQuestCategory) => (
        <QuestTableCategory key={item.content.id} questCategory={item} />
      ))}
    </Accordion>
  );
}
