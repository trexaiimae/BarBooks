
describe("API Testing (Headless) - JSONPlaceholder", () => {

  const apiUrl = Cypress.env("apiUrl");

  it("Send a payload and verify response", () => {
    const payload = { title: "foo", body: "bar", userId: 1 };

    cy.request({
      method: "POST", url: apiUrl, body: payload,
      headers: { "Content-type": "application/json; charset=UTF-8" },
    }).then((response) => {
     
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("id");

      //assert response body matches payload
      expect (response.body.title).to.eq(payload.title);
      expect (response.body.body).to.eq(payload.body);
      expect (response.body.userId).to.eq(payload.userId);

      cy.log("Created post ID: " + response.body.id);
      
    });
  });

  it("GET /posts/1 and verify JSON schema", () => {
    cy.request(`${apiUrl}/1`).then((response) => {

        const postSchema = {
        type: "object",
        required: ["userId", "id", "title", "body"],
        properties: {
            userId: { type: "number" },
            id: { type: "number" },
            title: { type: "string" },
            body: { type: "string" }
        }};

    expect(response.status).to.eq(200);
    expect(response.body).to.be.jsonSchema(postSchema);
    expect(response.body.id).to.eq(1);
    expect(response.body.title).to.not.be.empty;


      // Optional: log the response
      cy.log(JSON.stringify(response.body));
    });
  });
});
