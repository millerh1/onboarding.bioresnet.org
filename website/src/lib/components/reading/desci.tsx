import { ListItem, UnorderedList } from "@chakra-ui/react";

import Reading from "./reading";

const DESCI_CONTENT = [
  {
    title: "What is Decentralized Science?",
    previewText:
      "An emerging field that uses blockchain technology and web3 principles to improve science.",
    body: (
      <>
        DeSci entails various projects in the space that are working to:
        <UnorderedList>
          <ListItem>improve coordination</ListItem>
          <ListItem>
            increase access to scientific publishing and participation
          </ListItem>
          <ListItem>provide novel sources of funding</ListItem>
          <ListItem>democratize science and</ListItem>
          <ListItem>
            generally create mechanisms that incentivize scientific progress.
          </ListItem>
        </UnorderedList>
      </>
    ),
  },
  {
    title: "How does LabDAO fit into the DeSci space?",
    previewText:
      "LabDAO is building the “execution layer” for decentralized science. ",
    body: (
      <>
        The tools we are building make it easier for scientists to provide
        services to each other while ensuring ownership and provenance of their
        data.
        <br />
        <br />
        Just as Ethereum has been described as “the world computer in the sky”,
        LabDAO is building the infrastructure for “the global lab in the sky”
        that anyone will be able to use to do science—no matter where they’re
        located.
      </>
    ),
  },
];

const DeSci = ({ onFinished }: { onFinished(): void }) => {
  return <Reading content={DESCI_CONTENT} onFinished={onFinished} />;
};

export default DeSci;
