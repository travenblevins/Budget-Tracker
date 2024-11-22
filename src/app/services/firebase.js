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

// Initialize Firebase only in the browser (client-side)
export const initializeFirebase = () => {
  if (typeof window === "undefined") {
    console.error("Firebase should be initialized on the client-side.");
    return;
  }

  if (!firebaseConfig.apiKey) {
    console.error("Firebase API key is missing in the config.");
    return;
  }

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  console.log("Firebase App Initialized:", app);

  // Initialize Firebase Analytics
  const analytics = getAnalytics(app);
  console.log("Firebase Analytics Initialized:", analytics);

  // Initialize Firebase Auth if needed
  const auth = getAuth(app);
  console.log("Firebase Auth Initialized:", auth);

  return app;
};
