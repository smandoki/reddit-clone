import { useState } from "react";

function useSelectFile() {
  const [selectedFile, setSelectedFile] = useState<string>();

  function onSelectFile(event: React.ChangeEvent<HTMLInputElement>) {
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

  return {
    selectedFile,
    setSelectedFile,
    onSelectFile,
  };
}

export default useSelectFile;
