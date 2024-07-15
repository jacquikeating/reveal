import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyDqBKsh1j-_A1pByNSxQQZHzN7LoBHcnBA",
  authDomain: "reveal-85a73.firebaseapp.com",
  projectId: "reveal-85a73",
  storageBucket: "reveal-85a73.appspot.com",
  messagingSenderId: "431819751557",
  appId: "1:431819751557:web:ce90a82b0549aebfc5a9ec",
  measurementId: "G-5WF7ELBX56",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const fbProvider = new FacebookAuthProvider();
const db = getFirestore(app);
const analytics = getAnalytics(app);
