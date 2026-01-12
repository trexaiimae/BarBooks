import LoginPage from "../../support/PageObjects/LoginPage";

describe("SauceDemo E2E Happy Path (POM)", () => {
  it("should login, sort, add to cart, checkout & confirm order", () => {
    const loginPage = new LoginPage();

    // 1) Open login
    loginPage.visit();

    // 2) Login
    const inventory = loginPage.login(
      Cypress.env("username"),
      Cypress.env("password")
    );

    // 3) Sort low → high
    inventory.sortLowToHigh();

    // 4) Add cheapest 2 items
    inventory.addTwoCheapestItems();

    // 5) Go to cart
    const cartPage = inventory.goToCart();

    // 6) Checkout
    const checkout = cartPage.proceedToCheckout();

    // 7) Fill form
    checkout.fillUserDetails();

    // 8) Finish order
    checkout.finishOrder();

    // 9) Verify success message + dispatch image
    checkout.verifyOrderSuccess();
  });
});
