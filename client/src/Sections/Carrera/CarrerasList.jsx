import React, { useEffect, useState } from 'react';
import { Link } from "react-router";
import AddCarrera from './AddCarrera';
import axios from 'axios';
import Niveles from '../Nivel/Niveles';

function CarrerasList() {

    const [carreras, setCarreras] = useState([])

    useEffect(() => {
        // Realizamos la solicitud GET para obtener las carreras
        axios.get("http://localhost:8800/carreras")
            .then((response) => {
                console.log('Datos recibidos:', response.data);  // Asegúrate de que los datos llegan aquí
                setCarreras(response.data);  // Guardamos los datos de carreras en el estado
            })
            .catch((error) => {
                console.error("Error al obtener las carreras:", error);
            });
    }, []);


    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8800/carreras/${id}`);

            // Actualizar el estado local para reflejar la eliminación sin recargar la página
            setCarreras(carreras.filter(carrera => carrera.id_carrera !== id));
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div className='flex w-full h-full flex-row bg-amber-400'>
            <div className='p-24 '>
                <div className='w-full justify-center items-center'>
                    <p className='text-black font-semibold text-xl'>Carreras</p>
                </div>
                {carreras.length > 0 ? (
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-black  bg-black">
                            <thead>
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-amber-400">Nombre de la Carrera</th>
                                    <th scope="col" className="px-6 py-3 text-amber-400">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {carreras.map((e) => (
                                    <tr key={e.id_carrera} className="bg-white border-b dark:bg-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-100">
                                        <td className="px-6 py-4">
                                            {e.id_carrera} - {e.nombreCarrera}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link to={`/carreras/${e.id_carrera}`}>
                                                <button className="font-bold text-blue-600 dark:text-blue-500 hover:underline">
                                                    Update
                                                </button>
                                            </Link>
                                            <button
                                                className="delete font-bold text-red-600 dark:text-red-500 hover:underline ml-2"
                                                onClick={() => handleDelete(e.id_carrera)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>No hay carreras disponibles.</p>
                )}
            </div>
            <div>
                <AddCarrera />
            </div>
        </div>
    );
}

export default CarrerasList