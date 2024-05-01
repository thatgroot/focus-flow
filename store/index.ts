import  { createStore } from "zustand";

const useStore = createStore((set) => ({
  // Initialize state
  counter: 0,
  // Actions
  increment: () =>
    set({ counter: (state: { counter: number }) => state.counter + 1 }),
  decrement: () =>
    set({ counter: (state: { counter: number }) => state.counter - 1 }),
}));

export default useStore;
