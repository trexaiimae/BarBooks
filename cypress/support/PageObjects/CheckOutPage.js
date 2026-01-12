import { calculateCartTotal } from '../../src/utils/cartCalculator';

class CheckoutPage {
  fillUserDetails() {
    cy.get("#first-name").type(Cypress.env("firstName"));
    cy.get("#last-name").type(Cypress.env("lastName"));
    cy.get("#postal-code").type(Cypress.env("postalCode"));
    cy.get('[data-test="continue"]').click();
  }

  sumOfProduct() {
    let sum = 0;
    return cy.get('[data-test="inventory-item-price"]').each(($el) => {
      const priceText = $el.text();
      const price = Number(priceText.replace(/[^0-9.]/g, ''));
      sum += price;
    }).then(() => {
      cy.log("Calculated sum: " + sum);
      console.log("Calculated sum:", sum);
      return sum;
    });
  }

  finishOrder() {
    cy.get('[data-test="finish"]').click();
  }

  verifyOrderSuccess() {
    cy.contains("Thank you for your order").should("be.visible");
    cy.get(".pony_express").should("be.visible");
  }

  verifyCartTotal() {
    return this.sumOfProduct().then((sum) => {
      cy.get('[data-test="subtotal-label"]')
        .invoke('text')
        .then((subtotalText) => {
          const displayedTotal = Number(subtotalText.replace(/[^0-9.]/g, ''));
          cy.log("Displayed total: " + displayedTotal);
          expect(sum).to.eq(displayedTotal);
        });
    });
  }
}

export default CheckoutPage;
