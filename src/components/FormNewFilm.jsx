import React from 'react'
import ButtonCreate from './ButtonCreate';

function FormNewFilm(){
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Formulario enviado! (En obras)");
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
                                className="w-full px-3 py-2 bg-gray-700 text-white rounded-md ring-1 ring-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                        </div>
                        <div className="flex-1 mb-4">
                            <label htmlFor="year" className="block text-gray-300 mb-2">
                                YEAR
                            </label>
                            <input type="number" id="year" name="year" placeholder="Year"
                                className="w-full px-3 py-2 bg-gray-700 text-white rounded-md ring-1 ring-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="poster" className="block text-gray-300 mb-2">
                            FILM POSTER
                        </label>
                        <input type="url" id="poster" name="poster" placeholder="Film Poster"
                            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md ring-1 ring-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                    </div>
                    <div className="flex justify-center">
                        {/* Botón Create */}
                        <ButtonCreate/>
                    </div>
                </form>
            </div>
        </>
    )
}

export default FormNewFilm