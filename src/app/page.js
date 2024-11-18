"use client";

import React, { useRef } from 'react';
import TransactionsPage from './components/Transaction'; // Correct import of TransactionsPage
import Balance from './components/balance';
import Income from './components/income';
import Expense from './components/expense';
import { TransactionsProvider } from './components/Transaction'; // Use only TransactionsProvider here
import { useContext } from 'react';
import { TransactionsContext } from './components/Transaction';
import { useSessionData } from './components/sessionData';

function MyComponent() {
  const [data, setData] = useSessionData('myKey', 'default value');

  return (
    <div>
      <input
        type="text"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <p>Stored Data: {data}</p>
    </div>
  );
}


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
    <div className="h-screen w-full bg-slate-300 text-black flex flex-col items-center">
      <div className="flex flex-col h-screen">
        <h1 className="mt-10">Expense Tracker</h1>
        YOUR BALANCE:
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
          <button onClick={handleAddTransaction} className="bg-cyan-400 rounded-lg">
            Add transaction
          </button>
        </div>
      </div>
    </div>
  );
};
