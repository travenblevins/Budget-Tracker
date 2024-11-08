"use client"

import Balance from './components/balance';
import Income from './components/income';
import Expense from './components/expense';

export default function Home() {
  return (
    <div className="h-screen w-full bg-slate-400 text-black flex flex-col justify-start items-center">
      <div className="flex flex-col item-center">
        <h1 className="mt-10">Expense Tracker</h1>
          YOUR BALANCE:
          <Balance />
          <div className="bg-white flex gap-4">
            <Income />
            <Expense />
          </div>
        <div>
          <h2>History</h2>
          <div className="bg-white flex justify-between">
            <div>Flower</div>
            <div className="flex">
              <div>$20</div>
              <div className="w-1 h-full bg-rose-400"></div>
            </div>
          </div>
          <hr></hr>
          <div className="bg-white flex justify-between">
            <div>Flower</div>
            <div className="flex">
              <div>$20</div>
              <div className="w-1 h-full bg-rose-400"></div>
            </div>
          </div>
          <hr></hr>
          <div className="bg-white flex justify-between">
            <div>Flower</div>
            <div className="flex">
              <div>$20</div>
              <div className="w-1 h-full bg-rose-400"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
