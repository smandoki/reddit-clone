type Props = {};

function Navbar({}: Props) {
  return (
    <header className="flex h-11 px-3 py-2 bg-white">
      <div className="flex items-center">
        <img src="/images/redditFace.svg" alt="reddit logo" className="h-8" />
        <img
          src="/images/redditText.svg"
          alt="reddit title"
          className="h-12 hidden md:inline-flex"
        />
      </div>
    </header>
  );
}

export default Navbar;
