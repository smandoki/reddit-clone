import { Timestamp } from "firebase/firestore";
import { create } from "zustand";

export type Post = {
  id?: string;
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
  setPosts: (posts: Post[]) => void;
}

export const usePostStore = create<PostState>()((set) => ({
  selectedPost: null,
  posts: [],
  setPosts: (posts: Post[]) =>
    set({
      posts,
    }),
}));

export function usePosts() {
  const { posts, setPosts } = usePostStore();

  async function onVote() {}

  function onSelectPost() {}

  async function onDeletePost() {}

  return {
    posts,
    setPosts,
    onVote,
    onSelectPost,
    onDeletePost,
  };
}
