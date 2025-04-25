import React, { useEffect, useState } from 'react';
import { Link } from "react-router";
import axios from 'axios';
import AddAsignatura from './AddAsignatura';
import { useNavigate } from 'react-router';
import AddNivelAsignatura from './AddNivelAsignatura';
import AddSeccion from '../Seccion/AddSeccion';
import AddAsignaturaSeccion from '../Horario/AddAsignaturaSeccion';



function AsignaturasList() {

    const navigate = useNavigate();
    const [asignaturas, setAsignaturas] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8800/asignatura_secciones")
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
        <div className='flex flex-col bg-amber-400'>

            <div className='flex w-full '>
                <div className="px-12 mt-10">
                    <div className='w-full justify-center items-center py-4'>
                        <p className='text-black font-semibold text-xl'>Asignaturas</p>
                    </div>

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
                                            <td className="px-6 py-4 font-semibold bg-black text-white">
                                                {e.id_asignatura} - {e.nombreasignatura}
                                            </td>
                                            <td className="px-6 py-4 font-semibold">
                                                {e.nombreseccion || <span className="text-gray-400 italic">Sin sección</span>}
                                            </td>
                                            <td className="px-6 py-4 font-semibold">
                                                {e.nombredocente || <span className="text-gray-400 italic">Sin docente</span>}
                                            </td>
                                            <td className="px-6 py-4 font-semibold">
                                                {(e.inscripciones && e.capacidad) ? `${e.inscripciones}/${e.capacidad}` : 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 font-semibold">
                                                {e.nombrenivel || 'Sin nivel'}
                                            </td>
                                            <td className="px-6 py-4 font-semibold">
                                                {e.nombrecarrera || 'Sin carrera'}
                                            </td>



                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p>No hay asignaturas disponibles.</p>
                    )}
                </div>



            </div>
            <div className='flex flex-col w-full'>
                {/* <AddAsignatura />
                <AddNivelAsignatura />
                <AddSeccion />
                <AddAsignaturaSeccion /> */}
            </div>
        </div>
    );
}

export default AsignaturasList