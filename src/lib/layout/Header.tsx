import {
  Divider,
  ButtonGroup,
  Button,
  Box,
  HStack,
  Image,
  Center,
  Flex,
  Text,
  useDisclosure,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  useBreakpointValue,
  chakra,
  IconButton,
} from "@chakra-ui/react";
import type { IconButtonProps } from "@chakra-ui/react";
import Link from "next/link";
import { FaDiscord, FaTwitter, FaFileAlt } from "react-icons/fa";

const Bar = chakra("span", {
  baseStyle: {
    display: "block",
    pos: "absolute",
    w: "1.25rem",
    h: "0.125rem",
    rounded: "full",
    bg: "currentcolor",
    mx: "auto",
    insetStart: "0.125rem",
    transition: "all 0.12s",
  },
});

const ToggleIcon = (props: { active: boolean }) => {
  const { active } = props;
  return (
    <Box
      className="group"
      data-active={active ? "" : undefined}
      as="span"
      display="block"
      w="1.5rem"
      h="1.5rem"
      pos="relative"
      aria-hidden
      pointerEvents="none"
    >
      <Bar
        top="0.4375rem"
        _groupActive={{ top: "0.6875rem", transform: "rotate(45deg)" }}
      />
      <Bar
        bottom="0.4375rem"
        _groupActive={{ bottom: "0.6875rem", transform: "rotate(-45deg)" }}
      />
    </Box>
  );
};

interface ToggleButtonProps extends IconButtonProps {
  isOpen: boolean;
}

export const ToggleButton = (props: ToggleButtonProps) => {
  const { isOpen, ...iconButtonProps } = props;
  return (
    <IconButton
      position="relative"
      variant="unstyled"
      size="sm"
      color="on-accent"
      zIndex="skipLink"
      icon={<ToggleIcon active={isOpen} />}
      {...iconButtonProps}
    />
  );
};

// Header that appears on some screens.
const Header = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const { isOpen, onToggle, onClose } = useDisclosure();
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
              <Image
                boxSize={{ base: "30px", lg: "60px" }}
                src="/labdao_logo.png"
              />
            </a>
          </Link>
          <Link href="https://labdao.com" passHref>
            <a>
              <HStack spacing="0">
                <Text
                  textAlign="left"
                  fontSize={{ base: 20, lg: 40 }}
                  fontWeight="semibold"
                  fontFamily="Inert, sans-serif"
                >
                  Lab
                </Text>
                <Text
                  textAlign="left"
                  fontWeight="light"
                  fontSize={{ base: 20, lg: 40 }}
                >
                  DAO
                </Text>
              </HStack>
            </a>
          </Link>
        </HStack>
        <Center width="33%" alignItems="center">
          {isDesktop && (
            <ButtonGroup spacing="5">
              <a
                target="_blank"
                href="http://discord.gg/labdao"
                rel="noreferrer"
              >
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
              <a
                target="_blank"
                href="https://docs.labdao.com"
                rel="noreferrer"
              >
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
          )}
        </Center>
        <Flex width="33%" flexDir="row-reverse">
          {!isDesktop && (
            <>
              <ToggleButton
                isOpen={isOpen}
                aria-label="Open Menu"
                onClick={onToggle}
              />
              <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                isFullHeight
                preserveScrollBarGap
              >
                <DrawerOverlay />
                <DrawerContent p={4}>
                  <HStack p={4} alignItems="center" justifyItems="center">
                    <Link href="https://labdao.com" passHref>
                      <a>
                        <Image boxSize="60px" src="/labdao_logo.png" />
                      </a>
                    </Link>
                    <Link href="https://labdao.com" passHref>
                      <a>
                        <HStack spacing="0">
                          <Text
                            textAlign="left"
                            fontSize={40}
                            fontWeight="semibold"
                            fontFamily="Inert, sans-serif"
                          >
                            Lab
                          </Text>
                          <Text
                            textAlign="left"
                            fontWeight="light"
                            fontSize={40}
                          >
                            DAO
                          </Text>
                        </HStack>
                      </a>
                    </Link>
                  </HStack>

                  <Divider />
                  <Flex flexDir="column" p={4} gap={4}>
                    <a
                      target="_blank"
                      href="http://discord.gg/labdao"
                      rel="noreferrer"
                    >
                      <Button
                        leftIcon={<FaDiscord size="25" />}
                        bg="#B7FFDC"
                        color="green.700"
                        boxShadow="md"
                        width="full"
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
                        width="full"
                      >
                        Twitter
                      </Button>
                    </a>
                    <a
                      target="_blank"
                      href="https://docs.labdao.com"
                      rel="noreferrer"
                    >
                      <Button
                        leftIcon={<FaFileAlt size="25" />}
                        bg="#B7FFDC"
                        color="green.700"
                        boxShadow="md"
                        width="full"
                      >
                        Docs
                      </Button>
                    </a>
                  </Flex>
                </DrawerContent>
              </Drawer>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
