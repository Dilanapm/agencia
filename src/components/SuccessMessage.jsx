import React from "react";

function SuccessMessage({ message, onClose }) {
    return (
        <div className="fixed top-10 right-10 bg-green-500 text-white py-2 px-4 rounded-lg shadow-md flex items-center space-x-4">
            <span className="font-medium">{message}</span>
            <button
                onClick={onClose}
                className="bg-white text-green-500 font-bold rounded-full px-2 py-1 ml-4 hover:bg-gray-200 transition"
            >
                X
            </button>
        </div>
    );
}

export default SuccessMessage;
