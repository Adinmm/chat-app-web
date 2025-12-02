
import { create } from "zustand";

type AppState = {
  toggle: boolean;
  requestFriend: boolean;
  newChat: string;
  roomId: string;

  scrollBottom: boolean;
  setScrollBottom: (val: boolean) => void;
  setRoomId: (val: string) => void;
  setNewChat: (val: string) => void;
  setToggle: (val: boolean) => void;
  setRequestFriend: (val: boolean) => void;
};

export const useAppStore = create<AppState>((set) => ({
  toggle: false,
  requestFriend: false,
  newChat: "",
  roomId: "",
  setScrollBottom: (val: boolean) => set({ scrollBottom: val }),
  scrollBottom: false,
  setRoomId: (val: string) => set({ roomId: val }),
  setNewChat: (val: string) => set({ newChat: val }),
  setRequestFriend: (val: boolean) => set({ requestFriend: val }),
  setToggle: (val: boolean) => set({ toggle: val }),
}));
