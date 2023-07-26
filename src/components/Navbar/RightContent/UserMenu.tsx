import { Menu } from "@headlessui/react";
import { ChevronDownIcon, SparklesIcon } from "@heroicons/react/24/solid";
import {
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { User } from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";
import { useAuthModalStore } from "../../../stores/authModalStore";
import RedditAvatar from "../../RedditAvatar";

type Props = { user: User | null | undefined };

function UserMenu({ user }: Props) {
  const { setAuthModalState } = useAuthModalStore();

  return (
    <Menu>
      <Menu.Button className="min-w-max flex items-center gap-1.5 border border-transparent hover:border-gray-200 py-1 px-2 my-[3px] rounded">
        <RedditAvatar className="h-8 w-8 fill-white bg-gray-300 p-[2px] rounded" />

        {user && (
          <div className="flex-col gap-1 hidden md:flex mr-2 text-left font-semibold">
            <p className="text-xs">
              {user?.displayName || user.email?.split("@")[0]}
            </p>
            <p className="text-xs text-gray-400 flex gap-1 items-center">
              <SparklesIcon className="h-4 w-4 text-brand-100" />
              256 karma
            </p>
          </div>
        )}

        <ChevronDownIcon className="h-4 w-4 text-gray-500" />
      </Menu.Button>

      <Menu.Items className="w-52 rounded bg-white text-sm font-medium fixed right-1 top-[50px] border border-gray-200">
        {user && (
          <>
            <Menu.Item>
              {({ active }) => (
                <div
                  className={`${
                    active ? "bg-gray-100" : ""
                  } flex items-center gap-2 py-2 px-4 cursor-pointer rounded`}
                >
                  <UserCircleIcon className="w-5 h-5" />
                  Profile
                </div>
              )}
            </Menu.Item>

            {/* menu divider */}
            <div className="w-full border border-gray-200 border-t-0"></div>

            <Menu.Item>
              {({ active }) => (
                <div
                  className={`${
                    active ? "bg-gray-100" : ""
                  } flex items-center gap-2 py-2 px-4 cursor-pointer rounded`}
                  onClick={() => signOut(auth)}
                >
                  <ArrowRightOnRectangleIcon className="w-5 h-5" />
                  Log Out
                </div>
              )}
            </Menu.Item>
          </>
        )}

        {!user && (
          <Menu.Item>
            {({ active }) => (
              <div
                className={`${
                  active ? "bg-gray-100" : ""
                } flex items-center gap-2 py-2 px-4 cursor-pointer rounded`}
                onClick={() => setAuthModalState(true, "login")}
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                Log In / Sign Up
              </div>
            )}
          </Menu.Item>
        )}
      </Menu.Items>
    </Menu>
  );
}

export default UserMenu;
