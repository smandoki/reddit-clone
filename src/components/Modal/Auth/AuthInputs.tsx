import { useAuthModalStore } from "../../../stores/authModalStore";
import Login from "./Login";
import ResetPassword from "./ResetPassword";
import Signup from "./Signup";

type Props = {};

function AuthInputs({}: Props) {
  const { view } = useAuthModalStore();

  return (
    <div className="flex flex-col items-center w-full mt-1">
      {view === "login" && <Login />}
      {view === "signup" && <Signup />}
      {view === "resetPassword" && <ResetPassword />}
    </div>
  );
}

export default AuthInputs;
