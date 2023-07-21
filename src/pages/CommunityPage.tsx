import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { firestore } from "../firebase/firebaseConfig";
import { useEffect, useState } from "react";
import { Community } from "../stores/communityStore";
import NotFound from "../components/Community/NotFound";
import CommunityMain from "../components/Community/CommunityMain";

type Props = {};

function CommunityPage({}: Props) {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [communityData, setCommunityData] = useState<Community>();

  async function getCommunityData(communityId: string) {
    try {
      const communityDocRef = doc(firestore, "communities", communityId);
      const communityDoc = await getDoc(communityDocRef);

      //check that community exists
      if (!communityDoc.exists()) {
        setCommunityData(undefined);
        setLoading(false);
        return;
      }

      setCommunityData({
        id: communityDoc.id,
        ...communityDoc.data(),
      } as Community);
      setLoading(false);
    } catch (error: any) {
      console.log("getCommunityData", error.message);
    }
  }

  useEffect(() => {
    if (params.communityId) {
      getCommunityData(params.communityId as string);
    }
  }, [params.communityId]);

  if (!loading && !communityData) {
    return <NotFound />;
  }

  if (!loading && communityData) {
    return <CommunityMain communityData={communityData} />;
  }

  //page is loading
  return null;
}

export default CommunityPage;
