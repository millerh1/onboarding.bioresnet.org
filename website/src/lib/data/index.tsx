import {
  Box,
  Flex,
  chakra,
  VStack,
  Text,
  Button,
  UnorderedList,
  ListItem,
  Spacer,
} from "@chakra-ui/react";

import { DAO, DeSci, Intro } from "lib/components/reading";

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

  // This quest has a next button.
  Next,
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
  // onComplete completes the quest
  body(
    isLocked?: boolean,
    onNext?: () => void,
    onComplete?: () => void
  ): JSX.Element;

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
    descriptiveText?: string;
  };

  image: string;
}

const SEEDLING_BADGE = {
  title: "LabDAO Seedling",
  description: "Got started in LabDAO",
  completePopup: {
    introText:
      "For learning the LabDAO Basics, you've earned the LabDAO Seedling badge.",
  },
  image: "/badges/seedling.png",
};

const DESCI_BADGE = {
  title: "Learning about DeSci",
  description: "Read the basics on DeSci",
  completePopup: {
    introText:
      "You've earned the Learning about DeSci badge for journeying through this chapter.",
  },
  image: "/badges/testtube.png",
};

const DAO_BADGE = {
  title: "Learning about DAOs",
  description: "Read the basics on DAOs",
  completePopup: {
    introText:
      "You've earned the Learning about DAOs badge for journeying through this chapter.",
  },
  image: "/badges/dao_badge.png",
};

const HELLO_BADGE = {
  title: "LabDAO Socialite",
  description: "Met the community",
  completePopup: {
    introText:
      "You've earned the LabDAO Socialite badge for journeying through this chapter.",
  },
  image: "/badges/hello.png",
};

const CONTRIBUTOR_BADGE = {
  title: "LabDAO Contributor",
  description: "Made my first contribution",
  completePopup: {
    introText:
      "You've earned the LabDAO Contributor badge for journeying through this chapter.",
  },
  image: "/badges/scientist.png",
};

const ONBOARDED_BADGE = {
  title: "Onboarded to LabDAO",
  description: "Ready to dive in!",
  completePopup: {
    introText:
      "You've earned the Onboarded to LabDAO badge for journeying through this chapter.",
  },
  image: "/badges/labdao.png",
};

const ALWAYS_IMPROVING_BADGE = {
  title: "Always Improving",
  description: "Shared feedback to improve onboarding",
  completePopup: {
    introText:
      "For sharing feedback, you've earned the Always Improving badge.",
    descriptiveText: "That's all there is to onboarding. Welcome to LabDAO!",
  },
  image: "/badges/always_improving.png",
};

const LAB_DAO_BASICS_ID = "8e97016c-97e0-41a3-be3b-67ec5195f282";
const DESCI_CATEGORY_ID = "18d2425b-8dcd-41ef-8259-b20daafc99df";
const DAO_CATEGORY_ID = "939614d2-74e8-402b-950c-fafaaf320de4";
const ONBOARDING_CATEGORY_ID = "64272c23-b2f0-43fc-bff2-bf50b7cf3243";
const TELL_US_CATEGORY_ID = "b0c116d4-0a1f-4369-818c-53981e30a3b4";
const CONTRIBUTOR_CATEGORY_ID = "2eda295e-b807-44b6-9f21-627ea86d1cef";
const SHARE_FEEDBACK_ID = "bae58188-bd3c-4ac8-84a2-390cd8e8f71c";

const LAB_DAO_BASICS = "LabDAO Basics";

const GREEN_LABDDAO = "/labdao_logo.png";
const GREEN_GRAPH_IMAGE = "/green_graph.png";
const GREEN_ATOM_IMAGE = "/green_atom.png";
const GREEN_BOX_IMAGE = "/green_box.png";
const GREEN_HEADS_IMAGE = "/green_heads.png";
const GREEN_HELLO_IMAGE = "/green_hello.png";

const GRAY_GRAPH_IMAGE = "/gray_graph.png";
const GRAY_BOX_IMAGE = "/gray_box.png";
const GRAY_ATOM_IMAGE = "/gray_atom.png";
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
          <Text>Lets start with the what, why and how of LabDAO.</Text>
          <VStack>
            <br />
            <br />
            <Button
              boxShadow="base"
              maxHeight="40%"
              bg="#B7FFDC"
              color="green.700"
              fontWeight="small"
              size="lg"
              onClick={onNext}
              isDisabled={isLocked}
            >
              Begin Quest
            </Button>
          </VStack>
        </Box>
      ),
      reading: (onFinished: () => void) => {
        return <Intro onFinished={onFinished} />;
      },
      titleImage: "labdao_logo.png",
      type: QuestType.None,
      badge: SEEDLING_BADGE,
      completeParentId: LAB_DAO_BASICS_ID,
    },
  },
  {
    listTitle: "Intro to DeSci",
    image_unlocked: GREEN_ATOM_IMAGE,
    image_locked: GRAY_ATOM_IMAGE,
    content: {
      id: DESCI_CATEGORY_ID,
      badge: DESCI_BADGE,
      completeParentId: DESCI_CATEGORY_ID,
      body: (
        isLocked?: boolean,
        onNext?: () => void,
        onComplete?: () => void
      ) => (
        <Flex flexGrow={1} flexDir="column" minHeight="full">
          <Text>
            LabDAO is part of a wider decentralized science movement
            <br />
            <br />
            <Text fontWeight="bold">
              How much do you already know about decentralized science?
            </Text>
          </Text>
          <Flex
            flexGrow={1}
            flexDir="column"
            minHeight="full"
            width="100%"
            pt="15px"
          >
            <Spacer />
            <VStack>
              <Button
                boxShadow="base"
                maxHeight="40%"
                minWidth="60%"
                bg="#B7FFDC"
                color="green.700"
                fontWeight="small"
                onClick={onNext}
                isDisabled={isLocked}
              >
                This is the first I'm hearing about it
              </Button>
              <Button
                boxShadow="base"
                maxHeight="40%"
                bg="#B7FFDC"
                color="green.700"
                fontWeight="small"
                minWidth="60%"
                onClick={onNext}
                isDisabled={isLocked}
              >
                I know a little bit already
              </Button>
              <Button
                boxShadow="base"
                maxHeight="40%"
                bg="#B7FFDC"
                color="green.700"
                fontWeight="small"
                minWidth="60%"
                onClick={onComplete}
                isDisabled={isLocked}
              >
                I'm familiar with DeSci
              </Button>
            </VStack>
          </Flex>
        </Flex>
      ),
      reading: (onFinished: () => void) => {
        return <DeSci onFinished={onFinished} />;
      },
      title: "Intro to DeSci",
      type: QuestType.None,
    },
  },
  {
    listTitle: "Intro to DAOs",
    image_unlocked: GREEN_GRAPH_IMAGE,
    image_locked: GRAY_GRAPH_IMAGE,
    content: {
      title: "Intro to DAOs",
      id: DAO_CATEGORY_ID,
      type: QuestType.None,
      completeParentId: DAO_CATEGORY_ID,
      badge: DAO_BADGE,
      body: (
        isLocked?: boolean,
        onNext?: () => void,
        onComplete?: () => void
      ) => (
        <Flex flexGrow={1} flexDir="column" minHeight="full">
          <Text>
            LabDAO is becoming a Decentralized Autonomous Organization.
            <br />
            <br />
            <Text fontWeight="bold">How much do you know about DAOs?</Text>
          </Text>
          {/* TODO: make buttons click somewhere */}
          <Flex
            flexGrow={1}
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
                onClick={onNext}
                isDisabled={isLocked}
              >
                This is the first I'm hearing about it
              </Button>
              <Button
                boxShadow="base"
                maxHeight="40%"
                bg="#B7FFDC"
                color="green.700"
                fontWeight="small"
                minWidth="60%"
                onClick={onNext}
                isDisabled={isLocked}
              >
                I know a little bit already
              </Button>
              <Button
                boxShadow="base"
                maxHeight="40%"
                bg="#B7FFDC"
                color="green.700"
                fontWeight="small"
                minWidth="60%"
                onClick={onComplete}
                isDisabled={isLocked}
              >
                I'm familiar with DAOs
              </Button>
            </VStack>
          </Flex>
        </Flex>
      ),
      reading: (onFinished: () => void) => {
        return <DAO onFinished={onFinished} />;
      },
    },
  },

  {
    listTitle: "Tell us about yourself",
    image_unlocked: GREEN_HELLO_IMAGE,
    image_locked: GRAY_HELLO_IMAGE,
    content: {
      titleImage: GREEN_HELLO_IMAGE,
      id: ONBOARDING_CATEGORY_ID,
      badge: HELLO_BADGE,
      completeParentId: ONBOARDING_CATEGORY_ID,
      title: "Tell us about yourself",
      type: QuestType.Complete,
      body: (isLocked?: boolean) => (
        <Flex flexGrow={1} flexDir="column" minHeight="full">
          <Text>
            To help with joining our community, we'd like to get to know you and
            your background a bit more! <br /> <br />
            Tell us a bit about yourself so we can find the best place for you
            to help with the goal of creating a better marketplace for biotech
            and science.
            <br /> <br />
          </Text>
          <Flex flexGrow={1} flexDir="column" minHeight="full" minWidth="full">
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
    listTitle: "How we do things",
    image_unlocked: GREEN_BOX_IMAGE,
    image_locked: GRAY_BOX_IMAGE,
    content: {
      id: CONTRIBUTOR_CATEGORY_ID,
      badge: ONBOARDED_BADGE,
      completeParentId: CONTRIBUTOR_CATEGORY_ID,
      type: QuestType.Complete,
      titleImage: GREEN_BOX_IMAGE,
      title: "How we do things",
      body: () => (
        <Flex flexGrow={1} flexDir="column" minHeight="full">
          <Text>
            LabDAO is built and operated by members who make meaningful
            contributions towards our mission. Smaller projects are easy to
            start and join. Large projects that require funding to support the
            work can be sponsored through a vote by the DAO.
          </Text>

          <br />

          <Text>Within the DAO we coordinate around a set of core tools:</Text>

          <br />
          <UnorderedList>
            <ListItem>
              <Text as={chakra.span} fontWeight="bold">
                Discord
              </Text>{" "}
              - for instant messaging, coordination and community announcements
            </ListItem>
            <ListItem>
              <Text as={chakra.span} fontWeight="bold">
                GitHub
              </Text>{" "}
              - to track contributions and establish a shared truth
            </ListItem>
            <ListItem>
              <Text as={chakra.span} fontWeight="bold">
                {" "}
                Coordinape
              </Text>{" "}
              - for tracking contributions to the project in a peer-to-peer
              fasion
            </ListItem>
          </UnorderedList>
          <br />

          <Text>
            To get started you’ll just need a Discord account. As you join
            projects and participate more in the DAO you’ll be guided through
            the Github and Coordinape onboarding process.
          </Text>
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
      badge: CONTRIBUTOR_BADGE,
      titleImage: GRAY_HEADS_IMAGE,
      title: "Connect with our community",
      body: () => (
        <Flex flexGrow={1} flexDir="column" minHeight="full">
          <Text>Let’s get you set up in the LabDAO community</Text>
        </Flex>
      ),
      type: QuestType.Next,
    },
    subQuests: [
      {
        listTitle: "Calendar",
        content: {
          id: "4c70819d-d020-4a6e-962d-a75196dc7c94",
          badge: HELLO_BADGE,
          title: "The LabDAO Calendar",
          body: (isLocked?: boolean) => (
            <Flex flexGrow={1} flexDir="column" minHeight="full">
              <Text>
                Keep up to date with community events and meetings with the
                LabDAO Calendar. <br /> <br />
                We hold a number of AMAs, workshops and regular working group
                meetings where you can get to know others in LabDAO and DeSci!
                <br /> <br />
                <Text fontWeight="bold">
                  Add the LabDAO Calendar to your Google Calendar below, and
                  plan to attend one of the weekly onboarding calls.
                </Text>
                <br />
              </Text>
              <Flex
                flexGrow={1}
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
                      size="md"
                      isDisabled={isLocked}
                    >
                      Subscribe to the LabDAO Calendar
                    </Button>
                  </a>
                </VStack>
                <br />
                <Text as="i">
                  Tip: You can choose to show or hide the calendar by clicking
                  the checkbox next to ‘LabDAO Calendar’ on the left of you
                  Google calendar.
                </Text>
                <Spacer />
              </Flex>
            </Flex>
          ),
          type: QuestType.Complete,
        },
      },
      {
        listTitle: "Your first contribution",
        content: {
          id: "fead500e-63b5-4b39-bc54-0851dd886d6a",
          title: "Your first contribution",
          type: QuestType.Complete,
          badge: HELLO_BADGE,
          completeParentId: TELL_US_CATEGORY_ID,
          body: (isLocked: boolean) => (
            <Flex flexGrow={1} flexDir="column" minHeight="full">
              <Text>
                You've made it far traveller!
                <br />
                <br />
                Now that you're familiar with LabDAO, you’re ready to join the
                Discord and start exploring how you can contribute to new or
                existing project teams.
                <br />
                <br />
                <Text fontWeight="bold">
                  Introduce yourself in the #introductions channel and explore
                  what’s going on within your working group of choice.
                </Text>
                <br />
                <VStack>
                  <Button
                    boxShadow="base"
                    maxHeight="40%"
                    bg="#B7FFDC"
                    color="green.700"
                    fontWeight="small"
                    minWidth="60%"
                    size="md"
                    isDisabled={isLocked}
                  >
                    Login with Discord
                  </Button>
                </VStack>
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
        <Flex flexGrow={1} flexDir="column" minHeight="full">
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
          <Flex flexGrow={1} flexDir="column" minHeight="full" minWidth="full">
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

export const SUB_QUEST_ID_TO_QUEST_NUMBER: Record<string, number> = {
  [LAB_DAO_BASICS_ID]: 0,

  [DESCI_CATEGORY_ID]: 1,
  [DAO_CATEGORY_ID]: 2,
  [ONBOARDING_CATEGORY_ID]: 3,

  [CONTRIBUTOR_CATEGORY_ID]: 4,

  [TELL_US_CATEGORY_ID]: 5,
  "1bdcde5d-fbb6-44b3-a323-c4ba72410448": 5,
  "fead500e-63b5-4b39-bc54-0851dd886d6a": 5,

  [SHARE_FEEDBACK_ID]: 6,
};

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
