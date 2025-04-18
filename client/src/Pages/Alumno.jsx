import React from 'react';

import Navbar from '../Layout/Navbar';
import AsignaturasAlumno from '../Sections/Asignatura/AsignaturasAlumno';
import AddHorarioAlumno from '../Sections/Horario/AddHorarioAlumno';
import HorarioAlumno from '../Sections/Horario/HorarioAlumno';
import Options from '../Sections/User/Options';
import Footer from '../Layout/Footer';

function Alumno() {
    return (
        <div >
            {/* <Navbar /> */}

            <AsignaturasAlumno />
            {/* <AddHorarioAlumno /> */}
            <HorarioAlumno />
            <Footer />
        </div>
    )
}

export default Alumno