import { useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Firebase configuration from environment variables
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

const initializeFirebase = () => {
  if (typeof window !== "undefined" && !firebaseApp) {
    // Initialize Firebase only in the client-side environment
    firebaseApp = initializeApp(firebaseConfig);
    console.log('Firebase App Initialized:', firebaseApp);

    // Initialize Firebase Analytics (only client-side)
    getAnalytics(firebaseApp);
    console.log("Firebase Analytics Initialized:", firebaseApp);

    // Optional: Initialize Firebase Auth if you need it
    const auth = getAuth(firebaseApp);
    console.log("Firebase Auth Initialized:", auth);
  }

  return firebaseApp;
};

// Named export for initializeFirebase
export { initializeFirebase };

// Optional: Default export for useFirebase if you need it
export const useFirebase = () => {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      initializeFirebase();
      setFirebaseInitialized(true); // Set state when Firebase is initialized
    }
  }, []);

  return firebaseInitialized;
};

//update