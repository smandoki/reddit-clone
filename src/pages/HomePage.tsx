import React, { useEffect, useState } from "react";
import PageContent from "../components/Layout/PageContent";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebaseConfig";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { PostVote, usePosts } from "../stores/postsStore";
import { Post } from "../stores/postsStore";
import PostSkeletonLoader from "../components/Posts/PostSkeletonLoader";
import PostItem from "../components/Posts/PostItem";
import { useCommunityData } from "../stores/communityStore";

type Props = {};

function HomePage({}: Props) {
  const [user, loadingUser] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const {
    posts,
    setPosts,
    onSelectPost,
    onDeletePost,
    onVote,
    postVotes,
    setPostVotes,
  } = usePosts();
  const { mySnippets, snippetsFetched } = useCommunityData();

  async function buildUserHomeFeed() {
    setLoading(true);

    try {
      if (mySnippets.length === 0) {
        buildNoUserHomeFeed();
        setLoading(false);
        return;
      }

      const myCommunityIds = mySnippets.map((snippet) => snippet.communityId);
      const postQuery = query(
        collection(firestore, "posts"),
        where("communityId", "in", myCommunityIds),
        limit(10)
      );
      const postDocs = await getDocs(postQuery);

      const posts = postDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPosts(posts as Post[]);
    } catch (error: any) {
      console.log("buildUserHomeFeed", error.message);
    }

    setLoading(false);
  }

  async function buildNoUserHomeFeed() {
    setLoading(true);

    try {
      const postQuery = query(
        collection(firestore, "posts"),
        orderBy("voteStatus", "desc"),
        limit(10)
      );
      const postDocs = await getDocs(postQuery);

      const posts = postDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPosts(posts as Post[]);
    } catch (error: any) {
      console.log("buildNoUserHomeFeed", error.message);
    }

    setLoading(false);
  }

  async function getUserPostVotes() {
    try {
      const postIds = posts.map((post) => post.id);
      const postVotesQuery = query(
        collection(firestore, `users/${user?.uid}/postVotes`),
        where("postId", "in", postIds)
      );

      const PostVoteDocs = await getDocs(postVotesQuery);
      const postVotes = PostVoteDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPostVotes(postVotes as PostVote[]);
    } catch (error: any) {
      console.log("getUserPostVotes", error.message);
    }
  }

  useEffect(() => {
    if (!user && !loadingUser) buildNoUserHomeFeed();
  }, [user, loadingUser]);

  useEffect(() => {
    if (snippetsFetched) buildUserHomeFeed();
  }, [snippetsFetched]);

  useEffect(() => {
    if (user && posts.length) getUserPostVotes();

    return () => {
      setPostVotes([]);
    };
  }, [user, posts]);

  return (
    <PageContent>
      <>
        {loading ? (
          <PostSkeletonLoader />
        ) : (
          <div className="flex flex-col gap-3">
            {posts.map((post) => (
              <PostItem
                key={post.id}
                post={post}
                onSelectPost={() => onSelectPost(post)}
                onDeletePost={onDeletePost}
                onVote={onVote}
                userVoteValue={
                  postVotes.find((item) => item.postId === post.id)?.voteValue
                }
                userIsCreator={user?.uid === post.creatorId}
                homePage
              />
            ))}
          </div>
        )}
      </>
      <>
        {/* Top Communities */}
        {/* Reddit Premium */}
        {/* Home Component */}
      </>
    </PageContent>
  );
}

export default HomePage;
