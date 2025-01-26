import React from 'react';

import Navbar from '../Layout/Navbar';
import AsignaturasAlumno from '../Sections/Asignatura/AsignaturasAlumno';
import AddHorarioAlumno from '../Sections/Horario/AddHorarioAlumno';
import HorarioAlumno from '../Sections/Horario/HorarioAlumno';

function Alumno() {
    return (
        <div>
            <Navbar />
            <AsignaturasAlumno />
            <AddHorarioAlumno />
            <HorarioAlumno />
        </div>
    )
}

export default Alumno