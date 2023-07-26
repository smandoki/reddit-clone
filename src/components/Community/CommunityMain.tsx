import { Community } from "../../stores/communityStore";
import PageContent from "../Layout/PageContent";
import CreatePostLink from "./CreatePostLink";
import Header from "./Header";

type Props = {
  communityData: Community;
};

function CommunityMain({ communityData }: Props) {
  return (
    <>
      <Header communityData={communityData} />
      <PageContent>
        <>
          <CreatePostLink />
        </>
        <>
          <div>RIGHT1</div>
        </>
      </PageContent>
    </>
  );
}

export default CommunityMain;
