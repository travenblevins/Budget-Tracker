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

// Variable to hold the Firebase app instance
let firebaseApp;

const initializeFirebase = () => {
  if (typeof window !== "undefined" && !firebaseApp) {
    // Initialize Firebase only in the client-side environment
    firebaseApp = initializeApp(firebaseConfig);
    console.log('Firebase App Initialized:', firebaseApp);

    // Initialize Firebase Analytics (only on client-side)
    getAnalytics(firebaseApp);
    console.log("Firebase Analytics Initialized:", firebaseApp);

    // Initialize Firebase Auth if needed
    getAuth(firebaseApp);
  }

  return firebaseApp;
};

// Named export for initializeFirebase
export { initializeFirebase };
