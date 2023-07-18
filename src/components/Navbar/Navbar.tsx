import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebaseConfig";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";

type Props = {};

function Navbar({}: Props) {
  const [user, loading, error] = useAuthState(auth);

  return (
    <header className="flex h-12 px-2 bg-white">
      <div className="flex items-center">
        <img src="/images/redditFace.svg" alt="reddit logo" className="h-8" />
        <img
          src="/images/redditText.svg"
          alt="reddit title"
          className="h-12 hidden md:inline-flex"
        />
      </div>

      <SearchInput />
      <RightContent user={user} />
    </header>
  );
}

export default Navbar;
