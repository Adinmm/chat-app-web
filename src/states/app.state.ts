import { create } from "zustand";

type AppState = {
  toggle: boolean;
  requestFriend: boolean;
  setToggle: (val: boolean) => void;
  setRequestFriend: (val: boolean) => void;
};

export const useAppStore = create<AppState>((set) => ({
  toggle: false,
  requestFriend: false,
  setRequestFriend: (val: boolean) => set({ requestFriend: val }),
  setToggle: (val: boolean) => set({ toggle: val }),
}));
