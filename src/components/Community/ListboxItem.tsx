import React from "react";
import RedditFace from "../RedditFace";
import { Community } from "../../stores/communityStore";

type Props = {
  active: boolean;
  community: Community;
};

function ListboxItem({ active, community }: Props) {
  return (
    <div
      className={`flex items-center px-2 py-1 gap-2 cursor-pointer ${
        active ? "bg-gray-100" : ""
      }`}
    >
      {community.imageURL ? (
        <img
          src={community.imageURL}
          alt="community image"
          className="h-5 w-5 rounded-full"
        />
      ) : (
        <RedditFace className="h-5 w-5 fill-blue-500 rounded-full" />
      )}

      {community.id}
    </div>
  );
}

export default ListboxItem;
