import { useEffect, useState } from "react";
import { Community } from "../../stores/communityStore";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { auth, firestore } from "../../firebase/firebaseConfig";
import { Post, usePosts } from "../../stores/postsStore";
import PostItem from "./PostItem";
import { useAuthState } from "react-firebase-hooks/auth";
import PostSkeletonLoader from "./PostSkeletonLoader";

type Props = {
  communityData: Community;
};

function Posts({ communityData }: Props) {
  const [loading, setLoading] = useState(false);
  const { posts, setPosts, onVote, onDeletePost, onSelectPost, postVotes } =
    usePosts();
  const [user] = useAuthState(auth);

  async function getPosts() {
    setLoading(true);

    try {
      const postsQuery = query(
        collection(firestore, "posts"),
        where("communityId", "==", communityData.id),
        orderBy("createdAt", "desc")
      );

      const postDocs = await getDocs(postsQuery);

      const posts = postDocs.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Post)
      );

      setPosts(posts);
    } catch (error: any) {
      console.log("getPosts", error.message);
    }

    setLoading(false);
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {loading ? (
        <PostSkeletonLoader />
      ) : (
        <div className="flex flex-col mt-4 gap-4">
          {posts.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              userIsCreator={user?.uid === post.creatorId}
              onVote={onVote}
              onDeletePost={onDeletePost}
              onSelectPost={onSelectPost}
              userVoteValue={
                postVotes.find((vote) => vote.postId === post.id)?.voteValue
              }
            />
          ))}
        </div>
      )}
    </>
  );
}

export default Posts;
