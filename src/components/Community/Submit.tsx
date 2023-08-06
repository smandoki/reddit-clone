import { useAuthState } from "react-firebase-hooks/auth";
import PageContent from "../Layout/PageContent";
import NewPostForm from "../Posts/NewPostForm";
import { auth } from "../../firebase/firebaseConfig";
import { useCommunityData } from "../../stores/communityStore";
import About from "./About";

type Props = {};

function Submit({}: Props) {
  const [user] = useAuthState(auth);
  const { currentCommunity } = useCommunityData();

  return (
    <PageContent>
      <>
        <div className="">
          <h2 className="py-[14px] border-b border-white font-medium">
            Create a post
          </h2>
          {user && <NewPostForm user={user} />}
        </div>
      </>
      <div className="mt-[14px]">
        {currentCommunity && <About communityData={currentCommunity} />}
      </div>
    </PageContent>
  );
}

export default Submit;
