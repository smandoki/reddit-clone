import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";

type Props = {
  open: boolean;
  handleClose: () => void;
};

function CreateCommunityModal({ open, handleClose }: Props) {
  return (
    <Dialog open={open} onClose={handleClose} className="relative z-50">
      {/* modal backdrop */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* fullscreen container to centre the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full p-4 mx-auto max-w-sm rounded bg-white flex flex-col items-center justify-center">
          {/* modal header */}
          <div className="w-full flex justify-between items-center mb-4">
            <Dialog.Title className="text-xl font-bold">
              <h1 className="text-[15px] font-semibold">Create a Community</h1>
            </Dialog.Title>
            <XMarkIcon
              className="h-5 w-5 text-gray-500 cursor-pointer"
              onClick={handleClose}
            />
          </div>

          {/* modal body */}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default CreateCommunityModal;
