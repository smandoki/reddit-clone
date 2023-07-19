import { PlusIcon, ArrowTrendingUpIcon } from "@heroicons/react/24/solid";

import {
  ChatBubbleOvalLeftEllipsisIcon,
  BellIcon,
} from "@heroicons/react/24/outline";

type Props = {};

function Icons({}: Props) {
  return (
    <div className="flex gap-1">
      <div className="hidden md:flex items-center border-r border-r-gray-200">
        <div
          title="trending"
          className="flex items-center justify-center mr-1 p-1 cursor-pointer hover:bg-gray-200"
        >
          <ArrowTrendingUpIcon className="h-6 w-6 text-gray-800" />
        </div>
      </div>

      <div
        title="chat"
        className="flex items-center justify-center p-1 cursor-pointer hover:bg-gray-200"
      >
        <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 text-gray-800" />
      </div>

      <div
        title="notifications"
        className="flex items-center justify-center p-1 cursor-pointer hover:bg-gray-200"
      >
        <BellIcon className="h-6 w-6 text-gray-800" />
      </div>

      <div
        title="create post"
        className="flex items-center justify-center p-1 cursor-pointer hover:bg-gray-200"
      >
        <PlusIcon className="h-6 w-6 text-gray-800" />
      </div>
    </div>
  );
}

export default Icons;
