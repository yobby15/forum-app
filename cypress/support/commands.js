// Custom Cypress commands

Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.get('input[placeholder="Masukkan email Anda"]').type(email);
  cy.get('input[placeholder="Masukkan password"]').type(password);
  cy.get('button[type="submit"]').click();
});
