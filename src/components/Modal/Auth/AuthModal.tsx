import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useAuthModalStore } from "../../../stores/authModalStore";
import AuthInputs from "./AuthInputs";

type Props = {};

function AuthModal({}: Props) {
  const { open, view, setOpen } = useAuthModalStore();

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
        <Dialog.Panel className="w-96 p-4 mx-auto max-w-sm rounded bg-white flex flex-col items-center justify-center">
          <div className="w-full flex justify-between items-center">
            <Dialog.Title className="text-xl font-bold">
              {view === "login" && "Log In"}
              {view === "signup" && "Sign Up"}
              {view === "resetPassword" && "Reset Password"}
            </Dialog.Title>
            <XMarkIcon
              className="h-5 w-5 text-gray-500 cursor-pointer"
              onClick={() => setOpen(false)}
            />
          </div>

          <div className="flex flex-col items-center justify-center w-[80%]">
            {/* OAuthButtons */}
            <AuthInputs />
            {/* ResetPassword */}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default AuthModal;
