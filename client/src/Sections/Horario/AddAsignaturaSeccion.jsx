import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

function AddAsignaturaSeccion() {
    const navigate = useNavigate();
    const [asignaturaSeccion, setAsignaturaSeccion] = useState({
        nombreRelacion: "",
        nombreDocente: "",
        fk_asignatura: "",
        fk_seccion: ""
    });

    // Estado para las listas de FK
    const [asignaturas, setAsignaturas] = useState([]);
    const [secciones, setSecciones] = useState([]);

    // Traer las listas de fk_asignatura y fk_seccion al cargar el componente
    useEffect(() => {
        const fetchAsignaturas = async () => {
            try {
                const response = await axios.get("http://localhost:8800/asignaturas/secciones");
                setAsignaturas(response.data); // Suponiendo que la respuesta es un array de días
            } catch (error) {
                console.error("Error al obtener los días", error);
            }
        };

        const fetchSecciones = async () => {
            try {
                const response = await axios.get("http://localhost:8800/secciones");
                setSecciones(response.data); // Suponiendo que la respuesta es un array de secciones
            } catch (error) {
                console.error("Error al obtener los secciones", error);
            }
        };

        fetchAsignaturas();
        fetchSecciones();
    }, []);

    const handleChange = (e) => {
        setAsignaturaSeccion((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8800/asignatura_secciones", asignaturaSeccion);
            console.log("Response:", response.data);
            navigate(0)
        } catch (error) {
            if (error.response) {
                console.error("Error en la respuesta:", error.response.data);
                console.error("Código de estado:", error.response.status);
            } else {
                console.error("Error al hacer la solicitud:", error.message);
            }
        }
    };

    return (
        <div className='bg-amber-400 w-1/3 px-12'>
            <div className="flex flex-wrap -mx-3 mb-6 form w-full">
                <div className='w-full justify-center items-center p-4'>
                    <p className='text-black font-semibold text-xl'>Crear Asignatura-Sección</p>
                </div>
                {/* Lista desplegable para fk_asignatura */}
                <div className="w-full px-3 mb-4">
                    <select
                        className="block appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        name="fk_asignatura"
                        onChange={handleChange}
                        value={asignaturaSeccion.fk_asignatura}
                    >
                        <option value="">Asignatura</option>
                        {asignaturas.map((asignatura) => (
                            <option key={asignatura.id_asignatura} value={asignatura.id_asignatura}>
                                {asignatura.nombreAsignatura}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Lista desplegable para fk_seccion */}
                <div className="w-full px-3 mb-4">
                    <select
                        className="block appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        name="fk_seccion"
                        onChange={handleChange}
                        value={asignaturaSeccion.fk_seccion}
                    >
                        <option value="">Sección</option>
                        {secciones.map((seccion) => (
                            <option key={seccion.id_seccion} value={seccion.id_seccion}>
                                {seccion.nombreSeccion}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Input para nombreRelacion */}
                <div className="w-full px-3 mb-4">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="nombreRelacion">
                        Nombre de Relación
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text"
                        placeholder="Nombre de la relación"
                        onChange={handleChange}
                        name="nombreRelacion"
                    />
                    <p className="text-gray-600 text-xs italic">Ingrese el nombre de la relación entre asignaturas y secciones</p>
                </div>

                {/* Input para nombreDocente */}
                <div className="w-full px-3 mb-4">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="nombreDocente">
                        Nombre del Docente
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text"
                        placeholder="Nombre del docente"
                        onChange={handleChange}
                        name="nombreDocente"
                    />
                    <p className="text-gray-600 text-xs italic">Ingrese el nombre del docente asignado</p>
                </div>

                {/* Botón para agregar asignatura-sección */}
                <div className="w-full px-3 mb-4">
                    <button
                        onClick={handleClick}
                        className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                    >
                        Agregar Asignatura-Sección
                    </button>
                </div>
            </div>

        </div>
    );
}

export default AddAsignaturaSeccion