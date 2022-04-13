import {
  Box,
  Flex,
  Center,
  VStack,
  Text,
  Button,
  UnorderedList,
  ListItem,
  Spacer,
} from "@chakra-ui/react";
import Link from "next/link";

import { DAO, DeSci, Intro, WorkingGroup } from "lib/components/reading";

export enum QuestState {
  Done = 0,
  // We may have multiple unlocked quests if the category is unlocked and the first sub quest would also be unlocked.
  Unlocked,
  Locked,
}

export enum QuestType {
  // This quest cannot be completed.
  None,

  // This quest can only be completed.
  Complete,
}

/// Content for the quest box.
export interface IQuest {
  // uuid representing this quest.
  id: string;

  // title for this quest.
  title: string;

  // body of the quest.
  //
  // Function that returns a JSX.Element.
  //
  // It takes an optional function to call onNext. If onNext is called it will trigger the reading component.
  body(isLocked?: boolean, onNext?: () => void): JSX.Element;

  // Optional reading element.
  reading?(onFinished: () => void): JSX.Element;

  titleImage?: string;

  // Type of quest.
  //
  // None will be for categories.
  // Complete will be for subtasks.
  //
  // TODO(jqphu): return ISubQuest or IQuestCategory instead of relying on yet another type.
  type: QuestType;

  // Every category has a badge
  // TODO(jqphu): likely refactor this so we just point to the parent.
  badge: IBadge;

  // If this is set, it's the last quest and we should also complete the parent given by this id.
  // TODO(jqphu): we need to just return the ISubQuest or IQuestCategory union
  // instead of dumping everything in IQuest. We're starting to leak details.
  completeParentId?: string;

  // Step completion indicator for. TODO(Lilyjjo): programatically do this
  questCompletionStep?: string;
}

export interface ISubQuest {
  // list title for this subquest
  listTitle: string;

  // QuestCategory itself is a quest to complete.
  content: IQuest;
}

// Quest category
export interface IQuestCategory {
  // QuestCategory itself is a quest to complete.
  content: IQuest;

  // List title for the quest
  listTitle: string;

  // image for an unlocked quest
  image_unlocked: string;

  // image for a locked quest
  image_locked: string;

  // Quests as part of this larger quest.
  subQuests?: ISubQuest[];
}

// Details for the badge.
export interface IBadge {
  title: string;
  description: string;

  // Message to display when we press complete and get the badge.
  completePopup: {
    introText: string;
    descriptiveText: string;
  };

  image: string;
}

const SEEDLING_BADGE = {
  title: "LabDAO Seedling",
  description: "Got started in LabDAO",
  completePopup: {
    introText:
      "For learning the LabDAO Basics, you've earned the LabDAO Seedling badge.",
    descriptiveText:
      "Badges represent your progress through the LabDAO onboarding journey and some badges will unlock access to deeper parts of the community, for example specific Discord channels.",
  },
  image: "/badges/seedling.png",
};

const DESCI_BADGE = {
  title: "Learning about DeSci",
  description: "Read the basics on DeSci",
  completePopup: {
    introText:
      "You've earned the Learning about DeSci badge for journeying through this chapter.",
    descriptiveText:
      "Having this badge means that you're familiar with the basics of DeSci and DAOs, two concepts that are central to how LabDAO works. Reach out to a team member if you'd like to know more!",
  },
  image: "/badges/testtube.png",
};

const HELLO_BADGE = {
  title: "LabDAO Socialite",
  description: "Met the community",
  completePopup: {
    introText:
      "You've earned the Onboarded to LabDAO badge for journeying through this chapter.",
    descriptiveText:
      "From earning this badge, you'll have access to more channels in Discord and be eligible for joining a project in our Working Groups.",
  },
  image: "/badges/hello.png",
};

const CONTRIBUTOR_BADGE = {
  title: "LabDAO Contributor",
  description: "Made my first contribution",
  completePopup: {
    introText:
      "You've earned the LabDAO Contributor badge for journeying through this chapter.",
    descriptiveText:
      "Having this badge means that you've said hello and hopefully connected with some of the people in LabDAO. Find your circle of friends and collaborators in our Discord channel!",
  },
  image: "/badges/scientist.png",
};

const ONBOARDED_BADGE = {
  title: "Onboarded to LabDAO",
  description: "Ready to dive in!",
  completePopup: {
    introText:
      "You've earned the Onboarded to LabDAO badge for journeying through this chapter.",
    descriptiveText:
      "From earning this badge, you'll have access to more channels in Discord and be eligible for joining a project in our Working Groups.",
  },
  image: "/badges/labdao.png",
};

const ALWAYS_IMPROVING_BADGE = {
  title: "Always Improving",
  description: "Shared feedback to improve onboarding",
  completePopup: {
    introText:
      "For sharing feedback, you've earned the Always Improving badge.",
    descriptiveText: "",
  },
  image: "/badges/always_improving.png",
};

const LAB_DAO_BASICS_ID = "8e97016c-97e0-41a3-be3b-67ec5195f282";
const DESCI_CATEGORY_ID = "18d2425b-8dcd-41ef-8259-b20daafc99df";
const ONBOARDING_CATEGORY_ID = "64272c23-b2f0-43fc-bff2-bf50b7cf3243";
const TELL_US_CATEGORY_ID = "b0c116d4-0a1f-4369-818c-53981e30a3b4";
const CONTRIBUTOR_CATEGORY_ID = "2eda295e-b807-44b6-9f21-627ea86d1cef";
const SHARE_FEEDBACK_ID = "bae58188-bd3c-4ac8-84a2-390cd8e8f71c";

const LAB_DAO_BASICS = "LabDAO Basics";

const GREEN_LABDDAO = "/labdao_logo.png";
const GREEN_GRAPH_IMAGE = "/green_graph.png";
const GREEN_BOX_IMAGE = "/green_box.png";
const GREEN_HEADS_IMAGE = "/green_heads.png";
const GREEN_HELLO_IMAGE = "/green_hello.png";

const GRAY_GRAPH_IMAGE = "/gray_graph.png";
const GRAY_BOX_IMAGE = "/gray_box.png";
const GRAY_HEADS_IMAGE = "/gray_heads.png";
const GRAY_HELLO_IMAGE = "/gray_hello.png";

export const QUESTS: IQuestCategory[] = [
  {
    listTitle: LAB_DAO_BASICS,
    image_unlocked: GREEN_LABDDAO,
    image_locked: GREEN_LABDDAO,
    content: {
      id: LAB_DAO_BASICS_ID,
      title: LAB_DAO_BASICS,
      body: (isLocked?: boolean, onNext?: () => void) => (
        <Box>
          This Quest aims to give you an overview of LabDAO’s mission, why
          LabDAO exists and what you’ll be able to do as a part of our
          community.
          <br />
          <br />
          <Text fontWeight="bold">
            Click Begin Quest to read through this quick summary and get up to
            speed!
          </Text>
          <VStack>
            <br />
            <Button
              boxShadow="base"
              maxHeight="40%"
              bg="#B7FFDC"
              color="green.700"
              fontWeight="small"
              minWidth="60%"
              size="lg"
              onClick={onNext}
              isDisabled={isLocked}
            >
              Begin Quest
            </Button>
          </VStack>
          <br />
          Once you're done, click 'Complete' below to receive the LabDAO
          Seedling Reward badge.
        </Box>
      ),
      reading: (onFinished: () => void) => {
        return <Intro onFinished={onFinished} />;
      },
      titleImage: "labdao_logo.png",
      type: QuestType.Complete,
      badge: SEEDLING_BADGE,
      completeParentId: LAB_DAO_BASICS_ID,
    },
  },
  {
    listTitle: "Welcome to DeSci",
    image_unlocked: GREEN_GRAPH_IMAGE,
    image_locked: GRAY_GRAPH_IMAGE,
    content: {
      id: DESCI_CATEGORY_ID,
      badge: DESCI_BADGE,
      type: QuestType.None,
      titleImage: GREEN_GRAPH_IMAGE,
      title: "Welcome to DeSci",
      body: () => (
        <Flex flexGrow="1" flexDir="column" minHeight="full">
          <Text>
            This Quest Line covers three topics that are core to understanding
            how LabDAO functions:
            <br />
            <br />
            <UnorderedList spacing={5}>
              <ListItem>Why should I get involved?</ListItem>
              <ListItem>
                Intro to DeSci - a quick overview of Decentralized Science and
                how LabDAO fits in
              </ListItem>
              <ListItem>
                Intro to DAOs - a primer on Decentralized Autonomous
                Organizations
              </ListItem>
            </UnorderedList>
            <br />
            <Text fontWeight="bold">
              Click on one of these three Quests in the Quest Log to get
              started!
            </Text>
          </Text>
        </Flex>
      ),
    },
    subQuests: [
      {
        listTitle: "Why should I get involved?",
        content: {
          id: "86dc0121-92b9-4928-ba1d-772dfbb69f38",
          badge: DESCI_BADGE,
          title: "Why should I get involved?",
          questCompletionStep: "1/3",
          body: () => (
            <Flex flexGrow="1" flexDir="column" minHeight="full">
              <Text>
                We're working to create a future where anyone can start a
                biotech company from anywhere. In order to create better tools
                and systems to accelerate life sciences, we need a diverse set
                of experiences and skills! <br /> <br />
                <Text as="u">For developers and engineers</Text>: This is an
                opportunity to build products that will change the world for the
                better. <br /> <br />
                <Text as="u">
                  For scientists who understand the impact this can have on
                  academic or industry science
                </Text>
                : We need your help to ensure these tools solve important
                problems and to grow our user base.
                <br /> <br />
                If you want to help build a future where anyone can start a
                biotech company from anywhere: read on, we're sure there's some
                way you can help :)
              </Text>
            </Flex>
          ),
          type: QuestType.Complete,
        },
      },
      {
        listTitle: "Intro to DeSci",
        content: {
          id: "c9c060fb-ea08-4566-a467-e70354982d67",
          badge: DESCI_BADGE,
          questCompletionStep: "2/3",
          body: (isLocked?: boolean, onNext?: () => void) => (
            <Flex flexGrow="1" flexDir="column" minHeight="full">
              <Text>
                LabDAO is part of the DeSci movement - find out about DeSci and
                how we fit in. <br />
                <br />
                <Text fontWeight="bold">
                  How much do you know about decentralized science?
                </Text>
              </Text>
              <Flex
                flexGrow="1"
                flexDir="column"
                minHeight="full"
                minWidth="full"
                pt="15px"
              >
                <Spacer />
                <VStack>
                  <Button
                    boxShadow="base"
                    maxHeight="40%"
                    bg="#B7FFDC"
                    color="green.700"
                    fontWeight="small"
                    minWidth="60%"
                    size="lg"
                    onClick={onNext}
                    isDisabled={isLocked}
                  >
                    This is the first I'm hearing about it
                  </Button>
                  <Spacer />
                  <Button
                    boxShadow="base"
                    maxHeight="40%"
                    bg="#B7FFDC"
                    color="green.700"
                    fontWeight="small"
                    minWidth="60%"
                    size="lg"
                    onClick={onNext}
                    isDisabled={isLocked}
                  >
                    I know a little bit already
                  </Button>
                </VStack>
                <Text pt="6">
                  If you're up to speed on DeSci already, hit 'Complete' below
                  to continue your journey!{" "}
                </Text>
                <Spacer />
              </Flex>
            </Flex>
          ),
          reading: (onFinished: () => void) => {
            return <DeSci onFinished={onFinished} />;
          },
          title: "Intro to DeSci",
          type: QuestType.Complete,
        },
      },
      {
        listTitle: "Intro to DAOs",
        content: {
          id: "939614d2-74e8-402b-950c-fafaaf320de4",
          title: "Intro to DAOs",
          type: QuestType.Complete,
          completeParentId: DESCI_CATEGORY_ID,
          badge: DESCI_BADGE,
          questCompletionStep: "3/3",
          body: (isLocked?: boolean, onNext?: () => void) => (
            <Flex flexGrow="1" flexDir="column" minHeight="full">
              <Text>
                LabDAO is becoming a Decentralized Autonomous Organization.
                <br />
                <br />
                <Text fontWeight="bold">How much do you know about DAOs?</Text>
              </Text>
              {/* TODO: make buttons click somewhere */}
              <Flex
                flexGrow="1"
                flexDir="column"
                minHeight="full"
                minWidth="full"
                pt="15px"
              >
                <Spacer />
                <VStack>
                  <Button
                    boxShadow="base"
                    maxHeight="40%"
                    bg="#B7FFDC"
                    color="green.700"
                    fontWeight="small"
                    minWidth="60%"
                    size="lg"
                    onClick={onNext}
                    isDisabled={isLocked}
                  >
                    This is the first I'm hearing about it
                  </Button>
                  <Spacer />
                  <Button
                    boxShadow="base"
                    maxHeight="40%"
                    bg="#B7FFDC"
                    color="green.700"
                    fontWeight="small"
                    minWidth="60%"
                    size="lg"
                    onClick={onNext}
                    isDisabled={isLocked}
                  >
                    I know a little bit already
                  </Button>
                </VStack>
                <Text pt="6">
                  If you're already in the know about DAOs, hit 'Complete' below
                  to continue your journey!
                </Text>
                <Spacer />
              </Flex>
            </Flex>
          ),
          reading: (onFinished: () => void) => {
            return <DAO onFinished={onFinished} />;
          },
        },
      },
    ],
  },
  {
    listTitle: "Tell us about yourself",
    image_unlocked: GREEN_HELLO_IMAGE,
    image_locked: GRAY_HELLO_IMAGE,
    content: {
      titleImage: GREEN_HELLO_IMAGE,
      id: ONBOARDING_CATEGORY_ID,
      badge: ONBOARDED_BADGE,
      completeParentId: ONBOARDING_CATEGORY_ID,
      title: "Tell us about yourself",
      type: QuestType.Complete,
      body: (isLocked?: boolean) => (
        <Flex flexGrow="1" flexDir="column" minHeight="full">
          <Text>
            To help with joining our community, we'd like to get to know you and
            your background a bit more! <br /> <br />
            Tell us a bit about yourself so we can find the best place for you
            to help with the goal of creating a better marketplace for biotech
            and science.
            <br /> <br />
          </Text>
          <Flex flexGrow="1" flexDir="column" minHeight="full" minWidth="full">
            <Spacer />
            <VStack>
              <Spacer />
              <a
                href="https://forms.gle/N4e8gC3DjuZCaNU89"
                target="_blank"
                rel="noreferrer"
              >
                <Button
                  boxShadow="base"
                  maxHeight="40%"
                  bg="#B7FFDC"
                  color="green.700"
                  fontWeight="small"
                  minWidth="70%"
                  size="lg"
                  isDisabled={isLocked}
                >
                  Fill out our Onboarding Form
                </Button>
              </a>
            </VStack>
            <Spacer />
          </Flex>
        </Flex>
      ),
    },
  },
  {
    listTitle: "Connect with our community",
    image_unlocked: GREEN_HEADS_IMAGE,
    image_locked: GRAY_HEADS_IMAGE,
    content: {
      id: TELL_US_CATEGORY_ID,
      badge: HELLO_BADGE,
      titleImage: GRAY_HEADS_IMAGE,
      title: "Connect with our community",
      body: () => (
        <Flex flexGrow="1" flexDir="column" minHeight="full">
          <Text>
            An important part of this community is getting to know each other.
            <br /> <br />
            This Quest Line helps you tune into LabDAO's social channels in
            three ways:
            <br /> <br />
          </Text>
          <UnorderedList spacing={3}>
            <ListItem>
              Introducing yourself in Discord, our main communication platform
            </ListItem>
            <ListItem>
              Adding the LabDAO calendar, so you know what events you can get
              involved in
            </ListItem>
            <ListItem>
              Joining a community call, a great way to chat to other community
              members
            </ListItem>
          </UnorderedList>
          <br />
          <Text fontWeight="bold">
            Click on one of these three Quests in the Quest Log to get started!
          </Text>
        </Flex>
      ),
      type: QuestType.None,
    },
    subQuests: [
      {
        listTitle: "Introduce yourself",
        content: {
          id: "1bdcde5d-fbb6-44b3-a323-c4ba72410448",
          badge: HELLO_BADGE,
          title: "Introduce yourself",
          type: QuestType.Complete,
          questCompletionStep: "1/3",
          body: () => (
            <Flex flexGrow="1" flexDir="column" minHeight="full">
              <Text>
                We'd love to get to know you better. Introduce yourself in the
                &nbsp;
                <a
                  href="https://discord.com/channels/907475456293470209/914558088030339083"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Text
                    as="mark"
                    pb="2px"
                    color="#5F5D59"
                    fontWeight="small"
                    borderRadius="5px"
                    bg="#B7FFDC"
                  >
                    &nbsp;[#🤝ㆍintroductions]&nbsp;
                  </Text>{" "}
                </a>
                &nbsp; channel in our Discord! <br />
                <br />
                Introductions can be hard to write.If you're looking for some
                guidance, write about these topics:
                <br /> <br />
                &emsp; &emsp; 🧠 &ensp;What I'm interested in <br />
                &emsp; &emsp; 🛠 &ensp;What I'm working on <br />
                &emsp; &emsp; 🤸‍♂️ &ensp;What I'd like to do in LabDAO <br />{" "}
                <br />
                Have a look at others' introductions if you want some more
                inspiration! <br /> <br />
              </Text>
            </Flex>
          ),
        },
      },
      {
        listTitle: "Calendar",
        content: {
          id: "4c70819d-d020-4a6e-962d-a75196dc7c94",
          badge: HELLO_BADGE,
          title: "The LabDAO Calendar",
          questCompletionStep: "2/3",
          body: (isLocked?: boolean) => (
            <Flex flexGrow="1" flexDir="column" minHeight="full">
              <Text>
                Keep up to date with community events and meetings with the
                LabDAO Calendar. <br /> <br />
                We hold a number of AMAs, workshops and regular working group
                meetings where you can get to know others in LabDAO and DeSci!
                <br /> <br />
                <Text fontWeight="bold">
                  Add the LabDAO Calendar to your Google Calendar below.
                </Text>
                <br />
                <br />
                You can choose to show or hide the calendar by clicking the
                checkbox next to ‘LabDAO Calendar’ on the left of you Google
                calendar.
              </Text>
              <Flex
                flexGrow="1"
                flexDir="column"
                minHeight="full"
                minWidth="full"
              >
                <Spacer />
                <VStack>
                  <Spacer />
                  <a
                    href=" https://calendar.google.com/calendar/u/0?cid=Y192djc3YWY1ZWQ0OGZmdGRhMGZ0N2piYW1pMEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
                    target="_blank"
                  >
                    <Button
                      boxShadow="base"
                      maxHeight="40%"
                      bg="#B7FFDC"
                      color="green.700"
                      fontWeight="small"
                      minWidth="60%"
                      size="lg"
                      isDisabled={isLocked}
                    >
                      Subscribe to the LabDAO Calendar
                    </Button>
                  </a>
                </VStack>
                <Spacer />
              </Flex>
            </Flex>
          ),
          type: QuestType.Complete,
        },
      },
      {
        listTitle: "Join community call",
        content: {
          id: "e05b0a6a-b884-402b-878b-bcd47a562cbc",
          badge: HELLO_BADGE,
          title: "Join our community call",
          questCompletionStep: "3/3",
          body: () => (
            <Flex flexGrow="1" flexDir="column" minHeight="full">
              <Text>
                Hop into one of our community calls to say hello and get to know
                people. <br /> <br />
                Community calls are where you can meet the team and find out
                about what we're currently working on. <br /> <br />
                <Text fontWeight="bold">
                  Join one of our community calls held on Tuesdays at 4:00pm UTC
                  / 12:00pm EST.
                </Text>{" "}
                <br />
                You can find them on the LabDAO Calendar, along with other
                working group meetings which you're welcome to join!
              </Text>
            </Flex>
          ),
          type: QuestType.Complete,
          completeParentId: TELL_US_CATEGORY_ID,
        },
      },
    ],
  },
  {
    listTitle: "Becoming a contributor",
    image_unlocked: GREEN_BOX_IMAGE,
    image_locked: GRAY_BOX_IMAGE,
    content: {
      id: CONTRIBUTOR_CATEGORY_ID,
      badge: CONTRIBUTOR_BADGE,
      type: QuestType.None,
      titleImage: GREEN_BOX_IMAGE,
      title: "Becoming a Contributor",
      body: () => (
        <Flex flexGrow="1" flexDir="column" minHeight="full">
          <Text>
            LabDAO is built and operated by members who make meaningful
            contributions towards our mission. Smaller projects are easy to
            start and join. Large projects that require funding to support the
            work can be sponsored through a vote by the DAO.
            <br /> <br />
            This Quest Line takes you through three steps that will prepare you
            for starting or joining a project within LabDAO:
            <br />
            <br />
            <UnorderedList spacing={2}>
              <ListItem>
                Choosing your working group - finding the right group to
                coordinate with
              </ListItem>
              <ListItem>
                How we do things - understanding the tools we use to get things
                done
              </ListItem>
              <ListItem>
                Your first contribution - how to get involved for the first time
              </ListItem>
            </UnorderedList>
            <br />
            <Text fontWeight="bold">
              Click on one of these three Quests in the Quest Log to get
              started!
            </Text>
          </Text>
        </Flex>
      ),
    },
    subQuests: [
      {
        listTitle: "Choose your working group",
        content: {
          id: "8187bf3f-5478-4a01-a511-a6f101330597",
          badge: CONTRIBUTOR_BADGE,
          title: "Choose your working group",
          questCompletionStep: "1/3",
          body: (isLocked?: boolean, onNext?: () => void) => (
            <Flex flexGrow="1" flexDir="column" minHeight="full">
              <Text>
                LabDAO is organized into three main working groups. <br />{" "}
                <br />
                <Center>
                  <Text>
                    🤖 &ensp;Technology Group &ensp; | &ensp;🌱 &ensp;Community
                    Group &ensp;| &ensp; ♟ &ensp;Coordination Group
                  </Text>
                </Center>
                <br />
                <Text fontWeight="bold">
                  Find out about what each of these groups does here:
                </Text>
                <br />
                <Link href="/working-group" passHref>
                  <Center>
                    <Button
                      boxShadow="base"
                      maxHeight="40%"
                      bg="#B7FFDC"
                      color="green.700"
                      fontWeight="small"
                      minWidth="40%"
                      size="lg"
                      isDisabled={isLocked}
                      onClick={onNext}
                    >
                      Learn More
                    </Button>
                  </Center>
                </Link>
                <br />
                You can join groups in the{" "}
                <a
                  href="https://discord.com/channels/907475456293470209/932840134347481160"
                  target="_blank"
                  rel="noreferrer"
                >
                  [🎈ㆍclaim-your-role]{" "}
                </a>{" "}
                Discord channel if you’re interested!
              </Text>
            </Flex>
          ),
          reading: (onFinished: () => void) => {
            return <WorkingGroup onFinished={onFinished} />;
          },

          type: QuestType.Complete,
        },
      },
      {
        listTitle: "How we do things",
        content: {
          id: "8da1e269-420b-43f8-a0e2-0cd966507e87",
          title: "How we do things",
          badge: CONTRIBUTOR_BADGE,
          type: QuestType.Complete,
          questCompletionStep: "2/3",
          body: () => (
            <Flex flexGrow="1" flexDir="column" minHeight="full">
              <Text>
                This section will take you through how we get things done at
                LabDAO.
                <br />
                <br />
                Within the DAO we coordinate around a set of core tools:
                <br />
                <br />
                <UnorderedList spacing={1}>
                  <ListItem>
                    Discord - for instant messaging, coordination and community
                    announcements
                  </ListItem>
                  <ListItem>
                    GitHub - to track contributions and establish a shared truth
                  </ListItem>
                  <ListItem>
                    Coordinape - for tracking contributions to the project in a
                    peer-to-peer fasion
                  </ListItem>
                </UnorderedList>
                <br />
                <Text fontWeight="bold">
                  Make sure you have access to our Discord and Github!
                </Text>
                <br />
                To get access to Github, ask fellow members of your working
                group.
                <br />
              </Text>
            </Flex>
          ),
        },
      },
      {
        listTitle: "Your first contribution",
        content: {
          id: "fead500e-63b5-4b39-bc54-0851dd886d6a",
          title: "Your first contribution",
          type: QuestType.Complete,
          questCompletionStep: "3/3",
          badge: CONTRIBUTOR_BADGE,
          completeParentId: CONTRIBUTOR_CATEGORY_ID,
          body: () => (
            <Flex flexGrow="1" flexDir="column" minHeight="full">
              <Text>
                You've made it far traveller!
                <br />
                <br />
                Now that you're familiar, if you have an idea for a new project
                or want to join an existing team, head over to{" "}
                <Text as="u">
                  <a
                    target="_blank"
                    href="https://www.notion.so/Projects-for-Contributors-1f3a4bbe147e485faeab4eafdbca56cc"
                    rel="noreferrer"
                  >
                    Projects for Contributors
                  </a>
                </Text>{" "}
                to see what we are currently working on.
                <br />
                <br />
                Within each project, contributors work together on Discord or
                Github by contributing their work to repositories and opening
                issues to discuss changes.
                <br />
                <br />
                <Text fontWeight="bold">
                  Reach out in the Discord working group channels to coordinate
                  with others on a project!
                </Text>
              </Text>
            </Flex>
          ),
        },
      },
    ],
  },
  {
    listTitle: "Share feedback",
    image_unlocked: "/green_feedback.png",
    image_locked: "/gray_feedback.png",
    content: {
      id: SHARE_FEEDBACK_ID,
      title: "Share feedback",
      body: () => (
        <Flex flexGrow="1" flexDir="column" minHeight="full">
          <Text>
            We’re constantly looking to improve the onboarding journey.
            <br />
            <br />
            As someone who’s travelled through the journey recently, we’d love
            to hear your feedback on your experience, what you found helpful and
            what could be improved.
            <br />
            <br />
            Reach out to us through the typeform below with some meaningful
            feedback, and you’ll earn the Always Improving badge below.
          </Text>
          <br />
          <Flex flexGrow="1" flexDir="column" minHeight="full" minWidth="full">
            <Spacer />
            <VStack>
              <Spacer />
              <a
                href="https://form.typeform.com/to/toRPr1qW"
                target="_blank"
                rel="noreferrer"
              >
                <Button
                  boxShadow="base"
                  maxHeight="40%"
                  bg="#B7FFDC"
                  color="green.700"
                  fontWeight="small"
                  minWidth="70%"
                  size="lg"
                >
                  Share your feedback
                </Button>
              </a>
            </VStack>
            <Spacer />
          </Flex>
        </Flex>
      ),
      titleImage: "green_feedback.png",
      type: QuestType.Complete,
      badge: ALWAYS_IMPROVING_BADGE,
      completeParentId: SHARE_FEEDBACK_ID,
    },
  },
];

// An array of IDs in order.
export const QUEST_ID_ARRAY = (() => {
  const questIds = [];
  for (const questCategory of QUESTS) {
    questIds.push(questCategory.content.id);

    if (questCategory.subQuests) {
      for (const quest of questCategory.subQuests) {
        questIds.push(quest.content.id);
      }
    }
  }

  return questIds;
})();

// Get the content by id, the content must exist.
export const getContentById = (id: string): IQuest => {
  for (const questCategory of QUESTS) {
    if (questCategory.content.id === id) {
      return questCategory.content;
    }

    if (questCategory.subQuests) {
      for (const quest of questCategory.subQuests) {
        if (quest.content.id === id) {
          return quest.content;
        }
      }
    }
  }

  // Should never reach here.
  throw new Error(`not found ${id}`);
};

// Get next quest.
//
// id must exist.
// returns undefined if there is no next quest.
export const getNextQuestId = (id: string): string | undefined => {
  const index = QUEST_ID_ARRAY.indexOf(id);

  if (index === -1) {
    // Should never reach here.
    throw new Error(`not found ${id}`);
  }

  if (index === QUEST_ID_ARRAY.length - 1) {
    return undefined;
  }

  return QUEST_ID_ARRAY[+index + 1];
};
