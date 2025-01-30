import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios';
import Fondo from '../assets/img/photo.jpg';
import Red from '../assets/img/netpeople.png';
import Login2 from '../Sections/User/Login2';
import Navbar from '../Layout/Navbar';
import Options from '../Sections/User/Options';

const Home = () => {
    const { user, loading } = useContext(AuthContext);
    const [shortUid, setShortUid] = useState("");


    return (
        <div className='w-full h-screen overflow-hidden'>
            <div className='w-full flex bg-lime-50  justify-center'>
                <img src={Fondo} alt="" className='absolute z-0 w-full h-full' />
                <img src={Red} alt="" className='absolute z-0 w-full h-full opacity-20' />
                <Navbar />

                <div className='flex  flex-col relative p-12 z-100 w-1/2 h-3/5 items-center justify-center mt-16  '>
                    <div className="w-4/5 ">
                        <p className="mb-4 text-5xl font-bold leading-none text-white md:text-5xl lg:text-7xl dark:text-amber-400 tracking-normal text-center">
                            Bienvenido a la plataforma de horarios
                        </p>
                    </div>

                    <div className='w-full flex flex-row'>
                        {/* <div className='w-full flex items-start justify start'>
                            {showOptions && <Options />}
                        </div> */}
                        <Login2 />

                    </div>
                </div>


            </div>
        </div>
    );
}

export default Home;
