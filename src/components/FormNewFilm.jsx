import React from 'react'
import ButtonSubmit from './ButtonSubmit';
import SelectorGeneros from './SelectorGeneros';
import { useForm } from '../hooks/useForm';

function FormNewFilm({ onCreateFilm, listaGeneros, onCreateGenero, onDeleteGenero }) {
    //Usamos un custom hook para el State del formulario (useForm.js)
    const [formData, handleChangeForm, resetForm, setFieldForm, handleToggleArrayField] = useForm({
        name: '',
        year: '',
        image: '',
        generos: []
    });

    const handleSubmit = (e) => {
        //Evitamos que se recargue la página
        e.preventDefault();

        //Validamos campos formulario
        if (!formData.name || !formData.year || !formData.image) {
            alert('Por favor, completa todos los campos');
            return;
        }

        //Llamamos a la función de crear película
        onCreateFilm(formData);

        //Limpiamos formulario
        resetForm();
    };

    return (
        <>
            <div className="max-w-6xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg ring-1 ring-gray-500 mt-8">
                
                <form onSubmit={handleSubmit}>
                    <div className='flex gap-6'>

                        <div className="flex-1 mb-4">
                            <label htmlFor="name" className="block text-gray-300 mb-2 font-medium">
                                NOMBRE
                            </label>
                            <input type="text" id="name" name="name" placeholder="Nombre de la película"
                                value={formData.name}
                                onChange={handleChangeForm}
                                className="w-full px-3 py-2 bg-gray-700 text-white rounded-md ring-1 ring-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                        </div>

                        <div className="flex-1 mb-4">
                            <label htmlFor="year" className="block text-gray-300 mb-2 font-medium">
                                AÑO
                            </label>
                            <input type="number" id="year" name="year" placeholder="Año"
                                value={formData.year}
                                onChange={handleChangeForm}
                                className="w-full px-3 py-2 bg-gray-700 text-white rounded-md ring-1 ring-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="image" className="block text-gray-300 mb-2 font-medium">
                            FOTO CARTELERA
                        </label>
                        <input type="url" id="image" name="image" placeholder="Foto de cartelera"
                            value={formData.image}
                            onChange={handleChangeForm}
                            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md ring-1 ring-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                    </div>

                    <SelectorGeneros
                        listaGeneros={listaGeneros}
                        selectedGeneros={formData.generos}
                        onToggle={(generoID) => handleToggleArrayField('generos', generoID)}
                        onCreateGenero={onCreateGenero} //Pasamos la funcion de crear
                        onDeleteGenero={onDeleteGenero} //Pasamos la funcion de editar
                    />

                    <div className="flex justify-center">
                        {/* Botón Submit */}
                        <ButtonSubmit>
                            Crear
                        </ButtonSubmit>
                    </div>
                </form>
            </div>
        </>
    )
}

export default FormNewFilm