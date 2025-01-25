import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase';  // Cambia la importación

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);  // Estado para manejar la carga

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);  // Después de que se cargue el usuario, dejamos de estar en "cargando"
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
