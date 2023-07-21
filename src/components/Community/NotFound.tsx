import { Link } from "react-router-dom";

type Props = {};

function NotFound({}: Props) {
  return (
    <div className="fixed inset-0 flex flex-col gap-4 items-center justify-center">
      <p>Sorry, that community does not exist or has been banned.</p>
      <Link
        to="/"
        className="flex items-center justify-center min-w-max mb-3 h-10 text-sm text-white bg-blue-500 border-2 border-blue-500 rounded-full px-3 py-1 hover:brightness-95 active:brightness-90"
      >
        GO HOME
      </Link>
    </div>
  );
}

export default NotFound;
