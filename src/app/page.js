"use client"


import React from 'react';
import { FaHome, FaUser, FaTrash } from 'react-icons/fa';
import Balance from './components/balance';
import Income from './components/income';
import Expense from './components/expense';
import TransactionsPage from './components/Transaction';



export default function Home() {
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
          <TransactionsPage />
        </div>
        <div className="flex flex-col">
          <h1>Add a new transaction</h1>
          <input type="text" placeholder="Enter text" />
          <h1>Amount</h1>
          <input type="text" placeholder="Enter amount" />
          <button className="bg-cyan-400">Add transaction</button>
        </div>
      </div>
    </div>
  );
}
