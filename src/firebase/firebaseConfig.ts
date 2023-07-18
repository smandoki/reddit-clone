import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBOkAS1yj_SJrJ4QRkrj4P8FYLItNznBI",
  authDomain: "reddit-clone-6ac42.firebaseapp.com",
  projectId: "reddit-clone-6ac42",
  storageBucket: "reddit-clone-6ac42.appspot.com",
  messagingSenderId: "875077948501",
  appId: "1:875077948501:web:8b715d94e3d5e0716030dc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, firestore, auth, storage };
