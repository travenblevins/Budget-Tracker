"use client";

import React, { useRef } from 'react';
import TransactionsPage from './components/Transaction'; // Correct import of TransactionsPage
import Balance from './components/balance';
import Income from './components/income';
import Expense from './components/expense';
import { TransactionsProvider } from './components/Transaction'; // Use only TransactionsProvider here
import { useContext } from 'react';
import { TransactionsContext } from './components/Transaction';

// Home component
export default function Home() {
  const textInput = useRef(null);
  const amountInput = useRef(null);

  return (
    <TransactionsProvider> {/* Wrapping the entire UI to provide the context */}
      <HomeContent textInput={textInput} amountInput={amountInput} />
    </TransactionsProvider>
  );
}

// HomeContent handles the UI and accesses context
const HomeContent = ({ textInput, amountInput }) => {
  const { setTransactions } = useContext(TransactionsContext);

  // Function to handle adding a new transaction
  const handleAddTransaction = () => {
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
      type: amount > 0 ? 'positive' : 'negative',
    };

    // Update transactions state
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      newTransaction,
    ]);

    // Clear input fields after adding the transaction
    textInput.current.value = '';
    amountInput.current.value = '';
  };

  return (
    <div className="h-screen w-full bg-slate-300 text-black flex flex-col justify-start items-center">
      <div className="flex flex-col item-center">
        <h1 className="mt-10">Expense Tracker</h1>
        YOUR BALANCE:
        <Balance />
        <div className="bg-white flex gap-4">
          <Income />
          <Expense />
        </div>
        <div>
          <TransactionsPage /> {/* Now wrapped with the provider */}
        </div>
        <div className="flex flex-col">
          <h1>Add a new transaction</h1>
          <input type="text" placeholder="Enter text" ref={textInput} />
          <h1>Amount</h1>
          <input type="number" placeholder="Enter amount" ref={amountInput} />
          <button onClick={handleAddTransaction} className="bg-cyan-400">
            Add transaction
          </button>
        </div>
      </div>
    </div>
  );
};