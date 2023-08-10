import { useEffect, useState } from "react";
import { Listbox } from "@headlessui/react";
import { Community, useCommunityData } from "../../stores/communityStore";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase/firebaseConfig";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import ListboxItem from "./ListboxItem";

type Props = {};

function CommunityListbox({}: Props) {
  const { setCurrentCommunity, currentCommunity } = useCommunityData();
  const [communities, setCommunities] = useState<Community[]>([]);

  async function getCommunities() {
    try {
      const communitiesDocs = await getDocs(
        collection(firestore, "communities")
      );
      const communities = communitiesDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCommunities(communities as Community[]);
    } catch (error: any) {
      console.log("getCommunities", error.message);
    }
  }

  useEffect(() => {
    getCommunities();
  }, []);

  return (
    <Listbox value={currentCommunity} onChange={setCurrentCommunity}>
      <Listbox.Button className="rounded flex mt-2 py-1 px-2 bg-white items-center">
        {currentCommunity ? (
          <ListboxItem active={false} community={currentCommunity} />
        ) : (
          <>
            <div className="h-5 w-5 rounded-full border border-dashed border-gray-500"></div>
            <p className="py-1 px-2">Choose a community</p>
          </>
        )}
        <ChevronUpDownIcon className="h-4 w-4" />
      </Listbox.Button>
      <Listbox.Options className="bg-white border border-gray-200 max-w-max rounded absolute">
        {communities.map((item) => (
          <Listbox.Option key={item.id} value={item}>
            {({ active }) => <ListboxItem active={active} community={item} />}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}

export default CommunityListbox;
