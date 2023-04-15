const firstLogin = {
    name: "test user",
    username: "testuser",
    password: "passu"
}
const secondLogin = {
    name: "second user",
    username: "seconduser",
    password: "passu"
}
const initialBlog = {
    title: "test blog",
    author: "Blog Blogger",
    url: "www.test.com"
}

const blogsToLike = [
    {
        title: "e2e testing with cypress",
        author: "Jane Doe",
        url: "www.janedoe.com",
    },
    {
        title: "testing with jest dom",
        author: "John Doe",
        url: "www.johnsblog.com",
    },
]

describe("Blog app", () => {
    beforeEach(() => {
        cy.request("POST", "http://localhost:3001/api/testing/reset")
        cy.visit("http://localhost:3000")
        cy.request("POST", "http://localhost:3001/api/users", firstLogin)
        cy.request("POST", "http://localhost:3001/api/users", secondLogin)
    })

    it("Login form is shown by default", () => {
        cy.get(".loginform").contains("Login")
    })

    describe("Login", () => {
        it("Success with correct credentials", () => {
            cy.get("#username").type(firstLogin.username)
            cy.get("#password").type(firstLogin.password)
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
            //eslint-disable-next-line no-unused-vars
            const { name, ...creds } = firstLogin
            cy.loginUser(creds)
            cy.addBlog(initialBlog)
        })

        it("A blog can be created", () => {
            cy.contains("test blog Blog Blogger").should("be.visible")
        })

        it("A blog can be liked", () => {
            cy.contains("view").click()
            cy.contains("likes 0")
            cy.contains("like").click()
            cy.contains("likes 1")
        })

        it("Remove blog button should be visibile only for user who created blog", () => {
            cy.loginUser({ username: firstLogin.username, password: firstLogin.password })
            cy.contains("view").click()
            cy.contains("remove").should("be.visible")
            cy.loginUser({ username: secondLogin.username, password: secondLogin.password })
            cy.contains("view").click()
            cy.contains("remove").should("not.exist")
        })

        it("A blog can be removed by user who created blog", () => {
            cy.loginUser({ username: secondLogin.username, password: secondLogin.password })
            cy.contains("view").click()
            cy.contains("remove").should("not.exist")
            cy.loginUser({ username: firstLogin.username, password: firstLogin.password })
            cy.contains("view").click()
            cy.contains("remove").click()
            cy.contains("view").should("not.exist")
            cy.contains("create new blog").should("be.visible")
        })

        it("Blogs are sorted by likes", () => {
            blogsToLike.forEach(blog => {
                cy.addBlog(blog)
            })

            cy.get(".blog-content").contains("e2e testing with cypress").find("button").contains("view").click()
            for (let i = 0; i < 3; i++) {
                cy.contains("like").click().wait(300)
            }
            cy.get(".blog-content").contains("e2e testing with cypress").find("button").contains("hide").click()

            cy.get(".blog-content").contains("testing with jest dom").find("button").contains("view").click()
            for (let i = 0; i < 4; i++) {
                cy.contains("like").click().wait(300)
            }
            cy.get(".blog-content").contains("testing with jest dom").find("button").contains("hide").click()

            cy.get(".blog-content").contains("test blog").find("button").contains("view").click()
            for (let i = 0; i < 1; i++) {
                cy.contains("like").click().wait(300)
            }

            cy.get(".blog-content").eq(0).should("contain", "testing with jest dom")
            cy.get(".blog-content").eq(1).should("contain", "e2e testing with cypress")
            cy.get(".blog-content").eq(2).should("contain", "test blog")
        })

    })
})