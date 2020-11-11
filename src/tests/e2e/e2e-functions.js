export const typeInputValue = (inputName, value) =>
  cy.get(`input[name=${inputName}]`).type(value);

export const signup = (username, password, confirmPassword, { valid = true } = {}) => {
  cy.visit('/signup');

  typeInputValue('username', username);
  typeInputValue('password', password);
  typeInputValue('confirmPassword', confirmPassword);

  cy.get('input[type=submit]').click();

  if (valid) {
    cy.get('h2').should('have.text', 'Verify your e-mail');
    cy.get('button[class="link-button"]').click();
  }
};

export const login = (username, password, { valid = true } = {}) => {
  signup(username, password, password, valid);
  cy.visit('/login');

  typeInputValue('username', username);
  typeInputValue('password', password);

  cy.get('input[type=submit]').click();

  if (valid) {
    cy.get('h1').should('have.text', 'Welcome, default!');
  }
}