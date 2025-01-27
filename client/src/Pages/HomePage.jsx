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
        <div className='w-full h-screen flex'>
            <div className='w-full h-screen bg-lime-50'>
                <img src={Fondo} alt="" className='absolute z-0 w-full h-full' />
                <Navbar />
                <div className='relative p-12 z-100 w-full'>
                    <p className="mb-4 text-5xl font-extrabold leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-amber-500 tracking-normal">
                        Bienvenido a la plataforma de usuarios
                    </p>
                    <div className='w-full grid grid-cols-2 gap-4'>
                        <Login2 />
                        {showOptions && <Options />}  {/* Muestra Options si showOptions es true */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
