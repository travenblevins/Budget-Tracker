import { useState } from 'react';

export default function Expense() {
    const [expense, setExpense] = useState(20);
    return (
        <div className="flex flex-col mt-5 mb-5 mr-10 ml-10 gap-2">
            <h2>EXPENSE</h2>
            <span className="text-red-400">-${expense}</span>
        </div>
    );
}