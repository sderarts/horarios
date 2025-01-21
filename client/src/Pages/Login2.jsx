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
        if (user) {
            // Si ya está autenticado, verificamos en la base de datos si es un alumno o académico
            const checkUserInDatabase = async (uid) => {
                try {
                    const response = await fetch(`http://localhost:8800/auth/checkUser/${uid}`);
                    if (response.ok) {
                        const data = await response.json();  // Asegúrate de que la respuesta sea JSON
                        console.log(data);
                        if (data.exists) {
                            // Usuario encontrado, redirigir según el rol
                            if (data.rol === 2) {
                                navigate('/register');  // Redirigir a registro para alumno
                            } else {
                                // Usuario es académico, continuar sin redirigir
                                navigate('/');
                            }
                        } else {
                            console.log('Usuario no encontrado');
                        }
                    } else {
                        console.error('Error en la respuesta del servidor', await response.text());
                    }
                } catch (error) {
                    console.error('Error al verificar el usuario:', error);
                }
            };
            console.log('Usuario:', user)
            checkUserInDatabase();
        } else {
            setIsLoading(false);  // Si el usuario es null, solo cambia el estado de carga
        }
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
