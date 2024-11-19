"use client"; // Ensure this is at the top to mark the file as client-side rendered

import React, { useRef, useEffect, useState, useContext } from "react";
import TransactionsPage from "../components/Transaction"; // Correct import of TransactionsPage
import Balance from "../components/balance";
import Income from "../components/income";
import Expense from "../components/expense";
import { TransactionsProvider } from "../components/Transaction";
import { TransactionsContext } from "../components/Transaction";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { initializeFirebase } from "../services/firebase";

// Dynamically import useRouter to ensure it's only used on the client
import dynamic from "next/dynamic";
const DynamicRouter = dynamic(() => import("next/router").then(mod => mod.useRouter), { ssr: false });

// Initialize Firebase
initializeFirebase();
const db = getFirestore();

export default function Home() {
  const textInput = useRef(null);
  const amountInput = useRef(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Dynamically get the router on client-side only
  const router = DynamicRouter(); // Now the router will only be available on the client

  useEffect(() => {
    setIsClient(true); // Set to true once the component is mounted on the client side
  }, []);

  useEffect(() => {
    if (!isClient) return; // Only run on client side

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        router.push("/"); // Redirect unauthenticated users to login page
      }
    });

    return () => unsubscribe();
  }, [router, isClient]); // Depend on router and isClient to ensure it's client-side

  if (loading || !isClient) return <div>Loading...</div>; // Add fallback loading until the client-side is ready

  return (
    <TransactionsProvider>
      <HomeContent
        textInput={textInput}
        amountInput={amountInput}
        user={user}
      />
    </TransactionsProvider>
  );
}

const HomeContent = ({ textInput, amountInput, user }) => {
  const { transactions, setTransactions } = useContext(TransactionsContext);

  useEffect(() => {
    const fetchTransactions = async () => {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setTransactions(docSnap.data().transactions || []);
      } else {
        await setDoc(docRef, { transactions: [] });
      }
    };

    fetchTransactions();
  }, [user, setTransactions]);

  const handleAddTransaction = async () => {
    const name = textInput.current.value;
    const amount = parseFloat(amountInput.current.value);

    if (!name || isNaN(amount)) {
      alert("Please enter valid values for both fields.");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      name,
      amount,
      type: amount > 0 ? "positive" : "negative",
    };

    setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);

    // Update Firestore
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      transactions: arrayUnion(newTransaction),
    });

    textInput.current.value = "";
    amountInput.current.value = "";
  };

  return (
    <div className="h-screen w-full bg-slate-300 text-black flex flex-col items-center">
      <div className="flex flex-col h-screen">
        <h1 className="mt-10">Expense Tracker</h1>
        <Balance />
        <div className="bg-white flex flex-col gap-4 h-2/5">
          <div className="flex justify-center">
            <Income />
            <Expense />
          </div>
          <div>
            <h2>History</h2>
            <hr></hr>
          </div>
          <TransactionsPage />
        </div>
        <div className="flex flex-col">
          <h1>Add a new transaction (input '-' if it is an expense)</h1>
          <input type="text" placeholder="Enter text" ref={textInput} />
          <h1>Amount</h1>
          <input type="number" placeholder="Enter amount" ref={amountInput} />
          <button
            onClick={handleAddTransaction}
            className="bg-cyan-400 rounded-lg"
          >
            Add transaction
          </button>
        </div>
      </div>
    </div>
  );
};
