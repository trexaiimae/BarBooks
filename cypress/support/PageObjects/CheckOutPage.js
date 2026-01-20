// cypress/support/PageObjects/CheckoutPage.js
import { calculateCartTotal } from '../utils/cartCalculator';

class CheckoutPage {
  fillUserDetails() {
    cy.get("#first-name").type(Cypress.env("firstName"));
    cy.get("#last-name").type(Cypress.env("lastName"));
    cy.get("#postal-code").type(Cypress.env("postalCode"));
    cy.get('[data-test="continue"]').click();
  }

  verifyItemTotal() {
  let items = [];

  // Get all prices and quantities from the checkout overview
  cy.get('[data-test="inventory-item"]').each(($el) => {
    const price = Number($el.find('[data-test="inventory-item-price"]').text().replace(/[^0-9.]/g, ''));
    const qtyText = $el.find('[data-test="item-quantity"]').text();
    const qty = Number(qtyText) || 1; // fallback to 1 if quantity missing

    items.push({ price, qty });
  }).then(() => {
    const calculatedTotal = calculateCartTotal(items);

    // Get the displayed subtotal
    cy.get('[data-test="subtotal-label"]')
      .invoke('text')
      .then((text) => {
        const displayedTotal = Number(text.replace(/[^0-9.]/g, ''));
        cy.log(`Calculated Item Total: ${calculatedTotal}`);
        cy.log(`Displayed Item Total: ${displayedTotal}`);
        expect(calculatedTotal).to.eq(displayedTotal);

  // Also verify total after tax
        cy.get('[data-test="tax-label"]')
          .invoke('text')
          .then((taxText) => {
            const tax = Number(taxText.replace(/[^0-9.]/g, ''));
            const expectedTotal = Math.round((calculatedTotal + tax) * 100) / 100;

            cy.get('[data-test="total-label"]')
              .invoke('text')
              .then((totalText) => {
                const displayedTotalAfterTax = Number(totalText.replace(/[^0-9.]/g, ''));
                cy.log(`Expected Total (Item + Tax): ${expectedTotal}`);
                cy.log(`Displayed Total: ${displayedTotalAfterTax}`);
                expect(displayedTotalAfterTax).to.eq(expectedTotal);
              });
          });
      });
  });
}

  finishOrder() {
    cy.get('[data-test="finish"]').click();
  }

  verifyOrderSuccess() {
    cy.contains("Thank you for your order").should("be.visible");
    cy.get(".pony_express").should("be.visible");
  }
}

module.exports = CheckoutPage;