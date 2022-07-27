import { Center, Flex, Text } from "@chakra-ui/react";

import { PathIcon } from "lib/components/flow/ButtonLink";

const Success = () => {
  return (
    <Center h="80vh">
      <Flex alignItems="center" direction="column" gap={4} textAlign="center">
        <Flex alignItems="center" direction="column" gap={4}>
          <PathIcon boxSize={256} />
          <Text fontSize="3xl">You're logged in!</Text>
        </Flex>
        <Text fontSize="md" width={400} fontWeight="light">
          Go back to your original tab and continue with LabDAO's onboarding
          journey.
        </Text>

        <Text mt={8} fontSize="sm" fontWeight="light">
          You can close this window.
        </Text>
      </Flex>
    </Center>
  );
};

export default Success;
