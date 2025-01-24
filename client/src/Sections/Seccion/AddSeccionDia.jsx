import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

function AddSeccionDia() {

    const navigate = useNavigate();
    const [seccionDia, setSeccionDia] = useState({
        nombreRelacion: "",
        fk_seccion: "",
        fk_dia: ""
    });

    // Estado para las listas de FK
    const [secciones, setSecciones] = useState([]);
    const [dias, setDias] = useState([]);

    // Traer las listas de fk_seccion y fk_dia al cargar el componente
    useEffect(() => {
        const fetchSecciones = async () => {
            try {
                const response = await axios.get("http://localhost:8800/secciones");
                setSecciones(response.data); // Suponiendo que la respuesta es un array de días
            } catch (error) {
                console.error("Error al obtener los días", error);
            }
        };

        const fetchDias = async () => {
            try {
                const response = await axios.get("http://localhost:8800/dias");
                setDias(response.data); // Suponiendo que la respuesta es un array de dias
            } catch (error) {
                console.error("Error al obtener los dias", error);
            }
        };

        fetchSecciones();
        fetchDias();
    }, []);

    const handleChange = (e) => {
        setSeccionDia((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8800/seccion_dias", seccionDia);
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
        <div className="p-12 bg-amber-400">
            <div className="flex flex-wrap -mx-3 mb-6 form w-1/2">
                {/* Input para Nombre de la Relación */}
                <div className="w-full px-3 mb-4">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="nombreRelacion">
                        Nombre de la Relación
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text"
                        placeholder="Nombre de la relación"
                        onChange={handleChange}
                        name="nombreRelacion"
                    />
                    <p className="text-gray-600 text-xs italic">Ingrese el nombre de la relación</p>
                </div>

                {/* Lista desplegable para fk_seccion */}
                <div className="w-full px-3 mb-4">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="fk_seccion">
                        Sección
                    </label>
                    <select
                        className="block appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        name="fk_seccion"
                        onChange={handleChange}
                        value={seccionDia.fk_seccion}
                    >
                        <option value="">Seleccionar sección</option>
                        {secciones.map((seccion) => (
                            <option key={seccion.id_seccion} value={seccion.id_seccion}>
                                {seccion.nombreSeccion}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Lista desplegable para fk_dia */}
                <div className="w-full px-3 mb-4">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="fk_dia">
                        Día
                    </label>
                    <select
                        className="block appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        name="fk_dia"
                        onChange={handleChange}
                        value={seccionDia.fk_dia}
                    >
                        <option value="">Seleccionar día</option>
                        {dias.map((dia) => (
                            <option key={dia.id_dia} value={dia.id_dia}>
                                {dia.nombreDia}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Botón para agregar Sección-Día */}
                <div className="w-full px-3 mb-4">
                    <button
                        onClick={handleClick}
                        className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                    >
                        Agregar Sección-Día
                    </button>
                </div>
            </div>

        </div>
    );
}

export default AddSeccionDia;