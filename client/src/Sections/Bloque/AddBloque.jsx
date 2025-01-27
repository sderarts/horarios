import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddBloque() {

    const navigate = useNavigate();
    const [bloque, setBloque] = useState({
        nombreBloqueHora: ""
    })

    const handleChange = (e) => {
        setBloque((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async e => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8800/bloques", bloque)
            //console.log(bloque);
            navigate(0)

        } catch (error) {
            console.error("Error al hacer la solicitud:", error);
        }
    };

    return (
        <div className='p-12'>
            {/* <input type="number" placeholder='0' onChange={handleChange} name='id_bloque' />
            <input type="text" placeholder='Nombre Bloque' onChange={handleChange} name='nombreBloqueHora' />
            <button onClick={handleClick}>Add</button> */}

            <div class="flex flex-wrap -mx-3 mb-6 form w-full">
                <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                        Extension del bloque
                    </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder='Nombre Bloque' onChange={handleChange} name='nombreBloqueHora' />
                    <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
                </div>
                <div className="w-full px-3 mb-4">
                     <button onClick={handleClick} className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded">Agregar</button>
                </div>
                </div>
        </div>
    )
}
export default AddBloque