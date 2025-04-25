import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Niveles from '../Nivel/Niveles';
import { useNavigate } from 'react-router';


function AddNivelAsignatura() {

    const navigate = useNavigate();
    const [nivelAsignatura, setNivelAsignatura] = useState({
        relacionnombre: "",
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
                setNiveles(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error("Error al obtener los Asignaturas", error);
            }
        };

        const fetchAsignaturas = async () => {
            try {
                const response = await axios.get("http://localhost:8800/asignaturas/secciones");
                setAsignaturas(Array.isArray(response.data) ? response.data : []);
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
        <div >
            <div >
                <div className='w-full justify-center items-center p-4'>
                    <p className='text-black font-semibold text-xl'>Asigna a que semestre corresponde una asignatura</p>
                </div>

                {/* Lista desplegable para fk_nivel */}
                {/* Select para el semestre */}
            <div className="w-full px-3 mb-4">
                <select
                    className="block appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    name="fk_nivel"
                    onChange={handleChange}
                    value={nivelAsignatura.fk_nivel}
                >
                    <option value="">Seleccionar Semestre</option>
                    {Array.isArray(niveles) && niveles.length > 0 ? (
                        niveles.map((nivel) => (
                            <option key={nivel.id_nivel} value={nivel.id_nivel}>
                                {nivel.nombrenivel}
                            </option>
                        ))
                    ) : (
                        <option disabled>No hay semestres disponibles</option>
                    )}
                </select>
            </div>

            {/* Select para la asignatura */}
            <div className="w-full px-3 mb-4">
                <select
                    className="block appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    name="fk_asignatura"
                    onChange={handleChange}
                    value={nivelAsignatura.fk_asignatura}
                >
                    <option value="">Seleccionar Asignatura</option>
                    {Array.isArray(asignaturas) && asignaturas.length > 0 ? (
                        asignaturas.map((asignatura) => (
                            <option key={asignatura.id_asignatura} value={asignatura.id_asignatura}>
                                {asignatura.nombreasignatura}
                            </option>
                        ))
                    ) : (
                        <option disabled>No hay asignaturas disponibles</option>
                    )}
                </select>
            </div>


                <div className="w-full px-3 mb-4">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="relacionnombre">
                        Nombre de la Relación
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text"
                        placeholder="Nombre de la relación"
                        onChange={handleChange}
                        name="relacionnombre"
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