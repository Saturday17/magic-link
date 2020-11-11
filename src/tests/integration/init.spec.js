
describe('Cypress', () => {   
  it('is working', () => {     
      // eslint-disable-next-line jest/valid-expect
      expect(true).to.equal(true)   
  }) 
  
  it('opens the app', () => {  
    // type definitions for Cypress object "cy" 
    /// <reference types="cypress" />
      cy.visit('http://localhost:3000') 
  })
})