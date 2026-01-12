import LoginPage from "../../support/PageObjects/LoginPage";

describe("SauceDemo E2E Happy Path Order Flow", () => {
  it("should be able to login, sort the products, add to cart 2 lowest price, checkout & confirm order", () => {
    const loginPage = new LoginPage();

   
    loginPage.visit();
    const inventory = loginPage.login();
    inventory.sortLowToHigh();
    inventory.addTwoCheapestItems();
    const cartPage = inventory.goToCart();
    const checkout = cartPage.proceedToCheckout();
    checkout.fillUserDetails();
    checkout.verifyItemTotal();
    checkout.finishOrder();
    checkout.verifyOrderSuccess();
  });
});
