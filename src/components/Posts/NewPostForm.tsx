import {
  DocumentTextIcon,
  PhotoIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import { Tab } from "@headlessui/react";
import { useSearchParams } from "react-router-dom";

type Props = {};

function NewPostForm({}: Props) {
  const [urlSearchParams] = useSearchParams();

  function getTabIndex() {
    if ("media" in Object.fromEntries(urlSearchParams)) return 1;
    if ("url" in Object.fromEntries(urlSearchParams)) return 2;
    return 0;
  }

  return (
    <div className="flex flex-col bg-white rounded mt-2">
      <Tab.Group defaultIndex={getTabIndex()}>
        <Tab.List className="flex justify-between">
          <Tab className="flex w-1/3 rounded-tl">
            {({ selected }) => (
              <button
                className={`flex grow justify-center py-3 border-b border-r font-semibold  gap-2 ${
                  selected
                    ? "text-blue-600 border-b-2 border-b-blue-600"
                    : "text-gray-500"
                }`}
              >
                <DocumentTextIcon className="h-6 w-6" />
                Post
              </button>
            )}
          </Tab>
          <Tab className="flex w-1/3">
            {({ selected }) => (
              <button
                className={`flex grow justify-center py-3 border-b border-r font-semibold  gap-2 ${
                  selected
                    ? "text-blue-600 border-b-2 border-b-blue-600"
                    : "text-gray-500"
                }`}
              >
                <PhotoIcon className="h-6 w-6" />
                Images & Video
              </button>
            )}
          </Tab>
          <Tab className="flex w-1/3 rounded-tr">
            {({ selected }) => (
              <button
                className={`flex grow justify-center py-3 border-b font-semibold  gap-2 ${
                  selected
                    ? "text-blue-600 border-b-2 border-b-blue-600"
                    : "text-gray-500"
                }`}
              >
                <LinkIcon className="h-6 w-6" />
                Link
              </button>
            )}
          </Tab>
        </Tab.List>

        <Tab.Panels>
          <Tab.Panel>Post</Tab.Panel>
          <Tab.Panel>Images & Video</Tab.Panel>
          <Tab.Panel>Link</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default NewPostForm;
