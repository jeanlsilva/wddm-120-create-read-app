// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2Np2uexlIMrb03GhGwShRzOpzYH6Asmw",
  authDomain: "create-read-app.firebaseapp.com",
  projectId: "create-read-app",
  storageBucket: "gs://create-read-app.appspot.com",
  messagingSenderId: "658188918929",
  appId: "1:658188918929:web:9a14627fc8f9b2c5649f30",
  measurementId: "G-4RJLFN6S1H",
  databaseURL: "https://create-read-app-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);