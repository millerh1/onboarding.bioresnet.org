import {
  ButtonGroup,
  Button,
  Box,
  HStack,
  Image,
  Center,
  Flex,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaDiscord, FaTwitter, FaFileAlt } from "react-icons/fa";

// Header that appears on some screens.
const Header = () => {
  return (
    <Box
      as="nav"
      // bg="bg-surface"
      bg="white"
      boxShadow="sm"
      px={[4, 8]}
      py={2}
      mb={4}
      position="sticky"
      top={0}
      left={0}
      width="100%"
      zIndex={999}
    >
      <Flex alignItems="center" justifyItems="center">
        <HStack
          width="33%"
          spacing="3"
          alignItems="center"
          justifyItems="center"
        >
          <Link href="https://labdao.com" passHref>
            <a>
              <Image boxSize={["30px", "60px"]} src="/labdao_logo.png" />
            </a>
          </Link>
          <Link href="https://labdao.com" passHref>
            <a>
              <HStack spacing="0">
                <Text
                  textAlign="left"
                  fontSize={[20, 40]}
                  fontWeight="semibold"
                  fontFamily="Inert, sans-serif"
                >
                  Lab
                </Text>
                <Text textAlign="left" fontWeight="light" fontSize={[20, 40]}>
                  DAO
                </Text>
              </HStack>
            </a>
          </Link>
        </HStack>
        <Center width="33%" alignItems="center">
          <ButtonGroup spacing="5">
            <a target="_blank" href="http://discord.gg/labdao" rel="noreferrer">
              <Button
                leftIcon={<FaDiscord size="25" />}
                bg="#B7FFDC"
                color="green.700"
                boxShadow="md"
                minWidth="100"
              >
                Discord
              </Button>
            </a>
            <a
              target="_blank"
              href="https://twitter.com/lab_dao"
              rel="noreferrer"
            >
              <Button
                leftIcon={<FaTwitter size="25" />}
                bg="#B7FFDC"
                color="green.700"
                boxShadow="md"
                minWidth="100"
              >
                Twitter
              </Button>
            </a>
            <a target="_blank" href="https://docs.labdao.com" rel="noreferrer">
              <Button
                leftIcon={<FaFileAlt size="25" />}
                bg="#B7FFDC"
                color="green.700"
                boxShadow="md"
                minWidth="100"
              >
                Docs
              </Button>
            </a>
          </ButtonGroup>
        </Center>
        <Flex width="33%" />
      </Flex>
    </Box>
  );
};

export default Header;
