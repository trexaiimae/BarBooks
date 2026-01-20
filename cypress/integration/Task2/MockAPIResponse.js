import LoginPage from "../../support/PageObjects/LoginPage";

describe("Task 2: Fixtures & Network Stubbing (SauceDemo)", () => {
  const loginPage = new LoginPage();

  // convert price to number
  const getNumericPrice = (price) =>
    typeof price === "string" ? Number(price.replace(/[^0-9.]/g, "")) : price;

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

    cy.window().then((win) => win.fetch("/api/inventory"));

    cy.wait("@inventorySuccess").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      const products = interception.response.body;
      cy.log(JSON.stringify(products));

      products.forEach((product, index) => {
        const expected = this.products.validProducts[index];

        expect(product).to.have.all.keys("id", "name", "price");
        expect(product.id).to.eq(expected.id);
        expect(product.name).to.eq(expected.name);
        expect(getNumericPrice(product.price)).to.eq(getNumericPrice(expected.price));
      });
    });
  });

  it("Mocks inventory API with invalid products", function () {
    cy.intercept("GET", "**/api/inventory-invalid", {
      statusCode: 400,
      body: this.products.invalidProducts,
    }).as("inventoryInvalid");

    cy.window().then((win) => win.fetch("/api/inventory-invalid"));

    cy.wait("@inventoryInvalid").then((interception) => {
      expect(interception.response.statusCode).to.eq(400);
      const invalidProducts = interception.response.body;
      cy.log(JSON.stringify(invalidProducts));

      invalidProducts.forEach((product, index) => {
        expect(product).to.have.all.keys("id", "name", "price");
        expect(product.id).to.be.a("number");
        expect(product.name).to.be.a("string");

      });
    });
  });

  
  it("Mocks inventory API with a 500 server error", function () {
    cy.intercept("GET", "**/api/inventory", {
      statusCode: 500,
      body: { error: "Internal Server Error" },
    }).as("inventoryFail");

    cy.window().then((win) => win.fetch("/api/inventory"));

    cy.wait("@inventoryFail").then((interception) => {
      cy.log(JSON.stringify(interception.response.body));
      expect(interception.response.statusCode).to.eq(500);
      expect(interception.response.body.error).to.eq("Internal Server Error");
    });
  });
});
