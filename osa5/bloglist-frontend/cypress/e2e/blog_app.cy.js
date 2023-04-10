describe("Blog app", () => {
    beforeEach(() => {
        cy.request("POST", "http://localhost:3001/api/testing/reset")
        cy.visit("http://localhost:3000")
        const testLogin = {
            name: "test user",
            username: "testuser",
            password: "passu"
        }
        cy.request("POST", "http://localhost:3001/api/users", testLogin)
    })
    it("Login form is shown by default", () => {
        cy.get(".loginform").contains("Login")
    })
    describe("Login", () => {
        it("Success with correct credentials", () => {
            cy.get("#username").type("testuser")
            cy.get("#password").type("passu")
            cy.get(".loginform").submit()
            cy.contains("test user logged in")
        })
        it("Fails with wrong credentials", () => {
            cy.get("#username").type("wrong")
            cy.get("#password").type("credentials")
            cy.get(".loginform").submit()
            cy.contains("wrong username or password")
        })
    })
    describe("When loggen in", () => {
        beforeEach( () => {
            const creds = { username: "testuser", password: "passu" }
            cy.loginUser(creds)
        })
        it("A blog can be created", () => {
            cy.addBlog()
            cy.contains("test blog Blog Blogger")
        })
        it("A blog can be liked", () => {
            cy.addBlog()
            cy.contains("view").click()
            cy.contains("likes 0")
            cy.contains("like").click()
            cy.contains("likes 1")
        })
    })
})