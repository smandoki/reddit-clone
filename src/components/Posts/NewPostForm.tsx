import {
  DocumentTextIcon,
  PhotoIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import { Tab } from "@headlessui/react";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import TextInputs from "./PostForm/TextInputs";
import ImageUpload from "./PostForm/ImageUpload";

type Props = {};

function NewPostForm({}: Props) {
  const [urlSearchParams] = useSearchParams();
  const [textInputs, setTextInputs] = useState({
    title: "",
    body: "",
  });
  const [selectedFile, setSelectedFile] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    if ("media" in Object.fromEntries(urlSearchParams)) setSelectedTab(1);
    if ("url" in Object.fromEntries(urlSearchParams)) setSelectedTab(2);
  }, []);

  async function handleCreatePost() {
    setLoading(true);
  }

  function onSelectImage(event: React.ChangeEvent<HTMLInputElement>) {
    const reader = new FileReader();

    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target.result as string);
      }
    };
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
          <Tab className="flex w-1/3 rounded-tl">
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
          <Tab className="flex w-1/3">
            {({ selected }) => (
              <div
                className={`flex grow justify-center py-3 border-b border-r font-semibold  gap-2 text-sm items-center hover:bg-blue-50 ${
                  selected
                    ? "text-blue-600 border-b-2 border-b-blue-600 mb-0"
                    : "text-gray-500 mb-[1px]"
                }`}
              >
                <PhotoIcon className="h-6 w-6" />
                Images & Video
              </div>
            )}
          </Tab>
          <Tab className="flex w-1/3 rounded-tr">
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
              onSelectImage={onSelectImage}
              selectedFile={selectedFile}
              setSelectedTab={setSelectedTab}
              setSelectedFile={setSelectedFile}
            />
          </Tab.Panel>
          <Tab.Panel>Link</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default NewPostForm;
