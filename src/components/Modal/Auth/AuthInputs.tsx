import { useAuthModalStore } from "../../../stores/authModalStore";
import Login from "./Login";
import Signup from "./Signup";

type Props = {};

function AuthInputs({}: Props) {
  const { view } = useAuthModalStore();

  return (
    <div className="flex flex-col items-center w-full mt-1">
      {view === "login" && <Login />}
      {view === "signup" && <Signup />}
    </div>
  );
}

export default AuthInputs;
