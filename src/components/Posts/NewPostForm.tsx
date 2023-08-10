import {
  DocumentTextIcon,
  PhotoIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { Tab } from "@headlessui/react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import TextInputs from "./PostForm/TextInputs";
import ImageUpload from "./PostForm/ImageUpload";
import { Post } from "../../stores/postsStore";
import { User } from "firebase/auth";
import {
  Timestamp,
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { firestore, storage } from "../../firebase/firebaseConfig";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import useSelectFile from "../../hooks/useSelectFile";
import { useCommunityData } from "../../stores/communityStore";
import { useAuthModalStore } from "../../stores/authModalStore";

type Props = {
  user: User;
  communityImageURL?: string;
};

function NewPostForm({ user, communityImageURL }: Props) {
  const [urlSearchParams] = useSearchParams();
  const [textInputs, setTextInputs] = useState({
    title: "",
    body: "",
  });
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const params = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile();
  const { currentCommunity } = useCommunityData();
  const { setAuthModalState } = useAuthModalStore();

  useEffect(() => {
    if ("media" in Object.fromEntries(urlSearchParams)) setSelectedTab(1);
    if ("url" in Object.fromEntries(urlSearchParams)) setSelectedTab(2);
  }, []);

  async function handleCreatePost() {
    if (!user) {
      setAuthModalState(true, "login");
      return;
    }

    setLoading(true);
    setError(false);
    const communityId = params.communityId || currentCommunity?.id;

    const newPost: Post = {
      communityId: communityId as string,
      creatorId: user.uid,
      creatorDisplayName: user.displayName || user.email!.split("@")[0],
      title: textInputs.title,
      body: textInputs.body,
      numberOfComments: 0,
      voteStatus: 0,
      createdAt: serverTimestamp() as Timestamp,
      communityImageUrl: communityImageURL || "",
    };

    try {
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);

      if (selectedFile) {
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
        await uploadString(imageRef, selectedFile, "data_url");

        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(postDocRef, {
          imageURL: downloadURL,
        });
      }

      navigate(`/r/${communityId}`);
    } catch (error: any) {
      console.log("handleCreatePost", error.message);
      setError(true);
    }

    setLoading(false);
  }

  function onTextChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setTextInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="flex flex-col bg-white rounded mt-2">
      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        <Tab.List className="flex justify-between">
          <Tab className="flex w-1/3 rounded-tl outline-none">
            {({ selected }) => (
              <div
                className={`flex grow justify-center py-3 border-b border-r font-semibold  gap-2 text-sm items-center hover:bg-blue-50 ${
                  selected
                    ? "text-blue-600 border-b-2 border-b-blue-600 mb-0"
                    : "text-gray-500 mb-[1px]"
                }`}
              >
                <DocumentTextIcon className="h-6 w-6" />
                Post
              </div>
            )}
          </Tab>
          <Tab className="flex w-1/3 outline-none">
            {({ selected }) => (
              <div
                className={`flex grow justify-center py-3 border-b border-r font-semibold  gap-2 text-sm items-center hover:bg-blue-50 ${
                  selected
                    ? "text-blue-600 border-b-2 border-b-blue-600 mb-0"
                    : "text-gray-500 mb-[1px]"
                }`}
              >
                <PhotoIcon className="h-6 w-6" />
                Images
              </div>
            )}
          </Tab>
          <Tab className="flex w-1/3 rounded-tr outline-none">
            {({ selected }) => (
              <div
                className={`flex grow justify-center py-3 border-b font-semibold  gap-2 text-sm items-center hover:bg-blue-50 ${
                  selected
                    ? "text-blue-600 border-b-2 border-b-blue-600 mb-0"
                    : "text-gray-500 mb-[1px]"
                }`}
              >
                <LinkIcon className="h-6 w-6" />
                Link
              </div>
            )}
          </Tab>
        </Tab.List>

        <Tab.Panels>
          <Tab.Panel>
            <TextInputs
              textInputs={textInputs}
              onChange={onTextChange}
              handleCreatePost={handleCreatePost}
              loading={loading}
            />
          </Tab.Panel>
          <Tab.Panel>
            <ImageUpload
              onSelectImage={onSelectFile}
              selectedFile={selectedFile}
              setSelectedTab={setSelectedTab}
              setSelectedFile={setSelectedFile}
            />
          </Tab.Panel>
          <Tab.Panel>
            <div className="w-full h-[260px] flex items-center justify-center text-gray-800">
              Link not implemented
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      {error && (
        <div className="flex gap-2 p-3 bg-red-200 items-center">
          <ExclamationCircleIcon className="h-7 w-7 stroke-white fill-red-600" />{" "}
          Error creating post
        </div>
      )}
    </div>
  );
}

export default NewPostForm;
