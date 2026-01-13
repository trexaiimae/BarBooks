import LoginPage from "../../support/PageObjects/LoginPage";

describe("Task 2: Fixtures & Network Stubbing (SauceDemo)", () => {
  const loginPage = new LoginPage();

  beforeEach(function () {
    cy.fixture("products.json").as("products");
    loginPage.visit();
    loginPage.login();
    cy.url().should("include", "/inventory.html");
  });

  it("Mocks inventory API with a successful JSON response", function () {
    cy.intercept("GET", "**/api/inventory", {
      statusCode: 200,
      body: this.products.validProducts,
    }).as("inventorySuccess");

    // Trigger the fake API call (simulate frontend fetching)
    cy.window().then((win) => {
      win.fetch("/api/inventory");

    });

    cy.wait("@inventorySuccess").then((interception) => {
    cy.log("Success response: " + JSON.stringify(interception.response.body));
    expect(interception.response.statusCode).to.eq(200);
    
    });
  });

it("Mocks inventory API with invalid products", function () {
  cy.intercept("GET", "**/api/inventory-invalid", {
    statusCode: 400,
    body: this.products.invalidProducts,
  }).as("inventoryInvalid");

  cy.window().then((win) => {
    win.fetch("/api/inventory-invalid");
  });

  cy.wait("@inventoryInvalid").then((interception) => {
   cy.log("Invalid response: " + JSON.stringify(interception.response.body));
    expect(interception.response.body).to.have.length(
      this.products.invalidProducts.length
      
    );
    expect(interception.response.statusCode).to.eq(400);
  });
});


  it("Mocks inventory API with a 500 server error", function () {
    cy.intercept("GET", "**/api/inventory", {
      statusCode: 500,
      body: { error: "Internal Server Error" },
    }).as("inventoryFail");

    cy.window().then((win) => {
      win.fetch("/api/inventory");
    });

    cy.wait("@inventoryFail").then((interception) => {
      cy.log("500 error response: " + JSON.stringify(interception.response.body));
      expect(interception.response.statusCode).to.eq(500);
      expect(interception.response.body.error).to.eq("Internal Server Error");
    });
  });
});
