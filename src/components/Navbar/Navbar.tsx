import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";

type Props = {};

function Navbar({}: Props) {
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
      <RightContent />
    </header>
  );
}

export default Navbar;
