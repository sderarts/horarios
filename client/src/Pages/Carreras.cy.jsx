import React from 'react'
import Carreras from './Carreras'

describe('<Carreras />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Carreras />)
  })
})