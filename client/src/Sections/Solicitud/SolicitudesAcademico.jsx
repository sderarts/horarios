import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import Navbar from '../../Layout/Navbar'
import axios from 'axios';
import ModalIntercambio from './ModalIntercambio';  // Importa el modal
import Footer from '../../Layout/Footer';

function SolicitudesAcademico() {
    const { user, loading } = useContext(AuthContext);
    const [solicitudes, setSolicitud] = useState([]);
    const [academicoSolicitud, setAcademicoSolicitud] = useState([]);
    const [estado, setEstado] = useState(3);
    const [fkAcademico, setFkAcademico] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedSolicitud, setSelectedSolicitud] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8800/solicitudes")
            .then((response) => {
                setSolicitud(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener las solicitudes:", error);
            });
    }, []);

    useEffect(() => {
        axios.get("http://localhost:8800/academico_solicitudes")
            .then((response) => {
                setAcademicoSolicitud(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener las solicitudes académicas:", error);
            });
    }, []);

    const handleIntercambiarSecciones = async (id_solicitud, fk_alumno_b, fk_seccion_asignatura, fk_alumno) => {
        setSelectedSolicitud({ id_solicitud, fk_alumno_b, fk_seccion_asignatura, fk_alumno });
        setShowModal(true);  // Abrir el modal para el intercambio
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className='bg-amber-400'>
            <Navbar />
            <div className='flex w-full h-screen'>
                <div className="py-32 px-12">
                    {user ? (
                        <p className='font-bold italic'>
                            Hola {user.displayName}
                        </p>
                    ) : (
                        <p className='font-bold italic'>
                            Cargando información del usuario...
                        </p>
                    )}
                    <h1>Listado de Solicitudes</h1>
                    {solicitudes.length > 0 ? (
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-black bg-black">
                                <thead>
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-amber-400">Solicitud</th>
                                        <th scope="col" className="px-6 py-3 text-amber-400">Id Alumno</th>
                                        <th scope="col" className="px-6 py-3 text-amber-400">Id Alumno 2</th>
                                        <th scope="col" className="px-6 py-3 text-amber-400">Correo</th>
                                        <th scope="col" className="px-6 py-3 text-amber-400">Solicitud</th>
                                        <th scope="col" className="px-6 py-3 text-amber-400">Sección</th>
                                        <th scope="col" className="px-6 py-3 text-amber-400">Docente</th>
                                        <th scope="col" className="px-6 py-3 text-amber-400">Cupos</th>
                                        <th scope="col" className="px-6 py-3 text-amber-400">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {solicitudes.map((e) => (
                                        <tr key={e.id_solicitud} className="bg-white border-b dark:bg-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-100">
                                            <td className="px-6 py-4">{e.id_solicitud}</td>
                                            <td className="px-6 py-4">{e.fk_alumno}</td>
                                            <td className="px-6 py-4">{e.fk_alumno_b}</td>
                                            <td className="px-6 py-4">{e.correoAlumno}</td>
                                            <td className="px-6 py-4">{e.nombreTipoSolicitud}</td>
                                            <td className="px-6 py-4">{e.nombreRelacion} {e.nombreSeccion}</td>
                                            <td className="px-6 py-4">{e.nombreDocente}</td>
                                            <td className="px-6 py-4">{e.inscripciones}/{e.capacidad}</td>
                                            <td className="px-6 py-4">
                                                {e.estado === 'Completado' ? (
                                                    <button className="text-green-600" disabled>Completado</button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleIntercambiarSecciones(e.id_solicitud, e.fk_alumno_b, e.fk_seccion_asignatura, e.fk_alumno)}
                                                        className="text-blue-600 hover:text-blue-800"
                                                    >
                                                        Intercambiar Sección
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p>No hay solicitudes disponibles.</p>
                    )}
                </div>
            </div>

            {showModal && selectedSolicitud && (
                <ModalIntercambio
                    selectedSolicitud={selectedSolicitud}
                    closeModal={handleCloseModal}
                    fk_alumno_a={selectedSolicitud.fk_alumno}
                    fk_alumno_b={selectedSolicitud.fk_alumno_b}
                    setSolicitud={setSolicitud}  // Pasa también fk_alumno_b
                />
            )}
            <Footer />
        </div>
    );
}

export default SolicitudesAcademico;
