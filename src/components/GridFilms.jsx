import React from 'react'
import Film from './Film';
import { useFilms } from '../context/FilmContext'; //Importamos FilmContext

function GridFilms(){ 
    //Obtenemos los datos necesarios del FilmContext
    const { peliculas, removePelicula, abrirModalEditar } = useFilms();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6 p-8">
            {/* Recorremos array del State peliculas, y pasamos datos */}
            {peliculas.map(pelicula => (
                <Film 
                    key={pelicula.id} //Esta es la ID de cada componente Film
                    pelicula={pelicula} //Pasamos los datos de la pelicula
                    onDeleteFilm={removePelicula} //Pasamos la funcion de borrar
                    onUpdateFilm={abrirModalEditar} //Pasamos la funcion de abrir el modal
                />
            ))}
        </div>
    )
}

export default GridFilms