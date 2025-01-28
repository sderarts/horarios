import React, { useEffect, useState, useContext } from 'react';
import { Link } from "react-router-dom"; // Usando React Router
import { AuthContext } from '../Context/AuthContext';

function Sidebar() {
    const [userRole, setUserRole] = useState(null);
    const { user, loading } = useContext(AuthContext);
    const [shortUid, setShortUid] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                try {
                    const uid = user.uid.substring(0, 28); // Asegurándonos de que el UID esté en el formato correcto
                    setShortUid(uid);  // Almacenamos el shortUid en el estado

                    const response = await fetch(`http://localhost:8800/auth/checkUser/${uid}`);
                    const data = await response.json();

                    if (data.exists) {
                        setUserRole(data.rol);  // Almacenamos el rol del usuario
                    } else {
                        console.log("Usuario no encontrado.");
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };

        fetchUserData();
    }, [user]);

    // Solo mostrar el Sidebar para usuarios con rol 2 (alumno)
    if (userRole !== 2) return null; // No se renderiza nada si no es alumno

    return (
        <div className="fixed top-0 left-0 w-64 h-full bg-gray-800 text-white">
            <div className="p-4">
                <ul className="space-y-4">
                    <li>
                        <Link to={`/`} className="block py-2 px-3 hover:bg-gray-700">Home</Link>
                    </li>
                    <li>
                        <Link to={`/carreras`} className="block py-2 px-3 hover:bg-gray-700">Carreras</Link>
                    </li>
                    <li>
                        <Link to={`/asignaturas`} className="block py-2 px-3 hover:bg-gray-700">Asignaturas</Link>
                    </li>
                    <li>
                        <Link to={`/bloques`} className="block py-2 px-3 hover:bg-gray-700">Bloques</Link>
                    </li>
                    <li>
                        <Link to={`/solicitudes`} className="block py-2 px-3 hover:bg-gray-700">Solicitudes</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
