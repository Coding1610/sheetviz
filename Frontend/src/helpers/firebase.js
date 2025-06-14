// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getEnv } from "./getEnv";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:getEnv('VITE_FIREBASE_API_KEY'),
  authDomain: "sheetviz-ed49f.firebaseapp.com",
  projectId: "sheetviz-ed49f",
  storageBucket: "sheetviz-ed49f.firebasestorage.app",
  messagingSenderId: "494917027208",
  appId: "1:494917027208:web:8c6900f2fdb65a372b263d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth, provider};