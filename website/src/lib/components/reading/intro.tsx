import { ListItem, UnorderedList, Text } from "@chakra-ui/react";

import Reading from "./reading";

const INTRO_CONTENT = [
  {
    title: "What is LabDAO?",
    previewText:
      "Our mission is to accelerate life science innovation and collaboration.",
    body: (
      <>
        We are doing this by creating new mechanisms and markets for the
        exchange of R&amp;D services and scientific data.
        <br />
        <br />
        Specifically, we're building an open-source &amp;
        community-owned/operated/governed protocol where users can buy and sell
        research contracts, run experiments with standardized protocols, find
        collaborators, and securely exchange data. Initially focused on
        computational work, we will eventually be the decentralized operating
        system for wet and dry lab experiments.
        <br />
        <br />
        &quot;an open source protocol to act as the execution layer for
        decentralized science&quot;
      </>
    ),
  },
  {
    title: "Why LabDAO needed?",
    previewText:
      "We’re here to solve the problems with open source in biomedicine.",
    body: (
      <>
        The high cost of reproducing life science processes and the low
        reliability of generating expected results has been a roadblock to open
        source market dynamics in biomedicine. Specifically, we believe the
        following problems hold back biomedicine today:
        <br />
        <br />
        <UnorderedList>
          <ListItem>
            High cost and incentives around secrecy of implementing biomedical
            tools
          </ListItem>
          <ListItem>
            Lack of reproducibility of wet lab and dry lab biomedical tools
          </ListItem>
          <ListItem>
            Few open source communities maintaining and developing biomedical
            tools
          </ListItem>
          <br />
        </UnorderedList>
        We are here to solve these problems with an open market for the
        execution of biomedical experiments, by defining standards around
        biomedical tools and incentivising contributors.{" "}
      </>
    ),
  },
  {
    title: "Who should join LabDAO?",
    previewText:
      "A variety of people interested in technology, the scientific community and novel coordination.",
    body: (
      <>
        LabDAO has a need for diverse members from a number of different
        backgrounds. The LabDAO community is currently organized thematically in
        three working groups:
        <br />
        <br />
        <UnorderedList>
          <ListItem>
            <Text as="span" fontWeight="bold">
              Technology working group{" "}
            </Text>
            - scientific application, infrastructure, and contract development
          </ListItem>
          <ListItem>
            <Text as="span" fontWeight="bold">
              Community working group
            </Text>
            - communications, onboarding and community building
          </ListItem>
          <ListItem>
            <Text as="span" fontWeight="bold">
              Coordination working group
            </Text>
            - mechanism design, token economics and legal questions
          </ListItem>
          <br />
        </UnorderedList>
        If you’re interested in any of these topics or have other skills you’d
        like to contribute to the DAO you’re in the right place to get started.
      </>
    ),
  },
];

const Intro = ({ onFinished }: { onFinished(): void }) => {
  return <Reading content={INTRO_CONTENT} onFinished={onFinished} />;
};

export default Intro;
