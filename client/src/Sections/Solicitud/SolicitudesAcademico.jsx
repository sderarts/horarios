import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import ModalIntercambio from './ModalIntercambio';  // Importa el modal

function SolicitudesAcademico() {
    const { user, loading } = useContext(AuthContext);
    const [solicitudes, setSolicitud] = useState([]);  // Solicitudes generales
    const [academicoSolicitud, setAcademicoSolicitud] = useState([]);  // Solicitudes académicas
    const [mensaje, setMensaje] = useState("");  // Mensaje que se actualizará
    const [estado, setEstado] = useState(3);  // Estado inicial de las solicitudes (en progreso)
    const [fkAcademico, setFkAcademico] = useState(null); // Estado para el fk_academico
    const [errorMessage, setErrorMessage] = useState(""); // Mensajes de error
    const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal
    const [selectedSolicitud, setSelectedSolicitud] = useState(null); // Estado para la solicitud seleccionada

    // Cargar solicitudes generales
    useEffect(() => {
        axios.get("http://localhost:8800/solicitudes")
            .then((response) => {
                console.log('Datos recibidos de solicitudes:', response.data);
                setSolicitud(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener las solicitudes:", error);
            });
    }, []);

    // Cargar solicitudes académicas
    useEffect(() => {
        axios.get("http://localhost:8800/academico_solicitudes")
            .then((response) => {
                console.log('Datos recibidos de academico_solicitudes:', response.data);
                setAcademicoSolicitud(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener las solicitudes académicas:", error);
            });
    }, []);

    // Verificación del usuario y obtener fk_academico
    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                try {
                    const shortUid = user.uid.substring(0, 28);

                    const response = await fetch(`http://localhost:8800/auth/checkUser/${shortUid}`);
                    const data = await response.json();

                    if (data.exists) {
                        console.log("Datos del usuario:", data);
                        if (data.rol === 1) { // Rol académico
                            setFkAcademico(data.id_academico);
                            console.log('Usuario es académico, fk_academico:', data.id_academico);
                        } else {
                            setErrorMessage("El usuario no tiene permisos de académico.");
                            console.log('Usuario no tiene rol de académico');
                        }
                    } else {
                        setErrorMessage("Usuario no encontrado en la base de datos.");
                        console.log('User does not exist in the database');
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setErrorMessage("Error al verificar el usuario.");
                }
            }
        };

        fetchUserData();
    }, [user]);

    // Función para obtener las asignaturas del alumno B
    const obtenerAsignaturasAlumnoB = async (fk_alumno_b) => {
        try {
            const response = await axios.get(`http://localhost:8800/horario_alumnos/${fk_alumno_b}`);
            return response.data;  // Devuelve las asignaturas de alumno B
        } catch (error) {
            console.error("Error al obtener las asignaturas del alumno B:", error);
            throw error;
        }
    };

    // Función para manejar el intercambio de secciones
    const handleIntercambiarSecciones = async (id_solicitud, fk_alumno_b, fk_seccion_asignatura) => {
        setSelectedSolicitud({ id_solicitud, fk_alumno_b, fk_seccion_asignatura });
        setShowModal(true);  // Abrir el modal para el intercambio
    };

    // Actualizar solicitudes después del intercambio
    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className='flex justify-center bg-amber-400'>
            <div className='flex w-full h-screen'>
                <div className="p-12">
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
                                            <td className="px-6 py-4">{e.id_alumno}</td>
                                            <td className="px-6 py-4">{e.fk_alumno_b}</td>
                                            <td className="px-6 py-4">{e.correoAlumno}</td>
                                            <td className="px-6 py-4">{e.nombreTipoSolicitud}</td>
                                            <td className="px-6 py-4">{e.nombreRelacion} {e.nombreSeccion}</td>
                                            <td className="px-6 py-4">{e.nombreDocente}</td>
                                            <td className="px-6 py-4">{e.inscripciones}/{e.capacidad}</td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => handleIntercambiarSecciones(e.id_solicitud, e.fk_alumno_b, e.fk_seccion_asignatura)}
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    Intercambiar Sección
                                                </button>
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

            {/* Modal para el intercambio */}
            {showModal && (
                <ModalIntercambio
                    selectedSolicitud={selectedSolicitud}
                    closeModal={handleCloseModal}
                    fkAcademico={fkAcademico}
                />
            )}
        </div>
    );
}

export default SolicitudesAcademico;
