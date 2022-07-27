import { ListItem, UnorderedList } from "@chakra-ui/react";

import Reading from "./reading";

const WORKING_GROUP_CONTENT = [
  {
    title: "The Technology Group 🤖",
    previewText:
      "Building the labDAO protocol, products, and tools (web3 and web2 alike).",
    body: (
      <>
        We’re focused on scientific application, infrastructure, and contract
        development.
        <br />
        Our current projects are:
        <br />
        <br />
        <UnorderedList>
          <ListItem>
            Building out our tech stack/infrastructure - which is being
            discussed in{" "}
            <a
              href="https://discord.com/channels/907475456293470209/927671531553828894"
              target="_blank"
              rel="noreferrer"
            >
              [📁ㆍinfrastructure]
            </a>{" "}
            and{" "}
            <a
              href="https://discord.com/channels/907475456293470209/918027232058941451"
              target="_blank"
              rel="noreferrer"
            >
              [💠ㆍexchange]
            </a>
          </ListItem>
          <ListItem>
            Creating computational biology service offerings in
            <a
              href="https://discord.com/channels/907475456293470209/915254480369516566"
              target="_blank"
              rel="noreferrer"
            >
              [💼ㆍapplications]
            </a>{" "}
            and{" "}
            <a
              href="https://discord.com/channels/907475456293470209/911564611592028182"
              target="_blank"
              rel="noreferrer"
            >
              [🌐ㆍlanding-page]
            </a>
          </ListItem>
          <ListItem>
            Defining a product roadmap and MVP - discussed in{" "}
            <a
              href="https://discord.com/channels/907475456293470209/910442407265447977"
              target="_blank"
              rel="noreferrer"
            >
              [🛒ㆍdev-ops]
            </a>
          </ListItem>
        </UnorderedList>
      </>
    ),
  },
  {
    title: "The Community Group 🌱",
    previewText: "Growing and developing our community and user base.",
    body: (
      <>
        We’re focused on communications, onboarding and community building.
        <br />
        Our current projects are:
        <br />
        <br />
        <UnorderedList>
          <ListItem>
            Improving onboarding - which is being discussed in{" "}
            <a
              href="https://discord.com/channels/907475456293470209/912398453701742633"
              target="_blank"
              rel="noreferrer"
            >
              [🌱ㆍgrowth]
            </a>{" "}
            and
            <a
              href="https://discord.com/channels/907475456293470209/917160643096891492"
              target="_blank"
              rel="noreferrer"
            >
              [🏙ㆍcomm-ops]
            </a>
          </ListItem>
          <ListItem>
            Bringing our vision to the world in{" "}
            <a
              href="https://discord.com/channels/907475456293470209/917164590939402280"
              target="_blank"
              rel="noreferrer"
            >
              [📡ㆍcommunications]
            </a>{" "}
            and
            <a
              href="https://discord.com/channels/907475456293470209/911564611592028182"
              target="_blank"
              rel="noreferrer"
            >
              [🌐ㆍlanding-page]
            </a>
          </ListItem>
        </UnorderedList>
      </>
    ),
  },
  {
    title: "The Coordination Group ♟",
    previewText: "Figuring out the best structures and mechanisms for the DAO.",
    body: (
      <>
        We’re focused on mechanism design, token economics and legal questions.
        <br />
        <br />
        Our current projects are:
        <UnorderedList>
          <ListItem>
            Building effective incentive structures - which is being discussed
            in{" "}
            <a
              href="https://discord.com/channels/907475456293470209/915750289737388073"
              target="_blank"
              rel="noreferrer"
            >
              [🔸ㆍtokenomics]
            </a>{" "}
            and{" "}
            <a
              href="https://discord.com/channels/907475456293470209/916009569463984148"
              target="_blank"
              rel="noreferrer"
            >
              [🙈ㆍcoordinape]
            </a>
          </ListItem>
          <ListItem>
            Drafting our initial proposals in{" "}
            <a
              href="https://discord.com/channels/907475456293470209/932371740645027860"
              target="_blank"
              rel="noreferrer"
            >
              [🏛ㆍproposals]
            </a>
          </ListItem>
        </UnorderedList>
      </>
    ),
  },
];

const WorkingGroup = ({ onFinished }: { onFinished(): void }) => {
  return <Reading content={WORKING_GROUP_CONTENT} onFinished={onFinished} />;
};

export default WorkingGroup;
