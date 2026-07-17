import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDASnfaX--hMhlcpaggbzEfiIOyjG5_69M",
  authDomain: "reactquizgame.firebaseapp.com",
  projectId: "reactquizgame",
  storageBucket: "reactquizgame.firebasestorage.app",
  messagingSenderId: "1028423242774",
  appId: "1:1028423242774:web:cac4dc022fff659e8d9137",
  measurementId: "G-FX2J1W0K27"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
