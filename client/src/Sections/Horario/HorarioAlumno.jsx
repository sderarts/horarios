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
                await axios.delete(`http://localhost:8800/horario_alumnos/${horarioToDelete}`);
                // Actualizar el estado local para reflejar la eliminación sin recargar la página
                setHorario(horario.filter(e => e.id_horario !== horarioToDelete));
                setShowModal(false);  // Cerrar el modal después de eliminar
            }
        } catch (error) {
            console.log(error);
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
            {horario.length > 0 ? (
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-black bg-black">
                        <thead>
                            <tr>
                                <th scope="col" className="px-6 py-3 text-amber-400">Secciones</th>
                                <th scope="col" className="px-6 py-3 text-amber-400">Asignaturas</th>
                                <th scope="col" className="px-6 py-3 text-amber-400">Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {horario.map((e) => (
                                <tr key={e.id_horario} className="bg-white border-b dark:bg-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-100">
                                    <td className="px-6 py-4">
                                        {e.id_horario} - {e.nombreRelacion} - {e.nombreSeccion}
                                    </td>
                                    <td className="px-6 py-4">
                                        {e.nombreAsignatura} - {e.nombreDocente}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            className="delete font-bold text-red-600 dark:text-red-500 hover:underline ml-2"
                                            onClick={() => openModal(e.id_horario)}  // Llamamos a openModal para mostrar el modal
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
                <p>No hay horario disponibles.</p>
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
