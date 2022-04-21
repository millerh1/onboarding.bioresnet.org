import { Flex, Button, Text } from "@chakra-ui/react";
import { FaDiscord, FaTwitter, FaGlobe } from "react-icons/fa";

const Footer = () => {
  return (
    <Flex
      as="footer"
      width="full"
      p="25px"
      direction={{
        base: "column",
        md: "row",
      }}
      justifyContent="space-between"
      gap={[4, 0]}
    >
      <Flex
        w="full"
        direction={{
          base: "column-reverse",
          md: "row",
        }}
        color="gray.300"
        justifyContent={["center", "center", "flex-start"]}
        alignItems="center"
        fontSize="small"
        gap={[0, 4, 8]}
        flex={1}
      >
        <a target="_blank" href="https://daoquest.xyz" rel="noreferrer">
          <Text color="gray.400" fontSize={["sm", "md", "xl"]}>
            powered by DAO Quest
          </Text>
        </a>
        <a
          href="https://app.termly.io/document/terms-and-conditions/e7a5cc83-07be-4dde-9a70-3b87e6d1bd75"
          target="_blank"
          rel="noreferrer"
        >
          <Text fontSize={["sm", "md", "xl"]}> Terms of Service </Text>
        </a>
        <a
          href="https://app.termly.io/document/privacy-policy/8929387d-347a-4a6b-a545-76728b6ac12f"
          target="_blank"
          rel="noreferrer"
        >
          <Text fontSize={["sm", "md", "xl"]}> Privacy Policy</Text>
        </a>
      </Flex>

      <Flex
        minWidth="8%"
        gap={8}
        justifyContent={["center", "center", "flex-end"]}
        flex={1}
      >
        <a target="_blank" href="https://www.labdao.com/" rel="noreferrer">
          <Button bg="#B7FFDC" color="green.700" p="2" boxShadow="md">
            <FaGlobe size="md" />
          </Button>
        </a>
        <a target="_blank" href="https://twitter.com/lab_dao" rel="noreferrer">
          <Button bg="#B7FFDC" color="green.700" p="2" boxShadow="md">
            <FaTwitter size="md" />
          </Button>
        </a>
        <a target="_blank" href="http://discord.gg/labdao" rel="noreferrer">
          <Button bg="#B7FFDC" color="green.700" p="2" boxShadow="md">
            <FaDiscord size="md" />
          </Button>
        </a>
      </Flex>
    </Flex>
  );
};

export default Footer;
