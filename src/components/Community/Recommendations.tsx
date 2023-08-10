import React, { useEffect, useState } from "react";
import { Community, useCommunityData } from "../../stores/communityStore";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { firestore } from "../../firebase/firebaseConfig";
import Spinner from "../Spinner";
import RedditFace from "../RedditFace";
import LoadingButton from "../LoadingButton";
import { Link } from "react-router-dom";

type Props = {};

function Recommendations({}: Props) {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(false);
  const { onJoinOrLeaveCommunity, mySnippets } = useCommunityData();

  async function getCommunityRecommendations() {
    setLoading(true);

    try {
      const communityQuery = query(
        collection(firestore, "communities"),
        orderBy("numberOfMembers", "desc"),
        limit(5)
      );

      const communityDocs = await getDocs(communityQuery);
      const communities = communityDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCommunities(communities as Community[]);
    } catch (error: any) {
      console.log("getCommunityRecommendations", error.message);
    }

    setLoading(false);
  }

  useEffect(() => {
    getCommunityRecommendations();
  }, []);

  return (
    <div className="flex flex-col bg-white rounded border border-gray-300">
      <div
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0 ,0.75)), url('images/recCommsArt.png')",
        }}
        className="bg-cover h-[70px] flex items-end p-2 text-white font-bold rounded-tl rounded-tr"
      >
        Top Communities
      </div>

      <div
        className={`flex flex-col ${
          loading ? "h-[200px] items-center justify-center" : ""
        }`}
      >
        {loading && <Spinner />}

        {!loading &&
          communities.map((item, index) => {
            const isJoined = !!mySnippets.find(
              (snippet) => snippet.communityId === item.id
            );

            return (
              <div
                key={item.id}
                className="flex border-b border-gray-200 items-center pr-2"
              >
                <Link
                  to={`/r/${item.id}`}
                  className="flex items-center grow group p-2"
                >
                  <p className="mr-4">{index + 1}</p>
                  {item.imageURL ? (
                    <img
                      src={item.imageURL}
                      alt="community image"
                      className="h-5 w-5 rounded-full mr-2"
                    />
                  ) : (
                    <RedditFace className="h-5 w-5 fill-blue-500 mr-2" />
                  )}
                  <p className="text-ellipsis group-hover:underline">{`r/${item.id}`}</p>
                </Link>

                <LoadingButton
                  onClick={() => onJoinOrLeaveCommunity(item, isJoined)}
                  className={`text-sm flex items-center px-4 py-1 rounded-full h-[24px] font-medium text-center border border-blue-500 hover:brightness-95 active:brightness-90 ${
                    isJoined
                      ? "bg-white text-blue-500"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  {isJoined ? "Joined" : "Join"}
                </LoadingButton>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Recommendations;
