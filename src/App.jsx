import React from 'react'
import { useState } from 'react'
import './index.css'

//Importar componentes
import Header from './components/Header'
import FormNewFilm from './components/FormNewFilm'
import GridFilms from './components/GridFilms'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-[#242424] text-white p-8">
      <Header>
        Filmography 1.0
      </Header>

      <FormNewFilm />

      <div className='mt-8'>
        <Header>
          Cartelera
        </Header>
      </div>

      <GridFilms />

    </div>
  )
}

export default App
