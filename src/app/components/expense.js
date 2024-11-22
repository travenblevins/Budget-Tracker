import { useState, useEffect, useContext } from 'react';
import { TransactionsContext } from './Transaction';

export default function Expense() {
    const { transactions } = useContext(TransactionsContext);
    const [expense, setExpense] = useState(0);

    useEffect(() => {
        let total = 0;
        transactions.forEach((transaction) => {
            if (transaction.type === 'negative') {
                total += transaction.amount;
            }
        });
        setExpense(total.toFixed(2));
    })[transactions];

    return (
        <div className="flex flex-col mt-5 mb-5 mr-10 ml-10 gap-2">
            <h2>EXPENSE</h2>
            <span className="text-red-400">${expense}</span>
        </div>
    );
}