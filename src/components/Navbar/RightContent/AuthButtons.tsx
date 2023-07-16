import { useAuthModalStore } from "../../../stores/authModalStore";

type Props = {};

function AuthButtons({}: Props) {
  const { setAuthModalState } = useAuthModalStore();

  return (
    <>
      <button
        className="hidden sm:inline-block text-sm bg-white text-blue-500 border-2 border-blue-500 rounded-full px-2 py-1 w-20 md:w-24 mr-1 hover:brightness-95 active:brightness-90"
        onClick={() => setAuthModalState(true, "login")}
      >
        Log In
      </button>
      <button
        className="hidden sm:inline-block text-sm text-white bg-blue-500 border-2 border-blue-500 rounded-full px-2 py-1 w-20 md:w-24 hover:brightness-95 active:brightness-90"
        onClick={() => setAuthModalState(true, "signup")}
      >
        Sign Up
      </button>
    </>
  );
}

export default AuthButtons;
