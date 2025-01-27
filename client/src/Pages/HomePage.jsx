import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios';
import Fondo from '../assets/img/net.png';
import Login2 from '../Sections/User/Login2';
import Navbar from '../Layout/Navbar';
import Options from '../Sections/User/Options';

const Home = () => {
    const { user, loading } = useContext(AuthContext);
    const [shortUid, setShortUid] = useState("");
    const [showOptions, setShowOptions] = useState(false);  // Estado para mostrar u ocultar Options

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                try {
                    const uid = user.uid.substring(0, 28);  // Asegurándonos de que el UID esté en el formato correcto
                    setShortUid(uid);  // Almacenamos el shortUid en el estado

                    const response = await fetch(`http://localhost:8800/auth/checkUser/${uid}`);
                    const data = await response.json();

                    if (data.exists) {
                        console.log("Datos del usuario:", data);  // Verifica qué datos llegan

                        // Verificamos si el usuario tiene rol 2 y mostramos el componente Options
                        if (data.rol === 2) {
                            setShowOptions(true);
                        } else {
                            setShowOptions(false);  // No mostrar Options si no es rol 2
                        }
                    } else {
                        console.log("Usuario no encontrado en la base de datos.");
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    console.log("Error al verificar el usuario.");
                }
            }
        };

        fetchUserData();
    }, [user]);

    return (
        <div className='w-full h-screen'>
            <div className='w-full flex bg-lime-50  justify-center'>
                <img src={Fondo} alt="" className='absolute z-0 w-full h-full' />
                <Navbar />
                {showOptions && <Options />} 
                <div className='flex  flex-col relative p-12 z-100 w-1/2 h-3/5 items-center justify-center mt-24  '>
                    <div className="w-2/3 bg-black">
                        <p className="mb-4 text-5xl font-bold leading-none text-white md:text-5xl lg:text-7xl dark:text-amber-500 tracking-normal text-center">
                            Bienvenido a la plataforma de usuarios
                        </p>
                    </div>
                    
                    <div className='w-full '>
                        <Login2 />
                         {/* Muestra Options si showOptions es true */}
                    </div>
                </div>

                
            </div>


            <div class="bg-white lg:w-6/12 md:7/12 w-8/12 shadow-3xl rounded-xl">

            </div>
        </div>
    );
}

export default Home;
