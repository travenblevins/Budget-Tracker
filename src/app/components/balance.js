import { useState } from 'react';

export default function Balance() {
    const [balance, setBalance] = useState(20);
    return (
        <div>
            <h1>${balance}</h1>
        </div>
    );
}