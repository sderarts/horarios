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
        <div className="flex flex-col bg-amber-400 p-12">
            <h1>Detalles asignaturas</h1>
            {errorMessage && <div className="error">{errorMessage}</div>}  {/* Mostrar error si existe */}

            {/* Mostrar asignaturas en grid */}
            {asignaturaSeccion.length > 0 ? (
                <div className="grid grid-cols-4 gap-4 p-4">
                    {asignaturaSeccion.map((e) => (
                        <div className="border p-4 items-center bg-white rounded-lg" key={e.id_asignatura_seccion}>
                            <div className='p-4'>
                                <p className='font-bold'>{e.nombre_asignatura} - {e.nombre_seccion}</p>
                                <p>{e.nombreDocente}</p>
                                <p>{e.inscripciones}/{e.capacidad}</p>
                            </div>
                            <div className="flex justify-between">
                                <button
                                    onClick={() => {
                                        setHorario((prev) => ({
                                            ...prev,
                                            fk_alumno: idAlumno,
                                            fk_seccion_asignatura: e.id_asignatura_seccion
                                        }));
                                        handleClick(e);
                                    }}
                                    className="bg-teal-500 text-white px-4 py-2 rounded"
                                >
                                    Inscribir
                                </button>
                                <Link to={`/asignatura_secciones/${e.id_asignatura_seccion}`}>
                                    <button className="bg-teal-300 text-white px-4 py-2 rounded">
                                        Ver detalles
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No hay secciones disponibles.</p>
            )}
        </div>
    );
}

export default AddHorarioAlumno;
