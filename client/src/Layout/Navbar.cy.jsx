import React from 'react';
import { mount } from '@cypress/react';
import Navbar from '../../src/Layout/Navbar'; // Ajusta la ruta si es necesario
import { AuthContext } from '../../src/Context/AuthContext.jsx'; // Ajusta la ruta

describe('Navbar Component', () => {
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
      <AuthContext.Provider value={mockContextValue}>
        <Navbar />
      </AuthContext.Provider>
    );

    // Espera a que la llamada de la API se complete
    cy.wait('@getUserRole');


  });

  it('renders loading state when data is being fetched', () => {
    const mockContextValue = { user: null, loading: true };

    mount(
      <AuthContext.Provider value={mockContextValue}>
        <Navbar />
      </AuthContext.Provider>
    );

    // Verifica que el estado de carga se muestre
    cy.contains('Loading...');
  });

  it('renders null when user is not authenticated', () => {
    const mockContextValue = { user: null, loading: false };

    mount(
      <AuthContext.Provider value={mockContextValue}>
        <Navbar />
      </AuthContext.Provider>
    );

    // Verifica que el componente no renderiza nada cuando no hay un usuario
    cy.get('nav').should('not.exist');
  });
});
