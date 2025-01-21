import React, { useEffect, useState } from 'react';
import { Link } from "react-router";
import axios from 'axios';
function VerBloques() {

    const [bloques, setBloques] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8800/bloques")
            .then((response) => {
                console.log('Datos recibidos:', response.data);  // Asegúrate de que los datos llegan aquí
                setBloques(response.data);  // Guardamos los datos de niveles en el estado
            })
            .catch((error) => {
                console.error("Error al obtener las bloques:", error);
            });
    }, []);


    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8800/bloques/${id}`);

            // Actualizar el estado local para reflejar la eliminación sin recargar la página
            setBloques(bloques.filter(bloque => bloque.id_bloque !== id));
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div>
            <h1>Bloques</h1>
            {bloques.length > 0 ? (
                <ul>
                    {bloques.map((e) => (
                        <li key={e.id_bloque}>
                            {e.nombreBloqueHora}
                            <button className='delete' onClick={() => handleDelete(e.id_bloque)}>Delete</button>
                            <Link to={`/bloques/${e.id_bloque}`}>Update</Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay bloques disponibles.</p>
            )}
        </div>
    );
}

export default VerBloques