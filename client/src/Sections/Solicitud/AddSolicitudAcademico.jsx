import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Footer from '../../Layout/Footer';

function AddSolicitudAcademico() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);
    const [asignatura, setAsignatura] = useState({
        fk_academico: "",
        fk_estado: "",
        fk_solicitud: "",
        mensaje: ""
    });

    const [estadoSolicitud, setEstadoSolicitud] = useState([]);
    const [solicitud, setSolicitud] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    // Cargar los tipos de solicitud y secciones de asignatura
    useEffect(() => {
        const fetchEstadoSolicitudes = async () => {
            try {
                const response = await axios.get("http://localhost:8800/estado_solicitudes");
                setEstadoSolicitud(response.data);
            } catch (error) {
                console.error("Error al obtener los tipos de solicitud", error);
            }
        };

        const fetchSolicitud = async () => {
            try {
                const response = await axios.get("http://localhost:8800/solicitudes");
                setSolicitud(response.data);
            } catch (error) {
                console.error("Error al obtener las secciones de asignaturas", error);
            }
        };

        fetchEstadoSolicitudes();
        fetchSolicitud();
    }, []);


    useEffect(() => {
        if (user && user.uid) {
            console.log(user);

            // Recortar el UID a los primeros 28 caracteres
            const shortUid = user.uid.substring(0, 28);

            // Consulta a la API para obtener el id_academico por el UID recortado
            axios.get(`http://localhost:8800/auth/checkUser/${shortUid}`)
                .then((response) => {
                    if (response.data.exists && response.data.rol === 1) {
                        // Solo asignar el id_academico si el usuario es de rol academico
                        setAsignatura(prev => ({
                            ...prev,
                            fk_academico: response.data.id_academico  // Asignar id_academico a fk_academico
                        }));
                    } else {
                        // Quitar esta parte temporalmente para probar el formulario sin bloqueos
                        setErrorMessage("");  // Aquí puedes quitar el mensaje de error para hacer pruebas
                    }
                })
                .catch((error) => {
                    console.error("Error al obtener el id_academico:", error);
                    // También podemos eliminar este setErrorMessage para hacer pruebas
                    setErrorMessage("");  // Eliminar para probar el formulario sin bloqueos
                });
        } else {
            // Puedes dejar esta parte sin cambios si aún deseas verificar que el usuario esté autenticado
            setErrorMessage("No estás autenticado. Inicia sesión para continuar.");
        }
    }, [user]);

    const handleChange = (e) => {
        setAsignatura((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        // Elimina esta validación temporalmente para probar
        // if (!user || !asignatura.fk_academico) {
        //     setErrorMessage("Acceso denegado. No tienes permisos para agregar un estado de solicitud.");
        //     return;
        // }

        try {
            await axios.post("http://localhost:8800/academico_solicitudes", asignatura);
            navigate(0);  // Recarga la página
        } catch (error) {
            console.error("Error al hacer la solicitud:", error);
        }
    };

    return (
        <div className='p-12 w-1/3 bg-amber-400'>
            <h1>Solicitud Academico</h1>
            {/* Elimina la comprobación de error temporalmente */}
            {/* {errorMessage && (
                <div className="bg-red-400 text-white p-3 rounded mb-4">
                    {errorMessage}
                </div>
            )} */}
            <div className="flex flex-wrap -mx-3 mb-6 form w-full">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                        Estado
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="number"
                        placeholder="fk_estado"
                        onChange={handleChange}
                        name="fk_estado"
                        // Habilitar input aunque haya error
                        disabled={false}
                    />

                    <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                    <textarea id="message" maxlength="49" rows="4" className="appearance-none  resize-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text"
                        placeholder="mensaje"
                        onChange={handleChange}
                        name="mensaje"></textarea>

                    <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
                </div>
                <button
                    onClick={handleClick}
                    className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                    // Habilitar el botón aunque haya error
                    disabled={false}
                >
                    Crear
                </button>
            </div>
            <Footer />
        </div>
    );
}

export default AddSolicitudAcademico;
