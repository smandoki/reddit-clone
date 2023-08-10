import { useAuthState } from "react-firebase-hooks/auth";
import PageContent from "../Layout/PageContent";
import NewPostForm from "../Posts/NewPostForm";
import { auth } from "../../firebase/firebaseConfig";
import { useCommunityData } from "../../stores/communityStore";
import About from "./About";
import CommunityListbox from "./CommunityListbox";
import { useParams } from "react-router-dom";

type Props = {};

function Submit({}: Props) {
  const [user] = useAuthState(auth);
  const { currentCommunity } = useCommunityData();
  const { communityId } = useParams();

  return (
    <PageContent>
      <>
        <div className="">
          <h2 className="py-[14px] border-b border-white font-medium">
            Create a post
          </h2>

          {!communityId && <CommunityListbox />}

          {user && (
            <NewPostForm
              user={user}
              communityImageURL={currentCommunity?.imageURL}
            />
          )}
        </div>
      </>
      <div className="mt-[14px]">
        {currentCommunity && <About communityData={currentCommunity} />}
      </div>
    </PageContent>
  );
}

export default Submit;
