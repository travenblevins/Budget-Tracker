// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

let firebaseApp;

export const initializeFirebase = () => {
  // Initialize Firebase only once
  if (!firebaseApp) {
    firebaseApp = initializeApp(firebaseConfig);
    console.log("Firebase App Initialized");

    // Initialize Firebase services if needed
    if (typeof window !== "undefined") {
      getAnalytics(firebaseApp);
      console.log("Firebase Analytics Initialized");
    }
  }

  return firebaseApp;
};
