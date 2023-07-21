import { Community } from "../../stores/communityStore";
import Header from "./Header";

type Props = {
  communityData: Community;
};

function CommunityMain({ communityData }: Props) {
  return (
    <>
      <Header communityData={communityData} />
    </>
  );
}

export default CommunityMain;
