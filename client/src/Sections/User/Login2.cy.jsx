import React from 'react';
import { mount } from '@cypress/react';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import { AuthContext } from '../../Context/AuthContext.jsx'; // Ajusta la ruta
import Login2 from './Login.jsx';

describe('Login Component', () => {
  it('renders user data correctly', () => {
    const mockUser = {
      displayName: 'John Doe',
      email: 'john.doe@example.com',
      uid: '12345678901234567890123456789012' // Un UID de ejemplo
    };
    const mockContextValue = { user: mockUser, loading: false };

    // Simulamos la respuesta de la API para obtener el rol del usuario
    cy.intercept('GET', `http://localhost:8800/auth/checkUser/${mockUser.uid.substring(0, 28)}`, {
      statusCode: 200,
      body: { exists: true, rol: 'admin' }  // Respuesta que retorna el rol "admin"
    }).as('getUserRole');

    mount(
      <BrowserRouter> {/* Wrap Login with BrowserRouter */}
        <AuthContext.Provider value={mockContextValue}>
          <Login2 />
        </AuthContext.Provider>
      </BrowserRouter>
    );

    // Espera a que la llamada de la API se complete
    cy.wait('@getUserRole');
  });

  it('renders loading state when data is being fetched', () => {
    const mockContextValue = { user: null, loading: true };

    mount(
      <BrowserRouter> {/* Wrap Login2 with BrowserRouter */}
        <AuthContext.Provider value={mockContextValue}>
          <Login2 />
        </AuthContext.Provider>
      </BrowserRouter>
    );

    // Verifica que el estado de carga se muestre
    cy.contains('Loading...');
  });

  it('renders null when user is not authenticated', () => {
    const mockContextValue = { user: null, loading: false };

    mount(
      <BrowserRouter> {/* Wrap Login2 with BrowserRouter */}
        <AuthContext.Provider value={mockContextValue}>
          <Login2 />
        </AuthContext.Provider>
      </BrowserRouter>
    );

    // Verifica que el componente no renderiza nada cuando no hay un usuario
  });
});
