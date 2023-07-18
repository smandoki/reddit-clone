import { useState } from "react";
import { useAuthModalStore } from "../../../stores/authModalStore";
import { auth } from "../../../firebase/firebaseConfig";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { FIREBASE_ERRORS } from "../../../firebase/errors";

type Props = {};

function Login({}: Props) {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const { setView } = useAuthModalStore();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    signInWithEmailAndPassword(loginForm.email, loginForm.password);
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLoginForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col w-full mt-6 gap-3.5">
      <div className="relative">
        <input
          onChange={onChange}
          required
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className="border-gray-100 peer w-full border hover:border-gray-300 focus:border-gray-300 py-2 px-4 mb-3 rounded-full bg-gray-50 focus:outline-none placeholder-transparent"
        />
        <label
          htmlFor="email"
          className="text-gray-600 absolute left-4 -top-5 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm peer-hover:-top-5 peer-hover:text-gray-600 peer-hover:text-sm"
        >
          Email
        </label>
      </div>

      <div className="relative">
        <input
          onChange={onChange}
          required
          type="password"
          id="password"
          name="password"
          minLength={6}
          placeholder="Password"
          className="border-gray-100 peer w-full border hover:border-gray-300 focus:border-gray-300 py-2 px-4 mb-3 rounded-full bg-gray-50 focus:outline-none placeholder-transparent"
        />
        <label
          htmlFor="password"
          className="text-gray-600 absolute left-4 -top-5 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm peer-hover:-top-5 peer-hover:text-gray-600 peer-hover:text-sm"
        >
          Password
        </label>
      </div>

      {/* display firebase errors */}
      {error && (
        <p className="text-center text-red-500 -mt-5 text-sm">
          {FIREBASE_ERRORS[error.message]}
        </p>
      )}

      {!loading && (
        <button
          type="submit"
          className="w-full mb-3 h-10 text-sm text-white bg-blue-500 border-2 border-blue-500 rounded-full px-2 py-1 hover:brightness-95 active:brightness-90"
        >
          Log In
        </button>
      )}

      {/* disabled button with loading indicator */}
      {loading && (
        <button
          disabled
          className="opacity-60 flex items-center justify-center w-full mb-3 h-10 text-sm text-white bg-blue-500 border-2 border-blue-500 rounded-full px-2 py-1"
        >
          <div className="animate-spin border-4 rounded-full h-5 w-5 border-gray-300 border-t-white"></div>
        </button>
      )}

      <div className="flex items-center justify-center text-sm">
        <p className="mr-2">New here?</p>
        <p
          className="text-blue-500 cursor-pointer font-bold"
          onClick={() => setView("signup")}
        >
          SIGN UP
        </p>
      </div>
    </form>
  );
}

export default Login;
