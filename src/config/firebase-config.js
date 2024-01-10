// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCK0PxKCtKi_uGamJ-XrNBydZ3ptDp56a4",
  authDomain: "expense-tracker-449ec.firebaseapp.com",
  projectId: "expense-tracker-449ec",
  storageBucket: "expense-tracker-449ec.appspot.com",
  messagingSenderId: "114399396547",
  appId: "1:114399396547:web:d5e418680e2da7b99f9876"
};  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);


