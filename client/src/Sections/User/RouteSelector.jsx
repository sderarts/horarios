import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import FormularioAlumno from './RegisterAlumno';
import FormularioAcademico from './RegisterAcademico';
import { useNavigate } from 'react-router-dom';

const Selector = () => {
    const [tipoFormulario, setTipoFormulario] = useState(null);
    const [isChecking, setIsChecking] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUserExists = async () => {
            const user = auth.currentUser;

            if (user && user.email) {
                try {
                    // Verificamos si el usuario ya está registrado
                    const response = await fetch(`http://localhost:8800/auth/checkUser/${user.uid}`);
                    const data = await response.json();

                    if (data.exists) {
                        // Si el usuario ya existe, lo redirigimos al home
                        navigate('/');
                        return;
                    }

                    // Determinamos el tipo de usuario según su correo
                    const esAcademico = user.email.includes('@duocuc.cl') || user.email.includes('@duoc.cl') || user.email.includes('@profesor.duoc.cl');
                    setTipoFormulario(esAcademico ? 'academico' : 'alumno');
                } catch (error) {
                    console.error('Error al verificar si el usuario ya existe:', error);
                } finally {
                    setIsChecking(false);
                }
            } else {
                setIsChecking(false);
            }
        };

        checkUserExists();
    }, [navigate]);

    if (isChecking) {
        return <p>Verificando información del usuario...</p>;
    }

    if (tipoFormulario === 'academico') return <FormularioAcademico />;
    if (tipoFormulario === 'alumno') return <FormularioAlumno />;

    return <p>Cargando formulario...</p>;
};

export default Selector;