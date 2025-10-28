import React from 'react';

function ButtonCancel({ onClick }) {
	return (
		<button type="button"
			onClick={onClick} //Llama a la función de cerrar modal
			className="bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-md duration-200"
		>
			Cancelar
		</button>
	);
}

export default ButtonCancel;