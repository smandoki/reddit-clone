import {
  Timestamp,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { create } from "zustand";
import { auth, firestore, storage } from "../firebase/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAuthModalStore } from "./authModalStore";
import { useCommunityStore } from "./communityStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  setSelectedPost: (post: Post) => void;
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  postVotes: PostVote[];
  setPostVotes: (postVotes: PostVote[]) => void;
}

export const usePostStore = create<PostState>()((set) => ({
  selectedPost: null,
  setSelectedPost: (post: Post) => set({ selectedPost: post }),
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
  const {
    posts,
    setPosts,
    postVotes,
    setPostVotes,
    selectedPost,
    setSelectedPost,
  } = usePostStore();
  const [user] = useAuthState(auth);
  const { setAuthModalState } = useAuthModalStore();
  const { currentCommunity } = useCommunityStore();
  const navigate = useNavigate();

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

      if (selectedPost) {
        setSelectedPost(updatedPost);
      }
    } catch (error: any) {
      console.log("onVote error", error.message);
    }
  }

  async function getPostVotes(communityId: string) {
    const postVotesQuery = query(
      collection(firestore, "users", `${user?.uid}/postVotes`),
      where("communityId", "==", communityId)
    );

    const postVoteDocs = await getDocs(postVotesQuery);
    const postVotes = postVoteDocs.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as PostVote)
    );

    setPostVotes(postVotes);
  }

  function onSelectPost(post: Post) {
    setSelectedPost(post);
    navigate(`/r/${post.communityId}/comments/${post.id}`);
  }

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

  useEffect(() => {
    if (currentCommunity?.id && user) {
      getPostVotes(currentCommunity.id);
    }
  }, [currentCommunity, user]);

  useEffect(() => {
    if (!user) {
      setPostVotes([]);
    }
  }, [user]);

  return {
    posts,
    postVotes,
    selectedPost,
    setSelectedPost,
    setPosts,
    onVote,
    onSelectPost,
    onDeletePost,
    getPostVotes,
  };
}
