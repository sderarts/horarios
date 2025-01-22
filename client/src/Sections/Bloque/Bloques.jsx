import React, { useEffect, useState } from 'react';
import { Link } from "react-router";
import axios from 'axios';
import AddBloque from './AddBloque';
function VerBloques() {

    const [bloques, setBloques] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8800/bloques")
            .then((response) => {
                console.log('Datos recibidos:', response.data);  // Asegúrate de que los datos llegan aquí
                setBloques(response.data);  // Guardamos los datos de niveles en el estado
            })
            .catch((error) => {
                console.error("Error al obtener las bloques:", error);
            });
    }, []);


    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8800/bloques/${id}`);

            // Actualizar el estado local para reflejar la eliminación sin recargar la página
            setBloques(bloques.filter(bloque => bloque.id_bloque !== id));
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div className='flex flex-row bg-amber-400'>

            <div className='p-12'>
                {/* {bloques.length > 0 ? (
                <ul>
                    {bloques.map((e) => (
                        <li key={e.id_bloque}>
                            {e.nombreBloqueHora}
                            <button className='delete' onClick={() => handleDelete(e.id_bloque)}>Delete</button>
                            <Link to={`/bloques/${e.id_bloque}`}>Update</Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay bloques disponibles.</p>
            )} */}

                {bloques.length > 0 ? (
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-200 dark:text-black  bg-black">
                            <thead>
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-amber-400">Bloques de Horarios</th>
                                    <th scope="col" className="px-6 py-3 text-amber-400">Actualizar</th>
                                    <th scope="col" className="px-6 py-3 text-amber-400">Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bloques.map((e) => (
                                    <tr key={e.id_bloque} className="bg-white border-b dark:bg-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-100">
                                        <td className="px-6 py-4">
                                            {e.id_bloque} - {e.nombreBloqueHora}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link to={`/bloques/${e.id_bloque}`}>
                                                <button className="font-bold text-blue-600 dark:text-blue-500 hover:underline">
                                                    Update
                                                </button>
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                className="delete font-bold text-red-600 dark:text-red-500 hover:underline ml-2"
                                                onClick={() => handleDelete(e.id_bloque)}
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
                    <p>No hay bloques disponibles.</p>
                )}
            </div>s
            <div>
                <AddBloque />
            </div>
        </div>
    );
}

export default VerBloques