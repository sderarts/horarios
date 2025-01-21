import React, { useState } from 'react';
import axios from 'axios';

function AddBloque() {

    const [bloque, setBloque] = useState({
        id_bloque: "",
        nombreBloqueHora: ""
    })

    const handleChange = (e) => {
        setBloque((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async e => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8800/bloques", bloque)
            console.log(bloque);
        } catch (error) {
            console.error("Error al hacer la solicitud:", error);
        }
    };

    return (
        <div className='form'>
            <input type="number" placeholder='0' onChange={handleChange} name='id_bloque' />
            <input type="text" placeholder='Nombre Bloque' onChange={handleChange} name='nombreBloqueHora' />
            <button onClick={handleClick}>Add</button>
        </div>
    )
}
export default AddBloque