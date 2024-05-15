import { controllers } from "@/utils/crud";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { I18n } from "i18n-js";
import { create, useStore } from "zustand";

type State = {
  i18n?: I18n;
  locale: "en" | "ar";
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
type SetGroupSearchAction = (text: string) => void;
type SetStudySessionAction = (id: string) => void;
type SetScheduleItemAction = (data: Schedule) => void;

type Actions = {
  setType: SetTypeAction;
  setTags: SetTagsAction;
  setScheduleItem: SetScheduleItemAction;
  setGroup: SetGroupAction;
  joinedGroups: SetGroupsAction;
  searchGroups: SetGroupSearchAction;
  groupSession: SetStudySessionAction;
  setLocale: (type: "en" | "ar") => void;
};



export const useAppStore = create<State & Actions>((set) => ({
  locale:"en",
  tags: [],
  groups: [],
  scheduleItem:{
    startDate: new Date(),
    endDate: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    note: "",
    schedule: "daily",
    completionStatus: false,
    tags:[],
  },
  setType: (type: ScheduleType) => set({ type }),
  setLocale: (locale: "en" | "ar") => {
    AsyncStorage.setItem("locale", locale).then(() => {
      set({ locale });
    });
  },
  setTags: (tags: string[]) => set({ tags }),
  setGroup: (group: Group) => set({ group }),
  joinedGroups: () => {
    controllers.group.joined().then((data) => {
      set({
        groups: data ?? [],
      });
    });
  },
  searchGroups: (text: string) => {
    controllers.group.search({ title: text }).then((data) => {
      if (data) {
        set({
          groups: data,
        });
      }
    });
  },
  groupSession: (id: string) => {
    controllers.group.sessions.getFor(id).then((data) => {
      set({
        studySession: data as StudySession,
      });
    });
  },

  setScheduleItem: (data: Schedule) => set({ scheduleItem: data }),
}));
