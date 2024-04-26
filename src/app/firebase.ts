import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyALIAt79-kG5Z0CzpBLc_KSVexcHOK-HGU",
  authDomain: "chatapplication-with-cha-ac9a9.firebaseapp.com",
  projectId: "chatapplication-with-cha-ac9a9",
  storageBucket: "chatapplication-with-cha-ac9a9.appspot.com",
  messagingSenderId: "745628687411",
  appId: "1:745628687411:web:1b2274a27ea9f17c4dd746",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
