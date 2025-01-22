import React, { useState } from 'react';
import { Link } from "react-router";
import axios from 'axios';
import Fondo from '../assets/img/net.png'
import Login2 from './Login2';
import Navbar from '../Layout/Navbar';

const Home = () => {


    return (
        <div className='w-full h-screen flex'>
            <div className='w-full h-screen bg-lime-50'>
                <img src={Fondo} alt="" className='absolute z-0 w-full h-full' />
                <Navbar />
                <div className='relative p-12 z-100' >
                    <p className="mb-4 text-5xl font-extrabold leading-none  text-gray-900 md:text-5xl lg:text-6xl dark:text-amber-500 tracking-normal">
                        Bienvenido a la plataforma de usuarios
                    </p>
                    <div>
                        <Login2 />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Home