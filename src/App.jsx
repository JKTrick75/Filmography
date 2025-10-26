import React from 'react'
import { useState } from 'react'
import './index.css'

//Importar componentes
import Header from './components/Header'
import FormNewFilm from './components/FormNewFilm'
import GridFilms from './components/GridFilms'

//Importamos las peliculas
import { peliculas as peliculasIniciales } from './data/films';

function App() {
  //Estado peliculas
  const [peliculas, setPeliculas] = useState(peliculasIniciales);

  //CREATE
  const handleCreateFilm = (nuevaPeli) => {
      console.log("Creamos película", nuevaPeli);
      //Lógica para crear
      //EN OBRAS
  };

  //DELETE
  const handleDeleteFilm = (peliID) => {
      console.log("Borrar película con ID:", peliID);
      //Lógica para borrar
      setPeliculas(listadoActualPelis =>
        listadoActualPelis.filter(peli => peli.id !== peliID)
      )
  };

  //UPDATE
  const handleUpdateFilm = (peliID) => {
      console.log("Actualizar película con ID:", peliID);
      //Lógica para editar
      //EN OBRAS
  };

  return (
    <div className="min-h-screen bg-[#242424] text-white p-8">
      <Header>
        Filmography 1.0
      </Header>

      <FormNewFilm onCreate={handleCreateFilm} />

      <div className='mt-8'>
        <Header>
          Cartelera
        </Header>
      </div>

      <GridFilms 
        peliculas={peliculas}
        onDelete={handleDeleteFilm} //Pasamos la función handleDeleteFilm a GridFilms
        onUpdate={handleUpdateFilm} //Pasamos la función handleUpdateFilm a GridFilms
      />

    </div>
  )
}

export default App
