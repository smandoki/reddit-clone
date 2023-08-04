type Props = {};

function PostSkeletonLoader({}: Props) {
  const loadingCard = (
    <div className="flex bg-white rounded w-full h-[360px]">
      <div className="bg-gray-100 w-[40px] rounded"></div>
      <div className="flex flex-col gap-2 p-2 w-full animate-pulse">
        <div className="h-[10px] bg-gray-300 w-1/3 rounded"></div>
        <div className="h-[10px] bg-gray-300 w-full rounded"></div>
        <div className="h-[10px] bg-gray-300 w-full rounded"></div>
        <div className="h-[10px] bg-gray-300 w-full rounded"></div>
        <div className="h-[10px] bg-gray-300 w-2/3 rounded"></div>
        <div className="grow w-full bg-gray-300 rounded mt-2"></div>
      </div>
    </div>
  );

  return (
    <div className="mt-2 flex flex-col gap-2">
      {loadingCard}
      {loadingCard}
    </div>
  );
}

export default PostSkeletonLoader;
