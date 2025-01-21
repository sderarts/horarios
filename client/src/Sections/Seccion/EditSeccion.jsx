import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

function EditSeccion() {
    const [seccion, setSeccion] = useState({
        nombreSeccion: "",
        capacidad: "",
        inscripciones: ""
    });

    const [error, setError] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const id_seccion = location.pathname.split("/")[2]; // Extrayendo el id de la URL

    // Efecto para cargar los datos de la sección al inicio
    useEffect(() => {
        const fetchSecciones = async () => {
            try {
                const response = await axios.get(`http://localhost:8800/secciones/${id_seccion}`);
                console.log(response.data);  // Verifica los datos que se están recibiendo
                setSeccion(response.data);   // Establece los valores en el estado
            } catch (err) {
                console.log(err);
            }
        };

        fetchSecciones();
    }, [id_seccion]);

    // Manejar el cambio de los inputs
    const handleChange = (e) => {
        setSeccion((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Manejar el clic para actualizar la sección
    const handleClick = async (e) => {
        e.preventDefault();

        // Validación de los campos numéricos antes de enviarlos
        if (seccion.capacidad === "" || isNaN(seccion.capacidad)) {
            alert("Por favor ingresa un valor válido para la capacidad.");
            return;
        }
        if (seccion.inscripciones === "" || isNaN(seccion.inscripciones)) {
            alert("Por favor ingresa un valor válido para las inscripciones.");
            return;
        }

        try {
            await axios.put(`http://localhost:8800/secciones/${id_seccion}`, seccion);
            navigate("/secciones"); // Redirige después de la actualización
        } catch (err) {
            console.log("Error en la actualización:", err.response || err);
            setError(true);
        }
    };

    return (
        <div className="form">
            <h1>Actualizar sección</h1>

            {/* Inputs con valores por defecto extraídos de 'seccion' */}
            <input
                type="text"
                placeholder="Nombre de la sección"
                name="nombreSeccion"
                value={seccion.nombreSeccion}   // Establece el valor de nombreSeccion
                onChange={handleChange}
            />
            <input
                type="number"
                placeholder="Capacidad"
                name="capacidad"
                value={seccion.capacidad}   // Establece el valor de capacidad
                onChange={handleChange}
            />
            <input
                type="number"
                placeholder="Inscripciones"
                name="inscripciones"
                value={seccion.inscripciones}  // Establece el valor de inscripciones
                onChange={handleChange}
            />
            <button onClick={handleClick}>Actualizar</button>
            {error && <p style={{ color: 'red' }}>¡Algo salió mal!</p>}
        </div>
    );
}

export default EditSeccion;
