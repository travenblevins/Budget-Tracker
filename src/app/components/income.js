import { useEffect, useContext, useState } from 'react';
import { TransactionsContext } from './Transaction';

export default function Income () {
    const { transactions } = useContext(TransactionsContext);
    const [income , setIncome] = useState(0);

    useEffect(() => {
        let total = 0;
        transactions.forEach((transaction) => {
            if(transaction.type === 'positive') {
                total += transaction.amount;
            }
        });
        setIncome(total.toFixed(2));
    }, [transactions]);

    return (
        <div className="flex flex-col mt-5 mb-5 mr-10 ml-10 gap-2">
            <h2>INCOME</h2>
            <span className="text-emerald-600">${income}</span>
        </div>
    );
}