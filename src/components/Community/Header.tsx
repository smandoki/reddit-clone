import { Community } from "../../stores/communityStore";

type Props = {
  communityData: Community;
};

function Header({ communityData }: Props) {
  const isJoined = false;

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

            <button
              onClick={() => {}}
              className="flex items-center bg-blue-500 text-white px-6 py-1 rounded-full h-[30px] text-center hover:brightness-95 active:brightness-90"
            >
              {isJoined ? "Joined" : "Join"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
