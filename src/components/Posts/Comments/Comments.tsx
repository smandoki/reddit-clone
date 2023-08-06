import { User } from "firebase/auth";
import { Post } from "../../../stores/postsStore";
import { useEffect, useState } from "react";
import CommentInput from "./CommentInput";

type Props = {
  user?: User | null;
  selectedPost: Post | null;
  communityId?: string;
};

function Comments({ user, selectedPost, communityId }: Props) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);

  async function onCreateComment(commentText: string) {}

  async function onDeleteComment(comment: any) {}

  async function getPostComments() {}

  useEffect(() => {
    getPostComments();
  }, []);

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
    </div>
  );
}

export default Comments;
