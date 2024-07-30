// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRCVYEOPP_Li8OK6-LnK-8SeB-MN_L4Iw",
  authDomain: "dietduo-caf25.firebaseapp.com",
  projectId: "dietduo-caf25",
  storageBucket: "dietduo-caf25.appspot.com",
  messagingSenderId: "302724536053",
  appId: "1:302724536053:web:da49260761014289b2d7bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;