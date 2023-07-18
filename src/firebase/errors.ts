interface ErrorMap {
  [error: string]: string;
}

export const FIREBASE_ERRORS: ErrorMap = {
  "Firebase: Error (auth/email-already-in-use).":
    "A user with that email already exists.",
};
