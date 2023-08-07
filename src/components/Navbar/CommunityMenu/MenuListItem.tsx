import { Menu } from "@headlessui/react";
import RedditFace from "../../RedditFace";
import { Link } from "react-router-dom";

type Props = {
  displayText: string;
  iconColor: string;
  imageUrl?: string;
  link: string;
};

function MenuListItem({ displayText, iconColor, imageUrl, link }: Props) {
  return (
    <Link to={link}>
      <Menu.Item>
        {({ active }) => (
          <div
            className={`${
              active ? "bg-gray-100" : ""
            } flex items-center gap-2 py-2 px-4 cursor-pointer rounded`}
            onClick={() => {}}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="community image"
                className="h-5 w-5 rounded-full"
              />
            ) : (
              <RedditFace className={`h-5 w-5 fill-${iconColor}`} />
            )}
            {displayText}
          </div>
        )}
      </Menu.Item>
    </Link>
  );
}

export default MenuListItem;
