import React, { useEffect, useState, useContext } from 'react';
import { Link } from "react-router-dom";
import Red from '../../assets/img/netpeople.png';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';

function AsignaturasAlumno() {
    const { user, loading } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState(""); // Estado para el mensaje de éxito
    const navigate = useNavigate();
    const [asignaturas, setAsignaturas] = useState([]);
    const [seccion, setSeccion] = useState([]);
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

    // useEffect(() => {
    //     axios.get(`http://localhost:8800/secciones/${id_seccion}`)
    //         .then((response) => {
    //             console.log('Datos recibidos:', response.data);
    //             setSeccion(response.data);  // Guardamos los datos de asignaturas en el estado
    //         })
    //         .catch((error) => {
    //             console.error("Error al obtener las asignaturas:", error);
    //         });
    // }, []);



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

        // Encontrar el fk_seccion usando el id_asignatura_seccion
        console.log("ID que se busca:", idAsignaturaSeccion);
        console.log("Lista de asignaturas:", asignaturas);
        const asignatura = asignaturas.find(asignatura => asignatura.id_asignatura_seccion === idAsignaturaSeccion);
        console.log("Asignatura encontrada:", asignatura);
        const fk_seccion = asignatura ? asignatura.fk_seccion : null;

        if (fk_seccion) {
            console.log("fk_seccion seleccionado: ", fk_seccion);

            // En vez de guardar fk_seccion, guarda el id_asignatura_seccion
            setSelectedAsignatura(idAsignaturaSeccion);  // Guardar el id_asignatura_seccion en el estado
            setShowModal(true); // Mostrar el modal
        } else {
            setErrorMessage("No se pudo encontrar la sección de la asignatura.");
            setSuccessMessage(""); // Limpiar el mensaje de éxito
        }
    };


    // Función para confirmar la inscripción
    const handleConfirm = async () => {
        // Verifica que el usuario esté autenticado
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
    
        try {
            // Primero obtener los datos de la asignatura seleccionada
            const asignatura = asignaturas.find(asignatura => asignatura.id_asignatura_seccion === selectedAsignatura);
            const fk_seccion = asignatura ? asignatura.fk_seccion : null;
    
            // Verificar que la asignatura y fk_seccion sean válidos
            if (!fk_seccion) {
                setErrorMessage("No se pudo encontrar la sección de la asignatura.");
                return;
            }
    
            // Obtener los datos de la sección para la inscripción
            const responseSeccion = await axios.get(`http://localhost:8800/secciones/${fk_seccion}`);
            const seccionData = responseSeccion.data;
    
            // Verificar si la sección tiene capacidad
            if (seccionData.inscripciones >= seccionData.capacidad) {
                setErrorMessage("No hay suficiente capacidad para inscribir más estudiantes.");
                setSuccessMessage(""); // Limpiar mensaje de éxito si hay error
                return;
            }
    
            // Si la inscripción es posible, actualizar el número de inscripciones
            const updatedInscribirAsignatura = {
                fk_seccion_asignatura: selectedAsignatura,  // Usamos el id_asignatura_seccion
                fk_alumno: inscribirAsignatura.fk_alumno,   // Asegúrate de tener el fk_alumno
            };
    
            // Realizar el POST para la inscripción
            const postResponse = await axios.post("http://localhost:8800/horario_alumnos", updatedInscribirAsignatura);
            console.log("Inscripción realizada con éxito:", postResponse.data);
    
            // Ahora actualizar las inscripciones de la sección
            let updatedInscripciones = seccionData.inscripciones + 1;
            console.log('Inscripciones actualizadas:', updatedInscripciones); // Verifica el valor antes de enviar la solicitud
    
            // Asegurarse de que el valor de inscripciones no sea nulo o undefined
            if (updatedInscripciones === null || updatedInscripciones === undefined || isNaN(updatedInscripciones)) {
                setErrorMessage("No se pudo obtener el valor de las inscripciones.");
                setShowModal(false);  // Cerrar el modal en caso de error
                return;
            }
    
            // Verificar que los datos de la sección sean válidos
            if (!seccionData.nombreseccion || !seccionData.capacidad) {
                setErrorMessage("Los datos de la sección no son válidos.");
                setShowModal(false);  // Cerrar el modal en caso de error
                return;
            }
    
            // Realizar el PUT para actualizar las inscripciones en la base de datos
            await axios.put(`http://localhost:8800/secciones/inscripciones/${fk_seccion}`, {
                inscripciones: updatedInscripciones,
                nombreseccion: seccionData.nombreseccion,
                capacidad: seccionData.capacidad,
            });
    
            // Mostrar mensaje de éxito
            setSuccessMessage("¡Inscripción realizada con éxito!");
            setErrorMessage("");
            setShowModal(false);  // Cerrar el modal al completar con éxito
    
        } catch (error) {
            console.error("Error al realizar la inscripción:", error);
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
                setShowModal(false);  // Mostrar mensaje de backend
            } else {
                console.log('error: ', error)
                setErrorMessage("Error al registrar la inscripción.");
                setShowModal(false);
            }
            setSuccessMessage("");
            setShowModal(false); // Limpiar mensaje de éxito si hay error
        }
    };
    




    // Función para cancelar la inscripción
    const handleCancel = () => {
        setShowModal(false); // Cerrar el modal sin hacer nada
    };

    return (
        <div className='flex w-full flex-col bg-amber-400'>

            <div className="p-12">
                <p className=' text-lg font-semibold'>Asignaturas por carrera</p>

                {/* Mostrar mensajes de éxito o error */}
                {successMessage && (
                    <div className="bg-green-500 text-white p-3 rounded-md mb-4 w-1/5">
                        {successMessage}
                    </div>
                )}
                {errorMessage && (
                    <div className="bg-red-500 text-white p-3 rounded-md mb-4 w-1/5">
                        {errorMessage}
                    </div>
                )}

                {/* Grid de asignaturas */}
                <div className="grid grid-cols-4 gap-4 p-4">
                    {asignaturas.length > 0 ? (
                        asignaturas.map((e) => {
                            // Verificamos si las inscripciones han alcanzado la capacidad
                            const isFull = e.inscripciones >= e.capacidad;

                            return (
                                <div className="border p-4 items-center bg-white rounded-lg z-100" key={e.id_asignatura_seccion}>
                                    <div className='p-4'>
                                        <p className='font-bold'>{e.nombreasignatura} - {e.nombreseccion}</p>
                                        <p>{e.nombredocente}</p>
                                        <p>{e.inscripciones}/{e.capacidad}</p>
                                        <p>{e.nombrecarrera} - {e.nombrenivel}</p>
                                    </div>
                                    <div>
                                        <button
                                            onClick={(event) => handleClick(event, e.id_asignatura_seccion)}  // Cambié 'e' por 'asignatura'
                                            className={`flex-shrink-0 ${isFull ? "bg-gray-500 cursor-not-allowed" : "bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700"} text-sm border-4 text-white py-1 px-2 rounded`}
                                            disabled={isFull}  // Desactiva el botón si la sección está llena
                                        >

                                            {isFull ? "Sección llena" : "Quiero inscribir esta sección"}
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
