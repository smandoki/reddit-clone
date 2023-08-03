import { Timestamp } from "firebase/firestore";
import { create } from "zustand";

export type Post = {
  communityId: string;
  creatorId: string;
  creatorDisplayName: string;
  title: string;
  body: string;
  numberOfComments: number;
  voteStatus: number;
  imageURL?: string;
  createdAt: Timestamp;
  communityImageUrl?: string;
};

interface PostState {
  selectedPost: Post | null;
  posts: Post[];
  //postVotes
}

export const useCommunityStore = create<PostState>()((set) => ({
  selectedPost: null,
  posts: [],
}));
