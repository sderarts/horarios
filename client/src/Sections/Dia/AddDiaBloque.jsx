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
        <div className='form'>
            <input
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

            {/* Lista desplegable para fk_dia */}
            <select
                name="fk_dia"
                onChange={handleChange}
                value={diaBloque.fk_dia}
            >
                <option value="">Seleccionar Día</option>
                {dias.map(dia => (
                    <option key={dia.id_dia} value={dia.id_dia}>
                        {dia.nombreDia} {/* Ajusta esto según la propiedad del objeto `dia` */}
                    </option>
                ))}
            </select>

            {/* Lista desplegable para fk_bloque */}
            <select
                name="fk_bloque"
                onChange={handleChange}
                value={diaBloque.fk_bloque}
            >
                <option value="">Seleccionar Bloque</option>
                {bloques.map(bloque => (
                    <option key={bloque.id_bloque} value={bloque.id_bloque}>
                        {bloque.nombreBloqueHora} {/* Ajusta esto según la propiedad del objeto `bloque` */}
                    </option>
                ))}
            </select>

            <button onClick={handleClick}>Agregar Día-Bloque</button>
        </div>
    );
}

export default AddDiaBloque;
