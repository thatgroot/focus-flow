import { create } from 'zustand';

type State = {
  type: string;
  scheduleItem: Class | Task | any;
};

type SetTypeAction = (type: string) => void;
type SetScheduleItemAction = (data: Class | Task) => void;

type Actions = {
  setType: SetTypeAction;
  setScheduleItem: SetScheduleItemAction;
};

export const useDataStore = create<State & Actions>((set) => ({
  type: 'class',
  scheduleItem: {},
  setType: (type: string) => set({ type }),
  setScheduleItem: (data: Class | Task) => set({ scheduleItem: data }),
}));
