import { Community } from "../../stores/communityStore";
import PageContent from "../Layout/PageContent";
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
          <div>LEFT1</div>
          <div>LEFT2</div>
        </>
        <>
          <div>RIGHT1</div>
        </>
      </PageContent>
    </>
  );
}

export default CommunityMain;
