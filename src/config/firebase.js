// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqBKsh1j-_A1pByNSxQQZHzN7LoBHcnBA",
  authDomain: "reveal-85a73.firebaseapp.com",
  projectId: "reveal-85a73",
  storageBucket: "reveal-85a73.appspot.com",
  messagingSenderId: "431819751557",
  appId: "1:431819751557:web:ce90a82b0549aebfc5a9ec",
  measurementId: "G-5WF7ELBX56",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
