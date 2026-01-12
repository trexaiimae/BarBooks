class CheckoutPage {
  fillUserDetails() {
    cy.get("#first-name").type(Cypress.env("firstName"));
    cy.get("#last-name").type(Cypress.env("lastName"));
    cy.get("#postal-code").type(Cypress.env("postalCode"));
    cy.get('[data-test="continue"]').click();
  }

  finishOrder() {
    cy.get('[data-test="finish"]').click();
  }

  verifyOrderSuccess() {
    cy.contains("Thank you for your order").should("be.visible");
    cy.get(".pony_express").should("be.visible");
  }
}

export default CheckoutPage;
