Cypress.Commands.add("loginUser",  (creds) => {
    cy.request("POST", "http://localhost:3001/api/login", creds).then((response) => localStorage.setItem("user", JSON.stringify(response.body)))
    cy.visit("http://localhost:3000")
})

Cypress.Commands.add("addBlog", (content) => {
    cy.contains("create new blog").click()
    cy.get("#title").type(content.title)
    cy.get("#author").type(content.author)
    cy.get("#url").type(content.url)
    cy.get(".createBlog").submit()
    cy.contains("cancel").click()
})
