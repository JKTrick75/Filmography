// components/Film.jsx
import React from 'react';
import ButtonDelete from './ButtonDelete';
import ButtonUpdate from './ButtonUpdate';

function Film({ pelicula, onDeleteFilm, onUpdateFilm }) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl duration-300 w-64 h-96 mx-auto">
      
      <div className="relative flex-shrink-0 h-50 bg-gray-900 flex items-center justify-center mb-6">
        <img src={pelicula.image} alt={pelicula.name}
            className="h-40 object-contain rounded-lg border-2 border-gray-600" 
        />
        {/* Botón Delete */}
        <div className="absolute top-1 right-1">
            <ButtonDelete onClick={() => onDeleteFilm(pelicula.id)} />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <h3 className="text-lg font-bold text-white mb-2">
          {pelicula.name}
        </h3>
        <p className="text-gray-400 mb-4">
          {pelicula.year}
        </p>
        {/* Botón Update */}
        <ButtonUpdate onClick={() => onUpdateFilm(pelicula.id)} />
      </div>
    </div>
  );
}

export default Film;