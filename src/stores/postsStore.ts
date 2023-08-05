import {
  Timestamp,
  collection,
  deleteDoc,
  doc,
  writeBatch,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { create } from "zustand";
import { auth, firestore, storage } from "../firebase/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAuthModalStore } from "./authModalStore";

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

export type PostVote = {
  id: string;
  postId: string;
  communityId: string;
  voteValue: number;
};

interface PostState {
  selectedPost: Post | null;
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  postVotes: PostVote[];
  setPostVotes: (postVotes: PostVote[]) => void;
}

export const usePostStore = create<PostState>()((set) => ({
  selectedPost: null,
  posts: [],
  setPosts: (posts: Post[]) =>
    set({
      posts,
    }),
  postVotes: [],
  setPostVotes: (postVotes: PostVote[]) =>
    set({
      postVotes,
    }),
}));

export function usePosts() {
  const { posts, setPosts, postVotes, setPostVotes } = usePostStore();
  const [user] = useAuthState(auth);
  const { setAuthModalState } = useAuthModalStore();

  async function onVote(post: Post, vote: number, communityId: string) {
    if (!user) {
      setAuthModalState(true, "login");
      return;
    }

    try {
      const { voteStatus } = post;
      const existingVote = postVotes.find(
        (postVote) => postVote.postId === post.id
      );

      const batch = writeBatch(firestore);
      const updatedPost = { ...post };
      const updatedPosts = [...posts];
      let updatedPostVotes = [...postVotes];
      let voteChange = vote;

      if (!existingVote) {
        const postVoteRef = doc(
          collection(firestore, "users", `${user.uid}/postVotes`)
        );

        const newVote: PostVote = {
          id: postVoteRef.id,
          postId: post.id!,
          communityId,
          voteValue: vote,
        };

        batch.set(postVoteRef, newVote);

        updatedPost.voteStatus = voteStatus + vote;
        updatedPostVotes = [...updatedPostVotes, newVote];
      } else {
        const postVoteRef = doc(
          firestore,
          "users",
          `${user.uid}/postVotes/${existingVote.id}`
        );

        if (existingVote.voteValue === vote) {
          updatedPost.voteStatus = voteStatus - vote;
          updatedPostVotes = updatedPostVotes.filter(
            (vote) => vote.id !== existingVote.id
          );

          batch.delete(postVoteRef);

          voteChange *= -1;
        } else {
          updatedPost.voteStatus = voteStatus + 2 * vote;

          const voteIndex = postVotes.findIndex(
            (vote) => vote.id === existingVote.id
          );
          updatedPostVotes[voteIndex] = {
            ...existingVote,
            voteValue: vote,
          };

          batch.update(postVoteRef, { voteValue: vote });

          voteChange = 2 * vote;
        }
      }

      const postRef = doc(firestore, "posts", post.id!);
      batch.update(postRef, { voteStatus: voteStatus + voteChange });

      await batch.commit();

      const postIndex = posts.findIndex((item) => item.id === post.id);
      updatedPosts[postIndex] = updatedPost;

      setPosts(updatedPosts);
      setPostVotes(updatedPostVotes);
    } catch (error: any) {
      console.log("onVote error", error.message);
    }
  }

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
    postVotes,
    setPosts,
    onVote,
    onSelectPost,
    onDeletePost,
  };
}
