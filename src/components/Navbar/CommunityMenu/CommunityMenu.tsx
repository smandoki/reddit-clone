import { Menu } from "@headlessui/react";
import { ChevronDownIcon, HomeIcon, PlusIcon } from "@heroicons/react/24/solid";
import CreateCommunityModal from "../../Modal/CreateCommunity/CreateCommunityModal";
import { useCommunityStore } from "../../../stores/communityStore";
import MenuListItem from "./MenuListItem";
import { useCommunityModalStore } from "../../../stores/communityModalStore";

type Props = {};

function CommunityMenu({}: Props) {
  const { open, setOpen } = useCommunityModalStore();
  const { mySnippets } = useCommunityStore();

  return (
    <div className="relative flex items-center">
      <CreateCommunityModal open={open} handleClose={() => setOpen(false)} />

      <Menu>
        <Menu.Button className="md:min-w-max flex items-center gap-1.5 border border-transparent hover:border-gray-200 py-1 px-2 my-[6px] rounded">
          <HomeIcon className="h-6 w-6 text-gray-800" />
          <p className="text-sm font-medium hidden md:flex">Home</p>
          <ChevronDownIcon className="h-4 w-4 ml-auto text-gray-500" />
        </Menu.Button>

        <Menu.Items className="z-50 w-[200px] rounded bg-white text-sm font-medium absolute top-[50px] border border-gray-200">
          {mySnippets.find((item) => item.isModerator) && (
            <>
              <div className="mt-3 mb-1">
                <p className="pl-3 text-xs font-medium text-gray-500">
                  MODERATING
                </p>
              </div>

              {mySnippets
                .filter((item) => item.isModerator)
                .map((snippet) => (
                  <MenuListItem
                    key={snippet.communityId}
                    displayText={`r/${snippet.communityId}`}
                    imageUrl={snippet.imageURL}
                    iconColor="blue-500"
                    link={`r/${snippet.communityId}`}
                  />
                ))}
            </>
          )}

          <div className="mt-3 mb-1">
            <p className="pl-3 text-xs font-medium text-gray-500">
              MY COMMUNITIES
            </p>
          </div>

          <Menu.Item>
            {({ active }) => (
              <div
                className={`${
                  active ? "bg-gray-100" : ""
                } flex items-center gap-2 py-2 px-4 cursor-pointer rounded`}
                onClick={() => setOpen(true)}
              >
                <PlusIcon className="h-5 w-5" />
                Create Community
              </div>
            )}
          </Menu.Item>

          {mySnippets.map((snippet) => (
            <MenuListItem
              key={snippet.communityId}
              displayText={`r/${snippet.communityId}`}
              imageUrl={snippet.imageURL}
              iconColor="blue-500"
              link={`r/${snippet.communityId}`}
            />
          ))}
        </Menu.Items>
      </Menu>
    </div>
  );
}

export default CommunityMenu;
