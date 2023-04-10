Cypress.Commands.add("loginUser",  (creds) => {
    cy.request("POST", "http://localhost:3001/api/login", creds).then((response) => localStorage.setItem("user", JSON.stringify(response.body)))
    cy.visit("http://localhost:3000")
})

Cypress.Commands.add("addBlog", () => {
    cy.contains("create new blog").click()
    cy.get("#title").type("test blog")
    cy.get("#author").type("Blog Blogger")
    cy.get("#url").type("www.test.com")
    cy.get(".createBlog").submit()
})
