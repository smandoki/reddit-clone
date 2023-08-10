import { create } from "zustand";

interface CommunityModalstate {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useCommunityModalStore = create<CommunityModalstate>()((set) => ({
  open: false,
  setOpen: (open) => set(() => ({ open })),
}));
