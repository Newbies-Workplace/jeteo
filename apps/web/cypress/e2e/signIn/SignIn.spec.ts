require("dotenv").config();

const baseUrl: string = Cypress.config("baseUrl");

describe("Basic Actions", () => {
  it("should correctly visit signin page", () => {
    cy.visit("/");
    cy.getByDataCy("open-menu").click();
    cy.getByDataCy("signin-link").click();

    cy.url().should("include", `${baseUrl}/auth/signin`);
  });

  it("should correctly return to previous page", () => {
    cy.visit("/");
    cy.getByDataCy("open-menu").click();
    cy.getByDataCy("signin-link").click();

    cy.url().should("include", `${baseUrl}/auth/signin`);

    cy.getByDataCy("back-button").click();
    cy.url().should("include", `${baseUrl}/`);
  });

  it("should correctly open privacy policy page", () => {
    cy.visit("/auth/signin");
    cy.get("a").contains("politykę prywatności").click();
    cy.url().should("include", `${baseUrl}/privacy-policy`);
  });
});

describe.skip("Sign In with Google", () => {
  it("should correctly signin to app with google account", () => {});
});
