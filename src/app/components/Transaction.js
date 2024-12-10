// Transaction.js

import React, { createContext, useState, useContext, useEffect } from 'react'; // Import useContext
import PositiveTransaction from './PositiveTransaction';
import NegativeTransaction from './NegativeTransaction';
import { initializeFirebase } from "../services/firebase";
import { getFirestore, doc, getDoc, setDoc, updateDoc, arrayRemove } from "firebase/firestore";

initializeFirebase();
const db = getFirestore();

// Create the context inside the same file
export const TransactionsContext = createContext(); // Export the context

export const TransactionsProvider = ({ children, user }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchTransactions = async () => {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          setTransactions(userDoc.data().transactions || []);
        } else {
          await setDoc(userRef, { transactions: [] });
        }
      };

      fetchTransactions();
    }
  }, [user]);

  const handleDelete = async (id) => {
    if (!user) {
      console.error("User is not authenticated");
      return;
    }
  
    // Log the user to ensure it's correct
    console.log("Deleting transaction for user:", user);
  
    // Remove transaction locally
    setTransactions((prevTransactions) =>
      prevTransactions.filter((transaction) => transaction.id !== id)
    );
  
    try {
      const userRef = doc(db, "users", user.uid);
  
      // Log the userRef to check it's targeting the correct user in Firestore
      console.log("User reference:", userRef);
  
      // Fetch current user document to get transactions
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const currentTransactions = userDoc.data().transactions;
  
        // Log the current transactions before deleting
        console.log("Current transactions before deletion:", currentTransactions);
  
        // Find and remove the transaction to be deleted
        const updatedTransactions = currentTransactions.filter(
          (transaction) => transaction.id !== id
        );
  
        // Log the updated transactions after deletion
        console.log("Updated transactions after deletion:", updatedTransactions);
  
        // Update the Firestore document with the updated transactions list
        await updateDoc(userRef, {
          transactions: updatedTransactions,
        });
  
        console.log(`Transaction with id ${id} deleted successfully!`);
      } else {
        console.error("User document not found!");
      }
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };
  

  return (
    <TransactionsContext.Provider value={{ transactions, setTransactions, handleDelete }}>
      {children}
    </TransactionsContext.Provider>
  );
};

export default function TransactionsPage() {
  // Import useContext and access transactions and handleDelete from context
  const { transactions, handleDelete } = useContext(TransactionsContext);

  return (
    <div className="flex flex-col gap-2">
      {transactions.map((transaction) =>
        transaction.type === 'positive' ? (
          <PositiveTransaction
            key={transaction.id}
            id={transaction.id}
            name={transaction.name}
            amount={transaction.amount}
            onDelete={(id) => {
              console.log("Deleting transaction with id:", id);
              handleDelete(id);
            }}
          />
        ) : (
          <NegativeTransaction
            key={transaction.id}
            id={transaction.id}
            name={transaction.name}
            amount={transaction.amount}
            onDelete={(id, user) => {
              console.log("Deleting transaction with id:", id);
              console.log("From user: ", user);
              handleDelete(id);
            }}
          />
        )
      )}
      <h3>Transactions...</h3>
    </div>
  );
}
