import { User, signOut } from "firebase/auth";
import AuthModal from "../../Modal/Auth/AuthModal";
import AuthButtons from "./AuthButtons";
import { auth } from "../../../firebase/firebaseConfig";

type Props = {
  user: User | null | undefined;
};

function RightContent({ user }: Props) {
  return (
    <>
      <AuthModal />
      <div className="flex justify-center items-center">
        {user ? (
          <button
            className="hidden sm:inline-block text-sm text-white bg-blue-500 border-2 border-blue-500 rounded-full px-2 py-1 w-20 md:w-24 hover:brightness-95 active:brightness-90"
            onClick={() => {
              signOut(auth);
            }}
          >
            Logout
          </button>
        ) : (
          <AuthButtons />
        )}
      </div>
    </>
  );
}

export default RightContent;
