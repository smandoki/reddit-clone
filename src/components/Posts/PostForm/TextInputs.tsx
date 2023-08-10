import { useParams } from "react-router-dom";
import LoadingButton from "../../LoadingButton";
import { useCommunityData } from "../../../stores/communityStore";

type Props = {
  textInputs: {
    title: string;
    body: string;
  };
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleCreatePost: () => void;
  loading: boolean;
};

function TextInputs({
  textInputs,
  onChange,
  handleCreatePost,
  loading,
}: Props) {
  const { communityId } = useParams();
  const { currentCommunity } = useCommunityData();

  return (
    <div className="flex flex-col gap-3 w-full p-3">
      <input
        name="title"
        value={textInputs.title}
        onChange={onChange}
        type="text"
        placeholder="Title"
        className="border border-gray-200 text-xs rounded p-2 outline-none focus:border-black"
      />
      <textarea
        name="body"
        value={textInputs.body}
        onChange={onChange}
        placeholder="Text (optional)"
        rows={8}
        className="border border-gray-200 text-xs rounded p-2 outline-none focus:border-black"
      ></textarea>
      <div className="flex justify-end border-t border-gray-200 pt-3">
        <LoadingButton
          isLoading={loading}
          disabled={!textInputs.title || (!communityId && !currentCommunity)}
          onClick={handleCreatePost}
          className="rounded-full bg-blue-500 text-white py-1.5 px-5 text-sm font-semibold hover:brightness-95 active:brightness-90"
        >
          Post
        </LoadingButton>
      </div>
    </div>
  );
}

export default TextInputs;
