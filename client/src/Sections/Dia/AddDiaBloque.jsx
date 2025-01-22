import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddDiaBloque() {
    // Estado para el formulario
    const [diaBloque, setDiaBloque] = useState({
        id_dia_bloque: "",
        nombreRelacion: "",
        fk_dia: "",
        fk_bloque: ""
    });

    // Estado para las listas de FK
    const [dias, setDias] = useState([]);
    const [bloques, setBloques] = useState([]);

    // Traer las listas de fk_dia y fk_bloque al cargar el componente
    useEffect(() => {
        const fetchDias = async () => {
            try {
                const response = await axios.get("http://localhost:8800/dias");
                setDias(response.data); // Suponiendo que la respuesta es un array de días
            } catch (error) {
                console.error("Error al obtener los días", error);
            }
        };

        const fetchBloques = async () => {
            try {
                const response = await axios.get("http://localhost:8800/bloques");
                setBloques(response.data); // Suponiendo que la respuesta es un array de bloques
            } catch (error) {
                console.error("Error al obtener los bloques", error);
            }
        };

        fetchDias();
        fetchBloques();
    }, []);

    const handleChange = (e) => {
        setDiaBloque((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8800/dia_bloques", diaBloque);
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
        <div className='p-12 bg-amber-400'>
            {/* <input
                type="number"
                placeholder='ID DiaBloque'
                onChange={handleChange}
                name='id_dia_bloque'
            />
            <input
                type="text"
                placeholder='Nombre de la relación'
                onChange={handleChange}
                name='nombreRelacion'
            />

            <select
                name="fk_dia"
                onChange={handleChange}
                value={diaBloque.fk_dia}
            >
                <option value="">Seleccionar Día</option>
                {dias.map(dia => (
                    <option key={dia.id_dia} value={dia.id_dia}>
                        {dia.nombreDia} 
                    </option>
                ))}
            </select>

            <select
                name="fk_bloque"
                onChange={handleChange}
                value={diaBloque.fk_bloque}
            >
                <option value="">Seleccionar Bloque</option>
                {bloques.map(bloque => (
                    <option key={bloque.id_bloque} value={bloque.id_bloque}>
                        {bloque.nombreBloqueHora}
                    </option>
                ))}
            </select>

            <button onClick={handleClick}>Agregar Día-Bloque</button> */}

            <div className="flex flex-wrap -mx-3 mb-6 form w-1/2">
                {/* Input para ID DiaBloque */}
                <div className="w-full px-3 mb-4">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="id_dia_bloque">
                        ID Día Bloque
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="number"
                        placeholder="ID Día Bloque"
                        onChange={handleChange}
                        name="id_dia_bloque"
                    />
                    <p className="text-gray-600 text-xs italic">Ingrese un ID único para el Día Bloque</p>
                </div>

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

                {/* Lista desplegable para fk_dia */}
                <div className="w-full px-3 mb-4">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="fk_dia">
                        Día
                    </label>
                    <select
                        className="block appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        name="fk_dia"
                        onChange={handleChange}
                        value={diaBloque.fk_dia}
                    >
                        <option value="">Seleccionar Día</option>
                        {dias.map((dia) => (
                            <option key={dia.id_dia} value={dia.id_dia}>
                                {dia.nombreDia}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Lista desplegable para fk_bloque */}
                <div className="w-full px-3 mb-4">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="fk_bloque">
                        Bloque
                    </label>
                    <select
                        className="block appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        name="fk_bloque"
                        onChange={handleChange}
                        value={diaBloque.fk_bloque}
                    >
                        <option value="">Seleccionar Bloque</option>
                        {bloques.map((bloque) => (
                            <option key={bloque.id_bloque} value={bloque.id_bloque}>
                                {bloque.nombreBloqueHora}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Botón para agregar Día-Bloque */}
                <div className="w-full px-3 mb-4">
                    <button
                        onClick={handleClick}
                        className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                    >
                        Agregar Día-Bloque
                    </button>
                </div>
            </div>

        </div>
    );
}

export default AddDiaBloque;
