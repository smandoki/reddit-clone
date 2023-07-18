import { useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useAuthModalStore } from "../../../stores/authModalStore";
import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/firebaseConfig";

type Props = {};

function AuthModal({}: Props) {
  const { open, view, setOpen } = useAuthModalStore();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (user) setOpen(false);
  }, [user]);

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-50"
    >
      {/* modal backdrop */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* fullscreen container to centre the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full p-4 mx-auto max-w-sm rounded bg-white flex flex-col items-center justify-center">
          <div className="w-full flex justify-center items-center mb-4 relative">
            <Dialog.Title className="text-xl font-bold">
              {view === "login" && "Log In"}
              {view === "signup" && "Sign Up"}
              {view === "resetPassword" && "Reset Password"}
            </Dialog.Title>
            <XMarkIcon
              className="h-5 w-5 text-gray-500 cursor-pointer absolute right-0"
              onClick={() => setOpen(false)}
            />
          </div>

          <div className="flex flex-col items-center justify-center w-[80%]">
            <OAuthButtons />

            {/* Visual divider between OAuth buttons and email/password fields */}
            <div className="mt-3 flex w-full items-center gap-2">
              <div className="border border-b-0 border-gray-200 grow"></div>
              <p className="text-sm font-bold text-gray-500">OR</p>
              <div className="border border-b-0 border-gray-200 grow"></div>
            </div>

            <AuthInputs />
            {/* ResetPassword */}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default AuthModal;
