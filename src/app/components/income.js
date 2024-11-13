import { useState } from 'react';

export default function Income () {
    const [income, setIncome] = useState(20);
    return (
        <div className="flex flex-col mt-5 mb-5 mr-10 ml-10 gap-2">
            <h2>INCOME</h2>
            <span className="text-emerald-600">+${income}</span>
        </div>
    );
}