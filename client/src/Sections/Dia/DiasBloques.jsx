import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DiasBloques() {
    const [diaBloque, setDiaBloque] = useState([]);

    // Cargar los datos de diaBloque al montar el componente
    useEffect(() => {
        const fetchDiaBloques = async () => {
            try {
                const response = await axios.get("http://localhost:8800/dia_bloques");
                console.log("Datos de DiaBloque:", response.data); // Ver los datos
                setDiaBloque(response.data);
            } catch (error) {
                console.error("Error al obtener los registros de DiaBloque", error);
            }
        };

        fetchDiaBloques();
    }, []);

    return (
        <div>
            <h1>Lista de Día-Bloque</h1>
            {diaBloque.length > 0 ? (
                <ul>
                    {diaBloque.map((e) => (
                        <li key={e.id_dia_bloque}>
                            {e.nombreRelacion} - {e.nombre_dia} - {e.nombre_bloque}
                            {/* Si deseas agregar botones de eliminar o actualizar puedes hacerlo aquí */}
                            {/* <button className='delete' onClick={() => handleDelete(e.id_dia_bloque)}>Eliminar</button> */}
                            {/* <Link to={`/diaBloque/${e.id_dia_bloque}`}>Actualizar</Link> */}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay registros de Día-Bloque disponibles.</p>
            )}
        </div>
    );
}

export default DiasBloques;