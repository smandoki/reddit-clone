import { Dialog } from "@headlessui/react";
import {
  XMarkIcon,
  UserIcon,
  EyeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import LoadingButton from "../../LoadingButton";
import { auth, firestore } from "../../../firebase/firebaseConfig";
import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

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
  const [error, setError] = useState("");
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);

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

  function onClose() {
    //dont let them close modal while a submission is in progress
    if (loading) return;

    setCommunityForm({ name: "", type: "public" });
    handleClose();
  }

  async function handleCreateCommunity() {
    setError("");

    //validate community name
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(communityForm.name)) {
      setError("Community name can only contain letters and numbers.");
      return;
    }

    setLoading(true);

    try {
      //check community name is not taken
      const communityDocRef = doc(firestore, "communities", communityForm.name);

      await runTransaction(firestore, async (transaction) => {
        const communityDoc = await transaction.get(communityDocRef);

        if (communityDoc.exists()) {
          throw new Error("Community name is already taken. Try another.");
        }

        //create community
        transaction.set(communityDocRef, {
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          privacyType: communityForm.type,
        });

        //create community snippet on user
        transaction.set(
          doc(
            firestore,
            `users/${user?.uid}/communitySnippets`,
            communityForm.name
          ),
          {
            communityId: communityForm.name,
            isModerator: true,
          }
        );
      });
    } catch (error: any) {
      console.log("handleCreateCommunity error", error);
      setError(error.message);
    }

    setLoading(false);
  }

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
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
              onClick={onClose}
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
                  minLength={3}
                  maxLength={21}
                  required
                  onChange={onChange}
                  value={communityForm.name}
                  className="border border-gray-200 rounded p-1 pl-6 grow focus:outline-blue-500"
                />
              </div>

              <p
                className={`${
                  charsRemaining ? "text-gray-500" : "text-red-500"
                } text-[12px]`}
              >
                {charsRemaining} characters remaining
              </p>

              <p className="text-red-500 text-[15px] mt-1">{error}</p>

              {/* community type radio buttons */}
              <h3 className="font-medium text-[15px] mt-7 mb-2">
                Community Type
              </h3>

              <div className="flex items-start gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="type"
                    value="public"
                    id="public"
                    className="cursor-pointer"
                    checked={communityForm.type === "public"}
                    onChange={onChange}
                  />

                  <label
                    htmlFor="public"
                    className="text-[14px] font-medium flex gap-2 items-center cursor-pointer"
                  >
                    <UserIcon className="h-4 w-4 text-gray-500" />
                    Public
                  </label>
                </div>
                <p className="text-[12px] text-gray-500 pt-[2.3px]">
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
                    className="cursor-pointer"
                    checked={communityForm.type === "restricted"}
                    onChange={onChange}
                  />

                  <label
                    htmlFor="restricted"
                    className="text-[14px] font-medium flex gap-2 items-center cursor-pointer"
                  >
                    <EyeIcon className="h-4 w-4 text-gray-500" /> Restricted
                  </label>
                </div>
                <p className="text-[12px] text-gray-500 pt-[2.3px]">
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
                    className="cursor-pointer"
                    checked={communityForm.type === "private"}
                    onChange={onChange}
                  />

                  <label
                    htmlFor="private"
                    className="text-[14px] font-medium flex gap-2 items-center cursor-pointer"
                  >
                    <LockClosedIcon className="h-4 w-4 text-gray-500" />
                    Private
                  </label>
                </div>
                <p className="text-[12px] text-gray-500 pt-[2.3px]">
                  Only approved users can view and submit to this community
                </p>
              </div>
            </div>

            {/* form buttons */}
            <div className="bg-gray-100 rounded-b p-4 flex gap-1 justify-end">
              {!loading && (
                <button
                  type="button"
                  className="text-sm font-semibold bg-gray-100 text-blue-500 border-2 border-blue-500 rounded-full px-4 py-1 min-w-max mr-1 hover:brightness-95 active:brightness-90"
                  onClick={onClose}
                >
                  Cancel
                </button>
              )}

              {loading && (
                <button
                  type="button"
                  disabled
                  className="opacity-60 text-sm font-semibold bg-gray-100 text-blue-500 border-2 border-blue-500 rounded-full px-4 py-1 min-w-max mr-1"
                  onClick={onClose}
                >
                  Cancel
                </button>
              )}

              <LoadingButton
                type="submit"
                isLoading={loading}
                className="text-sm font-semibold text-white bg-blue-500 border-2 border-blue-500 rounded-full px-4 py-1 min-w-[164px] hover:brightness-95 active:brightness-90"
                onClick={handleCreateCommunity}
              >
                Create Community
              </LoadingButton>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default CreateCommunityModal;
