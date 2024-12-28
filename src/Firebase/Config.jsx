import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAaItd1a6sn94-EdhKYwByJQnKXQtwT0Yw",
  authDomain: "fir-1dd3f.firebaseapp.com",
  projectId: "fir-1dd3f",
  storageBucket: "fir-1dd3f.firebasestorage.app",
  messagingSenderId: "509692973198",
  appId: "1:509692973198:web:998526e3d7487aedd239df",
  measurementId: "G-J0T05JXPE8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const firebase = { app, auth, db };
export default firebase;
