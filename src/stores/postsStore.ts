import { Timestamp, deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { create } from "zustand";
import { firestore, storage } from "../firebase/firebaseConfig";

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

  async function onDeletePost(post: Post): Promise<boolean> {
    try {
      if (post.imageURL) {
        const imageRef = ref(storage, `posts/${post.id}/image`);
        await deleteObject(imageRef);
      }

      const postDocRef = doc(firestore, "posts", post.id!);
      await deleteDoc(postDocRef);

      setPosts(posts.filter((item) => item.id !== post.id));
    } catch (error: any) {
      console.log("onDeletePost", error.message);
      return false;
    }

    return true;
  }

  return {
    posts,
    setPosts,
    onVote,
    onSelectPost,
    onDeletePost,
  };
}
