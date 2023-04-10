import { useState } from "react"
import PropTypes from "prop-types"

const Blog = ({ blog, handleLike, handleDelete, userName }) => {

    const [toggleContent, setToggleContent] = useState(false)
    const handleToggle = () => {
        setToggleContent(!toggleContent)
    }
    const updateBlog = (e) => {
        e.preventDefault()
        handleLike(blog.id,{
            user: blog.user.id,
            likes: blog.likes += 1,
            author: blog.author,
            url: blog.url
        })
    }

    const removeBlog = (e) => {
        e.preventDefault()
        handleDelete(blog)
    }

    const buttonContent = toggleContent ? "hide" : "view"

    return (
        <div className="blog-content">
            {blog.title} {blog.author}
            <button onClick={handleToggle}>
                {buttonContent}
            </button>
            {toggleContent &&
        <>
            <div>
                {blog.url}
            </div>
            <div>
            likes { blog.likes }
                <button onClick={updateBlog}>like</button>
            </div>
            <div>
                {blog.user.name}
            </div>
            {userName === blog.user.name &&
            <button onClick={removeBlog}>remove</button>
            }
        </>
            }
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    handleLike: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    userName: PropTypes.string.isRequired,
}

export default Blog