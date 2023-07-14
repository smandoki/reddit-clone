type Props = {};

function AuthButtons({}: Props) {
  return (
    <>
      <button className="hidden sm:inline-block text-sm text-blue-500 border-2 border-blue-500 rounded-full px-2 py-1 w-20 md:w-24 mr-2">
        Log In
      </button>
      <button className="hidden sm:inline-block text-sm text-white bg-blue-500 border-2 border-blue-500 rounded-full px-2 py-1 w-20 md:w-24">
        Sign Up
      </button>
    </>
  );
}

export default AuthButtons;
