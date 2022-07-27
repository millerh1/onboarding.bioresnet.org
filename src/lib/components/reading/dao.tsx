import { Heading, Link as ChakraLink } from "@chakra-ui/react";
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
          <ChakraLink isExternal textDecoration="underline">
            DAOs
          </ChakraLink>
        </Link>{" "}
        are "an effective and safe way to work with like-minded folks around the
        globe." Members of a DAO own and manage the organization using
        governance systems (such as voting and proposals). The rules of a DAO
        are ingrained in the code on which it runs.
        <br />
        <br />
        A DAO’s smart contracts (code that runs on a blockchain) are deployed
        with the voted approval of the DAO and often help determine how the
        group's treasury and governance sysstems are managed.
        <br />
        <br />
        At LabDAO, that means that members of the DAO (who will own the
        not-yet-launched $LAB tokens) will have a say in the major decisions
        that are made about governance, funds, etc.
      </>
    ),
  },
  {
    title: "What tools do you need to participate in LabDAO?",
    previewText:
      "The first tool you’ll need to get in touch with other members of LabDAO.",
    body: (
      <>
        <Heading as="h3" size="md">
          Discord
        </Heading>
        <br />
        LabDAO currently uses{" "}
        <Link href="https://discord.com" passHref>
          <ChakraLink isExternal textDecoration="underline">
            Discord
          </ChakraLink>
        </Link>{" "}
        for communication between DAO members. Discord is functionally similar
        to Slack, but it has a bit more modularity. To meet other members of the
        community and explore ongoing projects, download Discord and create and
        account{" "}
        <Link href="https://discord.com" passHref>
          <ChakraLink isExternal textDecoration="underline">
            here
          </ChakraLink>
        </Link>
        .
        <br />
        <br />
        Once you’ve created an account and downloaded the app, open Discord and
        click on your username next to your avatar on the bottom left corner.
        This will automatically copy your username/ID (which will look like
        ‘Name#1234’).{" "}
        <b>Keep this username handy, we’ll ask you for it soon.</b>
        <br />
        <br />
        <Heading as="h3" size="md">
          A wallet
        </Heading>
        <br />
        As you get more involved in LabDAO, having a{" "}
        <Link href="https://ethereum.org/en/wallets/" passHref>
          <ChakraLink isExternal textDecoration="underline">
            digital wallet
          </ChakraLink>
        </Link>{" "}
        such as{" "}
        <Link href="https://metamask.io/" passHref>
          <ChakraLink isExternal textDecoration="underline">
            MetaMask
          </ChakraLink>
        </Link>{" "}
        will be important for allowing you to vote on community proposals,
        connect to other applications and get rewarded for your contributions.
        <br />
        <br />
        If you don’t have already have a wallet we recommend first finishing
        your LabDAO onboarding before creating one.
      </>
    ),
  },
];

const DAO = ({ onFinished }: { onFinished(): void }) => {
  return <Reading content={DAO_CONTENT} onFinished={onFinished} />;
};

export default DAO;
