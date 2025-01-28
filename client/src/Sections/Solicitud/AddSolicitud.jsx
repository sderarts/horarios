import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthContext'; // Importamos el contexto de autenticación
import Navbar from '../../Layout/Navbar';

function AddSolicitud() {
    const navigate = useNavigate();
    const { user, loading } = useContext(AuthContext);  // Obtenemos el usuario y estado de carga desde el contexto
    const [solicitud, setSolicitud] = useState({
        fk_alumno: "", // Lo estableceremos luego con el id_alumno
        fk_tipo_solicitud: "",
        fk_seccion_asignatura: ""
    });

    const [tipoSolicitud, setTipoSolicitud] = useState([]);
    const [seccionAsignatura, setSeccionAsignatura] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    // Cargar los tipos de solicitud y secciones de asignatura
    useEffect(() => {
        const fetchTipoSolicitudes = async () => {
            try {
                const response = await axios.get("http://localhost:8800/tipo_solicitudes");
                setTipoSolicitud(response.data);
            } catch (error) {
                console.error("Error al obtener los tipos de solicitud", error);
            }
        };

        const fetchSeccionAsignatura = async () => {
            try {
                const response = await axios.get("http://localhost:8800/asignatura_secciones");
                setSeccionAsignatura(response.data);
            } catch (error) {
                console.error("Error al obtener las secciones de asignaturas", error);
            }
        };

        fetchTipoSolicitudes();
        fetchSeccionAsignatura();
    }, []);

    // Asegurar que el id_alumno esté presente en el estado antes de enviar la solicitud
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
                        // Si el usuario existe, lo asignamos como fk_alumno
                        setSolicitud((prev) => ({ ...prev, fk_alumno: shortUid }));
                        console.log('User is valid');
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

    const handleChange = (e) => {
        setSolicitud((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();

        // Verificar que el usuario esté autenticado
        if (!solicitud.fk_alumno) {
            setErrorMessage("Debes estar autenticado como alumno.");
            return;
        }

        try {
            // 1. Enviar la solicitud con el id_alumno establecido
            const response = await axios.post("http://localhost:8800/solicitudes", solicitud);
            console.log("Solicitud enviada:", response.data); // Aquí tienes el id_solicitud

            const academicoData = {
                fk_solicitud: response.data.id_solicitud, // Ahora debería estar disponible
                fk_estado: 3, // Estado "En progreso"
                mensaje: "Solicitud creada y en progreso",
                fk_academico: "DSxAX4ANbTOCHgGiNwocYlIvtiN2" // ID del académico (esto debería venir dinámicamente)
            };

            // Verifica los datos antes de enviarlos al backend
            console.log("Datos enviados a academico_solicitudes:", academicoData);

            const academicoResponse = await axios.post("http://localhost:8800/academico_solicitudes", academicoData);

            // Si todo fue bien, puedes proceder a hacer algo con la respuesta, como recargar la página o dar un mensaje de éxito
            console.log("Solicitud académica registrada:", academicoResponse.data);

            // Recargar la página después de enviar la solicitud
            navigate(0);

        } catch (error) {
            if (error.response) {
                console.error("Error en la respuesta:", error.response.data);
                setErrorMessage("Error al enviar la solicitud.");
            } else {
                console.error("Error al hacer la solicitud:", error.message);
                setErrorMessage("Error al procesar la solicitud.");
            }
        }
    };


    return (
        <div>
            <Navbar />
            <div className='p-12 bg-amber-400 w-full h-screen'>
                {user ? (
                    <p className='font-bold italic'>
                        {user.displayName} Con la nueva plataforma de solicitudes, puedes gestionar tu inscripción fácilmente.
                    </p>
                ) : (
                    <p className='font-bold italic'>
                        Cargando información del usuario...
                    </p>
                )}
                {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
                <div className="flex flex-wrap -mx-3 mb-6 form w-1/2">
                    <div className="w-full px-3 mb-4">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="fk_seccion_asignatura">
                            Sección Asignatura
                        </label>
                        <select
                            className="block appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            name="fk_seccion_asignatura"
                            onChange={handleChange}
                            value={solicitud.fk_seccion_asignatura}
                        >
                            <option value="">Seleccionar Sección</option>
                            {seccionAsignatura.map((seccion) => (
                                <option key={seccion.id_asignatura_seccion} value={seccion.id_asignatura_seccion}>
                                    {seccion.nombreRelacion} {seccion.nombre_seccion}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="w-full px-3 mb-4">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="fk_tipo_solicitud">
                            Tipo Solicitud
                        </label>
                        <select
                            className="block appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            name="fk_tipo_solicitud"
                            onChange={handleChange}
                            value={solicitud.fk_tipo_solicitud}
                        >
                            <option value="">Seleccionar Tipo de Solicitud</option>
                            {tipoSolicitud.map((tipo) => (
                                <option key={tipo.id_tipo_solicitud} value={tipo.id_tipo_solicitud}>
                                    {tipo.nombreTipoSolicitud}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='p-3'>
                        <button onClick={handleClick} className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded">
                            Enviar Solicitud
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddSolicitud;
