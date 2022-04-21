import {
  OrderedList,
  Center,
  ListItem,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Image,
  Stack,
  Text,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";

interface IQuestIntroModal {
  isOpen: boolean;
  onClose(): void;
}

export default function QuestIntroModal({ isOpen, onClose }: IQuestIntroModal) {
  const size = useBreakpointValue({ base: "sm", md: "3xl", lg: "5xl" });
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered size={size}>
      <ModalOverlay backdropFilter="blur(5px)" />
      <ModalContent pt="3">
        <ModalHeader fontSize={32} textAlign="center">
          Welcome to the LabDAO Quest Board
        </ModalHeader>

        <ModalBody textAlign="left">
          <Text my={4} mx={8} textAlign="center">
            Learn about LabDAO and our community of scientists by completing
            Quests!
          </Text>
          <Flex
            gap={4}
            mx={4}
            direction={{ base: "column-reverse", lg: "row" }}
          >
            <Center>
              <Stack align="left" spacing="8">
                <Box>
                  <Text fontSize="lg" fontWeight="bold" mb={2}>
                    To use the Quest Board
                  </Text>
                  <Box>
                    <OrderedList spacing={3}>
                      <ListItem>Pick Quests from the Quest Log</ListItem>
                      <ListItem>
                        Follow instructions in the Quest Details.
                      </ListItem>
                      <ListItem>
                        Complete Quests to{" "}
                        <Text as="span" fontWeight="bold">
                          receive rewards and unlock access
                        </Text>{" "}
                        to deeper parts of the community!
                      </ListItem>
                    </OrderedList>
                  </Box>
                </Box>
              </Stack>
            </Center>
            <Image src="/quest_intro.png" h="50%" />
          </Flex>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}
