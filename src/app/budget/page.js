"use client"; // Ensure this file is rendered client-side

export const dynamic = "force-dynamic";


import React, { useRef, useEffect, useState, useContext } from "react";
import TransactionsPage from "../components/Transaction";
import Balance from "../components/balance";
import Income from "../components/income";
import Expense from "../components/expense";
import { TransactionsProvider } from "../components/Transaction";
import { TransactionsContext } from "../components/Transaction";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { initializeFirebase } from "../services/firebase";
import { useRouter } from "next/navigation";

// Initialize Firebase
initializeFirebase();
const db = getFirestore();

export default function Home() {
  const textInput = useRef(null);
  const amountInput = useRef(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        router.push("/"); // Redirect unauthenticated users to login
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) return <div>Loading...</div>;

  return (
    <TransactionsProvider user={user}>
      <HomeContent
        textInput={textInput}
        amountInput={amountInput}
        user={user}
        router={router}
      />
    </TransactionsProvider>
  );
}

const HomeContent = ({ textInput, amountInput, user, router }) => {
  const { transactions, setTransactions } = useContext(TransactionsContext);

  useEffect(() => {
    const fetchTransactions = async () => {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setTransactions(docSnap.data().transactions || []);
        console.log('Transactions fetched')
      } else {
        await setDoc(docRef, { transactions: [] });
        console.log('Transaction fetch failed')
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


  const handleLogout = () => {
    const auth = getAuth();
    auth.signOut();
    router.push("/");
  };

  return (
    <div className="min-h-screen w-full bg-slate-300 text-black flex flex-col items-center">
      <div className="flex flex-col w-2/5 mb-5">
        <h1 className="mt-10">Expense Tracker</h1>
        <Balance />
        <div className="bg-white flex flex-col gap-4 p-1 border-2">
          <div className="flex justify-center">
            <Income />
            <Expense />
          </div>
          <div className="border-gray-200 border-2">
            <h2>History</h2>
            <hr />
            <TransactionsPage />
          </div>
        </div>
        <div className="flex flex-col">
          <h1>Add a new transaction (input &#39;-&#39; if it is an expense)</h1>
          <input type="text" placeholder="Enter text" ref={textInput} />
          <h1>Amount</h1>
          <input type="number" placeholder="Enter amount" ref={amountInput} />
          <button
            onClick={handleAddTransaction}
            className="bg-cyan-400 rounded-lg"
          >
            Add transaction
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-400 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
