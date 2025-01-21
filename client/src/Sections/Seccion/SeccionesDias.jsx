import React, { useEffect, useState } from 'react';
import { Link } from "react-router";
import axios from 'axios';

function SeccionesDias() {

    const [seccionDia, setSeccionDia] = useState([]);

    // Cargar los datos de seccionDia al montar el componente
    useEffect(() => {
        const fetchseccionDias = async () => {
            try {
                const response = await axios.get("http://localhost:8800/seccion_dias");
                console.log("Datos de seccionDia:", response.data); // Ver los datos
                setSeccionDia(response.data);
            } catch (error) {
                console.error("Error al obtener los registros de seccionDia", error);
            }
        };

        fetchseccionDias();
    }, []);

    return (
        <div>
            <h1>Lista de Día-seccion</h1>
            {seccionDia.length > 0 ? (
                <ul>
                    {seccionDia.map((e) => (
                        <li key={e.id_seccion_dia}>
                            {e.nombreRelacion} - {e.nombre_dia} - {e.nombre_seccion}
                            {/* Si deseas agregar botones de eliminar o actualizar puedes hacerlo aquí */}
                            {/* <button className='delete' onClick={() => handleDelete(e.id_seccion_dia)}>Eliminar</button> */}
                            <Link to={`/secciones_dias/${e.id_seccion_dia}`}>Actualizar</Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay registros de Día-seccion disponibles.</p>
            )}
        </div>
    );
}

export default SeccionesDias