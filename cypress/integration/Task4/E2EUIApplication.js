import LoginPage from "../../support/PageObjects/LoginPage";

describe("SauceDemo E2E Order Flow Happy Path (POM)", () => {
  it("should login, sort, add to cart, checkout & confirm order", () => {
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
