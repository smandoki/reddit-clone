import AuthModal from "../../Modal/Auth/AuthModal";
import AuthButtons from "./AuthButtons";

type Props = {};

function RightContent({}: Props) {
  return (
    <>
      <AuthModal />
      <div className="flex justify-center items-center">
        <AuthButtons />
      </div>
    </>
  );
}

export default RightContent;
