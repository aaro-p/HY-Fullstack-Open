import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import BlogForm from "./BlogForm"
import userEvent from "@testing-library/user-event"

describe("BlogForm tests", () => {
    test("Create new blog", () => {
        const mockCreateBlog = jest.fn()
        const blogComponent = render (<BlogForm createBlog={mockCreateBlog}/>)
        const form = blogComponent.container.querySelector("form")
        const user = userEvent

        const titleInput = form.querySelector("#title")
        const authorInput = form.querySelector("#author")
        const urlInput = form.querySelector("#url")

        user.type(titleInput, "adding testblog")
        user.type(authorInput, "test author")
        user.type(urlInput, "www.submit.com")

        fireEvent.submit(form)

        expect(mockCreateBlog.mock.calls).toHaveLength(1)
        expect(mockCreateBlog.mock.lastCall[0].title).toBe("adding testblog")
        expect(mockCreateBlog.mock.lastCall[0].author).toBe("test author")
        expect(mockCreateBlog.mock.lastCall[0].url).toBe("www.submit.com")

    })
})