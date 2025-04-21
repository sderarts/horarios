import React, { useState } from 'react';
import axios from 'axios';

function AddNivel() {

    const [nivel, setNivel] = useState({
        nombrenivel: ""
    })

    const handleChange = (e) => {
        setNivel((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async e => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8800/niveles", nivel);
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
            <input type="text" placeholder='Nivel' onChange={handleChange} name='nombrenivel' />
            <button onClick={handleClick}>Add Nivel</button>
        </div>
    )
}

export default AddNivel