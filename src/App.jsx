import React from 'react'
import { FilmProvider, useFilms } from './context/FilmContext' 
//Importar componentes
import Header from './components/Header'
import FormNewFilm from './components/FormNewFilm' //Formulario Crear
import ModalEditFilm from './components/ModalEditFilm' //Formulario Editar (modal)
import GridFilms from './components/GridFilms'

// Componente interno para poder usar el hook useFilms
function AppContent() {
    //Importamos funciones para la gestión del modal
    const { peliculaAEditar, editPelicula, cerrarModal } = useFilms();

    return (
        <div className="min-h-screen bg-[#242424] text-white p-8">
            <Header>Filmography 4.0</Header>

            <FormNewFilm /> 

            <div className='mt-8'>
                <Header>
                    Cartelera
                </Header>
            </div>

            <GridFilms />

            {/* Modal */}
            {peliculaAEditar && (
                <ModalEditFilm 
                    pelicula={peliculaAEditar}
                    onSave={editPelicula}
                    onClose={cerrarModal}
                />
            )}
        </div>
    )
}

function App() {
    return (
        //Cargamos primero FilmProvider, que carga todos los State globales
        <FilmProvider>
            <AppContent />
        </FilmProvider>
    )
}

export default App