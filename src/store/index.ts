import create from "zustand";

type State = {
  selectedTab: string;
  selectedCharacter: number;
  selectTab: (curr: string) => void;
  selectCharacter: (id: number) => void;
};

export const useStore = create<State>((set) => ({
  selectedTab: "Character",
  selectedCharacter: 0,
  selectCharacter: (id: number) => set((state) => ({ ...state, selectedCharacter: id })),
  selectTab: (curr: string) => set((state) => ({ ...state, selectedTab: curr })),
}));
