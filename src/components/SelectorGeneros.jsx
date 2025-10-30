import React, { useState } from 'react';
import ButtonDelete from './ButtonDelete';
import ButtonAdd from './ButtonAdd';
import { useForm } from '../hooks/useForm';

function SelectorGeneros({ listaGeneros = [], selectedGeneros = [], onToggle, onCreateGenero, onDeleteGenero }) {
    //Usamos un custom hook para el State del mini-formulario (useForm.js)
    const [formData, handleChangeForm, resetForm] = useForm({
        name: ''
    });

    const handleCreateSubmit = (e) => {
        //Evitamos que se refresque la página
        e.preventDefault();

        //Validación nombre genero
        if (formData.name.trim() === '') {
            alert('El nombre del género no puede estar vacío');
            return;
        }
        //Llamamos a la función de crear género
        onCreateGenero(formData);

        //Limpiamos input
        resetForm();
    };

    return (
        <div className="my-6">
            <label className="block text-gray-300 mb-2 font-medium">
                GÉNEROS
            </label>

            {/* Formulario de Crear (solo en modo CREATE, es decir, si le hemos pasado el prop onCreateGenero) */}
            {onCreateGenero && (
                <div className="flex gap-6 mt-2 mb-6">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChangeForm}
                        placeholder="Escribe el nombre del género para añadir"
                        className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-md ring-1 ring-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                    <ButtonAdd 
                        onClick={handleCreateSubmit}
                    />
                </div>
            )}

            {/* Lista de géneros */}
            <div className="flex flex-wrap gap-3 p-4 bg-gray-700 rounded-md ring-1 ring-gray-600 min-h-[50px]">
                {listaGeneros.map(genero => {
                    //Comprobamos si el género está en la lista de seleccionados
                    const isSelected = selectedGeneros.includes(genero.id);

                    return (
                        <div
                            key={genero.id}
                            className={`relative py-2 px-4 rounded-full text-sm font-medium cursor-pointer duration-200
                                ${isSelected //Toggle estilos para saber si están seleccionados o no
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'bg-gray-600 text-gray-300 hover:bg-gray-500'}
                            `}
                            onClick={() => onToggle(genero.id)} //Llamamos a la función de marcar/desmarcar
                        >
                            {genero.name}

                            {/* Botón de Borrar (solo en modo CREATE, es decir, si le hemos pasado el prop onDeleteGenero) */}
                            {onDeleteGenero && (
                                <ButtonDelete onClick={(e) => { 
                                    e.stopPropagation();
                                    onDeleteGenero(genero.id)
                                    }}
                                />
                            )}
                            
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default SelectorGeneros;