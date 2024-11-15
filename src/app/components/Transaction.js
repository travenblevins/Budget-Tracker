import React, { createContext, useState, useContext } from 'react'; // Import useContext
import PositiveTransaction from './PositiveTransaction';
import NegativeTransaction from './NegativeTransaction';

// Create the context inside the same file
export const TransactionsContext = createContext(); // Export the context

export const TransactionsProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([
    { id: 1, name: 'Flower', amount: 20, type: 'positive' },
    { id: 2, name: 'Coffee', amount: -5, type: 'negative' },
  ]);

  return (
    <TransactionsContext.Provider value={{ transactions, setTransactions }}>
      {children}
    </TransactionsContext.Provider>
  );
};

export default function TransactionsPage() {
  // Import useContext and access transactions and setTransactions from context
  const { transactions, setTransactions } = useContext(TransactionsContext);

  const handleDelete = (id) => {
    setTransactions((transactions) =>
      transactions.filter((transaction) => transaction.id !== id)
    );
  };

  return (
    <div>
      {transactions.map((transaction) =>
        transaction.type === 'positive' ? (
          <PositiveTransaction
            key={transaction.id}
            id={transaction.id}
            name={transaction.name}
            amount={transaction.amount}
            onDelete={handleDelete}
          />
        ) : (
          <NegativeTransaction
            key={transaction.id}
            id={transaction.id}
            name={transaction.name}
            amount={transaction.amount}
            onDelete={handleDelete}
          />
        )
      )}
    </div>
  );
}