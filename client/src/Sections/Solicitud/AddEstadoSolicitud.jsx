import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router';

function AddEstadoSolicitud() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);
    const [asignatura, setAsignatura] = useState({
        fk_academico: "",
        nombreEstado: "",
        mensajeSolicitud: ""
    });
    const [errorMessage, setErrorMessage] = useState("");  // Estado para manejar el mensaje de error

    useEffect(() => {
        if (user && user.uid) {
            // Recortar el UID a los primeros 28 caracteres
            const shortUid = user.uid.substring(0, 28);

            // Consulta a la API para obtener el id_academico por el UID recortado
            axios.get(`http://localhost:8800/auth/checkUser/${shortUid}`)
                .then((response) => {
                    if (response.data.id_academico) {
                        setAsignatura(prev => ({
                            ...prev,
                            fk_academico: response.data.id_academico  // Asignar id_academico a fk_academico
                        }));
                    } else {
                        setErrorMessage("Acceso denegado. No tienes permisos para agregar un estado de solicitud.");
                    }
                })
                .catch((error) => {
                    console.error("Error al obtener el id_academico:", error);
                    setErrorMessage("Error al verificar los permisos del usuario.");
                });
        } else {
            setErrorMessage("No estás autenticado. Inicia sesión para continuar.");
        }
    }, [user]);

    const handleChange = (e) => {
        setAsignatura((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        if (!user || !asignatura.fk_academico) {
            setErrorMessage("Acceso denegado. No tienes permisos para agregar un estado de solicitud.");
            return;
        }
        try {
            await axios.post("http://localhost:8800/estado_solicitudes", asignatura);
            navigate(0);  // Recarga la página
        } catch (error) {
            console.error("Error al hacer la solicitud:", error);
        }
    };

    return (
        <div className='p-12 w-1/3 bg-amber-400'>
            <h1>Estado-Solicitud</h1>
            {errorMessage && (
                <div className="bg-red-400 text-white p-3 rounded mb-4">
                    {errorMessage}
                </div>
            )}
            <div className="flex flex-wrap -mx-3 mb-6 form w-full">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                        Estado
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text"
                        placeholder="asignatura"
                        onChange={handleChange}
                        name="nombreEstado"
                        disabled={!!errorMessage}  // Deshabilitar si hay error
                    />
                    <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
                </div>
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                        Mensaje
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text"
                        placeholder="asignatura"
                        onChange={handleChange}
                        name="mensajeSolicitud"
                        disabled={!!errorMessage}  // Deshabilitar si hay error
                    />
                    <textarea
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write your thoughts here..."
                        disabled={!!errorMessage}  // Deshabilitar si hay error
                    ></textarea>
                    <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
                </div>
                <button
                    onClick={handleClick}
                    className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                    disabled={!!errorMessage}  // Deshabilitar si hay error
                >
                    Crear
                </button>
            </div>
        </div>
    );
}

export default AddEstadoSolicitud;
