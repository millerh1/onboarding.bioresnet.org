import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";

import Reading from "./reading";

const DAO_CONTENT = [
  {
    title: "What is a DAO?",
    previewText:
      '"an effective and safe way to work with like-minded folks around the globe."',
    body: (
      <>
        <Link href="https://ethereum.org/en/dao/" passHref>
          <ChakraLink isExternal>
            Decentralized autonomous organizations (DAOs)
            <ExternalLinkIcon mx="2px" />
          </ChakraLink>
        </Link>{" "}
        are "an effective and safe way to work with like-minded folks around the
        globe."
        <br />
        <br />
        Members of a DAO own and manage the organization using governance
        systems (such as voting and proposals).
        <br />
        <br />
        The rules of a DAO are ingrained in the code on which it runs.
        <br />
        <br />
        A DAO’s smart contracts (programs run on blockchain computers), which
        often help determine how the group’s treasury and governance systems are
        managed, are deployed with the voted approval of the DAO.
        <br />
        <br />
        What exactly a DAO is (and what a DAO isn’t) is a currently the topic of
        much debate. Later in your onboarding we’ll share some further resources
        on DAOs if you’re interested in the topic.
      </>
    ),
  },
  {
    title: "What's Discord?",
    previewText:
      "The first tool you’ll need to get in touch with other members of LabDAO.",
    body: (
      <>
        Discord is functionally similar to Slack, but it has a bit more
        modularity.
        <br />
        <br />
        Download Discord and create and account{" "}
        <Link href="https://discord.com" passHref>
          <ChakraLink isExternal>here</ChakraLink>
        </Link>
        . Once you’ve created an account your Discord username will be in the
        format: username#1234 keep this username handy, we’ll ask you for it
        soon.
        <br />
      </>
    ),
  },
];

const DAO = ({ onFinished }: { onFinished(): void }) => {
  return <Reading content={DAO_CONTENT} onFinished={onFinished} />;
};

export default DAO;
