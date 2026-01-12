import InventoryPage from "./InventoryPage";

class LoginPage {
  visit() {
    cy.visit(Cypress.env("url")); 
  }

  login() {
    cy.login(Cypress.env("username"), Cypress.env("password"));
    return new InventoryPage();
  }
}

export default LoginPage;
