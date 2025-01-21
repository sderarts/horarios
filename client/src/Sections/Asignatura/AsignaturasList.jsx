import React, { useEffect, useState } from 'react';
import { Link } from "react-router";
import axios from 'axios';


function AsignaturasList() {

    const [asignaturas, setAsignaturas] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8800/asignaturas")
            .then((response) => {
                console.log('Datos recibidos:', response.data);  // Asegúrate de que los datos llegan aquí
                setAsignaturas(response.data);  // Guardamos los datos de niveles en el estado
            })
            .catch((error) => {
                console.error("Error al obtener las asignaturas:", error);
            });
    }, []);


    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8800/asignaturas/${id}`);

            // Actualizar el estado local para reflejar la eliminación sin recargar la página
            setAsignaturas(asignaturas.filter(asignatura => asignatura.id_asignatura !== id));
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div className="p-12">
            <h1> Lista de Asignaturas</h1>

            {asignaturas.length > 0 ? (
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-1/2">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-200 dark:text-black  bg-black">
                        <thead>
                            <tr>
                                <th scope="col" className="px-6 py-3 text-amber-400">Nombre de la Carrera</th>
                                <th scope="col" className="px-6 py-3 text-amber-400">Asignatura</th>
                                <th scope="col" className="px-6 py-3 text-amber-400">Semestre</th>
                            </tr>
                        </thead>
                        <tbody>
                            {asignaturas.map((e) => (
                                <tr key={e.id_asignatura} className="bg-white border-b dark:bg-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-100">
                                    <td className="px-6 py-4">
                                        {e.id_asignatura} - {e.nombreCarrera}
                                    </td>
                                    <td className="px-6 py-4">
                                        {e.nombreAsignatura}
                                    </td>
                                    <td className="px-6 py-4">
                                        {e.nombreNivel}
                                    </td>
                                    {/* <td className="px-6 py-4 text-right">
                                                        <Link to={`/carreras/${e.id_asignatura}`}>
                                                            <button className="font-bold text-blue-600 dark:text-blue-500 hover:underline">
                                                                Update
                                                            </button>
                                                        </Link>
                                                        <button
                                                            className="delete font-bold text-red-600 dark:text-red-500 hover:underline ml-2"
                                                            onClick={() => handleDelete(e.id_asignatura)}
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
                <p>No hay asignaturas disponibles.</p>
            )}
        </div>
    );
}

export default AsignaturasList