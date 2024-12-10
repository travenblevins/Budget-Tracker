'use client';  // Ensure client-side rendering

import React, { useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { initializeFirebase } from "./services/firebase";
import { useRouter } from "next/navigation"; // Correct usage of useRouter

// Ensure Firebase is initialized
initializeFirebase();

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignIn, setIsSignIn] = useState(true); // Toggle between sign-in and sign-up
  const [message, setMessage] = useState("");
  const [isClient, setIsClient] = useState(false); // Client-side flag

  const auth = getAuth();
  const router = useRouter(); // Initialize useRouter for navigation

  useEffect(() => {
    setIsClient(true); // Set flag to true when on the client side
  }, []);

  // Handle sign-up
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setMessage(`Welcome, ${userCredential.user.email}! Your account has been created.`);
      router.push("/budget"); // Redirect to the budget page (app directory route)
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  // Handle sign-in
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setMessage(`Welcome back, ${userCredential.user.email}! You are signed in.`);
      router.push("/budget"); // Redirect to the budget page (app directory route)
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  // Don't render until the component is mounted on the client side
  if (!isClient) {
    return null; // Optionally show a loading spinner or nothing
  }

  return (
    <div className="max-w-[400px] mx-auto flex flex-col h-screen justify-start pt-10">
      <h1>Welcome to Budget Tracker</h1>
      <h2>{isSignIn ? "Sign In" : "Sign Up"}</h2>
      <form onSubmit={isSignIn ? handleSignIn : handleSignUp}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            className="text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", margin: "8px 0" }}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            className="text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", margin: "8px 0" }}
          />
        </div>
        <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor:"#2d24db", margin: "8px 0" }}>
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
      </form>
      <button
        onClick={() => setIsSignIn(!isSignIn)}
        className="text-black"
        style={{ width: "100%", padding: "10px", margin: "8px 0", backgroundColor: "#f0f0f0" }}
      >
        {isSignIn ? "Need an account? Sign Up" : "Already have an account? Sign In"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Page;
