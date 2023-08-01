import LoadingButton from "../../LoadingButton";
import { useRef } from "react";

type Props = {
  onSelectImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFile?: string;
  setSelectedTab: (value: number) => void;
  setSelectedFile: (value: string) => void;
};

function ImageUpload({
  onSelectImage,
  selectedFile,
  setSelectedTab,
  setSelectedFile,
}: Props) {
  const selectedFileRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-2 justify-center items-center w-full p-3">
      {selectedFile ? (
        <>
          <img
            src={selectedFile}
            alt="uploaded image"
            className="max-h-[400px]"
          />
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedTab(0)}
              className="rounded-full border border-blue-500 bg-blue-500 text-white py-2 px-5 text-sm font-semibold hover:brightness-95 active:brightness-90 min-w-max"
            >
              Back to Post
            </button>
            <button
              onClick={() => setSelectedFile("")}
              className="rounded-full border bg-white border-blue-500 text-blue-500 py-2 px-5 text-sm font-semibold hover:brightness-95 active:brightness-90 min-w-max"
            >
              Remove
            </button>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center p-20 border-dashed border border-gray-300 w-full rounded">
          <LoadingButton
            onClick={() => selectedFileRef.current?.click()}
            className="rounded-full border bg-white border-blue-500 text-blue-500 py-2 px-5 text-sm font-semibold hover:brightness-95 active:brightness-90"
          >
            Upload
          </LoadingButton>
          <input
            ref={selectedFileRef}
            type="file"
            onChange={onSelectImage}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
