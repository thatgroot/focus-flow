import { controllers } from "@/utils/crud";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { I18n } from "i18n-js";
import { Alert } from "react-native";
import { create, useStore } from "zustand";

type State = {
  i18n?: I18n;
  locale: "en" | "ar";
  group?: Group;
  studySession?: StudySession;
  groupInfo?: Group;
  groups: Group[];
  searched_groups: Group[];
  my_groups: Group[];
  type?: ScheduleType;
  tags: string[];
  scheduleItem?: Schedule;
};

type Actions = {
  setType: (type: ScheduleType) => void;
  setTags: (tag: string[]) => void;
  setScheduleItem: (data: Schedule) => void;
  setGroup: (group: Group) => void;
  joinedGroups: () => void;
  loadMyGroups: () => void;
  searchGroups: (text: string) => void;
  groupSession: (id: string) => void;
  setLocale: (type: "en" | "ar") => void;
};

export const useAppStore = create<State & Actions>((set) => ({
  locale: "en",
  tags: [],
  groups: [],
  my_groups: [],
  searched_groups: [],
  scheduleItem: {
    startDate: new Date(),
    endDate: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    note: "",
    schedule: "daily",
    completionStatus: false,
    tags: [],
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
  loadMyGroups: () => {
    controllers.group.get().then((data) => {
      set({
        my_groups: data ?? [],
      });
    });
  },
  searchGroups: (text: string) => {

      controllers.group.search({ title: text }).then((data) => {
        if (data) {
          set({
            searched_groups: data,
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
