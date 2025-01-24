import React, { useEffect, useState } from 'react';
import { Link } from "react-router";
import axios from 'axios';
import AddAsignatura from './AddAsignatura';
import { useNavigate } from 'react-router';



function AsignaturasList() {

    const navigate = useNavigate();
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
        <div className='flex w-full flex-row bg-amber-400'>
            <div className="p-12">
                <h1> Asingaturas por carrera</h1>

                {asignaturas.length > 0 ? (
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-black  bg-black">
                            <thead>
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-amber-400">Asignatura</th>
                                    <th scope="col" className="px-6 py-3 text-amber-400">Nombre sección</th>
                                    <th scope="col" className="px-6 py-3 text-amber-400">Docente</th>
                                    <th scope="col" className="px-6 py-3 text-amber-400">Status</th>
                                    <th scope="col" className="px-6 py-3 text-amber-400">Semestre</th>
                                    <th scope="col" className="px-6 py-3 text-amber-400">Carrera</th>
                                </tr>
                            </thead>
                            <tbody>
                                {asignaturas.map((e) => (
                                    <tr key={e.id_asignatura} className="bg-white border-b dark:bg-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-100">
                                        <td className="px-6 py-4">
                                            {e.id_asignatura} - {e.nombreAsignatura}
                                        </td>
                                        <td className="px-6 py-4">
                                            {e.nombreSeccion}
                                        </td>
                                        <td className="px-6 py-4">
                                            {e.nombreDocente}
                                        </td>
                                        <td className="px-6 py-4">
                                            {e.inscripciones}/{e.capacidad}
                                        </td>
                                        <td className="px-6 py-4">
                                            {e.nombreNivel}
                                        </td>
                                        <td className="px-6 py-4">
                                            {e.nombreCarrera}
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

            <AddAsignatura />

        </div>
    );
}

export default AsignaturasList