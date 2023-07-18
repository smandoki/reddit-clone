import { User, signOut } from "firebase/auth";
import AuthModal from "../../Modal/Auth/AuthModal";
import AuthButtons from "./AuthButtons";
import { auth } from "../../../firebase/firebaseConfig";
import Icons from "./Icons";

type Props = {
  user: User | null | undefined;
};

function RightContent({ user }: Props) {
  return (
    <>
      <AuthModal />
      <div className="flex justify-center items-center">
        {user ? <Icons /> : <AuthButtons />}
      </div>
    </>
  );
}

export default RightContent;
