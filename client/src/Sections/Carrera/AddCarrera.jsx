import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

function AddCarrera() {

    const navigate = useNavigate();
    const [carrera, setCarrera] = useState({

        nombrecarrera: ""
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
        <div>
            <div>
                <div class="flex flex-wrap  mb-6 form px-3">
                    <div class="w-full">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                            Nombre carrera
                        </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder='Carrera' onChange={handleChange} name='nombrecarrera' />
                    </div>
                    <div className="w-full">
                        <button onClick={handleClick} className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded">Agregar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCarrera