import React, { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

function Login({ onLoginSuccess }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            setUser(user);

            // Hacer la solicitud al servidor para verificar si el usuario existe
            const response = await fetch(`http://localhost:8800/auth/checkUser/${user.uid}`);

            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }

            // Parsear la respuesta JSON
            const data = await response.json();

            // Verificar si el usuario existe
            if (data.exists) {
                console.log("Usuario encontrado, continuando...");
                onLoginSuccess(); // Aquí haces lo que sea necesario, como redirigir al home
            } else {
                console.log("Usuario no encontrado, redirigiendo al registro");
                navigate('/register'); // Redirige a la página de registro si no existe
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };



    return (
        <div>
            <h1>Login</h1>
            <button onClick={handleGoogleLogin}>Login with Google</button>
        </div>
    );
}

export default Login;
