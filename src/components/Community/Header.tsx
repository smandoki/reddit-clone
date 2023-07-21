import { Community, useCommunityData } from "../../stores/communityStore";
import LoadingButton from "../LoadingButton";

type Props = {
  communityData: Community;
};

function Header({ communityData }: Props) {
  const { mySnippets, onJoinOrLeaveCommunity, loading } = useCommunityData();
  const isJoined = !!mySnippets.find(
    (snippet) => communityData.id === snippet.communityId
  );

  return (
    <div className="flex flex-col w-full h-[146px]">
      <div className="h-1/2 bg-blue-400"></div>
      <div className="flex justify-center bg-white grow">
        <div className="flex w-[95%] max-w-[860px]">
          <img
            src={
              communityData.imageURL
                ? communityData.imageURL
                : "/images/redditFace.svg"
            }
            alt="community logo"
            className="h-[64px] w-[64px] relative -top-3 border-[4px] border-white rounded-full"
          />

          <div className="flex px-[16px] py-[10px]">
            <div className="flex flex-col mr-6">
              <h1 className="font-extrabold text-xl">{communityData.id}</h1>
              <p className="text-[12px] text-gray-400 font-semibold">
                r/{communityData.id}
              </p>
            </div>

            <LoadingButton
              isLoading={loading}
              onClick={() => onJoinOrLeaveCommunity(communityData, isJoined)}
              className={`flex items-center px-6 py-1 rounded-full h-[30px] font-medium text-center border border-blue-500 hover:brightness-95 active:brightness-90 ${
                isJoined ? "bg-white text-blue-500" : "bg-blue-500 text-white"
              }`}
            >
              {isJoined ? "Joined" : "Join"}
            </LoadingButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
