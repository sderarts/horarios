import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Niveles from '../Nivel/Niveles';
import { useNavigate } from 'react-router';


function AddNivelAsignatura() {

    const navigate = useNavigate();
    const [nivelAsignatura, setNivelAsignatura] = useState({
        relacionNombre: "",
        fk_nivel: "",
        fk_asignatura: ""
    });

    // Estado para las listas de FK
    const [niveles, setNiveles] = useState([]);
    const [asignaturas, setAsignaturas] = useState([]);

    // Traer las listas de fk_nivel y fk_asignatura al cargar el componente
    useEffect(() => {
        const fetchNiveles = async () => {
            try {
                const response = await axios.get("http://localhost:8800/niveles");
                setNiveles(response.data); // Suponiendo que la respuesta es un array de Asignaturas
            } catch (error) {
                console.error("Error al obtener los Asignaturas", error);
            }
        };

        const fetchAsignaturas = async () => {
            try {
                const response = await axios.get("http://localhost:8800/asignaturas/secciones");
                setAsignaturas(response.data); // Suponiendo que la respuesta es un array de asignaturas
            } catch (error) {
                console.error("Error al obtener los asignaturas", error);
            }
        };

        fetchNiveles();
        fetchAsignaturas();
    }, []);

    const handleChange = (e) => {
        setNivelAsignatura((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8800/nivel_asignaturas", nivelAsignatura);
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
        <div className='flex px-12 bg-amber-400 w-2/4 flex-row space-y-2'>
            {/*<div className='w-1/3'>
                <Niveles />
            </div>*/}
            <div className="flex flex-wrap -mx-3 mb-6 form w-full">
                <div className='w-full justify-center items-center p-4'>
                    <p className='text-black font-semibold text-xl'>Asigna a que semestre corresponde una asignatura</p>
                </div>

                {/* Lista desplegable para fk_nivel */}
                <div className="w-full px-3 mb-4">
                    {/* <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="fk_nivel">
                        Semestre
                    </label>*/}
                    <select
                        className="block appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        name="fk_nivel"
                        onChange={handleChange}
                        value={nivelAsignatura.fk_nivel}
                    >
                        <option value="">Seleccionar Semestre</option>
                        {niveles.map((nivel) => (
                            <option key={nivel.id_nivel} value={nivel.id_nivel}>
                                {nivel.nombreNivel}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Lista desplegable para fk_asignatura */}
                <div className="w-full px-3 mb-4">
                    {/*<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="fk_asignatura">
                        Asignatura
                    </label>*/}
                    <select
                        className="block appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        name="fk_asignatura"
                        onChange={handleChange}
                        value={nivelAsignatura.fk_asignatura}
                    >
                        <option value="">Seleccionar Asignatura</option>
                        {asignaturas.map((asignatura) => (
                            <option key={asignatura.id_asignatura} value={asignatura.id_asignatura}>
                                {asignatura.nombreAsignatura}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="w-full px-3 mb-4">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="relacionNombre">
                        Nombre de la Relación
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text"
                        placeholder="Nombre de la relación"
                        onChange={handleChange}
                        name="relacionNombre"
                    />
                    <p className="text-gray-600 text-xs italic">Ingrese el nombre de la relación entre las asignaturas</p>
                </div>

                {/* Botón para agregar */}
                <div className="w-full px-3 mb-4">
                    <button
                        onClick={handleClick}
                        className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                    >
                        Agregar
                    </button>
                </div>
            </div>
        </div>


    );
}

export default AddNivelAsignatura