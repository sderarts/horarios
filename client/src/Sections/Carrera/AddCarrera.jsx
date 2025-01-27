import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

function AddCarrera() {

    const navigate = useNavigate();
    const [carrera, setCarrera] = useState({

        nombreCarrera: ""
    })

    const handleChange = (e) => {
        setCarrera((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async e => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8800/carreras", carrera)
            console.log(carrera);
            navigate(0)
        } catch (error) {
            console.error("Error al hacer la solicitud:", error);
        }
    };

    return (
        <div className=''>
            <div className='p-24 bg-amber-400'>
                <div class="flex flex-wrap -mx-3 mb-6 form">
                    <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                            Nombre carrera
                        </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder='Carrera' onChange={handleChange} name='nombreCarrera' />
                        <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
                    </div>
                    <button onClick={handleClick} className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded">Agregar</button>
                </div>
            </div>
        </div>
    )
}

export default AddCarrera