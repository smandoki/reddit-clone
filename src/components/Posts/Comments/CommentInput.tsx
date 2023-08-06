import { User } from "firebase/auth";
import LoadingButton from "../../LoadingButton";

type Props = {
  commentText: string;
  setCommentText: (value: string) => void;
  user?: User | null;
  createLoading: boolean;
  onCreateComment: (commentText: string) => void;
};

function CommentInput({
  commentText,
  setCommentText,
  user,
  createLoading,
  onCreateComment,
}: Props) {
  function onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setCommentText(e.target.value);
  }

  return (
    <div className="flex flex-col w-full">
      {user ? (
        <p>
          Comment as{" "}
          <span className="text-blue-500">
            {user.displayName || user.email?.split("@")[0]}
          </span>
        </p>
      ) : (
        <p>Login or signup to leave a comment</p>
      )}

      <div className="flex flex-col w-full border border-gray-300 rounded mt-1 focus-within:border-black">
        <textarea
          name="commentText"
          value={commentText}
          rows={6}
          placeholder="What are your thoughts?"
          className="rounded-tl rounded-tr outline-none py-2 px-3"
          onChange={onChange}
        ></textarea>

        <div className="flex justify-end p-2 bg-gray-100 rounded-bl rounded-br">
          <LoadingButton
            isLoading={createLoading}
            onClick={onCreateComment}
            disabled={!user}
            className="rounded-full bg-blue-500 text-white py-1 px-5 text-sm font-semibold hover:brightness-95 active:brightness-90"
          >
            Comment
          </LoadingButton>
        </div>
      </div>
    </div>
  );
}

export default CommentInput;
