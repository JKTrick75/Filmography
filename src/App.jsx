import React from 'react'
import { useState, useEffect } from 'react'
import './index.css'

//Importar componentes
import Header from './components/Header'
import FormNewFilm from './components/FormNewFilm' //Formulario Crear
import ModalEditFilm from './components/ModalEditFilm' //Formulario Editar (modal)
import GridFilms from './components/GridFilms'

//URL json-server
const API_URL = 'https://68daca7c23ebc87faa3143da.mockapi.io/api/simonsays';

function App() {
	//===========================================================================//
	//Iniciamos State peliculas GLOBAL
	//===========================================================================//
	const [peliculas, setPeliculas] = useState([]);

	//===========================================================================//
	//Iniciamos State peliculas a editar: Guarda la peli a editar para mostrar el modal, o 'null' para ocultar el modal
	//===========================================================================//
	const [peliculaAEditar, setPeliculaAEditar] = useState(null);

	//===========================================================================//
	//Iniciamos State generos GLOBAL
	//===========================================================================//
	const [generos, setGeneros] = useState([]);

	//===========================================================================//
	//READ -> Hacemos un fetch inicial (pillamos los géneros y las peliculas)
	//===========================================================================//
	useEffect(() => {
		const fetchPeliculas = async () => {
			try {
				const [peliculasResponse, generosResponse] = await Promise.all([
					fetch(API_URL + '/videoclub'), //El de películas
					fetch(API_URL + '/generes') //El de géneros
				]);
				const peliculasData = await peliculasResponse.json();
				const generosData = await generosResponse.json();

				console.log(peliculasData);
				console.log(generosData);

				//Guardamos el State (inicial) de las pelis con las recibidas por la api
				setPeliculas(peliculasData);
				//Guardamos el State (inicial) de los generos con los recibidos por la api
				setGeneros(generosData);
			} catch (error) {
				console.error("Error al cargar las películas:", error);
			}
		};

		fetchPeliculas();
	}, []);
	 //Luego de la , insertamos el elemento que queramos usar de "trigger" (cuando cambie su valor se ejecutará la función)
	 //El [] significa que solo se ejecuta 1 vez al principio (cuando montamos el componente -> Mount)

	//===========================================================================//
	//CREATE PELIS
	//===========================================================================//
	const handleCreateFilm = async (nuevaPeli) => {
		console.log("Creamos película", nuevaPeli);

		try {
			//Fetch api
			const response = await fetch(API_URL + '/videoclub', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(nuevaPeli)
			});

			//Guardamos la nueva peli en formado json
			const peliGuardada = await response.json();

			//Actualizamos el State de pelis para añadir la nueva peli
			setPeliculas(listadoPelis => [...listadoPelis, peliGuardada]);

		} catch (error) {
			console.error("Error al crear la película:", error);
		}
	};

	//===========================================================================//
	//DELETE PELIS
	//===========================================================================//
	const handleDeleteFilm = async (peliID) => {
		console.log("Borrar película con ID:", peliID);

		try {
			//Fetch api
			await fetch(`${API_URL + '/videoclub'}/${peliID}`, {
				method: 'DELETE',
			});

			//Actualizamos el State de pelis para quitar la peli borrada
			setPeliculas(listadoPelis => listadoPelis.filter(peli => peli.id !== peliID))
		} catch (error) {
			console.error("Error al borrar la película:", error);
		}
	};

	//===========================================================================//
	//UPDATE PELIS
	//===========================================================================//
	//ABRIMOS MODAL (es la que le pasamos al botón de Update de GridFilms)
	const handleUpdateFilm = (peliID) => {
		console.log("Actualizar película con ID:", peliID);

		//Buscamos los datos de la peli a editar en el State (más rápido que hacer un fetch a mockapi)
		const peli = peliculas.find(p => p.id === peliID);

		//Si existe la peli, abrimos modal y cargamos los datos
		if (peli) {
			setPeliculaAEditar(peli);
		}

	};

	//CERRAMOS MODAL (es la que le pasamos al onClose del modal)
	const handleCancelEdit = () => {
		console.log("Cancelamos update peli");
		//Cerramos el modal al ponerlo a null
		setPeliculaAEditar(null);
	};

	//GUARDAMOS UPDATE PELI (es la que le pasamos al onSave del modal)
	const handleUpdateAPI = async (peliParaActualizar) => {
		console.log("Enviamos actualización a la API:", peliParaActualizar);

		try {
			//Fetch api
			const response = await fetch(`${API_URL + '/videoclub'}/${peliParaActualizar.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(peliParaActualizar)
			});
			const peliActualizada = await response.json();

			//Actualizamos el State de pelis para actualizar la peli
			//Iteramos sobre listadoPelis, si encuentra la peli, la actualiza
			setPeliculas(listadoPelis => listadoPelis.map(peli => peli.id === peliActualizada.id ? peliActualizada : peli));

			// CERRAMOS EL MODAL después de guardar
			setPeliculaAEditar(null);

		} catch (error) {
		console.error("Error al actualizar la película:", error);
		}
	};

	//===========================================================================//
	//CREATE GENERO
	//===========================================================================//
	const handleCreateGenero = async (nuevoGenero) => {
		console.log("Creamos genero", nuevoGenero);

		try {
			//Fetch api
			const response = await fetch(API_URL + '/generes', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(nuevoGenero)
			});

			//Guardamos la nueva peli en formado json
			const generoData = await response.json();

			//Actualizamos el State de pelis para añadir la nueva peli
			setGeneros(listaGeneros => [...listaGeneros, generoData]);

		} catch (error) {
			console.error("Error al crear el género:", error);
		}
	};

	//===========================================================================//
	//DELETE GENERO
	//===========================================================================//
	const handleDeleteGenero = async (generoID) => {
		console.log("Borrar genero con ID:", generoID);

		try {
			//Fetch api
			await fetch(`${API_URL + '/generes'}/${generoID}`, {
				method: 'DELETE',
			});

			//Actualizamos el State de pelis para quitar la peli borrada
			setGeneros(listaGeneros => listaGeneros.filter(genero => genero.id !== generoID))

			//EN OBRAS, añadir funcionalidad para actualizar las películas y borrar ese género de las pelis que lo tuviesen

		} catch (error) {
			console.error("Error al borrar el genero:", error);
		}
	};




	//===========================================================================//
	return (
		<div className="min-h-screen bg-[#242424] text-white p-8">
			<Header>
				Filmography 3.0
			</Header>

			<FormNewFilm 
				onCreateFilm={handleCreateFilm} 
				listaGeneros={generos}
				onCreateGenero={handleCreateGenero}
				onDeleteGenero={handleDeleteGenero}
			/>

			<div className='mt-8'>
				<Header>
					Cartelera
				</Header>
			</div>

			<GridFilms
				peliculas={peliculas}
				onDeleteFilm={handleDeleteFilm} //Pasamos la función handleDeleteFilm a GridFilms
				onUpdateFilm={handleUpdateFilm} //Pasamos la función handleUpdateFilm a GridFilms
			/>

			{/* MODAL */}
			{peliculaAEditar && (
				<ModalEditFilm 
					pelicula={peliculaAEditar}
					onSave={handleUpdateAPI}
					onClose={handleCancelEdit}
					listaGeneros={generos}
				/>
			)}

		</div>
	)
}

export default App
