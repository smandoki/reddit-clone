import { Timestamp } from "firebase/firestore";
import RedditFace from "../../RedditFace";
import moment from "moment";
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
} from "@heroicons/react/24/outline";
import Spinner from "../../Spinner";

export type Comment = {
  id: string;
  creatorId: string;
  creatorDisplayText: string;
  communityId: string;
  postId: string;
  postTitle: string;
  text: string;
  createdAt: Timestamp;
};

type Props = {
  comment: Comment;
  onDeleteComment: (comment: Comment) => void;
  awaitingDelete: string;
  userId?: string;
};

function CommentItem({
  comment,
  onDeleteComment,
  awaitingDelete,
  userId,
}: Props) {
  return (
    <div className="flex">
      <div className="mr-2">
        <RedditFace className="h-8 w-8 fill-gray-300" />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex gap-1 items-center text-xs">
          <p className="font-bold">{comment.creatorDisplayText}</p>
          <p className="text-gray-600">
            {moment(new Date(comment.createdAt.seconds * 1000)).fromNow()}
          </p>

          {awaitingDelete === comment.id && <Spinner />}
        </div>

        <p className="text-sm">{comment.text}</p>

        <div className="flex gap-2 items-center text-gray-500">
          <ArrowUpCircleIcon className="h-5 w-5 cursor-pointer" />
          <ArrowDownCircleIcon className="h-5 w-5 cursor-pointer" />
          {userId === comment.creatorId && (
            <>
              <p className="text-xs hover:text-blue-500 cursor-pointer">Edit</p>
              <p
                className="text-xs hover:text-blue-500 cursor-pointer"
                onClick={() => onDeleteComment(comment)}
              >
                Delete
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
