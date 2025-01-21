import React, { useEffect, useState } from 'react';
import { Link } from "react-router";
import axios from 'axios';


function Niveles() {

    const [niveles, setNiveles] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8800/niveles")
            .then((response) => {
                console.log('Datos recibidos:', response.data);  // Asegúrate de que los datos llegan aquí
                setNiveles(response.data);  // Guardamos los datos de niveles en el estado
            })
            .catch((error) => {
                console.error("Error al obtener las niveles:", error);
            });
    }, []);


    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8800/niveles/${id}`);

            // Actualizar el estado local para reflejar la eliminación sin recargar la página
            setNiveles(niveles.filter(nivel => nivel.id_nivel !== id));
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div className='p-12 bg-amber-400'>

            {niveles.length > 0 ? (
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-200 dark:text-black bg-black">
                        <thead>
                            <tr>
                                <th scope="col" className="px-6 py-3 text-amber-400">Niveles disponibles</th>
                            </tr>
                        </thead>
                        <tbody>
                            {niveles.map((e) => (
                                <tr key={e.id_nivel} className="bg-white border-b dark:bg-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-100">
                                    <td className="px-6 py-4">
                                        {e.id_nivel} - {e.nombreNivel}
                                    </td>
                                    {/* <td className="px-6 py-4 text-right">
                                        <Link to={`/niveles/${e.id_nivel}`}>
                                            <button className="font-bold text-blue-600 dark:text-blue-500 hover:underline">
                                                Update
                                            </button>
                                        </Link>
                                        <button
                                            className="delete font-bold text-red-600 dark:text-red-500 hover:underline ml-2"
                                            onClick={() => handleDelete(e.id_nivel)}
                                        >
                                            Delete
                                        </button>
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No hay niveles disponibles.</p>
            )}
        </div>

    );
}

export default Niveles