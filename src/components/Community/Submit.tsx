import { useAuthState } from "react-firebase-hooks/auth";
import PageContent from "../Layout/PageContent";
import NewPostForm from "../Posts/NewPostForm";
import { auth } from "../../firebase/firebaseConfig";

type Props = {};

function Submit({}: Props) {
  const [user] = useAuthState(auth);

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
      <>{/* AboutCommunity */}</>
    </PageContent>
  );
}

export default Submit;
