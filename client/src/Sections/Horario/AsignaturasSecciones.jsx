import React, { useEffect, useState } from 'react';
import { Link } from "react-router";
import axios from 'axios';
import AddAsignaturaSeccion from './AddAsignaturaSeccion';

function AsignaturasSecciones() {
    const [asignaturaSeccion, setAsignaturaSeccion] = useState([]);

    // Cargar los datos de asignaturaSeccion al montar el componente
    useEffect(() => {
        const fetchAsignaturaSecciones = async () => {
            try {
                const response = await axios.get("http://localhost:8800/asignatura_secciones");
                console.log("Datos de asignaturaSeccion:", response.data); // Ver los datos
                setAsignaturaSeccion(response.data);
            } catch (error) {
                console.error("Error al obtener los registros de asignaturaSeccion", error);
            }
        };

        fetchAsignaturaSecciones();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8800/asignatura_secciones/${id}`);

            // Actualizar el estado local para reflejar la eliminación sin recargar la página
            setAsignaturaSeccion(asignaturaSeccion.filter(e => e.id_asignatura_seccion !== id));
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div className='flex flex-row bg-amber-400'>

            <div>
                <div className="p-12 ">
                    <h1>Detalles asignaturas</h1>
                    {asignaturaSeccion.length > 0 ? (
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-black  bg-black">
                                <thead>
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-amber-400">Nombre relación</th>
                                        <th scope="col" className="px-6 py-3 text-amber-400">Asignatura</th>
                                        <th scope="col" className="px-6 py-3 text-amber-400">Seccion</th>
                                        <th scope="col" className="px-6 py-3 text-amber-400">Docente</th>
                                        <th scope="col" className="px-6 py-3 text-amber-400">Actualizar</th>
                                        <th scope="col" className="px-6 py-3 text-amber-400">Eliminar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {asignaturaSeccion.map((e) => (
                                        <tr key={e.id_asignatura_seccion} className="bg-white border-b dark:bg-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-100">
                                            <td className="px-6 py-4">
                                                {e.id_asignatura_seccion} - {e.nombreRelacion}
                                            </td>
                                            <td className="px-6 py-4">
                                                {e.nombre_asignatura}
                                            </td>
                                            <td className="px-6 py-4">
                                                {e.nombre_seccion}
                                            </td>
                                            <td className="px-6 py-4">
                                                {e.nombreDocente}
                                            </td>
                                            <td className="px-6 py-4">
                                                <Link to={`/asignatura_secciones/${e.id_asignatura_seccion}`}>
                                                    <button className="font-bold text-blue-600 dark:text-blue-500 hover:underline">
                                                        Update
                                                    </button>
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    className="delete font-bold text-red-600 dark:text-red-500 hover:underline ml-2"
                                                    onClick={() => handleDelete(e.id_asignatura_seccion)}
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
                        <p>No hay secciones disponibles.</p>
                    )}
                </div>
            </div>
            <AddAsignaturaSeccion />
        </div>
    );
}

export default AsignaturasSecciones