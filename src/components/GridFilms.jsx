import React from 'react'
import { peliculas } from '../data/films';
import Film from './Film';

function GridFilms(){
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-6 p-8">
            {peliculas.map(pelicula => (
                <Film key={pelicula.id} pelicula={pelicula} />
            ))}
        </div>
    )
}

export default GridFilms