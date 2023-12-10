/// <reference types="cypress" />

Cypress.Commands.add("getByDataCy", (selector: string, args) => {
  return cy.get(`[data-cy=${selector}]`, args);
});

declare global {
  namespace Cypress {
    interface Chainable {
      getByDataCy(selector: string, args?: any): Chainable<JQueryWithSelector>;
    }
  }
}
export {};
