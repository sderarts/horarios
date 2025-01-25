import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';

function AddHorarioAlumno() {
    const { id } = useParams();  // Capturamos el id desde la URL
    const { user, loading } = useContext(AuthContext);  // Obtenemos el user desde el contexto
    const [asignaturaSeccion, setAsignaturaSeccion] = useState([]);
    const [horario, setHorario] = useState({
        fk_alumno: "",
        fk_seccion_asignatura: ""
    });
    const [errorMessage, setErrorMessage] = useState(""); // Mensaje de error si no está autenticado
    const [idAlumno, setIdAlumno] = useState(null);  // Estado para guardar el id_alumno
    const navigate = useNavigate();  // Para redirigir

    const handleChange = (e) => {
        setHorario((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8800/horario_alumnos", horario);
            console.log(horario);
            navigate(0); // Refresca la página
        } catch (error) {
            console.error("Error al hacer la solicitud:", error);
        }
    };

    // Lógica de autenticación: Aseguramos que 'user' esté disponible antes de hacer la solicitud.
    useEffect(() => {
        if (!loading && user) {
            // Recortar el UID a los primeros 28 caracteres
            const shortUid = user.uid.substring(0, 28);
            console.log(user);


            // Consulta a la API para obtener el id_alumno por el UID recortado
            axios
                .get(`http://localhost:8800/auth/checkUser/${shortUid}`)
                .then((response) => {
                    if (response.data.exists && response.data.rol === 2) {  // Si es alumno
                        setIdAlumno(response.data.id_alumno);  // Guardamos el id_alumno en el estado
                    } else {
                        setErrorMessage("No tienes acceso como alumno");
                    }
                })
                .catch((error) => {
                    console.error("Error al obtener el id_alumno:", error);
                    setErrorMessage("Error al verificar tu acceso");
                });
        } else if (!user) {
            setErrorMessage("No estás autenticado. Inicia sesión para continuar.");
        }
    }, [loading, user]); // Dependemos de 'loading' y 'user' para asegurarnos de que los datos estén listos

    useEffect(() => {
        if (idAlumno) {

            const fetchAsignaturaSecciones = async () => {
                try {
                    const response = await axios.get(
                        `http://localhost:8800/asignatura_secciones/alumno/${idAlumno}`
                    );
                    console.log("Datos de asignaturaSeccion:", response.data);
                    setAsignaturaSeccion(response.data);
                } catch (error) {
                    console.error("Error al obtener los registros de asignaturaSeccion", error);
                }
            };

            fetchAsignaturaSecciones();
        }
    }, [idAlumno]);  // Dependemos de 'idAlumno' para hacer la consulta

    if (loading) {
        return <div>Cargando...</div>;  // Puedes agregar un loading spinner si prefieres
    }

    return (
        <div className="flex flex-row bg-amber-400">
            <div>
                <div className="p-12">
                    <h1>Detalles asignaturas</h1>
                    {asignaturaSeccion.length > 0 ? (
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-black bg-black">
                                <thead>
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-amber-400">
                                            Nombre relación
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-amber-400">
                                            Asignatura
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-amber-400">
                                            Sección
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-amber-400">
                                            Docente
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-amber-400">
                                            Actualizar
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-amber-400">
                                            Eliminar
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {asignaturaSeccion.map((e) => (
                                        <tr
                                            key={e.id_asignatura_seccion}
                                            className="bg-white border-b dark:bg-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-100"
                                        >
                                            <td className="px-6 py-4">
                                                {e.id_asignatura_seccion} - {e.nombreRelacion}
                                            </td>
                                            <td className="px-6 py-4">{e.nombre_asignatura}</td>
                                            <td className="px-6 py-4">{e.nombre_seccion}</td>
                                            <td className="px-6 py-4">{e.nombreDocente}</td>
                                            <td className="px-6 py-4">
                                                <Link to={`/asignatura_secciones/${e.id_asignatura_seccion}`}>
                                                    <div className="w-full px-3 mb-4">
                                                        <button
                                                            onClick={handleClick}
                                                            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                                                        >
                                                            Inscribir
                                                        </button>
                                                    </div>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p>No hay secciones disponibles.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AddHorarioAlumno;
