import assert from "assert";
import { atom, selectorFamily, selector } from "recoil";

import { QUESTS, QUEST_ID_ARRAY, QuestState } from "lib/data";

export interface User {
  /// Whether the user is authenticated/logged in.
  authenticated: boolean;

  /// User email.
  email: string;

  /// UUID for the user.
  id: string;

  /// Profile Picture
  picture: string;

  /// Full Discrod Name
  fullName: string;

  /// Completed Quest IDs
  completedQuestIds: string[];
}

export const UnknownUser = {
  id: "ee52113d-2876-4884-9d89-becb97bd255e",
  authenticated: false,
  email: "unknown@unknown.com",
  picture: "/default_profile.png",
  fullName: "Unknown User",
  completedQuestIds: [],
};

/// The current user state.
export const userState = atom<User>({
  key: "userState",
  default: UnknownUser,
  effects: [
    ({ onSet }) => {
      onSet((value) => {
        // Store the local storage value.
        window.localStorage.setItem("labdao-user", JSON.stringify(value));
      });
    },
  ],
});

// State of the quest (Done, Unlocked, Locked).
//
// The algorithm we use is as follows.
//
// 1. Check if it is done, if it is just return.
//
// 2. If it is not done, we try to find the first unfinished category.
//   1. If the unfinished category has no subchildren, then we mark it as unlocked if it matches the id.
//   2. If the unfinished category has subchildren - then we try find the first unlocked subchild. Then we mark that subchild as unlocked if it matches the id.
export const questState = selectorFamily({
  key: "questState",
  get:
    (id: string) =>
    ({ get }) => {
      const { completedQuestIds } = get(userState);

      const isQuestCompleted = (questId: string) =>
        completedQuestIds.find(
          (completedId: string) => questId === completedId
        );

      if (isQuestCompleted(id)) {
        return QuestState.Done;
      }

      // We know the quest is not completed - it's either unlocked or locked.

      // Let's find the first uncompleted quest Category.
      let firstUnfinishedCategoryIndex;
      for (const index in QUESTS) {
        if (!isQuestCompleted(QUESTS[index].content.id)) {
          firstUnfinishedCategoryIndex = +index;
          break;
        }
      }

      // We must find a category that's not finished since this id is not done.
      assert(firstUnfinishedCategoryIndex !== undefined);

      const unfinishedQuest = QUESTS[firstUnfinishedCategoryIndex];

      // This category is unlcoked.
      if (unfinishedQuest.content.id === id) {
        return QuestState.Unlocked;
      }

      // If there are subquests.
      if (unfinishedQuest.subQuests) {
        let unfinishedSubQuestId;
        for (const quest of unfinishedQuest.subQuests) {
          if (!isQuestCompleted(quest.content.id)) {
            unfinishedSubQuestId = quest.content.id;
            break;
          }
        }

        // We could have yet to mark the entire task as finished.
        if (unfinishedSubQuestId && unfinishedSubQuestId === id) {
          return QuestState.Unlocked;
        }
      }

      // Everything else is locked!
      return QuestState.Locked;
    },
});

/// Current selected quest.
export const selectedQuestState = atom<string>({
  key: "selectedQuestState",
  default: QUESTS[0].content.id,
  effects: [
    ({ onSet }) => {
      onSet((value) => {
        // Store the local storage value.
        window.localStorage.setItem("labdao-selectedQuestState", value);
      });
    },
  ],
});

export const isCurrentlySelectedState = selectorFamily({
  key: "isCurrentlySelectedState",
  get:
    (id: string) =>
    ({ get }) =>
      get(selectedQuestState) === id,
});

export const progressState = selector<number>({
  key: "progressState",
  get: ({ get }) => {
    const completed = get(userState).completedQuestIds.length;
    return (completed * 100) / QUEST_ID_ARRAY.length;
  },
});
