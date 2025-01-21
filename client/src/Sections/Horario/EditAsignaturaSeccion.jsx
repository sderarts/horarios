import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

function EditAsignaturaSeccion() {
    const [asignaturaSeccion, setAsignaturaSeccion] = useState({
        nombreRelacion: "",
        nombreDocente: "",
        fk_asignatura: "",
        fk_seccion: ""
    });

    const [asignaturas, setAsignaturas] = useState([]); // Estado para asignaturas
    const [secciones, setSecciones] = useState([]); // Estado para secciones
    const [error, setError] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const id_asignatura_seccion = location.pathname.split("/")[2]; // Extrayendo el id de la URL

    // Efecto para cargar los datos de la sección y las listas de asignaturas y secciones
    useEffect(() => {
        const fetchAsignaturaSeccion = async () => {
            try {
                // Obtener los datos de la asignatura-sección y las listas de asignaturas y secciones
                const response = await axios.get(`http://localhost:8800/asignatura_secciones/${id_asignatura_seccion}`);
                const { asignaturaSeccion, asignaturas, secciones } = response.data;

                setAsignaturaSeccion(asignaturaSeccion); // Setear los detalles de la asignatura-sección
                setAsignaturas(asignaturas); // Setear todas las asignaturas
                setSecciones(secciones); // Setear todas las secciones
            } catch (err) {
                console.log(err);
            }
        };

        fetchAsignaturaSeccion();
    }, [id_asignatura_seccion]);

    // Manejar el cambio de los inputs
    const handleChange = (e) => {
        setAsignaturaSeccion((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();

        // Verifica si los campos requeridos están vacíos
        if (!asignaturaSeccion.fk_asignatura || !asignaturaSeccion.fk_seccion) {
            alert("Por favor, selecciona una asignatura y una sección.");
            return;
        }

        try {
            // Realiza la solicitud PUT
            const response = await axios.put(`http://localhost:8800/asignatura_secciones/${id_asignatura_seccion}`, asignaturaSeccion);
            console.log("Respuesta del servidor:", response.data); // Verifica la respuesta
            navigate("/asignatura_secciones"); // Redirige después de la actualización
        } catch (err) {
            // Muestra el error completo
            console.error("Error en la actualización:", err.response ? err.response.data : err.message);
            setError(true); // Cambia el estado de error
        }
    };
    return (
        <div className="form">
            <h1>Actualizar sección</h1>

            {/* Inputs con valores por defecto extraídos de 'asignaturaSeccion' */}
            <input
                type="text"
                placeholder="Nombre relación"
                name="nombreRelacion"
                value={asignaturaSeccion.nombreRelacion}
                onChange={handleChange}
            />
            <input
                type="text"
                placeholder="Nombre docente"
                name="nombreDocente"
                value={asignaturaSeccion.nombreDocente}
                onChange={handleChange}
            />
            <select
                name="fk_asignatura"
                onChange={handleChange}
                value={asignaturaSeccion.fk_asignatura}
            >
                <option value="">Seleccionar asignatura</option>
                {asignaturas.map(asignatura => (
                    <option key={asignatura.id_asignatura} value={asignatura.id_asignatura}>
                        {asignatura.nombreAsignatura}
                    </option>
                ))}
            </select>

            <select
                name="fk_seccion"
                onChange={handleChange}
                value={asignaturaSeccion.fk_seccion}
            >
                <option value="">Seleccionar sección</option>
                {secciones.map(seccion => (
                    <option key={seccion.id_seccion} value={seccion.id_seccion}>
                        {seccion.nombreSeccion}
                    </option>
                ))}
            </select>

            <button onClick={handleClick}>Actualizar</button>
            {error && <p style={{ color: 'red' }}>¡Algo salió mal!</p>}
        </div>
    );
}

export default EditAsignaturaSeccion;
