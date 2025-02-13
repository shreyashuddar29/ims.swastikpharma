import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBaOTox5FkXVZ83RCwkFTVToK8bE4EXH8k",
  authDomain: "swastikpharma-8ecc2.firebaseapp.com",
  projectId: "swastikpharma-8ecc2",
  storageBucket: "swastikpharma-8ecc2.firebasestorage.app",
  messagingSenderId: "790719476431",
  appId: "1:790719476431:web:dd57a513a4c725bf1e3dba"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export {db}