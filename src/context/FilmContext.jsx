import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAPI } from '../hooks/useAPI'; //Importamos hook con las funciones CRUD

//Creamos el Contexto
const FilmContext = createContext();

//Creamos el Provider (lo que le dará los valores al "State" del FilmContext)
export function FilmProvider({ children }) {
    // --- STATES GLOBALES ---
    const [peliculas, setPeliculas] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [peliculaAEditar, setPeliculaAEditar] = useState(null);

    //Importamos funciones del CRUD que vayamos a usar
    const { getItems, createItem, deleteItem, updateItem } = useAPI();

    // --- CARGA INICIAL DE DATOS EN LOS STATES GLOBALES ---
    useEffect(() => {
        const cargarTodo = async () => {
            const datosPelis = await getItems('videoclub');
            const datosGeneros = await getItems('generes');

            if (datosPelis) setPeliculas(datosPelis);
            if (datosGeneros) setGeneros(datosGeneros);
        };
        cargarTodo();
    }, []); //Se ejecuta solo al principio

    //==========================================//
    // FUNCIONES PARA PELÍCULAS
    //==========================================//
    const addPelicula = async (nuevaPeli) => {
        const peliGuardada = await createItem('videoclub', nuevaPeli);
        if (peliGuardada) {
            //Actualizamos el State
            setPeliculas(prev => [...prev, peliGuardada]);
        }
    };

    const removePelicula = async (id) => {
        const exito = await deleteItem('videoclub', id);
        if (exito) {
            //Actualizamos el State
            setPeliculas(prev => prev.filter(p => p.id !== id));
        }
    };

    const editPelicula = async (peliEditada) => {
        const peliGuardada = await updateItem('videoclub', peliEditada.id, peliEditada);
        if (peliGuardada) {
            //Actualizamos el State
            setPeliculas(prev => prev.map(p => p.id === peliGuardada.id ? peliGuardada : p));
            setPeliculaAEditar(null); // Cerramos modal
        }
    };

    //==========================================//
    // FUNCIONES PARA GÉNEROS
    //==========================================//
    const addGenero = async (nuevoGenero) => {
        const generoGuardado = await createItem('generes', nuevoGenero);
        if (generoGuardado) {
            //Actualizamos el State
            setGeneros(prev => [...prev, generoGuardado]);
        }
    };

    const removeGenero = async (id) => {
        const exito = await deleteItem('generes', id);
        if (exito) {
            //Actualizamos el State
            setGeneros(prev => prev.filter(g => g.id !== id));
        }
    };

    //==========================================//
    // GESTIÓN DEL MODAL
    //==========================================//
    const abrirModalEditar = (id) => {
        const peli = peliculas.find(p => p.id === id);
        if (peli) setPeliculaAEditar(peli);
    };

    const cerrarModal = () => {
        setPeliculaAEditar(null);
    };

    //Devolvemos el Provider con TODAS las funciones y States que queremos compartir
    return (
        <FilmContext.Provider value={{
            peliculas,
            generos,
            peliculaAEditar,
            addPelicula,
            removePelicula,
            editPelicula,
            addGenero,
            removeGenero,
            abrirModalEditar,
            cerrarModal
        }}>
            {children}
        </FilmContext.Provider>
    );
}

//Hook para usar el contexto (para no escribir useContext(FilmContext) todo el rato)
export function useFilms() {
    return useContext(FilmContext);
}