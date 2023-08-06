import { useAuthState } from "react-firebase-hooks/auth";
import PageContent from "../components/Layout/PageContent";
import PostItem from "../components/Posts/PostItem";
import { Post, usePosts } from "../stores/postsStore";
import { auth, firestore } from "../firebase/firebaseConfig";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import About from "../components/Community/About";
import { useCommunityData } from "../stores/communityStore";

type Props = {};

function CommentsPage({}: Props) {
  const { onVote, onDeletePost, postVotes, selectedPost, setSelectedPost } =
    usePosts();
  const [user] = useAuthState(auth);
  const { postId } = useParams();
  const { currentCommunity } = useCommunityData();

  async function fetchPost(postId: string) {
    try {
      const postDocRef = doc(firestore, "posts", postId);
      const postDoc = await getDoc(postDocRef);

      setSelectedPost({
        id: postDoc.id,
        ...postDoc.data(),
      } as Post);
    } catch (error: any) {
      console.log("fetchPost error", error.message);
    }
  }

  useEffect(() => {
    if (!selectedPost && postId) {
      fetchPost(postId);
    }
  }, [postId, selectedPost]);

  return (
    <PageContent>
      <>
        {selectedPost && (
          <PostItem
            key={selectedPost?.id}
            post={selectedPost}
            userIsCreator={user?.uid === selectedPost?.creatorId}
            onVote={onVote}
            onDeletePost={onDeletePost}
            userVoteValue={
              postVotes.find((vote) => vote.postId === selectedPost?.id)
                ?.voteValue
            }
          />
        )}
      </>
      <>{currentCommunity && <About communityData={currentCommunity} />}</>
    </PageContent>
  );
}

export default CommentsPage;
