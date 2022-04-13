import { Flex, Button, Spacer, HStack, Text } from "@chakra-ui/react";
import { FaDiscord, FaTwitter, FaGlobe } from "react-icons/fa";

const Footer = () => {
  return (
    <Flex as="footer" width="full" px="25px" mb={4}>
      <Flex w="full" color="gray.300" fontSize="small">
        <a target="_blank" href="https://daoquest.xyz" rel="noreferrer">
          <Text color="gray.400">powered by DAO Quest</Text>
        </a>
        <Spacer />
        <a
          href="https://app.termly.io/document/terms-and-conditions/e7a5cc83-07be-4dde-9a70-3b87e6d1bd75"
          target="_blank"
          rel="noreferrer"
        >
          <Text> Terms of Service </Text>
        </a>
        <a
          href="https://app.termly.io/document/privacy-policy/8929387d-347a-4a6b-a545-76728b6ac12f"
          target="_blank"
          rel="noreferrer"
        >
          <Text> &nbsp; Privacy Policy &nbsp;&emsp;&emsp;</Text>
        </a>
        <Spacer />
      </Flex>
      <Flex minWidth="8%" mt={-4}>
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
