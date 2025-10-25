import React from 'react'
import { peliculas } from '../data/films';
import Film from './Film';

function GridFilms(){
    //DELETE
    const handleDelete = (filmId) => {
        console.log("Borrar película con ID:", filmId);
    };
    //UPDATE
    const handleUpdate = (filmId) => {
        console.log("Actualizar película con ID:", filmId);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-6 p-8">
            {peliculas.map(pelicula => (
                <Film 
                    key={pelicula.id} 
                    pelicula={pelicula} 
                    onDelete={handleDelete} //Pasamos la función handleDelete a Film
                    onUpdate={handleUpdate} //Pasamos la función handleUpdate a Film
                />
            ))}
        </div>
    )
}

export default GridFilms