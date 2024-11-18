import { useEffect, useState, useContext } from 'react';
import { TransactionsContext } from './Transaction';

export default function Balance() {
    const { transactions } = useContext(TransactionsContext); // Access transactions from the context
    const [balance, setBalance] = useState(0); // Initialize balance state

    useEffect(() => {
        let total = 0;
        transactions.forEach((transaction) => {
            total += transaction.amount;
        });
        setBalance(total.toFixed(2)); // Update the balance state
    }, [transactions]); // Re-run the effect whenever transactions change

    return (
        <div>
            <h2>BALANCE</h2>
            <span className={`text-${balance >= 0 ? 'emerald' : 'rose'}-600`}>${balance}</span>
        </div>
    );
}
