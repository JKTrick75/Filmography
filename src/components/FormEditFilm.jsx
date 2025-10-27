import React, { useEffect } from 'react';
import { useForm } from '../hooks/useForm';

function ModalEditFilm({ pelicula, onSave, onClose }) {
    //Usamos un custom hook para el State del formulario (useForm.js)
    const [formData, handleChangeForm, resetForm, setFieldForm] = useForm({
        name: '',
        year: '',
        image: ''
    });

    //Rellenamos el formulario cuando la 'pelicula' prop cambia
    useEffect(() => {
        if (pelicula) {
            //Usamos setFieldForm para rellenar los campos
            setFieldForm('name', pelicula.name);
            setFieldForm('year', pelicula.year);
            setFieldForm('image', pelicula.image);
        }
    }, [pelicula]); //Se ejecuta cada vez que cambiamos de peli para editar

    const handleSubmit = (e) => {
        //Evitamos que se recargue la página
        e.preventDefault();

        //Validamos campos formulario
        if (!formData.name || !formData.year || !formData.image) {
            alert('Por favor, completa todos los campos');
            return;
        }
        
        //Llamamos a la función de editar pelicula
        onSave({ ...formData, id: pelicula.id });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">

            <div className="max-w-4xl w-full bg-gray-800 p-6 rounded-lg shadow-lg ring-1 ring-gray-500">
                <h2 className="text-xl font-bold text-center mb-4 text-gray-300">
                    Editar Película
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="flex gap-8">
                        <div className="flex-1 mb-4">
                            <label htmlFor="name-edit" className="block text-gray-300 mb-2">
                                NAME
                            </label>
                            <input type="text" id="name-edit" name="name" placeholder="Film Name"
                                value={formData.name}
                                onChange={handleChangeForm}
                                className="w-full px-3 py-2 bg-gray-700 text-white rounded-md ring-1 ring-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                        </div>
                        <div className="flex-1 mb-4">
                            <label htmlFor="year-edit" className="block text-gray-300 mb-2">
                                YEAR
                            </label>
                            <input type="number" id="year-edit" name="year" placeholder="Year"
                                value={formData.year}
                                onChange={handleChangeForm}
                                className="w-full px-3 py-2 bg-gray-700 text-white rounded-md ring-1 ring-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="image-edit" className="block text-gray-300 mb-2">
                            FILM POSTER
                        </label>
                        <input type="url" id="image-edit" name="image" placeholder="Film Poster"
                            value={formData.image}
                            onChange={handleChangeForm}
                            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md ring-1 ring-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                    </div>

                    <div className="flex justify-center gap-4">
                        {/* Boton cancelar //EN OBRAS, CONVERTIRLO EN UN COMPONENTE */}
                        <button type="button"
                            onClick={onClose} //Llama a la función de cerrar modal
                            className="bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-md duration-200"
                        >
                            Cancelar
                        </button>
                        {/* Boton guardar //EN OBRAS, APROVECHAR BOTÓNCREATE QUE YA TENEMOS */}
                        <button type="submit" className="bg-blue-800 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md duration-200">
                            Guardar
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default ModalEditFilm;