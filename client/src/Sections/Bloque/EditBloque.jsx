import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

function EditBloque() {
    const [bloque, setBloque] = useState({
        nombreBloqueHora: ""
    });
    const [error, setError] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const id_bloque = location.pathname.split("/")[2]; // Extracting the id from the URL

    useEffect(() => {
        // Fetching the data for the selected carrera to populate the form
        const fetchBloque = async () => {
            try {
                const response = await axios.get(`http://localhost:8800/bloques/${id_bloque}`);
                setBloque(response.data); // Assuming the data returned has 'nombreCarrera'
            } catch (err) {
                console.log(err);
            }
        };

        fetchBloque();
    }, [id_bloque]);

    const handleChange = (e) => {
        setBloque((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:8800/bloques/${id_bloque}`, bloque);
            navigate("/bloques"); // Redirecting to the carreras list page after update
        } catch (err) {
            console.log(err);
            setError(true);
        }
    };

    return (
        <div className="form">
            <h1>Actualizar Bloque</h1>
            <input
                type="text"
                placeholder="Nombre bloque"
                name="nombreBloqueHora"
                value={bloque.nombreBloqueHora}
                onChange={handleChange}
            />
            <button onClick={handleClick}>Actualizar</button>
            {error && <p style={{ color: 'red' }}>¡Algo salió mal!</p>}
        </div>
    );
}
export default EditBloque