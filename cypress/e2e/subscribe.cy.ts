describe("Newsletter Subscribe Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000")
  })
  it("allows users to subscribe to the email list", () => {
    cy.getByData("email-input").type("matilda@mail.com")
    cy.getByData("submit-button").click()
    cy.getByData("success-message").should("exist").contains("matilda@mail.com")
  })

  it("does not allow a user to subscribe with an invalid email", () => {
    cy.getByData("email-input").type("lalala")
    cy.getByData("submit-button").click()
    cy.getByData("success-message").should("not.exist")
  })

  it("does not allow a user that is already subscribed to subscribe again", () => {
    const emailThatIsAlreadySubscribed = "john@example.com"
    cy.getByData("email-input").type(emailThatIsAlreadySubscribed)
    cy.getByData("submit-button").click()
    cy.getByData("server-error-message")
      .should("exist")
      .contains(`${emailThatIsAlreadySubscribed} already exists`)
  })
})
