import { useState } from "react";
import { useAuthModalStore } from "../../../stores/authModalStore";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/firebaseConfig";

type Props = {};

function ResetPassword({}: Props) {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const { setView } = useAuthModalStore();

  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const success = await sendPasswordResetEmail(email);
    if (success) setSuccess(true);
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      {!success && (
        <>
          <p className="text-sm">
            Tell us the email address associated with your Reddit account, and
            we'll send you an email with a link to reset your password.
          </p>

          <div className="relative mt-3">
            <input
              onChange={onChange}
              required
              value={email}
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="border-gray-100 peer w-full border hover:border-gray-300 focus:border-gray-300 py-2 px-4 mb-1 rounded-full bg-gray-50 focus:outline-none placeholder-transparent"
            />
            <label
              htmlFor="email"
              className="text-gray-600 absolute left-4 -top-5 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm peer-hover:-top-5 peer-hover:text-gray-600 peer-hover:text-sm"
            >
              Email
            </label>
          </div>

          {/* display firebase errors */}
          {error && (
            <p className="text-center text-red-500 -mt-5 text-sm">
              {error.message === "Firebase: Error (auth/user-not-found)."
                ? "No user with that email"
                : error.message}
            </p>
          )}

          {!sending && (
            <button
              type="submit"
              className="w-full mb-1 h-10 text-sm text-white bg-blue-500 border-2 border-blue-500 rounded-full px-2 py-1 hover:brightness-95 active:brightness-90"
            >
              Reset Password
            </button>
          )}

          {/* disabled button with loading indicator */}
          {sending && (
            <button
              disabled
              className="opacity-60 flex items-center justify-center w-full mb-3 h-10 text-sm text-white bg-blue-500 border-2 border-blue-500 rounded-full px-2 py-1"
            >
              <div className="animate-spin border-4 rounded-full h-5 w-5 border-gray-300 border-t-white"></div>
            </button>
          )}
        </>
      )}

      {success && <p>Email has been sent.</p>}

      <div className="flex items-center justify-center text-sm gap-1">
        <p
          className="text-blue-500 cursor-pointer font-bold"
          onClick={() => setView("login")}
        >
          LOG IN
        </p>
        <p>&#x2022;</p>
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

export default ResetPassword;
