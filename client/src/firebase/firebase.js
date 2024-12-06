// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAu588WzkqCbq184pwyOiRBXIrjRNRFBvM",
  authDomain: "golocal-guide.firebaseapp.com",
  projectId: "golocal-guide",
  storageBucket: "golocal-guide.firebasestorage.app",
  messagingSenderId: "314576063692",
  appId: "1:314576063692:web:30d0e44c0613c706cd0669",
  measurementId: "G-9X7ECMXN0C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app,auth};