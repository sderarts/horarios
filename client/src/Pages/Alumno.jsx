import React from 'react';

import Navbar from '../Layout/Navbar';
import AsignaturasAlumno from '../Sections/Asignatura/AsignaturasAlumno';
import AddHorarioAlumno from '../Sections/Horario/AddHorarioAlumno';

function Alumno() {
    return (
        <div>
            <Navbar />
            <AsignaturasAlumno />
            <AddHorarioAlumno />
        </div>
    )
}

export default Alumno