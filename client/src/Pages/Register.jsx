import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../firebase';  // Importa la configuración de Firebase

const FormularioRegistro = () => {
    const [uid, setUid] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [rol, setRol] = useState(2);  // Rol de usuario (2 para alumno)
    const [carreras, setCarreras] = useState([]);
    const [niveles, setNiveles] = useState([]);
    const [carreraSeleccionada, setCarreraSeleccionada] = useState('');
    const [nivelSeleccionado, setNivelSeleccionado] = useState('');

    // Cargar datos del usuario autenticado
    useEffect(() => {
        const currentUser = auth.currentUser;

        if (currentUser) {
            // Si hay un usuario autenticado, establece los valores
            setUid(currentUser.uid.substring(0, 200));  // Limitar la UID a 200 caracteres
            setEmail(currentUser.email);
            setFirstName(currentUser.displayName.split(' ')[0] || '');
            setLastName(currentUser.displayName.split(' ')[1] || '');
        }
    }, []);  // Ejecuta una vez cuando el componente se monta

    // Cargar las carreras y niveles
    useEffect(() => {
        const fetchCarreras = async () => {
            try {
                const response = await axios.get('http://localhost:8800/carreras');
                setCarreras(response.data);
            } catch (error) {
                console.error("Error al cargar las carreras:", error);
            }
        };

        const fetchNiveles = async () => {
            try {
                const response = await axios.get('http://localhost:8800/nivel_asignaturas');
                setNiveles(response.data);
            } catch (error) {
                console.error("Error al cargar los niveles:", error);
            }
        };

        fetchCarreras();
        fetchNiveles();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Verificar si los campos esenciales están completos
        if (!uid || !email || !firstName || !lastName) {
            console.error('Campos incompletos');
            return;
        }

        // Obtener el idToken desde Firebase Auth
        auth.currentUser.getIdToken(true) // `true` para forzar la obtención de un nuevo token si ya ha expirado
            .then((idToken) => {
                // Datos a enviar
                const dataToSend = {
                    idToken,  // Incluye el idToken
                    email,  // Correo del usuario
                    firstName,  // Nombre del usuario
                    lastName,  // Apellido del usuario
                    carreraSeleccionada,  // Carrera seleccionada
                    nivelSeleccionado,  // Nivel seleccionado
                    rol,  // Rol del usuario (alumno o académico)
                    uid // UID limitado a 200 caracteres
                };

                // Enviar los datos al backend
                axios.post('http://localhost:8800/auth/register', dataToSend)
                    .then((response) => {
                        console.log('Usuario registrado con éxito:', response.data);
                    })
                    .catch((error) => {
                        console.error('Error al registrar el usuario:', error.response ? error.response.data : error.message);
                    });
            })
            .catch((error) => {
                console.error('Error al obtener el idToken:', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Correo electrónico</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled
                />
            </div>
            <div>
                <label>Nombre</label>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Apellido</label>
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
            </div>
            {rol === 2 && (  // Si el rol es "alumno", mostrar las opciones de carrera y nivel
                <div>
                    <label>Selecciona tu carrera</label>
                    <select
                        value={carreraSeleccionada}
                        onChange={(e) => setCarreraSeleccionada(e.target.value)}
                    >
                        <option value="">Selecciona una carrera</option>
                        {carreras.map((carrera) => (
                            <option key={carrera.id_carrera} value={carrera.id_carrera}>
                                {carrera.nombreCarrera}
                            </option>
                        ))}
                    </select>

                    <label>Selecciona tu nivel</label>
                    <select
                        value={nivelSeleccionado}
                        onChange={(e) => setNivelSeleccionado(e.target.value)}
                    >
                        <option value="">Selecciona un nivel</option>
                        {niveles.map((nivel) => (
                            <option key={nivel.id_nivel_carrera} value={nivel.id_nivel_carrera}>
                                {nivel.relacionNombre}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            <button type="submit">Registrar</button>
        </form>
    );
};

export default FormularioRegistro;
