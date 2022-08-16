// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgtQxGEKfqGhmG5hISR9GJBLiZSR0GObY",
  authDomain: "nftoad-3fce4.firebaseapp.com",
  databaseURL: "https://nftoad-3fce4-default-rtdb.firebaseio.com",
  projectId: "nftoad-3fce4",
  storageBucket: "gs://nftoad-3fce4.appspot.com",
  messagingSenderId: "859526330550",
  appId: "1:859526330550:web:650071b6536d56335a4e17"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);