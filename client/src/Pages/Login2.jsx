import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Login from './Login';

function Login2() {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);  // Estado para manejar la carga

    useEffect(() => {
        // Comprobamos si el usuario está autenticado
        const checkUserStatus = async () => {
            if (user) {
                try {
                    // Iniciar la carga antes de hacer la consulta
                    setIsLoading(true);

                    // Aplicar filtro de rol en el frontend según el dominio del correo
                    const userEmail = user.email || '';
                    let userRole = 2;  // Rol por defecto es alumno
                    if (userEmail.includes('@duocuc.cl')) {
                        userRole = 1;  // Si el correo termina en @duocuc.cl, asignamos rol académico
                    }

                    // Redirigir según el rol asignado
                    if (userRole === 1) {
                        // Si el usuario es académico (rol 1), redirigir al home o página principal
                        navigate('/login2');
                    } else {
                        // Si es alumno (rol 2), redirigir al formulario de registro
                        navigate('/register');
                    }
                } catch (error) {
                    console.error('Error al verificar el usuario:', error);
                } finally {
                    // Dejar de mostrar la carga después de la respuesta
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);  // Si no hay usuario, se termina el estado de carga
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
        // Aquí no necesitamos hacer nada, el useEffect se encargará de manejar el redireccionamiento
    };

    return (
        <div>
            {isLoading ? (  // Muestra un mensaje de carga si el estado es loading
                <p>Cargando...</p>
            ) : (
                !user ? (
                    <Login onLoginSuccess={handleLoginSuccess} />
                ) : (
                    <div>
                        <h2>Bienvenido, {user.displayName}</h2>
                        <p>Email: {user.email}</p>
                        <button onClick={handleLogout}>Cerrar sesión</button>
                    </div>
                )
            )}
        </div>
    );
}

export default Login2;
