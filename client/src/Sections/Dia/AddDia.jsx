import React, { useState } from 'react';
import axios from 'axios';

function AddDia() {

    const [dia, setDia] = useState({
        nombreDia: ""
    })

    const handleChange = (e) => {
        setDia((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async e => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8800/dias", dia);
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
            <input type="text" placeholder='Dia' onChange={handleChange} name='nombreDia' />
            <button onClick={handleClick}>Add Dia</button>
        </div>
    )
}

export default AddDia