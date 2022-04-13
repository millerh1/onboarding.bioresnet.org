import { Text, Flex, Button, Spacer, HStack } from "@chakra-ui/react";
import { FaDiscord, FaTwitter, FaGlobe } from "react-icons/fa";

const Footer = () => {
  return (
    <Flex as="footer" width="full" pb="2vh" px="25px">
      <Text color="gray.400">powered by DAO Quest</Text>
      <Spacer />
      <Flex direction="column">
        <Spacer />
        <HStack>
          <a target="_blank" href="https://www.labdao.com/" rel="noreferrer">
            <Button bg="#B7FFDC" color="green.700" p="2" boxShadow="md">
              <FaGlobe size="md" />
            </Button>
          </a>
          <a
            target="_blank"
            href="https://twitter.com/lab_dao"
            rel="noreferrer"
          >
            <Button bg="#B7FFDC" color="green.700" p="2" boxShadow="md">
              <FaTwitter size="md" />
            </Button>
          </a>
          <a target="_blank" href="http://discord.gg/labdao" rel="noreferrer">
            <Button bg="#B7FFDC" color="green.700" p="2" boxShadow="md">
              <FaDiscord size="md" />
            </Button>
          </a>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default Footer;
