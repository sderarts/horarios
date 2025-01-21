import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';  // Si vas a usar autenticación
import { getFirestore } from 'firebase/firestore';// Importa el módulo de autenticación

// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyAlSedLoyS7TZFF7S9gipTPMkJEI6eoGF8",
    authDomain: "horarios-56eb1.firebaseapp.com",
    projectId: "horarios-56eb1",
    storageBucket: "horarios-56eb1.firebasestorage.app",
    messagingSenderId: "634855852325",
    appId: "1:634855852325:web:8c006e1c7fb12ac30df2cc",
    measurementId: "G-SYR0XFY799"
};

// Inicializar la app de Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios como Auth, Firestore, etc.
const auth = getAuth(app);

export { app, auth };