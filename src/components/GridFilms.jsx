import React, { useState } from 'react'
import Film from './Film';

function GridFilms({ peliculas, onDelete, onUpdate }){
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6 p-8">
            {peliculas.map(pelicula => (
                <Film 
                    key={pelicula.id} //Esta es la ID de cada componente Film
                    pelicula={pelicula} //Pasamos los datos de la pelicula
                    onDelete={onDelete} //Pasamos la función handleDelete a Film
                    onUpdate={onUpdate} //Pasamos la función handleUpdate a Film
                />
            ))}
        </div>
    )
}

export default GridFilms