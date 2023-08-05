import {
  Community,
  useCommunityData,
  useCommunityStore,
} from "../../stores/communityStore";
import LoadingButton from "../LoadingButton";
import RedditFace from "../RedditFace";

type Props = {
  communityData: Community;
};

function Header({ communityData }: Props) {
  const { mySnippets, onJoinOrLeaveCommunity, loading } = useCommunityData();
  const isJoined = !!mySnippets.find(
    (snippet) => communityData.id === snippet.communityId
  );
  const { currentCommunity } = useCommunityStore();

  return (
    <div className="flex flex-col w-full h-[146px]">
      <div className="h-1/2 bg-blue-400"></div>
      <div className="flex justify-center bg-white grow">
        <div className="flex w-[95%] max-w-[860px]">
          {currentCommunity?.imageURL ? (
            <img
              src={currentCommunity.imageURL}
              alt="Community Picture"
              className="h-[64px] w-[64px] relative -top-3 border-[4px] border-white rounded-full object-cover"
            />
          ) : (
            <RedditFace className="h-[64px] w-[64px] relative -top-3 border-[4px] border-white rounded-full fill-blue-500" />
          )}

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
