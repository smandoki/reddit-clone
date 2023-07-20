import { Dialog } from "@headlessui/react";
import {
  XMarkIcon,
  UserIcon,
  EyeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";

type Props = {
  open: boolean;
  handleClose: () => void;
};

type CommunityFormState = {
  name: string;
  type: "public" | "restricted" | "private";
};

function CreateCommunityModal({ open, handleClose }: Props) {
  const [communityForm, setCommunityForm] = useState<CommunityFormState>({
    name: "",
    type: "public",
  });
  const charsRemaining = 21 - communityForm.name.length;

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.name, e.target.value);
    setCommunityForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-50">
      {/* modal backdrop */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* fullscreen container to centre the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="pt-4 w-max rounded bg-white flex flex-col items-center justify-center">
          {/* modal header */}
          <div className="w-full flex justify-between items-center mb-3 px-4">
            <Dialog.Title className="text-xl font-bold">
              <h1 className="text-[16px] font-semibold">Create a Community</h1>
            </Dialog.Title>
            <XMarkIcon
              className="h-5 w-5 text-gray-500 cursor-pointer"
              onClick={handleClose}
            />
          </div>

          {/* divider */}
          <div className="w-full border-t border-t-gray-200 mb-3"></div>

          {/* modal form and main body */}
          <form onSubmit={onSubmit}>
            <div className="w-full flex flex-col px-4">
              <h3 className="font-medium text-[15px]">Name</h3>
              <p className="text-[12px] text-gray-500 mb-4">
                Community names including capitalization cannot be changed.
              </p>

              {/* community name input */}
              <div className="relative flex items-center mb-2">
                <p className="absolute text-gray-400 ml-2 pointer-events-none">
                  r/
                </p>

                <input
                  type="text"
                  name="name"
                  maxLength={21}
                  required
                  onChange={onChange}
                  value={communityForm.name}
                  className="border border-gray-200 rounded p-1 pl-6 grow"
                />
              </div>

              <p className="text-[12px] text-gray-500 mb-7">
                {charsRemaining} characters remaining
              </p>

              {/* community type radio buttons */}
              <h3 className="font-medium text-[15px] mb-2">Community Type</h3>

              <div className="flex items-start gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="type"
                    value="public"
                    id="public"
                    checked={communityForm.type === "public"}
                    onChange={onChange}
                  />
                  <UserIcon className="h-4 w-4 text-gray-500" />
                  <label htmlFor="public" className="text-[14px] font-medium">
                    Public
                  </label>
                </div>
                <p className="text-[12px] text-gray-500">
                  Anyone can view, post, and comment to this community
                </p>
              </div>

              <div className="flex items-start gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="type"
                    value="restricted"
                    id="restricted"
                    checked={communityForm.type === "restricted"}
                    onChange={onChange}
                  />
                  <EyeIcon className="h-4 w-4 text-gray-500" />
                  <label htmlFor="public" className="text-[14px] font-medium">
                    Restricted
                  </label>
                </div>
                <p className="text-[12px] text-gray-500">
                  Anyone can view this community, but only approved users can
                  post
                </p>
              </div>

              <div className="flex items-start gap-2 mb-8">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="type"
                    value="private"
                    id="private"
                    checked={communityForm.type === "private"}
                    onChange={onChange}
                  />
                  <LockClosedIcon className="h-4 w-4 text-gray-500" />
                  <label htmlFor="private" className="text-[14px] font-medium">
                    Private
                  </label>
                </div>
                <p className="text-[12px] text-gray-500">
                  Only approved users can view and submit to this community
                </p>
              </div>
            </div>

            {/* form buttons */}
            <div className="bg-gray-100 rounded-b p-4 flex gap-1 justify-end">
              <button
                type="button"
                className="text-sm font-semibold bg-gray-100 text-blue-500 border-2 border-blue-500 rounded-full px-4 py-1 min-w-max mr-1 hover:brightness-95 active:brightness-90"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="text-sm font-semibold text-white bg-blue-500 border-2 border-blue-500 rounded-full px-4 py-1 min-w-max hover:brightness-95 active:brightness-90"
                onClick={() => {}}
              >
                Create Community
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default CreateCommunityModal;
