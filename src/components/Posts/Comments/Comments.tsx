import { User } from "firebase/auth";
import { Post, usePosts } from "../../../stores/postsStore";
import { useEffect, useState } from "react";
import CommentInput from "./CommentInput";
import {
  Timestamp,
  collection,
  doc,
  getDocs,
  increment,
  orderBy,
  query,
  serverTimestamp,
  where,
  writeBatch,
} from "firebase/firestore";
import { firestore } from "../../../firebase/firebaseConfig";
import CommentItem, { Comment } from "./CommentItem";
import Spinner from "../../Spinner";

type Props = {
  user?: User | null;
  selectedPost: Post | null;
  communityId?: string;
};

function Comments({ user, selectedPost, communityId }: Props) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [createLoading, setCreateLoading] = useState(false);
  const { selectedPost: selectedPostInStore, setSelectedPost } = usePosts();

  async function onCreateComment() {
    if (!user) return;
    setCreateLoading(true);

    try {
      //create comment doc
      const batch = writeBatch(firestore);
      const commentDocRef = doc(collection(firestore, "comments"));

      const newComment: Comment = {
        id: commentDocRef.id,
        creatorId: user.uid,
        creatorDisplayText: user.displayName || user.email!.split("@")[0],
        communityId: communityId!,
        postId: selectedPost?.id!,
        postTitle: selectedPost?.title!,
        text: commentText,
        createdAt: serverTimestamp() as Timestamp,
      };

      batch.set(commentDocRef, newComment);

      newComment.createdAt = { seconds: Date.now() / 1000 } as Timestamp;

      //update number of comments on post
      const postDocRef = doc(firestore, "posts", selectedPost?.id!);
      batch.update(postDocRef, {
        numberOfComments: increment(1),
      });

      await batch.commit();

      //update client state
      setCommentText("");
      setComments((prev) => [newComment, ...prev]);

      setSelectedPost({
        ...selectedPostInStore,
        numberOfComments: selectedPostInStore?.numberOfComments! + 1,
      } as Post);
    } catch (error: any) {
      console.log("onCreateComment error", error.message);
    }

    setCreateLoading(false);
  }

  async function onDeleteComment(comment: Comment) {}

  async function getPostComments() {
    try {
      const commentsQuery = query(
        collection(firestore, "comments"),
        where("postId", "==", selectedPost?.id),
        orderBy("createdAt", "desc")
      );

      const commentDocs = await getDocs(commentsQuery);
      const comments = commentDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setComments(comments as Comment[]);
    } catch (error: any) {
      console.log("getPostComments", error.message);
    }

    setFetchLoading(false);
  }

  useEffect(() => {
    if (selectedPost) getPostComments();
  }, [selectedPost]);

  return (
    <div className="bg-white rounded-bl rounded-br p-2">
      <div className="flex flex-col pl-10 pr-4 mb-6 text-sm w-full">
        <CommentInput
          commentText={commentText}
          createLoading={createLoading}
          onCreateComment={onCreateComment}
          setCommentText={setCommentText}
          user={user}
        />
      </div>

      <div className="flex flex-col gap-6">
        {fetchLoading ? (
          <div className="flex items-center border-t border-gray-100 justify-center w-full h-[180px]">
            <Spinner />
          </div>
        ) : (
          <>
            {comments.length === 0 && (
              <div className="flex items-center border-t border-gray-100 justify-center w-full h-[180px] font-semibold text-gray-300">
                No Comments Yet
              </div>
            )}
          </>
        )}

        {comments.map((comment) => (
          <CommentItem
            comment={comment}
            onDeleteComment={onDeleteComment}
            awaitingDelete={false}
            userId={user?.uid}
          />
        ))}
      </div>
    </div>
  );
}

export default Comments;
