import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';

function HorarioAlumno() {

    const { user, loading } = useContext(AuthContext);
    const [horario, setHorario] = useState([]);
    const [shortUid, setShortUid] = useState("");  // Estado para almacenar el shortUid
    const [showModal, setShowModal] = useState(false);  // Estado para controlar la visibilidad del modal
    const [horarioToDelete, setHorarioToDelete] = useState(null);  // Estado para almacenar el id_horario a eliminar

    // Primer useEffect para obtener el shortUid y verificar si el usuario existe
    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                try {
                    const uid = user.uid.substring(0, 28);  // Asegurándonos de que el UID esté en el formato correcto
                    setShortUid(uid);  // Almacenamos el shortUid en el estado

                    const response = await fetch(`http://localhost:8800/auth/checkUser/${uid}`);
                    const data = await response.json();

                    if (data.exists) {
                        console.log('User is valid');
                    } else {
                        console.log("Usuario no encontrado en la base de datos.");
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    console.log("Error al verificar el usuario.");
                }
            }
        };

        fetchUserData();
    }, [user]);

    // Segundo useEffect para hacer la consulta GET con el shortUid
    useEffect(() => {
        if (shortUid) {  // Asegúrate de que shortUid esté disponible
            axios.get(`http://localhost:8800/horario_alumnos/${shortUid}`)
                .then((response) => {
                    console.log('Datos recibidos:', response.data);  // Asegúrate de que los datos llegan aquí
                    setHorario(response.data);  // Guardamos los datos de horario en el estado
                })
                .catch((error) => {
                    console.error("Error al obtener los horarios:", error);
                });
        }
    }, [shortUid]);  // Este useEffect se ejecuta cuando shortUid cambia

    const handleDelete = async () => {
        try {
            if (horarioToDelete) {
                // Obtener la asignatura que se va a eliminar
                const asignaturaToDelete = horario.find((e) => e.id_horario === horarioToDelete);
                if (!asignaturaToDelete) {
                    console.log("No se encontró la asignatura a eliminar.");
                    return;
                }

                const { fk_asignatura_seccion, fk_seccion } = asignaturaToDelete;

                // Eliminar el horario del alumno
                await axios.delete(`http://localhost:8800/horario_alumnos/${horarioToDelete}`);
                // Actualizar el estado local para reflejar la eliminación
                setHorario(horario.filter((e) => e.id_horario !== horarioToDelete));

                // Actualizar la cantidad de inscripciones en la tabla seccion
                const response = await axios.get(`http://localhost:8800/secciones/${fk_seccion}`);
                const seccionData = response.data;

                if (seccionData) {
                    // Reducir en 1 la cantidad de inscripciones
                    const updatedInscripciones = seccionData.inscripciones - 1;

                    // Realizar el PUT para actualizar las inscripciones en la tabla seccion
                    await axios.put(`http://localhost:8800/secciones/${fk_seccion}`, {
                        inscripciones: updatedInscripciones,
                        nombreSeccion: seccionData.nombreSeccion,
                        capacidad: seccionData.capacidad
                    });

                    console.log("Inscripciones actualizadas en la sección.");
                }

                setShowModal(false);  // Cerrar el modal después de eliminar
            }
        } catch (error) {
            console.log("Error al eliminar la asignatura o actualizar las inscripciones:", error);
        }
    };


    // Función para abrir el modal y pasarle el id_horario
    const openModal = (id) => {
        setHorarioToDelete(id);  // Guardamos el id_horario que se quiere eliminar
        setShowModal(true);  // Mostramos el modal
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setShowModal(false);  // Cerramos el modal
        setHorarioToDelete(null);  // Limpiamos el id_horario
    };

    return (
        <div className='p-12 bg-amber-400'>
            <p className='text-lg font-semibold'>Tus asignaturas inscritas</p>
            {horario.length > 0 ? (
                <div className="grid grid-cols-4 gap-4 p-4">
                    {horario.map((e) => (
                        <div className="border p-4 items-center bg-white rounded-lg" key={e.id_horario}>
                            <div className='p-4'>
                                <p className='font-bold'>{e.id_horario} - {e.nombreRelacion} - {e.nombreSeccion}</p>
                                <p>{e.nombreAsignatura} </p>
                                <p>{e.nombreDocente}</p>
                            </div>
                            <div className="flex justify-between">
                                <button
                                    className="font-bold text-red-600 dark:text-red-500 hover:underline ml-2"
                                    onClick={() => openModal(e.id_horario)} // Llamamos a openModal para mostrar el modal
                                >
                                    Eliminar asignatura
                                </button>
                                {/* Si quieres agregar algo más como un botón de editar u otros detalles */}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No hay horarios disponibles.</p>
            )}

            {/* Modal de confirmación */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50"> {/* Modal emergente y centrado */}
                    <div className="modal-content bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
                        <h2 className="text-lg font-bold">¿Confirmar eliminación?</h2>
                        <p>¿Seguro que deseas eliminar esta asignatura?</p>
                        <div className="mt-4 flex justify-end">
                            <button
                                className="mr-2 bg-red-600 text-white p-2 rounded"
                                onClick={handleDelete}
                            >
                                Eliminar
                            </button>
                            <button
                                className="bg-gray-400 text-white p-2 rounded"
                                onClick={closeModal}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default HorarioAlumno;
