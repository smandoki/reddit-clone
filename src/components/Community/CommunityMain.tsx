import { Community } from "../../stores/communityStore";

type Props = {
  communityData: Community;
};

function CommunityMain({ communityData }: Props) {
  return <div>You are in {communityData.id}</div>;
}

export default CommunityMain;
