import CheckOutPage from "./CheckOutPage";

class CartPage {
  proceedToCheckout() {
    cy.contains("Checkout").click();
    return new CheckOutPage();
  }
}

export default CartPage;
