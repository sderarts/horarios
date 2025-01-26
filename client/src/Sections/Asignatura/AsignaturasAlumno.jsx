import React, { useEffect, useState, useContext } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';

function AsignaturasAlumno() {
    const { user, loading } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState(""); // Estado para el mensaje de éxito
    const navigate = useNavigate();
    const [asignaturas, setAsignaturas] = useState([]);
    const [inscribirAsignatura, setInscribirAsignatura] = useState({
        fk_seccion_asignatura: "",
        fk_alumno: ""
    });
    const [showModal, setShowModal] = useState(false); // Estado para mostrar/ocultar el modal
    const [selectedAsignatura, setSelectedAsignatura] = useState(null); // Estado para la asignatura seleccionada

    useEffect(() => {
        axios.get("http://localhost:8800/asignatura_secciones")
            .then((response) => {
                console.log('Datos recibidos:', response.data);
                setAsignaturas(response.data);  // Guardamos los datos de asignaturas en el estado
            })
            .catch((error) => {
                console.error("Error al obtener las asignaturas:", error);
            });
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                try {
                    const shortUid = user.uid.substring(0, 28);  // Asegurándonos de que el UID esté en el formato correcto

                    const response = await fetch(`http://localhost:8800/auth/checkUser/${shortUid}`);
                    const data = await response.json();

                    if (data.exists) {
                        setInscribirAsignatura((prev) => ({ ...prev, fk_alumno: shortUid }));
                        console.log('User is valid');
                    } else {
                        setErrorMessage("Usuario no encontrado en la base de datos.");
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setErrorMessage("Error al verificar el usuario.");
                }
            }
        };

        fetchUserData();
    }, [user]);

    const handleClick = (event, idAsignaturaSeccion) => {
        event.preventDefault();

        // Verifica si ya tienes un alumno autenticado
        if (!inscribirAsignatura.fk_alumno) {
            setErrorMessage("Debes estar autenticado como alumno.");
            setSuccessMessage(""); // Limpiar mensaje de éxito si hay error
            return;
        }

        console.log("id_asignatura_seccion seleccionado: ", idAsignaturaSeccion);

        // Muestra el modal de confirmación y guarda la asignatura seleccionada
        setSelectedAsignatura(idAsignaturaSeccion);
        setShowModal(true);
    };

    // Función para confirmar la inscripción
    const handleConfirm = async () => {
        // Verifica si ya tienes un alumno autenticado
        if (!inscribirAsignatura.fk_alumno) {
            setErrorMessage("Debes estar autenticado como alumno.");
            setSuccessMessage(""); // Limpiar mensaje de éxito si hay error
            return;
        }

        if (!selectedAsignatura) {
            setErrorMessage("No se ha seleccionado una asignatura.");
            setSuccessMessage(""); // Limpiar mensaje de éxito si hay error
            return;
        }

        // Actualizamos el estado con el id_seccion_asignatura seleccionado
        const updatedInscribirAsignatura = {
            ...inscribirAsignatura,
            fk_seccion_asignatura: selectedAsignatura,  // Usamos el id de la asignatura seleccionada
        };

        setInscribirAsignatura(updatedInscribirAsignatura);

        setShowModal(false); // Cerrar el modal

        // Enviar la solicitud POST con el estado actualizado
        try {
            const response = await axios.post("http://localhost:8800/horario_alumnos", updatedInscribirAsignatura);
            console.log("Solicitud enviada:", response.data);

            setSuccessMessage("¡Inscripción realizada con éxito!"); // Mensaje de éxito
            setErrorMessage(""); // Limpiar mensaje de error si la inscripción fue exitosa
        } catch (error) {
            if (error.response) {
                console.error("Error en la respuesta:", error.response.data);
                setErrorMessage(error.response.data.message || "Error al enviar la solicitud.");
                setSuccessMessage(""); // Limpiar mensaje de éxito si hay error
            } else {
                console.error("Error al hacer la solicitud:", error.message);
                setErrorMessage("Error al procesar la solicitud.");
                setSuccessMessage(""); // Limpiar mensaje de éxito si hay error
            }
        }
    };


    // Función para cancelar la inscripción
    const handleCancel = () => {
        setShowModal(false); // Cerrar el modal sin hacer nada
    };

    return (
        <div className='flex w-full flex-col bg-amber-400'>
            <div className="p-12">
                <h1>Asignaturas por carrera</h1>

                {/* Mostrar mensajes de éxito o error */}
                {successMessage && (
                    <div className="bg-green-500 text-white p-3 rounded-md mb-4">
                        {successMessage}
                    </div>
                )}
                {errorMessage && (
                    <div className="bg-red-500 text-white p-3 rounded-md mb-4">
                        {errorMessage}
                    </div>
                )}

                {/* Grid de asignaturas */}
                <div className="grid grid-cols-4 gap-4 p-4">
                    {asignaturas.length > 0 ? (
                        asignaturas.map((e) => {
                            return (
                                <div className="border p-4 items-center bg-white rounded-lg" key={e.id_asignatura_seccion}>
                                    <div className='p-4'>
                                        <p className='font-bold'>{e.nombreAsignatura} - {e.nombreSeccion}</p>
                                        <p>{e.nombreDocente}</p>
                                        <p>{e.inscripciones}/{e.capacidad}</p>
                                        <p>{e.nombreCarrera} - {e.nombreNivel}</p>
                                    </div>
                                    <div>
                                        <button
                                            onClick={(event) => handleClick(event, e.id_asignatura_seccion)}  // Cambié 'e' por 'asignatura'
                                            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                                        >
                                            Quiero inscribir esta sección
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p>No hay asignaturas disponibles.</p>
                    )}
                </div>

                {/* Modal de confirmación */}
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                            <h3 className="text-xl mb-4">¿Quieres confirmar la inscripción?</h3>
                            <div className="flex justify-between">
                                <button
                                    onClick={handleConfirm}
                                    className="bg-teal-500 text-white px-4 py-2 rounded"
                                >
                                    Confirmar
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AsignaturasAlumno;
