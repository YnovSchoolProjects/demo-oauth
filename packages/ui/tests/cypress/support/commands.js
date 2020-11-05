// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --

Cypress.Commands.add('bootstrapApp', () => {
  cy.clearCookie('token');
  cy.logout();
});

Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.get('input[name="login"]').type(email);
  cy.get('input[name="password"]').type(`${password}{enter}`);
});

Cypress.Commands.add('logout', () => {
  cy.visit('/logout');
});

Cypress.Commands.add('getStore', () => cy.window().its('app.$store'));

// -- This is a child command --
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
