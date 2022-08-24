import create from "zustand";

type State = {
  selectedTab: string;
  selectTab: (curr: string) => void;
};

export const useStore = create<State>((set) => ({
  selectedTab: "Character",
  selectTab: (curr: string) => set((state) => ({ ...state, selectedTab: curr })),
}));
