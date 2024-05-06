import { controllers } from "@/utils/crud";
import { create } from "zustand";

type State = {
  group?: Group;
  studySession?: StudySession;
  groupInfo?: Group;
  groups: Group[];
  type?: ScheduleType;
  tags: string[];
  scheduleItem?: Schedule;
};

type SetTypeAction = (type: ScheduleType) => void;
type SetTagsAction = (tag: string[]) => void;
type SetGroupAction = (group: Group) => void;
type SetGroupsAction = () => void;
type SetGroupSearchAction = (text:string) => void;
type SetStudySessionAction = (id:string) => void;
type SetScheduleItemAction = (data: Schedule) => void;

type Actions = {
  setType: SetTypeAction;
  setTags: SetTagsAction;
  setScheduleItem: SetScheduleItemAction;
  setGroup: SetGroupAction;
  joinedGroups: SetGroupsAction;
  searchGroups: SetGroupSearchAction;
  groupSession: SetStudySessionAction
};

export const useAppStore = create<State & Actions>((set) => ({
  tags: [],
  groups: [],
  setType: (type: ScheduleType) => set({ type }),
  setTags: (tags: string[]) => set({ tags }),
  setGroup: (group: Group ) => set({ group }),
  joinedGroups: () => {
    controllers.group.joined().then((data) => {
      set({
        groups: data ?? [],
      });
    });
  },
  searchGroups: (text:string) => {
    controllers.group.search({title:text}).then((data) => {
      set({
        groups: data ?? []
      });
    });
  },
  groupSession: (id:string) => {
    controllers.group.sessions.getFor(id).then((data) => {
      set({
        studySession:  data  as StudySession
      });
    });
  },

  setScheduleItem: (data: Schedule) => set({ scheduleItem: data }),
}));
