type Props = {};

function OAuthButtons({}: Props) {
  return (
    <div className="flex flex-col w-full my-4">
      <button className="flex text-gray-600 bg-white w-full rounded-full justify-center items-center gap-2 p-2 border border-gray-400 hover:bg-gray-50 active:bg-gray-100">
        <img
          src="/images/googlelogo.png"
          alt="google logo"
          className="h-5 w-5"
        />
        <p className="font-bold">Continue with Google</p>
      </button>
    </div>
  );
}

export default OAuthButtons;
