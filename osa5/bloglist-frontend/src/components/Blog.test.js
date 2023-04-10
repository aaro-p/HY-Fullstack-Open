import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { fireEvent, render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

const testBlogObject = {
    author: "test author",
    title: "test blog",
    url: "www.testblog.com",
    likes: 4,
    user: {
        name: "testi testinen",
        username: "user01"
    }
}

const testUserName = "testi testinen"
const mockHandleLike = jest.fn()
const mockHandleDelete = jest.fn()

const { author, title, likes, ...rest } = testBlogObject

describe("Blog component tests", () => {
    test("Renders only title and author by default", () => {
        const component = render (<Blog blog={testBlogObject} handleDelete={mockHandleDelete} handleLike={mockHandleLike} userName={testUserName}/>)
        expect(component.container).toHaveTextContent(author,title)
        expect(component.container).not.toHaveTextContent(rest.url,rest.user.name,`likes ${likes}`)
    })

    test("Clicking view button shows more blog content", () => {
        const component = render (<Blog blog={testBlogObject} handleDelete={mockHandleDelete} handleLike={mockHandleLike} userName={testUserName}/>)
        expect(component.container).toHaveTextContent(author,title)
        const viewButton = component.getByText("view")
        fireEvent.click(viewButton)
        expect(component.container).toHaveTextContent(rest.url,rest.user.name,`likes ${likes}`)

    })

    test("Ensure like button is clicked twice and eventhandler is called on each click", async () => {
        const component = render (<Blog blog={testBlogObject} handleDelete={mockHandleDelete} handleLike={mockHandleLike} userName={testUserName}/>)
        const amountOfClicks = 2
        const user = userEvent
        const viewButton = component.getByText("view")
        fireEvent.click(viewButton)
        const likeButton = component.getByText("like")
        for (let i = 0; i < amountOfClicks; i++) {
            await user.click(likeButton)
        }
        expect(mockHandleLike.mock.calls).toHaveLength(amountOfClicks)
    })
})
