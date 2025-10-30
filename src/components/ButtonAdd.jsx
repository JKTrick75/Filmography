import React from 'react';

function ButtonAdd({ onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="bg-green-700 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md duration-200"
        >
            Añadir
        </button>
    );
}

export default ButtonAdd;