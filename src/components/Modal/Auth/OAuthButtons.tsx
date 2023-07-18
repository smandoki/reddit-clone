import { FIREBASE_ERRORS } from "../../../firebase/errors";
import { auth } from "../../../firebase/firebaseConfig";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

type Props = {};

function OAuthButtons({}: Props) {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    <div className="flex flex-col w-full my-4 gap-5">
      {!loading && (
        <button
          onClick={() => signInWithGoogle()}
          className="h-10 flex text-gray-600 bg-white w-full rounded-full justify-center items-center gap-2 p-2 border border-gray-400 hover:bg-gray-50 active:bg-gray-100"
        >
          <img
            src="/images/googlelogo.png"
            alt="google logo"
            className="h-5 w-5"
          />
          <p className="font-bold">Continue with Google</p>
        </button>
      )}

      {loading && (
        <button
          disabled
          className="h-10 opacity-60 flex text-gray-600 bg-white w-full rounded-full justify-center items-center gap-2 p-2 border border-gray-400"
        >
          <div className="animate-spin border-4 rounded-full h-5 w-5 border-gray-300 border-t-gray-900"></div>
        </button>
      )}

      {error && (
        <p className="text-center text-red-500 -mt-4 text-sm">
          {FIREBASE_ERRORS[error.message] ?? error.message}
        </p>
      )}
    </div>
  );
}

export default OAuthButtons;
