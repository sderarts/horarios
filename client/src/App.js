import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import Home from './Pages/HomePage'
import Carreras from './Pages/Carreras';
import Asignaturas from './Pages/Asignaturas';
import BloquesHorarios from './Pages/BloquesHorarios';
import AddNivel from './Sections/Nivel/AddNivel';
import Edit from './Sections/Carrera/Edit';
import AddAsignatura from './Sections/Asignatura/AddAsignatura';
import AddSeccion from './Sections/Seccion/AddSeccion';
import VerSecciones from './Sections/Seccion/Secciones';
import EditSeccion from './Sections/Seccion/EditSeccion';
import AddDia from './Sections/Dia/AddDia';
import AddBloque from './Sections/Bloque/AddBloque';
import VerBloques from './Sections/Bloque/Bloques';
import EditBloque from './Sections/Bloque/EditBloque';
import AddDiaBloque from './Sections/Dia/AddDiaBloque';
import DiasBloques from './Sections/Dia/DiasBloques';
import AddCarreraNivel from './Sections/Nivel/AddCarreraNivel';
import AddSeccionDia from './Sections/Seccion/AddSeccionDia';
import SeccionesDias from './Sections/Seccion/SeccionesDias';
import EditSeccionDia from './Sections/Seccion/EditSeccionDia';
import AddNivelAsignatura from './Sections/Asignatura/AddNivelAsignatura';
import AddAsignaturaSeccion from './Sections/Horario/AddAsignaturaSeccion';
import AsignaturasSecciones from './Sections/Horario/AsignaturasSecciones';
import EditAsignaturaSeccion from './Sections/Horario/EditAsignaturaSeccion';
import AsignaturasList from './Sections/Asignatura/AsignaturasList';
import AddSolicitudAcademico from './Sections/Solicitud/AddSolicitudAcademico';
import AddHorarioAlumno from './Sections/Horario/AddHorarioAlumno';
import AddSolicitud from './Sections/Solicitud/AddSolicitud';
import Solicitudes from './Sections/Solicitud/Solicitudes';
import Login2 from './Sections/User/Login2';
import Register from './Sections/User/Register';
import Alumno from './Pages/Alumno';
import SolicitudesAcademico from './Sections/Solicitud/SolicitudesAcademico';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login2" element={<Login2 />} />
            <Route path="/register" element={<Register />} />
            <Route path="/carreras" element={<Carreras />} />
            <Route path="/carreras/:id" element={<Edit />} />
            <Route path="/asignaturas" element={<Asignaturas />} />
            <Route path="/asignaturas_list" element={<AsignaturasList />} />
            <Route path="/seccion" element={<AddSeccion />} />
            <Route path="/secciones" element={<VerSecciones />} />
            <Route path="/secciones/:id" element={<EditSeccion />} />
            <Route path="/add_nivel" element={<AddNivel />} />
            <Route path="/alumno" element={<Alumno />} />
            <Route path="/bloques" element={<BloquesHorarios />} />
            <Route path="/bloques/:id" element={<EditBloque />} />
            <Route path="/add_dia_bloques" element={<AddDiaBloque />} />
            <Route path="/dias_bloques" element={<DiasBloques />} />
            <Route path="/add_carreras_niveles" element={<AddCarreraNivel />} />
            <Route path="/add_secciones_dias" element={<AddSeccionDia />} />
            <Route path="/secciones_dias" element={<SeccionesDias />} />
            <Route path="/secciones_dias/:id" element={<EditSeccionDia />} />
            <Route path="/add_nivel_asignaturas" element={<AddNivelAsignatura />} />
            <Route path="/add_asignatura_secciones" element={<AddAsignaturaSeccion />} />
            <Route path="/asignatura_secciones" element={<AsignaturasSecciones />} />
            <Route path="/asignatura_secciones/:id" element={<EditAsignaturaSeccion />} />
            <Route path="/add_solicitud_academico" element={<AddSolicitudAcademico />} />
            <Route path="/inscribir_asignaturas/alumno/:id" element={<AddHorarioAlumno />} />
            <Route path="/add_solicitud" element={<AddSolicitud />} />
            <Route path="/solicitudes" element={<Solicitudes />} />
            <Route path="/solicitudes_academico" element={<SolicitudesAcademico />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
