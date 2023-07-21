import { ReactNode } from "react";

type Props = {
  children: ReactNode[];
};

function PageContent({ children }: Props) {
  return (
    <div className="flex border justify-center py-4">
      <div className="flex border w-[95%] justify-center max-w-[860px]">
        {/* left column */}
        <div className="flex flex-col w-full md:w-[65%] md:mr-6 border">
          {children[0]}
        </div>

        {/* right column */}
        <div className="hidden md:flex grow flex-col border">{children[1]}</div>
      </div>
    </div>
  );
}

export default PageContent;
