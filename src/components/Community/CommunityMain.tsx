import { useEffect } from "react";
import { Community, useCommunityStore } from "../../stores/communityStore";
import PageContent from "../Layout/PageContent";
import Posts from "../Posts/Posts";
import CreatePostLink from "./CreatePostLink";
import Header from "./Header";
import About from "./About";

type Props = {
  communityData: Community;
};

function CommunityMain({ communityData }: Props) {
  const { setCurrentCommunity } = useCommunityStore();

  useEffect(() => {
    setCurrentCommunity(communityData);
  }, [communityData]);

  return (
    <>
      <Header communityData={communityData} />
      <PageContent>
        <>
          <CreatePostLink />
          <Posts communityData={communityData} />
        </>
        <>
          <About communityData={communityData} />
        </>
      </PageContent>
    </>
  );
}

export default CommunityMain;
