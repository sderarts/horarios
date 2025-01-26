import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';

function Solicitudes() {
    const { user, loading } = useContext(AuthContext);
    const [solicitudes, setSolicitud] = useState([]); // Solicitudes generales
    const [academicoSolicitud, setAcademicoSolicitud] = useState([]); // Solicitudes académicas
    const [mensaje, setMensaje] = useState("");  // Mensaje que se actualizará
    const [estado, setEstado] = useState(3);  // Estado inicial de las solicitudes (en progreso)
    const [fkAcademico, setFkAcademico] = useState(null); // Estado para el fk_academico
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
                    // Recortamos el UID a los primeros 28 caracteres para coincidir con lo almacenado en la base de datos
                    const shortUid = user.uid.substring(0, 28);

                    // Verificamos si el usuario existe en la base de datos
                    const response = await fetch(`http://localhost:8800/auth/checkUser/${shortUid}`);
                    const data = await response.json();

                    if (data.exists) {
                        console.log("Datos del usuario:", data);  // Verifica qué datos llegan

                        // Verificamos si el usuario es académico
                        if (data.rol == 1) {  // Rol académico
                            setFkAcademico(data.id_academico); // Guardamos el fk_academico en el estado
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


    // Función para manejar la actualización de estado y mensaje
    const handleChangeEstado = async (idSolicitud, nuevoEstado, nuevoMensaje) => {
        console.log('Iniciando actualización de solicitud académica');
        console.log(`ID de Solicitud: ${idSolicitud}, Estado: ${nuevoEstado}, Mensaje: ${nuevoMensaje}`);

        try {
            // Paso 1: Obtener la solicitud académica que corresponde al id_solicitud
            const response = await axios.get(`http://localhost:8800/academico_solicitudes?fk_solicitud=${idSolicitud}`);
            const solicitudAcademica = response.data[0];  // Suponemos que solo hay una solicitud académica con ese fk_solicitud

            console.log('Solicitud académica obtenida:', solicitudAcademica);

            if (!solicitudAcademica) {
                console.error("No se encontró la solicitud académica correspondiente");
                return;
            }

            // Paso 2: Realizar la actualización usando el id_solicitud_academico
            const responseUpdate = await axios.put(`http://localhost:8800/academico_solicitudes/${solicitudAcademica.id_solicitud_academico}`, {
                fk_estado: nuevoEstado || solicitudAcademica.fk_estado,  // Usar el estado actual si no hay nuevo estado
                mensaje: nuevoMensaje || solicitudAcademica.mensaje,    // Usar el mensaje actual si no hay nuevo mensaje
                fk_academico: fkAcademico,  // Asegúrate de que fkAcademico esté disponible
                fk_solicitud: idSolicitud   // Pasamos el id_solicitud para mantener la relación
            });

            console.log("Respuesta del servidor:", responseUpdate.data);

            // Actualizamos el estado en el frontend
            setAcademicoSolicitud(academicoSolicitud.map((asolicitud) =>
                asolicitud.id_solicitud_academico === solicitudAcademica.id_solicitud_academico
                    ? { ...asolicitud, mensaje: nuevoMensaje, fk_estado: nuevoEstado }
                    : asolicitud
            ));

            console.log("Solicitud académica actualizada en el frontend");

        } catch (error) {
            console.error("Error al actualizar la solicitud académica:", error);
        }
    };


    return (
        <div className='flex flex-row w-full bg-amber-400'>
            <div className="p-12">
                <h1>Listado de Solicitudes</h1>
                {solicitudes.length > 0 ? (
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-black bg-black">
                            <thead>
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-amber-400">Solicitud</th>
                                    <th scope="col" className="px-6 py-3 text-amber-400">Id Alumno</th>
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
                                        <td className="px-6 py-4">{e.correoAlumno}</td>
                                        <td className="px-6 py-4">{e.nombreTipoSolicitud}</td>
                                        <td className="px-6 py-4">{e.nombreRelacion} {e.nombreSeccion}</td>
                                        <td className="px-6 py-4">{e.nombreDocente}</td>
                                        <td className="px-6 py-4">{e.inscripciones}/{e.capacidad}</td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleChangeEstado(e.id_solicitud, 1, "Solicitud Aceptada")}
                                                className="text-green-600 hover:text-green-800"
                                            >
                                                Aceptar
                                            </button>
                                            <button
                                                onClick={() => handleChangeEstado(e.id_solicitud, 2, "Solicitud Denegada")}
                                                className="ml-4 text-red-600 hover:text-red-800"
                                            >
                                                Denegar
                                            </button>
                                            <button
                                                onClick={() => setMensaje(prompt("Ingresa un mensaje"))}
                                                className="ml-4 text-blue-600 hover:text-blue-800"
                                            >
                                                Modificar Mensaje
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
