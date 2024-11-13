import { FaTrash } from 'react-icons/fa';

export default function NegativeTransaction({ name, amount, id, onDelete }) {
    return (
        <div className="flex" id={id}>
            <div className="bg-white flex justify-between w-full">
                <div>{name}</div>
                <div className="flex">
                    <div>${amount}</div>
                    <div className="w-1 h-full bg-rose-400"></div>
                </div>
            </div>
            <button onClick={() => onDelete(id)}>  {/* Trigger onDelete with the transaction id */}
                <FaTrash />
            </button>
        </div>
    );
}
