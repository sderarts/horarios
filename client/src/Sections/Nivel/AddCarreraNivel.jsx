import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddCarreraNivel() {
    const [carreraNivel, setCarreraNivel] = useState({
        relacionNombre: "",
        fk_carrera: "",
        fk_nivel: ""
    });

    // Estado para las listas de FK
    const [carreras, setCarreras] = useState([]);
    const [niveles, setNiveles] = useState([]);

    // Traer las listas de fk_carrera y fk_nivel al cargar el componente
    useEffect(() => {
        const fetchcarreras = async () => {
            try {
                const response = await axios.get("http://localhost:8800/carreras");
                setCarreras(response.data); // Suponiendo que la respuesta es un array de días
            } catch (error) {
                console.error("Error al obtener las carreras", error);
            }
        };

        const fetchniveles = async () => {
            try {
                const response = await axios.get("http://localhost:8800/niveles");
                setNiveles(response.data); // Suponiendo que la respuesta es un array de niveles
            } catch (error) {
                console.error("Error al obtener los niveles", error);
            }
        };

        fetchcarreras();
        fetchniveles();
    }, []);

    const handleChange = (e) => {
        setCarreraNivel((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8800/carrera_niveles", carreraNivel);
            console.log("Response:", response.data);
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
        <div className="px-24 pb-24  w-3/4 h-5/6">
            <div className="w-full justify-center items-center p-4">
                <p className='text-black font-semibold text-xl'>Agrega los niveles por carrera</p>
            </div>
            <div className="flex flex-wrap mb-6 form px-3">
                {/* Lista desplegable para 'fk_carrera' */}
                <div className="w-full mb-4">
                    <select
                        name="fk_carrera"
                        onChange={handleChange}
                        value={carreraNivel.fk_carrera}
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    >
                        <option value="">Carrera</option>
                        {carreras.map(carrera => (
                            <option key={carrera.id_carrera} value={carrera.id_carrera}>
                                {carrera.nombreCarrera}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Lista desplegable para 'fk_nivel' */}
                <div className="w-full mb-4">
                    <select
                        name="fk_nivel"
                        onChange={handleChange}
                        value={carreraNivel.fk_nivel}
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    >
                        <option value="">Nivel</option>
                        {niveles.map(nivel => (
                            <option key={nivel.id_nivel} value={nivel.id_nivel}>
                                {nivel.nombreNivel}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Campo de texto para 'relacionNombre' */}
                <div className="w-full mb-4">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="relacionNombre">
                        Nombre de la relación
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text"
                        placeholder="Nombre de la relación"
                        onChange={handleChange}
                        name="relacionNombre"
                    />
                </div>



                {/* Botón de Agregar */}
                <div className="w-full flex justify-start items-start">
                    <button
                        onClick={handleClick}
                        className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                    >
                        Agregar Carrera-Nivel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddCarreraNivel;
