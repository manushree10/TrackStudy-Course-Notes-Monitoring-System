// src/services/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🔥 Paste your Firebase config here!
const firebaseConfig = {
  apiKey: "AIzaSyA6IAd6Bj-NIEDedS-Z73sXdJmcHy082EI",
  authDomain: "learning-app-468dc.firebaseapp.com",
  projectId: "learning-app-468dc",
  storageBucket: "learning-app-468dc.firebasestorage.app",
  messagingSenderId: "207696070865",
  appId: "1:207696070865:web:bc6f680f4f60dae0101df0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
