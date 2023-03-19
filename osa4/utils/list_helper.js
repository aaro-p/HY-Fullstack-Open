const dummy = blogs =>  {
    blogs
    return 1
}

const totalLikes = (blogs) => blogs.reduce((total,blog) => total + blog.likes, 0)

const favoriteBlog = (blogs) => blogs.reduce((acc, blog) =>
    acc.likes > blog.likes ? acc : blog
)

const mostBlogs = (blogs) => {
    const blog = blogs.reduce((acc,blog) => {
        acc[blog] = (acc[blog] || 0) + 1
        return blog
    })
    const blogPosts = blogs.filter(b => b.author === blog.author)
    return { author: blog.author, blogs: blogPosts.length }
}

const mostLikes = (blogs) => {
    const authors = blogs.reduce((acc,blog) => {
        if (blog.author in acc){
            acc[blog.author] += blog.likes
        } else {
            acc[blog.author] = blog.likes
        }
        return acc
    },{})

    const auhtorWithMostLikes = Object.keys(authors).reduce((a,b) => authors[a] > authors[b] ? a : b)
    const mostLiked = { auhtor: auhtorWithMostLikes, likes: authors[auhtorWithMostLikes] }
    return mostLiked
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}