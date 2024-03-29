interface ErrorMap {
  [error: string]: string;
}

export const FIREBASE_ERRORS: ErrorMap = {
  "Firebase: Error (auth/email-already-in-use).":
    "A user with that email already exists.",
  "Firebase: Error (auth/popup-closed-by-user).":
    "Popup was closed before sign in could complete.",
  "Firebase: Error (auth/wrong-password).": "Wrong username or password.",
  "Firebase: Error (auth/user-not-found).": "Wrong username or password.",
};
