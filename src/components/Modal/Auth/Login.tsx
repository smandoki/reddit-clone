type Props = {};

function Login({}: Props) {
  return (
    <form className="flex flex-col w-full mt-6">
      <div className="relative">
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="peer w-full border border-white hover:border-gray-300 focus:border-gray-300 py-2 px-4 mb-3 rounded-full bg-gray-50 focus:outline-none placeholder-transparent"
        />
        <label
          htmlFor="username"
          className="text-gray-600 absolute left-4 -top-5 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm peer-hover:-top-5 peer-hover:text-gray-600 peer-hover:text-sm"
        >
          Username
        </label>
      </div>

      <div className="relative mt-3.5">
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="peer w-full border border-white hover:border-gray-300 focus:border-gray-300 py-2 px-4 mb-3 rounded-full bg-gray-50 focus:outline-none placeholder-transparent"
        />
        <label
          htmlFor="password"
          className="text-gray-600 absolute left-4 -top-5 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm peer-hover:-top-5 peer-hover:text-gray-600 peer-hover:text-sm"
        >
          Password
        </label>
      </div>

      <button className="mt-3 w-full h-10 text-sm text-white bg-blue-500 border-2 border-blue-500 rounded-full px-2 py-1 hover:brightness-95 active:brightness-90">
        Log In
      </button>
    </form>
  );
}

export default Login;
