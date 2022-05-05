import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
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
  const size = useBreakpointValue({ base: "md", md: "xl", lg: "3xl" });
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered size={size}>
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
            <Text>{quest.badge.completePopup?.descriptiveText}</Text>
            <Stack gap={[2, 3, 8]} direction={["column", "column", "row"]}>
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
            </Stack>
          </Stack>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}
