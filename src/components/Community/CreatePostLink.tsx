import RedditAvatar from "../RedditAvatar";
import { PhotoIcon, LinkIcon } from "@heroicons/react/24/outline";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebaseConfig";
import { useAuthModalStore } from "../../stores/authModalStore";
import { useCommunityData } from "../../stores/communityStore";

type Props = {};

function CreatePostLink({}: Props) {
  const { communityId } = useParams();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const { setAuthModalState } = useAuthModalStore();
  const { resetCurrentCommunity } = useCommunityData();

  function onClick(query?: string) {
    if (!user) {
      setAuthModalState(true, "login");
      return;
    }

    if (communityId) {
      navigate(`/r/${communityId}/submit${query ? "?" + query : ""}`);
    } else {
      resetCurrentCommunity();
      navigate(`/submit${query ? "?" + query : ""}`);
    }
  }

  return (
    <div className="flex gap-3 bg-white items-center p-2 border border-gray-300 rounded">
      <RedditAvatar className="h-[38px] w-[38px] rounded-full bg-gray-300 fill-white border-gray-200 border-2" />
      <input
        type="text"
        onClick={() => onClick()}
        placeholder="Create Post"
        className="h-[38px] grow bg-gray-50 placeholder:text-gray-500 p-2 rounded border border-gray-200 hover:bg-white focus:bg-white hover:border-blue-500 focus:border-blue-500 outline-none"
      />
      <PhotoIcon
        onClick={() => onClick("media")}
        title="Create Media Post"
        className="p-1.5 h-[36px] w-[36px] text-gray-400 hover:bg-gray-200 rounded active:brightness-95"
      />
      <LinkIcon
        onClick={() => onClick("url")}
        title="Post a Link"
        className="p-1.5 h-[36px] w-[36px] text-gray-400 hover:bg-gray-200 rounded active:brightness-95"
      />
    </div>
  );
}

export default CreatePostLink;
