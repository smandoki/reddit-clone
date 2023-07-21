import { useState } from "react";
import { useAuthModalStore } from "../../../stores/authModalStore";
import { auth } from "../../../firebase/firebaseConfig";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { FIREBASE_ERRORS } from "../../../firebase/errors";

type Props = {};

function Signup({}: Props) {
  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPasswordError, setShowPasswordError] = useState(false);
  const { setView } = useAuthModalStore();

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (error) error.message = "";
    setShowPasswordError(false);

    if (signupForm.password !== signupForm.confirmPassword) {
      setShowPasswordError(true);
      return;
    }

    createUserWithEmailAndPassword(signupForm.email, signupForm.password);
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSignupForm((prev) => ({
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
          value={signupForm.email}
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
          placeholder="Password"
          minLength={6}
          value={signupForm.password}
          className="border-gray-100 peer w-full border hover:border-gray-300 focus:border-gray-300 py-2 px-4 mb-3 rounded-full bg-gray-50 focus:outline-none placeholder-transparent"
        />
        <label
          htmlFor="password"
          className="text-gray-600 absolute left-4 -top-5 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm peer-hover:-top-5 peer-hover:text-gray-600 peer-hover:text-sm"
        >
          Password
        </label>
      </div>

      <div className="relative">
        <input
          onChange={onChange}
          required
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Password"
          minLength={6}
          value={signupForm.confirmPassword}
          className="border-gray-100 peer w-full border hover:border-gray-300 focus:border-gray-300 py-2 px-4 mb-3 rounded-full bg-gray-50 focus:outline-none placeholder-transparent"
        />
        <label
          htmlFor="confirmPassword"
          className="text-gray-600 absolute left-4 -top-5 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm peer-hover:-top-5 peer-hover:text-gray-600 peer-hover:text-sm"
        >
          Confirm Password
        </label>
      </div>

      {/* show passwords do not match error */}
      {showPasswordError && (
        <p className="text-center text-red-500 -mt-5 text-sm">
          Passwords do not match.
        </p>
      )}

      {/* display firebase errors */}
      {error && (
        <p className="text-center text-red-500 -mt-5 text-sm">
          {FIREBASE_ERRORS[error.message] ?? error.message}
        </p>
      )}

      {/* submit button */}
      {!loading && (
        <button
          type="submit"
          className="flex items-center justify-center w-full mb-3 h-10 text-sm text-white bg-blue-500 border-2 border-blue-500 rounded-full px-2 py-1 hover:brightness-95 active:brightness-90"
        >
          Sign Up
        </button>
      )}

      {/* disabled submit button with loading indicator */}
      {loading && (
        <button
          disabled
          className="opacity-60 flex items-center justify-center w-full mb-3 h-10 text-sm text-white bg-blue-500 border-2 border-blue-500 rounded-full px-2 py-1"
        >
          <div className="animate-spin border-4 rounded-full h-5 w-5 border-gray-300 border-t-white"></div>
        </button>
      )}

      <div className="flex items-center justify-center text-sm">
        <p className="mr-2">Already signed up?</p>
        <p
          className="text-blue-500 cursor-pointer font-bold"
          onClick={() => setView("login")}
        >
          LOG IN
        </p>
      </div>
    </form>
  );
}

export default Signup;
