import { User } from "firebase/auth";
import AuthModal from "../../Modal/Auth/AuthModal";
import AuthButtons from "./AuthButtons";
import Icons from "./Icons";
import UserMenu from "./UserMenu";

type Props = {
  user: User | null | undefined;
};

function RightContent({ user }: Props) {
  return (
    <>
      <AuthModal />
      <div className="flex gap-1">
        <div className="flex justify-center items-center">
          {user ? <Icons /> : <AuthButtons />}
        </div>
        <UserMenu user={user} />
      </div>
    </>
  );
}

export default RightContent;
