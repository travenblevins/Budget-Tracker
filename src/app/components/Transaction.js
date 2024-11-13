import React, { useState } from 'react';
import PositiveTransaction from './positiveTransaction';
import NegativeTransaction from './NegativeTransaction';

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState([
        { id: 1, name: 'Flower', amount: 20, type: 'positive' },
        { id: 2, name: 'Coffee', amount: 5, type: 'negative' },
        // Add more transactions as needed
    ]);

    // Delete handler
    const handleDelete = (id) => {
        setTransactions(transactions.filter(transaction => transaction.id !== id));
        console.log(`Deleted transaction with id: ${id}`);
    };

    return (
        <div>
            {transactions.map(transaction => (
                transaction.type === 'positive' ? (
                    <PositiveTransaction 
                        key={transaction.id} 
                        id={transaction.id} 
                        name={transaction.name} 
                        amount={transaction.amount} 
                        onDelete={handleDelete}  // Passing the delete handler to PositiveTransaction
                    />
                ) : (
                    <NegativeTransaction 
                        key={transaction.id} 
                        id={transaction.id} 
                        name={transaction.name} 
                        amount={transaction.amount} 
                        onDelete={handleDelete}  // Passing the delete handler to NegativeTransaction
                    />
                )
            ))}
        </div>
    );
}
