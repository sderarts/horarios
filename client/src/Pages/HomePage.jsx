import React, { useState } from 'react';
import { Link } from "react-router";
import axios from 'axios';

const Home = () => {


    return (
        <div className='bg-black w-full h-screen'>
            <div className='w-full h-screen bg-lime-50'>
                <div className='p-12'>
                    <h1 className='text-5xl'>Bienvenido a la Plataforma de Horarios!</h1>
                    <ul className='space-y-2 mt-4'>
                        <li className='text-2xl text-green-600'><Link to={`/carreras`}>-CARRERAS</Link></li>
                        <li className='text-2xl text-green-600'><Link to={`/asignaturas`}>-ASIGNATURAS</Link></li>
                        <li className='text-2xl text-green-600'><Link to={`/bloques`}>-BLOQUES</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Home