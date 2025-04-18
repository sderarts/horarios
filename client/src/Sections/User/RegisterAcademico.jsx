import React, { useEffect, useState, useContext } from 'react';
import { auth } from '../../firebase';
import axios from 'axios';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

const FormularioAcademico = () => {
    const { user, setUser } = useContext(AuthContext);
    const [uid, setUid] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            setUid(currentUser.uid.substring(0, 200));
            setEmail(currentUser.email);

            const nameParts = currentUser.displayName ? currentUser.displayName.split(' ') : [];
            setFirstName(nameParts[0] || '');
            setLastName(nameParts[1] || 'Desconocido');
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const idToken = await auth.currentUser.getIdToken(true);

            const dataToSend = {
                idToken,
                email,
                firstName,
                lastName,
                rol: 1, // académico
                uid,
            };

            const response = await axios.post('http://localhost:8800/auth/register', dataToSend);
            console.log('Usuario académico registrado:', response.data);
            navigate('/');
        } catch (error) {
            console.error('Error al registrar académico:', error);
            navigate('/');
        }
    };

    const handleLogout = () => {
        if (user) {
            signOut(auth)
                .then(() => {
                    setUser(null);
                    localStorage.clear();
                    sessionStorage.clear();
                    navigate('/');
                })
                .catch((error) => {
                    console.error("Error al cerrar sesión:", error);
                });
        } else {
            console.warn("No hay usuario activo.");
            navigate('/');
        }
    };

    return (
        <div className="p-12">
            <form onSubmit={handleSubmit} className="w-1/2 mx-auto">
                <div className="mb-4">
                    <label>Correo electrónico</label>
                    <input type="email" value={email} disabled className="w-full" />
                </div>
                <div className="mb-4">
                    <label>Nombre</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full" />
                </div>
                <div className="mb-4">
                    <label>Apellido</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full" />
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Registrar</button>
                <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded ml-4">Salir</button>
            </form>
        </div>
    );
};

export default FormularioAcademico;
