import { ListItem, OrderedList, UnorderedList } from "@chakra-ui/react";

import Reading from "./reading";

const INTRO_CONTENT = [
  {
    title: "What is LabDAO?",
    previewText:
      "LabDAO’s mission is to accelerate life science innovation and collaboration.",
    body: (
      <>
        LabDAO is a decentralized science community developing a set of tools
        for scientists to coordinate online. These tools include:
        <br />
        <br />
        <OrderedList>
          <ListItem>An exchange for laboratory services</ListItem>
          <ListItem>An onboarding and team-formation process</ListItem>
          <ListItem>A funding ecosystem for scientific open-source developers</ListItem>
        </OrderedList>
        <br />
        <br />
      </>
    ),
  },
  {
    title: "Why is LabDAO needed?",
    previewText: "Open source in biomedicine needs a revamp.",
    body: (
      <>
        The high cost of executing life science protocols and the low
        reproducibility of the resulting data has been a roadblock to open
        source market dynamics in biomedicine. We believe this is the result of
        several problems:
        <br />
        <br />
        <UnorderedList>
          <ListItem>
            <b>Secrecy is highly incentivized</b> and this adds to the high cost
            of implementing biomedical research tools
          </ListItem>
          <ListItem>
            <b>A lack of standards</b> for wet lab and dry lab tools leads to
            low reproducibility
          </ListItem>
          <ListItem>
            <b>Few open source communities</b> maintain and develop biomedical
            research tools
          </ListItem>
          <br />
        </UnorderedList>
        LabDAO is solving these problems by building an open market for the
        execution of biomedical experiments, defining standards around
        biomedical tools, and incentivizing contributions to these projects.
      </>
    ),
  },
  {
    title: "Who should join LabDAO?",
    previewText:
      "LabDAO needs diverse members from many different backgrounds.",
    body: (
      <>
        In order to create better tools and systems to accelerate life sciences,
        the LabDAO community needs a wide variety of perspectives.
        <br />
        <br />
        The DAO brings together <b>scientists</b>, <b>inventors</b> and{" "}
        <b>entrepreneurs</b> to meet new labmates with similar interests and
        goals.
        <br />
        <br />
        You are well suited for LabDAO if you’re curious about or have
        experience in topics such as:
        <UnorderedList>
          <ListItem>Open source science</ListItem>
          <ListItem>Web3</ListItem>
          <ListItem>DAOs</ListItem>
          <ListItem>Coordination</ListItem>
          <ListItem>Knowledge graphs</ListItem>
          <ListItem>Tokenomics and incentives</ListItem>
          <ListItem>Finding better solutions for funding research</ListItem>
          <ListItem>Building global scientific communities</ListItem>
          <ListItem>Decentralizing science</ListItem>
        </UnorderedList>
        <br />
        If you’re interested in any of these topics or have other skills you’d
        like to contribute to the DAO:{" "}
        <b>you’re in the right place to get started.</b>
      </>
    ),
  },
];

const Intro = ({ onFinished }: { onFinished(): void }) => {
  return <Reading content={INTRO_CONTENT} onFinished={onFinished} />;
};

export default Intro;
