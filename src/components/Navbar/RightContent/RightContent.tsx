import AuthButtons from "./AuthButtons";

type Props = {};

function RightContent({}: Props) {
  return (
    <>
      <div className="flex justify-center items-center">
        <AuthButtons />
      </div>
    </>
  );
}

export default RightContent;
