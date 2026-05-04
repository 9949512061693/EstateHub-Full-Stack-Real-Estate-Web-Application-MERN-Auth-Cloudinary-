// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "mern-real-estate-11ff6.firebaseapp.com",
  projectId: "mern-real-estate-11ff6",
  storageBucket: "mern-real-estate-11ff6.firebasestorage.app",
  messagingSenderId: "883146272833",
  appId: "1:883146272833:web:6841bfe41548ef2c3656c0",
  measurementId: "G-9BCE198G5P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
