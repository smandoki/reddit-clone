import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { User } from "firebase/auth";

type Props = { user: User | null | undefined };

function SearchInput({ user }: Props) {
  return (
    <div
      className={`${
        user ? "" : "max-w-[600px]"
      } flex grow items-center relative ml-1 md:mx-1 py-1`}
    >
      <MagnifyingGlassIcon className="h-6 w-6 text-gray-500 absolute ml-2 pointer-events-none" />
      <input
        type="text"
        placeholder="Search Reddit"
        className="placeholder-gray-500 h-full w-full text-sm bg-gray-50 hover:bg-white border border-gray-200 p-1 pl-9 hover:border-blue-500 focus:bg-white rounded-full outline-none focus:border-blue-500"
      />
    </div>
  );
}

export default SearchInput;
