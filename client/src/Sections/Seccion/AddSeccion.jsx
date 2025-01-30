import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddSeccion() {

    const navigate = useNavigate();
    const [seccion, setSeccion] = useState({
        nombreSeccion: "",
        capacidad: "",
        inscripciones: ""
    })

    const handleChange = (e) => {
        setSeccion((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async e => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8800/secciones", seccion);
            console.log("Response:", response.data);
            navigate(0)
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
        <div>

            {/* <input type="number" placeholder='0' onChange={handleChange} name='id_seccion' />
            <input type="text" placeholder='Nombre sección' onChange={handleChange} name='nombreSeccion' />
            <input type="number" placeholder='Capacidad' onChange={handleChange} name='capacidad' />
            <input type="number" placeholder='Inscripciones' onChange={handleChange} name='inscripciones' />
            <button onClick={handleClick}>Add Nivel</button> */}

            <div className='px-12 bg-amber-400'>
                <div className='w-full justify-center items-center py-4'>
                    <p className='text-black font-semibold text-xl'>Crear una Sección</p>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6 form w-1/2">

                    <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                            Siglas Sección
                        </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder='Siglas sección' onChange={handleChange} name='nombreSeccion' />

                    </div>
                    <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                            Capacidad
                        </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="number" placeholder='Capacidad' onChange={handleChange} name='capacidad' />

                    </div>
                    <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                            Inscripciones
                        </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="number" placeholder='Inscripciones' onChange={handleChange} name='inscripciones' />

                    </div>
                    <div className="w-full px-3 mb-4"><button onClick={handleClick} className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded">Crear</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddSeccion