import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import Navbar from '../../Layout/Navbar';

function Solicitudes() {
    const { user, loading } = useContext(AuthContext);
    const [solicitudes, setSolicitud] = useState([]); // Solicitudes generales
    const [mensaje, setMensaje] = useState("");
    const [estado, setEstado] = useState(3);  // Estado inicial "En progreso"
    const [fkAlumno, setFkAlumno] = useState(null); // Almacenar el id del alumno
    const [errorMessage, setErrorMessage] = useState(""); // Mensajes de error

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

    // Verificación del usuario y obtener fk_alumno
    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                try {
                    const shortUid = user.uid.substring(0, 28); // Recorta el UID para coincidir con la base de datos
                    const response = await fetch(`http://localhost:8800/auth/checkUser/${shortUid}`);
                    const data = await response.json();

                    if (data.exists) {
                        console.log("Datos del usuario:", data);  // Verifica qué datos llegan
                        if (data.rol === 2) {  // Si el rol es "alumno"
                            setFkAlumno(data.id_alumno);  // Asignar correctamente id_alumno
                            console.log('Usuario es alumno, fk_alumno:', data.id_alumno);  // Verifica que id_alumno se esté recibiendo
                        } else {
                            setErrorMessage("El usuario no tiene permisos de alumno.");
                            console.log('Usuario no tiene rol de alumno');
                        }

                    } else {
                        setErrorMessage("Usuario no encontrado en la base de datos.");
                        console.log('User does not exist in the database');
                    }
                    console.log("Respuesta de API:", data);
                    console.log("id_alumno:", data.id_alumno);

                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setErrorMessage("Error al verificar el usuario.");
                }
            }
        };

        fetchUserData();
    }, [user]);




    // Función para manejar la postulación a una solicitud
    const handlePostularse = async (idSolicitud) => {
        if (!fkAlumno) {
            alert("No estás autenticado como alumno.");
            return;
        }

        try {
            // 1. Verificar si ya existe un alumno en fk_alumno_b (no en fk_alumno)
            const solicitudExistente = solicitudes.find((sol) => sol.id_solicitud === idSolicitud);

            // Si ya tiene un alumno en fk_alumno_b, evitar la postulación
            if (solicitudExistente && solicitudExistente.fk_alumno_b) {
                alert("Ya existe un alumno en esta solicitud.");
                return;
            }

            // 2. Realizar la actualización de la solicitud
            const response = await axios.put(`http://localhost:8800/solicitudes/${idSolicitud}`, {
                fk_alumno: solicitudExistente.fk_alumno,  // Mantener el fk_alumno original
                fk_alumno_b: fkAlumno,  // ID del alumno que está aplicando
                fk_tipo_solicitud: solicitudExistente.fk_tipo_solicitud,  // Mantener fk_tipo_solicitud
                fk_seccion_asignatura: solicitudExistente.fk_seccion_asignatura,  // Mantener fk_seccion_asignatura
            });

            if (response.status === 200) {
                alert("Solicitud actualizada con éxito.");
                // Actualizar el estado o redirigir a otra vista si es necesario
            } else {
                alert("Hubo un problema al actualizar la solicitud.");
            }
        } catch (error) {
            console.error("Error al postularse:", error);
            alert("Error al postularse a la solicitud.");
        }
    };





    return (
        <div className="flex justify-center bg-amber-400 h-screen">
            <Navbar />
            <div className="p-12">
                {user ? (
                    <p className='font-bold italic'>Hola {user.displayName}</p>
                ) : (
                    <p className='font-bold italic'>Cargando información del usuario...</p>
                )}

                <h1>Listado de Solicitudes</h1>
                {solicitudes.length > 0 ? (
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-black bg-black">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-amber-400">Solicitud</th>
                                    <th className="px-6 py-3 text-amber-400">Id Alumno</th>
                                    <th className="px-6 py-3 text-amber-400">Correo</th>
                                    <th className="px-6 py-3 text-amber-400">Sección</th>
                                    <th className="px-6 py-3 text-amber-400">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {solicitudes.map((e) => (
                                    <tr key={e.id_solicitud} className="bg-white border-b dark:bg-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-100">
                                        <td className="px-6 py-4">{e.id_solicitud}</td>
                                        <td className="px-6 py-4">{e.id_alumno}</td>
                                        <td className="px-6 py-4">{e.correoAlumno}</td>
                                        <td className="px-6 py-4">{e.nombreRelacion} {e.nombreSeccion}</td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handlePostularse(e.id_solicitud)}
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                Aplicar
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
    );
}

export default Solicitudes;
