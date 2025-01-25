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
        <div className='w-full p-12'>
            {/* Removed ID input field because it's already in the URL */}
            {/* <input
                type="text"
                placeholder="Nombre de la carrera"
                name="nombreCarrera"
                value={carrera.nombreCarrera}
                onChange={handleChange}
            />
            <button onClick={handleClick}>Actualizar</button> */}
            {error && <p style={{ color: 'red' }}>¡Algo salió mal!</p>}
            <div class="flex flex-wrap -mx-3 mb-6 form">
                <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                        Nombre carrera
                    </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text"
                        placeholder="Nombre de la carrera"
                        name="nombreCarrera"
                        value={carrera.nombreCarrera}
                        onChange={handleChange} />
                    <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
                </div>
                <button onClick={handleClick} className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded">Actualizar</button>
            </div>
        </div>
    );
}

export default Edit;
