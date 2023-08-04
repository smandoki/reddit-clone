import { Post } from "../../stores/postsStore";
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  BookmarkIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  ArrowDownCircleIcon as ArrowDownCircleIconSolid,
  ArrowUpCircleIcon as ArrowUpCircleIconSolid,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import moment from "moment";
import { useState } from "react";
import LoadingButton from "../LoadingButton";

type Props = {
  post: Post;
  userIsCreator: boolean;
  userVoteValue?: number;
  onVote: () => {};
  onDeletePost: (post: Post) => Promise<boolean>;
  onSelectPost: () => void;
};

function PostItem({
  post,
  userIsCreator,
  userVoteValue,
  onVote,
  onDeletePost,
  onSelectPost,
}: Props) {
  const [error, setError] = useState("");
  const [awaitingDelete, setAwaitingDelete] = useState(false);

  async function handleDelete(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    try {
      e.stopPropagation();
      setAwaitingDelete(true);

      const success = await onDeletePost(post);

      if (!success) {
        throw new Error("Failed to delete post");
      }
    } catch (error: any) {
      console.log("handleDelete", error.message);
      setError(error.message);
    }

    setAwaitingDelete(false);
  }

  return (
    <div
      onClick={onSelectPost}
      className="flex border bg-white border-gray-300 rounded hover:border-gray-500 cursor-pointer"
    >
      <div className="flex flex-col items-center bg-gray-100 p-2 w-[40px] rounded-tl rounded-bl">
        {userVoteValue === 1 ? (
          <ArrowUpCircleIconSolid
            onClick={onVote}
            className="text-brand-100 cursor-pointer hover:bg-gray-300 rounded"
          />
        ) : (
          <ArrowUpCircleIcon
            onClick={onVote}
            className="text-gray-500 cursor-pointer hover:bg-gray-300 rounded"
          />
        )}

        <p className="text-sm text-gray-500">{post.voteStatus}</p>

        {userVoteValue === -1 ? (
          <ArrowDownCircleIconSolid
            onClick={onVote}
            className="text-brand-100 cursor-pointer hover:bg-gray-300"
          />
        ) : (
          <ArrowDownCircleIcon
            onClick={onVote}
            className="text-gray-500 cursor-pointer hover:bg-gray-300 rounded"
          />
        )}
      </div>

      <div className="flex flex-col w-full gap-1">
        {error && (
          <div className="flex gap-2 p-2 bg-red-200 items-center">
            <ExclamationCircleIcon className="h-7 w-7 stroke-white fill-red-600" />{" "}
            {error}
          </div>
        )}

        <div className="flex gap-[2px] items-center text-xs text-gray-500 p-2">
          <p>
            Posted by u/{post.creatorDisplayName}{" "}
            {moment(new Date(post.createdAt.seconds * 1000)).fromNow()}
          </p>
        </div>

        <h2 className="font-semibold text-base px-2">{post.title}</h2>
        <p className="text-sm px-2">{post.body}</p>

        {post.imageURL && (
          <div className="flex justify-center items-center p-2">
            <img
              src={post.imageURL}
              alt="Post Image"
              className="max-h-[460px]"
            />
          </div>
        )}

        <div className="flex items-center ml-1 mb-0.5 text-gray-500 text-xs">
          <div
            title="comment"
            className="flex items-center py-[8px] px-[10px] hover:bg-gray-200 cursor-pointer rounded"
          >
            <ChatBubbleLeftIcon className="h-4 w-4 mr-1" />
            <p>{post.numberOfComments}</p>
          </div>

          <div
            title="share"
            className="flex items-center py-[8px] px-[10px] hover:bg-gray-200 cursor-pointer rounded"
          >
            <ShareIcon className="h-4 w-4 mr-1" />
            <p>Share</p>
          </div>

          <div
            title="save"
            className="flex items-center py-[8px] px-[10px] hover:bg-gray-200 cursor-pointer rounded"
          >
            <BookmarkIcon className="h-4 w-4 mr-1" />
            <p>Save</p>
          </div>

          {userIsCreator && (
            <LoadingButton
              isLoading={awaitingDelete}
              onClick={handleDelete}
              title="delete"
              className={`flex justify-center items-center py-[8px] px-[10px] h-[32px] w-[80px] hover:bg-gray-200 cursor-pointer rounded ${
                awaitingDelete ? "border border-gray-300" : ""
              }`}
            >
              <TrashIcon className="h-4 w-4 mr-1" />
              <p>Delete</p>
            </LoadingButton>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostItem;
