import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

function Edit() {
    const [carrera, setCarrera] = useState({
        nombreCarrera: ""
    });
    const [error, setError] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const id_carrera = location.pathname.split("/")[2]; // Extracting the id from the URL

    useEffect(() => {
        // Fetching the data for the selected carrera to populate the form
        const fetchCarrera = async () => {
            try {
                const response = await axios.get(`http://localhost:8800/carreras/${id_carrera}`);
                setCarrera(response.data); // Assuming the data returned has 'nombreCarrera'
            } catch (err) {
                console.log(err);
            }
        };

        fetchCarrera();
    }, [id_carrera]);

    const handleChange = (e) => {
        setCarrera((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:8800/carreras/${id_carrera}`, carrera);
            navigate("/carreras"); // Redirecting to the carreras list page after update
        } catch (err) {
            console.log(err);
            setError(true);
        }
    };

    return (
        <div className="form">
            <h1>Actualizar carrera</h1>
            {/* Removed ID input field because it's already in the URL */}
            <input
                type="text"
                placeholder="Nombre de la carrera"
                name="nombreCarrera"
                value={carrera.nombreCarrera}
                onChange={handleChange}
            />
            <button onClick={handleClick}>Actualizar</button>
            {error && <p style={{ color: 'red' }}>¡Algo salió mal!</p>}
        </div>
    );
}

export default Edit;
