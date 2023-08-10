import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import React from "react";

type Props = {};

function Premium({}: Props) {
  return (
    <div className="bg-white rounded flex flex-col p-2 gap-4">
      <div className="flex gap-2">
        <ShieldCheckIcon className="h-8 w-8 stroke-brand-100" />
        <div className="flex flex-col gap-1">
          <p className="font-bold text-gray-800 text-sm">Reddit Premium</p>
          <p className="text-gray-800 text-xs">
            The best Reddit experience, with monthly coins.{" "}
          </p>
        </div>
      </div>
      <button className="grow bg-brand-100 text-white font-bold rounded-full p-1 hover:brightness-95 active:brightness-90">
        Try Now
      </button>
    </div>
  );
}

export default Premium;
