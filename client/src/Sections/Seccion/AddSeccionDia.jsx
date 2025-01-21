import React, { useState, useEffect } from 'react';
import axios from 'axios';


function AddSeccionDia() {
    const [seccionDia, setSeccionDia] = useState({
        id_seccion_dia: "",
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
                placeholder='ID seccionDia'
                onChange={handleChange}
                name='id_seccion_dia'
            />
            <input
                type="text"
                placeholder='Nombre de la relación'
                onChange={handleChange}
                name='nombreRelacion'
            />

            {/* Lista desplegable para fk_seccion */}
            <select
                name="fk_seccion"
                onChange={handleChange}
                value={seccionDia.fk_seccion}
            >
                <option value="">Seleccionar sección</option>
                {secciones.map(seccion => (
                    <option key={seccion.id_seccion} value={seccion.id_seccion}>
                        {seccion.nombreSeccion} {/* Ajusta esto según la propiedad del objeto `dia` */}
                    </option>
                ))}
            </select>

            {/* Lista desplegable para fk_dia */}
            <select
                name="fk_dia"
                onChange={handleChange}
                value={seccionDia.fk_dia}
            >
                <option value="">Seleccionar día</option>
                {dias.map(dia => (
                    <option key={dia.id_dia} value={dia.id_dia}>
                        {dia.nombreDia} {/* Ajusta esto según la propiedad del objeto `bloque` */}
                    </option>
                ))}
            </select>

            <button onClick={handleClick}>Agregar Sección-Día</button>
        </div>
    );
}

export default AddSeccionDia;