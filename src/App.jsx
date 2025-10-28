import React from 'react'
import { useState, useEffect } from 'react'
import './index.css'

//Importar componentes
import Header from './components/Header'
import FormNewFilm from './components/FormNewFilm' //Formulario Crear
import ModalEditFilm from './components/ModalEditFilm' //Formulario Editar (modal)
import GridFilms from './components/GridFilms'

//URL json-server
const API_URL = 'https://68daca7c23ebc87faa3143da.mockapi.io/api/simonsays/videoclub';

function App() {
	//===========================================================================//
	//Iniciamos State peliculas GLOBAL
	//===========================================================================//
	const [peliculas, setPeliculas] = useState([]);

	//===========================================================================//
	//Iniciamos State peliculas a editar: Guarda la peli a editar, o 'null' si el modal está cerrado
	//===========================================================================//
	const [peliculaAEditar, setPeliculaAEditar] = useState(null);

	//===========================================================================//
	//READ -> Hacemos un fetch inicial
	//===========================================================================//
	useEffect(() => {
		const fetchPeliculas = async () => {
			try {
				const response = await fetch(API_URL);
				const data = await response.json();
				console.log(data);

				//Guardamos el State (inicial) de las pelis con las recibidas por la api
				setPeliculas(data);
			} catch (error) {
				console.error("Error al cargar las películas:", error);
			}
		};

		fetchPeliculas();
	}, []); //El [] significa que solo se ejecuta 1 vez al principio (cuando montamos el componente -> Mount)

	//===========================================================================//
	//CREATE
	//===========================================================================//
	const handleCreateFilm = async (nuevaPeli) => {
		console.log("Creamos película", nuevaPeli);

		try {
			//Fetch api
			const response = await fetch(API_URL, {
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
	//DELETE
	//===========================================================================//
	const handleDeleteFilm = async (peliID) => {
		console.log("Borrar película con ID:", peliID);

		try {
			//Fetch api
			await fetch(`${API_URL}/${peliID}`, {
				method: 'DELETE',
			});

			//Actualizamos el State de pelis para quitar la peli borrada
			setPeliculas(listadoPelis => listadoPelis.filter(peli => peli.id !== peliID))
		} catch (error) {
			console.error("Error al borrar la película:", error);
		}
	};

	//===========================================================================//
	//UPDATE
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
			const response = await fetch(`${API_URL}/${peliParaActualizar.id}`, {
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

			{/* MODAL */}
			{peliculaAEditar && (
				<ModalEditFilm 
					pelicula={peliculaAEditar}
					onSave={handleUpdateAPI}
					onClose={handleCancelEdit}
				/>
			)}

		</div>
	)
}

export default App
