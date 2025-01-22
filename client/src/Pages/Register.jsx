import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();

    // Cargar datos del usuario autenticado
    useEffect(() => {
        const currentUser = auth.currentUser;

        if (currentUser) {
            setUid(currentUser.uid.substring(0, 200));  // Limitar la UID a 200 caracteres
            setEmail(currentUser.email);

            // Verificar y dividir el displayName
            const nameParts = currentUser.displayName ? currentUser.displayName.split(' ') : [];
            setFirstName(nameParts[0] || '');  // Asignar el primer nombre
            setLastName(nameParts[1] || '');   // Asignar el apellido si existe

            if (nameParts.length < 2) {
                setLastName('Desconocido');  // Si no hay apellido, usar un valor por defecto
            }
        }
    }, []);// Ejecuta una vez cuando el componente se monta

    useEffect(() => {
        const currentUser = auth.currentUser;

        if (currentUser) {
            // Verificar el dominio del correo y redirigir si es el dominio académico
            if (currentUser.email.includes('@duocuc.cl')) {
                // Si el correo tiene el dominio académico, hacer el POST y redirigir
                const registerAcademicUser = async () => {
                    try {
                        // Obtener el idToken desde Firebase Auth
                        const idToken = await auth.currentUser.getIdToken(true);

                        const dataToSend = {
                            idToken,  // Incluye el idToken
                            email,  // Correo del usuario
                            firstName,  // Nombre del usuario
                            lastName,  // Apellido del usuario
                            rol: 1,  // Preasignamos rol académico
                            uid,  // UID limitado a 200 caracteres
                        };

                        // Enviar la solicitud POST al backend para registrar al usuario académico
                        const response = await axios.post('http://localhost:8800/auth/register', dataToSend);
                        console.log('Usuario académico registrado con éxito:', response.data);

                        // Redirigir al usuario a la página /login2 después de registrarlo
                        navigate('/');
                    } catch (error) {
                        console.error('Error al registrar el usuario académico:', error);
                        navigate('/')
                    }
                };

                // Ejecutar el registro del usuario académico
                registerAcademicUser();
            }
        }
    }, [navigate]);

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
                const response = await axios.get('http://localhost:8800/carrera_niveles');
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

        // Convertir carreraSeleccionada y nivelSeleccionado a enteros
        const carreraSeleccionadaInt = parseInt(carreraSeleccionada, 10);  // Convierte a número
        const nivelSeleccionadoInt = parseInt(nivelSeleccionado, 10);  // Convierte a número

        // Obtener el idToken desde Firebase Auth
        auth.currentUser.getIdToken(true) // `true` para forzar la obtención de un nuevo token si ya ha expirado
            .then((idToken) => {
                // Datos a enviar
                const dataToSend = {
                    idToken,  // Incluye el idToken
                    email,  // Correo del usuario
                    firstName,  // Nombre del usuario
                    lastName,  // Apellido del usuario
                    carreraSeleccionada: carreraSeleccionadaInt,  // Convertido a número
                    nivelSeleccionado: nivelSeleccionadoInt,  // Convertido a número
                    rol,  // Rol del usuario (alumno o académico)
                    uid // UID limitado a 200 caracteres
                };

                // Enviar los datos al backend
                axios.post('http://localhost:8800/auth/register', dataToSend)
                    .then((response) => {
                        console.log('Usuario registrado con éxito:', response.data);
                        navigate('/');
                    })
                    .catch((error) => {
                        console.error('Error al registrar el usuario:', error.response ? error.response.data : error.message);
                        navigate('/');
                    });
            })
            .catch((error) => {
                console.error('Error al obtener el idToken:', error);
            });
    };

    return (
        <div className="p-12">
            <form onSubmit={handleSubmit} className="flex flex-wrap -mx-3 mb-6 form w-1/2">
                {/* Input para Correo electrónico */}
                <div className="w-full px-3 mb-4">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
                        Correo electrónico
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled
                    />
                </div>

                {/* Input para Nombre */}
                <div className="w-full px-3 mb-4">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="firstName">
                        Nombre
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>

                {/* Input para Apellido */}
                <div className="w-full px-3 mb-4">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="lastName">
                        Apellido
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>

                {/* Si el rol es "alumno", mostrar las opciones de carrera y nivel */}
                {rol === 2 && (
                    <div className="w-full px-3 mb-4">
                        {/* Select para Carrera */}
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="carreraSeleccionada">
                            Selecciona tu carrera
                        </label>
                        <select
                            className="block appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
                    </div>
                )}

                {/* Select para Nivel */}
                {rol === 2 && (
                    <div className="w-full px-3 mb-4">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="nivelSeleccionado">
                            Selecciona tu nivel
                        </label>
                        <select
                            className="block appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            value={nivelSeleccionado || ''}  // Usa un valor vacío si nivelSeleccionado es null
                            onChange={(e) => setNivelSeleccionado(e.target.value)}
                        >
                            <option value="">Selecciona un nivel</option>
                            {niveles.map((nivel) => (
                                <option key={nivel.id_carrera_nivel} value={nivel.id_carrera_nivel}>
                                    {nivel.relacionNombre}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Botón para Registrar */}
                <div className="w-full px-3 mb-4">
                    <button
                        type="submit"
                        className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-2 px-4 rounded"
                    >
                        Registrar
                    </button>
                </div>
            </form>

        </div>
    );
};

export default FormularioRegistro;
