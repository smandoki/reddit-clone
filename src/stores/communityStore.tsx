import { Timestamp } from "firebase/firestore";
import { create } from "zustand";

export interface Community {
  id: string;
  creatorId: string;
  numberOfMembers: number;
  privacyType: "public" | "restricted" | "private";
  createdAt?: Timestamp;
  imageURL?: string;
}

// interface AuthModalstate {
//   open: boolean;
//   view: "login" | "signup" | "resetPassword";
//   setOpen: (open: boolean) => void;
//   setView: (view: "login" | "signup" | "resetPassword") => void;
//   setAuthModalState: (
//     open: boolean,
//     view: "login" | "signup" | "resetPassword"
//   ) => void;
// }

// export const useAuthModalStore = create<AuthModalstate>()((set) => ({
//   open: false,
//   view: "login",
//   setOpen: (open) => set(() => ({ open })),
//   setView: (view) => set(() => ({ view })),
//   setAuthModalState: (open, view) => set(() => ({ open, view })),
// }));
