import CheckoutPage from "./CheckOutPage";

class CartPage {
  proceedToCheckout() {
    cy.contains("Checkout").click();
    return new CheckoutPage();
  }
}

export default CartPage;
