import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

function AddAsignatura() {

    const navigate = useNavigate();
    const [asignatura, setAsignatura] = useState({
        nombreasignatura: ""
    })

    const handleChange = (e) => {
        setAsignatura((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async e => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8800/asignaturas", asignatura)
            console.log(asignatura);
            navigate(0)
        } catch (error) {
            console.error("Error al hacer la solicitud:", error);
        }
    };

    return (
        <div>
            <div className="w-full justify-center items-center py-4">
                <p className='text-black font-semibold text-xl'>Registrar asignatura</p>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6 form w-full">
                <div class="w-full px-3">
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder='Asignatura NO Sección' onChange={handleChange} name='nombreasignatura' />

                </div>
                <div className="w-full px-3 mb-4">
                    <button onClick={handleClick} className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded">Crear</button>
                </div>
            </div>
        </div>
    )
}

export default AddAsignatura