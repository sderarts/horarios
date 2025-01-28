import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Login from './Login';

function Login2() {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkUserStatus = async () => {
            if (user) {
                setIsLoading(true);
                try {
                    // Asignamos el rol por defecto
                    const userEmail = user.email || '';
                    let userRole = 2;  // Rol por defecto es alumno
                    if (userEmail.includes('@duocuc.cl')) {
                        userRole = 1;  // Si el correo termina en @duocuc.cl, asignamos rol académico
                    }

                    // Verificamos si el usuario ya existe en la base de datos
                    const response = await fetch(`http://localhost:8800/auth/checkUser/${user.uid}`);
                    const data = await response.json();

                    // Si el usuario existe
                    if (data.exists) {
                        // Redirigir al perfil según el rol
                        if (data.rol === 1) {
                            navigate('/'); // Redirigir al perfil de académico
                        } else {
                            navigate('/'); // Redirigir al perfil de alumno
                        }
                    } else {
                        // Si el usuario no existe, redirigir al registro
                        navigate('/register');
                    }
                } catch (error) {
                    console.error('Error al verificar el usuario:', error);
                } finally {
                    setIsLoading(false); // Termina el estado de carga
                }
            } else {
                setIsLoading(false); // Si no hay usuario, termina el estado de carga
            }
        };

        checkUserStatus();
    }, [user, navigate]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            console.log('Sesión cerrada');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    const handleLoginSuccess = async () => {
        // Aquí no necesitamos hacer nada, ya que el useEffect se encargará de manejar la redirección.
    };

    return (
        <div className='w-full flex justify-center h-96'>
            {isLoading ? (

                <div role="status">
                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>

            ) : (
                !user ? (
                    <Login onLoginSuccess={handleLoginSuccess} />
                ) : (
                    <div className='p-12 bg-amber-400 rounded-r-lg'>
                        <p className='className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl "'>
                            Bienvenido, {user.displayName}</p>
                        <p className='className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl "'>
                            Email: {user.email}</p>
                        <button onClick={handleLogout} className='className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-2 px-4 rounded mt-4'>Cerrar sesión</button>
                    </div>
                )
            )}


        </div>
    );
}

export default Login2;
