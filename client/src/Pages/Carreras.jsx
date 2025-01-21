import React from 'react';
import CarrerasList from '../Sections/Carrera/CarrerasList';
import AddCarrera from '../Sections/Carrera/AddCarrera';
import Niveles from '../Sections/Nivel/Niveles';
import AddNivelAsignatura from '../Sections/Asignatura/AddNivelAsignatura';
import AsignaturasList from '../Sections/Asignatura/AsignaturasList';


function Carreras() {
    return (
        <div>
            <CarrerasList />
            {/* <AddCarrera /> */}
            {/* <Niveles /> */}
            <AddNivelAsignatura />
            {/* <AsignaturasList /> */}
        </div>
    )
}

export default Carreras