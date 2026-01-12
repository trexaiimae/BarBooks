describe('Inventory Network Tests (Dynamic Login + Network Stubbing)', () => {

  beforeEach(() => {
    cy.fixture("products.json").as("productsData");
  });



  it('Logs in dynamically and forces network error for inventory API', function () {

    // Visit login page
    cy.visit("https://www.saucedemo.com");

    cy.get("#login_credentials").then($el => {
      const usernamesText = $el.text().trim();
      const usernames = usernamesText.split("\n").map(u => u.trim()).filter(u => u);

      cy.get(".login_password").then($passEl => {
        const password = $passEl.text().trim();

        const username = usernames[0]; // use standard_user
        cy.log("Logging in with:", username, password);

        cy.get("#user-name").type(username);
        cy.get("#password").type(password);
        cy.get("#login-button").click();

        cy.url().should("include", "/inventory.html");

        // Stub inventory to simulate server error
        cy.intercept("GET", "/inventory.json", {
          statusCode: 500,
          body: { error: "Internal Server Error" }
        }).as("getInventoryFail");

        cy.visit("/inventory.html");

        cy.wait("@getInventoryFail").then(interception => {
          expect(interception.response?.statusCode).to.eq(500);
          expect(interception.response?.body.error).to.eq("Internal Server Error");
        });

      });
    });

  });

});

// to continue toms remaining