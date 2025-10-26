import React, { useState } from 'react'
import ButtonCreate from './ButtonCreate';
import { useForm } from '../hooks/useForm';

function FormNewFilm({onCreate}){
    //Usamos un custom hook para el State del formulario (useForm.js)
    const [formData, handleChangeForm, resetForm, setFieldForm] = useForm({
        name: '',
        year: '',
        image: ''
    });

    const handleSubmit = (e) => {
        //Evitamos que se recargue la página
        e.preventDefault();
        
        //Validación campos formulario
        if (!formData.name || !formData.year || !formData.image) {
            alert('Por favor, completa todos los campos');
            return;
        }

        //Llamamos a la función de crear película
        onCreate(formData);
        
        //Limpiamos formulario
        resetForm();
    };

    return (
        <>
            <div className="max-w-6xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg ring-1 ring-gray-500 mt-8">
                <form onSubmit={handleSubmit}>
                    <div className='flex gap-8'>
                        <div className="flex-1 mb-4">
                            <label htmlFor="name" className="block text-gray-300 mb-2">
                                NAME
                            </label>
                            <input type="text" id="name" name="name" placeholder="Film Name"
                                value={formData.name}
                                onChange={handleChangeForm}
                                className="w-full px-3 py-2 bg-gray-700 text-white rounded-md ring-1 ring-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                        </div>
                        <div className="flex-1 mb-4">
                            <label htmlFor="year" className="block text-gray-300 mb-2">
                                YEAR
                            </label>
                            <input type="number" id="year" name="year" placeholder="Year"
                                value={formData.year}
                                onChange={handleChangeForm}
                                className="w-full px-3 py-2 bg-gray-700 text-white rounded-md ring-1 ring-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="image" className="block text-gray-300 mb-2">
                            FILM POSTER
                        </label>
                        <input type="url" id="image" name="image" placeholder="Film Poster"
                            value={formData.image}
                            onChange={handleChangeForm}
                            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md ring-1 ring-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                    </div>
                    <div className="flex justify-center">
                        {/* Botón Create */}
                        <ButtonCreate />
                    </div>
                </form>
            </div>
        </>
    )
}

export default FormNewFilm