import { useAuthState } from "react-firebase-hooks/auth";
import RedditFace from "../RedditFace";
import { auth } from "../../firebase/firebaseConfig";
import { useCommunityModalStore } from "../../stores/communityModalStore";
import { useAuthModalStore } from "../../stores/authModalStore";
import { Link } from "react-router-dom";
import { useCommunityData } from "../../stores/communityStore";

type Props = {};

function PersonalHome({}: Props) {
  const [user] = useAuthState(auth);
  const { setOpen } = useCommunityModalStore();
  const { setAuthModalState } = useAuthModalStore();
  const { resetCurrentCommunity } = useCommunityData();

  function onOpenCommunityModal() {
    if (!user) {
      setAuthModalState(true, "login");
      return;
    }

    setOpen(true);
  }

  return (
    <div className="bg-white rounded flex flex-col">
      <div className="bg-[url('images/redditPersonalHome.png')] h-[40px] bg-cover rounded-tl rounded-tr"></div>
      <div className="flex px-3 mt-3 gap-2 items-center font-semibold">
        <RedditFace className="h-10 w-10 fill-brand-100" />
        Home
      </div>
      <p className="px-3 my-2 text-xs">
        Your personal Reddit front page. Built for you.
      </p>
      <Link
        to="/submit"
        onClick={resetCurrentCommunity}
        className="rounded-full grow border border-blue-500 mb-2 mx-3 p-0.5 bg-blue-500 text-white hover:brightness-95 active:brightness-90 text-center"
      >
        Create Post
      </Link>
      <button
        onClick={onOpenCommunityModal}
        className="rounded-full grow border border-blue-500 mb-2 mx-3 p-0.5 bg-white text-blue-500 hover:brightness-95 active:brightness-90"
      >
        Create Community
      </button>
    </div>
  );
}

export default PersonalHome;
