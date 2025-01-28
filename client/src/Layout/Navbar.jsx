import React, { useEffect, useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from '../Context/AuthContext';

function Navbar() {
    const { user, loading } = useContext(AuthContext);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                try {
                    const uid = user.uid.substring(0, 28); // Asegurándonos de que el UID esté en el formato correcto

                    // Suponemos que el backend responde con el rol del usuario
                    const response = await fetch(`http://localhost:8800/auth/checkUser/${uid}`);
                    const data = await response.json();

                    if (data.exists) {
                        setUserRole(data.rol); // Guardamos el rol del usuario
                    } else {
                        console.log("Usuario no encontrado.");
                    }
                } catch (error) {
                    console.error('Error al obtener los datos del usuario', error);
                }
            }
        };

        fetchUserData();
    }, [user]);

    // Si el usuario no está autenticado, mostramos un mensaje o podemos redirigir
    if (loading) return <div>Loading...</div>;
    if (!user) return null;

    return (


        <nav class="bg-white dark:bg-gray-900 fixed w-1/2 z-20 top-0 start-2 border-b border-gray-200 dark:border-gray-600 rounded-xl">
            <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">

                {/* Aquí agregamos una opción diferente si el rol es alumno o académico */}
                {userRole === 1 && (
                    <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 ml-4">
                        <li>
                            <Link to={`/`} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to={`/carreras`} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                                Carreras
                            </Link>
                        </li>
                        <li>
                            <Link to={`/asignaturas`} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                                Asignaturas
                            </Link>
                        </li>
                        <li>
                            <Link to={`/bloques`} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                                Bloques
                            </Link>
                        </li>
                        <li>
                            <Link to={`/solicitudes_academico`} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                                Solicitudes
                            </Link>
                        </li>
                    </ul>
                )}
                {userRole === 2 && (
                    <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 ml-4">
                        <li>
                            <Link to={`/`} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to={`/alumno`} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                                Portal
                            </Link>
                        </li>
                        <li>
                            <Link to={`/solicitudes`} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                                Intercambios
                            </Link>
                        </li>
                        <li>
                            <Link to={`/add_solicitud`} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                                Solicitudes
                            </Link>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
