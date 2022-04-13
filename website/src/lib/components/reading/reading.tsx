import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Button,
  Spacer,
  IconButton,
  Accordion,
  AccordionPanel,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  Center,
  Text,
  Box,
  Flex,
} from "@chakra-ui/react";
import { useHotkeys } from "react-hotkeys-hook";

export interface IReadingAccordionItem {
  title: string;
  previewText: string;
  body: JSX.Element;
}

// Helper component to represent a single accordion item.
const ReadingAccordionItem: React.FC<IReadingAccordionItem> = ({
  title,
  previewText,
  body,
}: IReadingAccordionItem) => {
  return (
    <AccordionItem py={4}>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            <Text color="gray.600" fontSize="2xl" fontWeight="bold">
              {title}
            </Text>
            <Text color="gray.600" fontSize="md">
              {previewText}
            </Text>
          </Box>
          <AccordionIcon fontSize="5xl" />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4} fontSize="md">
        {body}
      </AccordionPanel>
    </AccordionItem>
  );
};

const Reading = ({
  content,
  onFinished,
}: {
  content: IReadingAccordionItem[];
  onFinished: () => void;
}) => {
  useHotkeys("right", () => {
    onFinished();
  });

  return (
    <Center h="100%">
      <Flex flexDirection="column" w="100%">
        <Box w="100%" py={4}>
          <Accordion allowToggle fontSize="xl" my={8}>
            {content.map((itemContent) => (
              <ReadingAccordionItem {...itemContent} />
            ))}
          </Accordion>
        </Box>
        <Flex mx={4}>
          <a href="https://docs.labdao.com/" target="_blank" rel="noreferrer">
            <Button h={16}>Go to Docs</Button>
          </a>
          <Spacer />
          <IconButton
            aria-label="Next Page"
            bgColor="#85E0B4"
            h={16}
            w={16}
            rounded="lg"
            _hover={{ bg: "green.600" }}
            size="lg"
            onClick={onFinished}
            icon={<ChevronRightIcon fontSize="5xl" />}
          />
        </Flex>
      </Flex>
    </Center>
  );
};

export default Reading;
