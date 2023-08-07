import moment from "moment";
import {
  Community,
  useCommunityData,
  useCommunityStore,
} from "../../stores/communityStore";
import { CakeIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore, storage } from "../../firebase/firebaseConfig";
import { useRef, useState } from "react";
import useSelectFile from "../../hooks/useSelectFile";
import RedditFace from "../RedditFace";
import Spinner from "../Spinner";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";

type Props = {
  communityData: Community;
};

function About({ communityData }: Props) {
  const [user] = useAuthState(auth);
  const selectedFileRef = useRef<HTMLInputElement>(null);
  const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile();
  const [uploadingImage, setUploadingImage] = useState(false);
  const { currentCommunity, setCurrentCommunity } = useCommunityStore();
  const { mySnippets, setMySnippets } = useCommunityData();

  async function onUpdateImage() {
    if (!selectedFile) return;
    setUploadingImage(true);

    try {
      const imageRef = ref(storage, `communities/${communityData.id}/image`);
      await uploadString(imageRef, selectedFile, "data_url");
      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(doc(firestore, "communities", communityData.id), {
        imageURL: downloadURL,
      });

      await updateDoc(
        doc(
          firestore,
          `users/${user?.uid}/communitySnippets`,
          communityData.id
        ),
        {
          imageURL: downloadURL,
        }
      );

      //update imageurl on local state
      setCurrentCommunity({ ...communityData, imageURL: downloadURL });
      setMySnippets(
        mySnippets.map((item) => {
          if (item.communityId === communityData.id) {
            return { ...item, imageURL: downloadURL };
          }

          return item;
        })
      );
    } catch (error: any) {
      console.log("onUpdateImage", error.message);
    }

    setUploadingImage(false);
    setSelectedFile("");
  }

  return (
    <div className="flex flex-col w-full bg-white rounded sticky top-[14px]">
      <div className="text-white text-sm bg-blue-400 p-3 rounded-tl rounded-tr font-bold flex justify-between items-center">
        About Community
        <EllipsisHorizontalIcon className="h-6 w-6" />
      </div>

      <div className="flex flex-col gap-2 p-3 bg-white rounded-bl rounded-br">
        <div className="flex w-full p-2 text-xs font-bold">
          <div className="flex flex-col grow">
            <p>{communityData.numberOfMembers.toLocaleString()}</p>
            <p>Members</p>
          </div>
          <div className="flex flex-col grow">
            <p>{1}</p>
            <p>Online</p>
          </div>
        </div>

        <div className="w-full border-b border-gray-200"></div>

        <div className="flex items-center w-full p-1 font-medium text-sm">
          <CakeIcon className="h-5 w-5 mr-2" />
          {communityData.createdAt && (
            <p>
              Created{" "}
              {moment(new Date(communityData.createdAt.seconds * 1000)).format(
                "MMM DD, YYYY"
              )}
            </p>
          )}
        </div>

        <Link to={`/r/${communityData.id}/submit`} className="w-full flex">
          <button className="flex grow items-center justify-center h-[30px] mt-3 rounded-full bg-blue-500 text-white px-4 py-2 hover:brightness-95 active:brightness-90">
            Create Post
          </button>
        </Link>

        {user?.uid === communityData.creatorId && (
          <>
            <div className="w-full border-b border-gray-200 my-2"></div>

            <div className="flex flex-col gap-1 text-xs">
              <p className="font-semibold">Admin</p>
              <div className="flex items-center justify-between">
                <p
                  onClick={() => selectedFileRef.current?.click()}
                  className="text-blue-500 cursor-pointer hover:underline"
                >
                  Change Image
                </p>
                {currentCommunity?.imageURL || selectedFile ? (
                  <img
                    src={selectedFile || currentCommunity?.imageURL}
                    alt="Community Image"
                    className="rounded-full h-[40px] w-[40px] object-cover"
                  />
                ) : (
                  <RedditFace className="rounded-full fill-blue-500 h-[40px] w-[40px]" />
                )}
              </div>

              {selectedFile &&
                (uploadingImage ? (
                  <Spinner />
                ) : (
                  <p
                    onClick={onUpdateImage}
                    className="cursor-pointer text-blue-500 hover:underline"
                  >
                    Save Changes
                  </p>
                ))}

              <input
                ref={selectedFileRef}
                type="file"
                onChange={onSelectFile}
                className="hidden"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default About;
