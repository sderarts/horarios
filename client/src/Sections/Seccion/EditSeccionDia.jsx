import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

export default function EditSeccionDia() {
    const [seccionDia, setSeccionDia] = useState({
        nombreRelacion: "",
        fk_seccion: "",
        fk_dia: ""
    });

    const [error, setError] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const id_seccion_dia = location.pathname.split("/")[2]; // Extrayendo el id de la URL

    // Efecto para cargar los datos de la sección al inicio
    useEffect(() => {
        const fetchSeccionesDias = async () => {
            try {
                const response = await axios.get(`http://localhost:8800/seccion_dias/${id_seccion_dia}`);
                console.log(response.data);  // Verifica los datos que se están recibiendo
                setSeccionDia(response.data);   // Establece los valores en el estado
            } catch (err) {
                console.log(err);
            }
        };

        fetchSeccionesDias();
    }, [id_seccion_dia]);

    // Manejar el cambio de los inputs
    const handleChange = (e) => {
        setSeccionDia((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Manejar el clic para actualizar la sección
    const handleClick = async (e) => {
        e.preventDefault();

        // Validación de los campos numéricos antes de enviarlos
        if (seccionDia.fk_Dia === "" || isNaN(seccionDia.fk_seccion)) {
            alert("Por favor ingresa un valor válido para la fk_seccion.");
            return;
        }
        if (seccionDia.fk_dia === "" || isNaN(seccionDia.fk_dia)) {
            alert("Por favor ingresa un valor válido para las fk_dia.");
            return;
        }

        try {
            await axios.put(`http://localhost:8800/seccion_dias/${id_seccion_dia}`, seccionDia);
            navigate("/secciones_dias"); // Redirige después de la actualización
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
                placeholder="Nombre relacion"
                name="nombreRelacion"
                value={seccionDia.nombreRelacion}   // Establece el valor de nombreSeccion
                onChange={handleChange}
            />
            <input
                type="number"
                placeholder="fk_seccion"
                name="fk_seccion"
                value={seccionDia.fk_seccion}   // Establece el valor de fk_seccion
                onChange={handleChange}
            />
            <input
                type="number"
                placeholder="fk_dia"
                name="fk_dia"
                value={seccionDia.fk_dia}  // Establece el valor de fk_dia
                onChange={handleChange}
            />
            <button onClick={handleClick}>Actualizar</button>
            {error && <p style={{ color: 'red' }}>¡Algo salió mal!</p>}
        </div>
    );
}
