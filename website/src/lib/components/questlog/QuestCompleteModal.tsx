import {
  Button,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import Confetti from "react-confetti";
import { useRecoilState } from "recoil";

import type { IQuest } from "lib/data";
import { getNextQuestId } from "lib/data";
import { selectedQuestState } from "lib/state";

interface IQuestCompleteModal {
  isOpen: boolean;
  onClose(): void;
  quest: IQuest;
}

export default function QuestCompleteModal({
  isOpen,
  onClose,
  quest,
}: IQuestCompleteModal) {
  const nextId = getNextQuestId(quest.id);
  const [, setSelectedQuestId] = useRecoilState(selectedQuestState);

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered size="3xl">
      <Confetti />
      <ModalOverlay />
      <ModalContent pt="3">
        <ModalHeader fontSize={32} textAlign="center">
          Congrats! 🎉
        </ModalHeader>
        <ModalBody textAlign="center">
          <Stack align="center" spacing="4">
            <Text>{quest.badge.completePopup.introText}</Text>
            <Image src={quest.badge.image} boxSize="160px" />
            <Text>{quest.badge.completePopup.descriptiveText}</Text>
            <HStack gap={8}>
              {nextId && (
                <Button
                  bg="#B7FFDC"
                  color="green.700"
                  onClick={() => {
                    if (nextId) {
                      setSelectedQuestId(nextId);
                    }

                    onClose();
                  }}
                >
                  Next Quest
                </Button>
              )}
              <Link href="/profile" passHref>
                <Button bg="#B7FFDC" color="green.700">
                  See Your Badges
                </Button>
              </Link>
            </HStack>
          </Stack>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}
