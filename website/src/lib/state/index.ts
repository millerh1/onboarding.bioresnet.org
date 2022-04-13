import assert from "assert";
import { atom, selectorFamily, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

import { QUESTS, QUEST_ID_ARRAY, QuestState } from "lib/data";
import { supabase } from "lib/util/supabase_client";

const { persistAtom } = recoilPersist();

interface User {
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

/// Update the local state of a profile based on the database.
export const updateProfile = (setUserState: (user: User) => void) => {
  const user = supabase.auth.user();
  if (user) {
    supabase
      .from("profiles")
      .select(
        `
        id,
        full_name,
        avatar_url,
        quests (
          quest_id
        )`
      )
      .eq("id", user.id)
      .single()
      .then(({ data: profile, error }) => {
        // User might not exist, which is fine.
        // TODO(jqphu): other errors?
        if (!error) {
          assert(user.email);

          setUserState({
            authenticated: true,
            email: user.email,
            id: profile.id,
            picture: profile.avatar_url,
            fullName: profile.full_name,
            completedQuestIds: profile.quests.map(
              (quest: { quest_id: string }) => quest.quest_id
            ),
          });
        }
      });
  }
};

/// The current user state.
export const userState = atom<User>({
  key: "userState",
  default: UnknownUser,
  effects: [
    ({ setSelf }) => {
      // Trigger an initial retrieval of the user
      updateProfile(setSelf);

      // Listen to any auth changes.
      supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === "SIGNED_IN") {
          const user = session?.user;
          const metadata = user?.user_metadata;

          if (metadata) {
            // TODO(jqphu): we probably shouldn't update this *every* login...
            const updates = {
              id: user.id,
              discord_name: metadata.name,
              full_name: metadata.full_name,
              avatar_url: metadata.picture,
              updated_at: new Date(),
            };

            const { error } = await supabase.from("profiles").upsert(updates, {
              returning: "minimal",
            });

            if (error) {
              throw new Error(JSON.stringify(error, null, 2));
            }

            updateProfile(setSelf);
          }
        } else if (event === "SIGNED_OUT") {
          setSelf(UnknownUser);
        }
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
  effects_UNSTABLE: [persistAtom],
  // TODO(jqphu): set default as the last task selected by the user.
});

export const isCurrentlySelectedState = selectorFamily({
  key: "isCurrentlySelectedState",
  get:
    (id: string) =>
    ({ get }) =>
      get(selectedQuestState) === id,
});

export const selectedAccordionIndexState = atom<number>({
  key: "selectedAccordionIndexState",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const progressState = selector<number>({
  key: "progressState",
  get: ({ get }) => {
    const completed = get(userState).completedQuestIds.length;
    return (completed * 100) / QUEST_ID_ARRAY.length;
  },
});
