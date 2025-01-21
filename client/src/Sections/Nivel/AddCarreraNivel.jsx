import React, { useState, useEffect } from 'react';
import axios from 'axios';


function AddCarreraNivel() {
    const [carreraNivel, setCarreraNivel] = useState({
        id_carrera_nivel: "",
        relacionNombre: "",
        fk_carrera: "",
        fk_nivel: ""
    });

    // Estado para las listas de FK
    const [carreras, setCarreras] = useState([]);
    const [niveles, setNiveles] = useState([]);

    // Traer las listas de fk_carrera y fk_nivel al cargar el componente
    useEffect(() => {
        const fetchcarreras = async () => {
            try {
                const response = await axios.get("http://localhost:8800/carreras");
                setCarreras(response.data); // Suponiendo que la respuesta es un array de días
            } catch (error) {
                console.error("Error al obtener los días", error);
            }
        };

        const fetchniveles = async () => {
            try {
                const response = await axios.get("http://localhost:8800/niveles");
                setNiveles(response.data); // Suponiendo que la respuesta es un array de nivels
            } catch (error) {
                console.error("Error al obtener los nivels", error);
            }
        };

        fetchcarreras();
        fetchniveles();
    }, []);

    const handleChange = (e) => {
        setCarreraNivel((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8800/carrera_niveles", carreraNivel);
            console.log("Response:", response.data);
        } catch (error) {
            if (error.response) {
                console.error("Error en la respuesta:", error.response.data);
                console.error("Código de estado:", error.response.status);
            } else {
                console.error("Error al hacer la solicitud:", error.message);
            }
        }
    };

    return (
        <div className='form'>
            <input
                type="number"
                placeholder='ID carreraNivel'
                onChange={handleChange}
                name='id_carrera_nivel'
            />
            <input
                type="text"
                placeholder='Nombre de la relación'
                onChange={handleChange}
                name='relacionNombre'
            />

            {/* Lista desplegable para fk_carrera */}
            <select
                name="fk_carrera"
                onChange={handleChange}
                value={carreraNivel.fk_carrera}
            >
                <option value="">Seleccionar Carrera</option>
                {carreras.map(carrera => (
                    <option key={carrera.id_carrera} value={carrera.id_carrera}>
                        {carrera.nombreCarrera} {/* Ajusta esto según la propiedad del objeto `carrera` */}
                    </option>
                ))}
            </select>

            {/* Lista desplegable para fk_nivel */}
            <select
                name="fk_nivel"
                onChange={handleChange}
                value={carreraNivel.fk_nivel}
            >
                <option value="">Seleccionar nivel</option>
                {niveles.map(nivel => (
                    <option key={nivel.id_nivel} value={nivel.id_nivel}>
                        {nivel.nombreNivel} {/* Ajusta esto según la propiedad del objeto `nivel` */}
                    </option>
                ))}
            </select>

            <button onClick={handleClick}>Agregar Carrera-nivel</button>
        </div>
    );
}

export default AddCarreraNivel