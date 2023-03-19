const Blog = require('../models/blog')

const initialBlogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'Test Blog1',
        author: 'Test Blogger1',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0,
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Test Blog2',
        author: 'Test Blogger2',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0,
    },
    {
        _id: '5a422a851b54a676234d17f9',
        title: 'More TestBlogs..',
        author: 'John Doe',
        url: 'https://reactpatterns.com/',
        likes: 1,
        __v: 0,
    },
    {
        _id: '5a422aa71b54a676234d17f0',
        title: 'Cool blog',
        author: 'John Doe',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 0,
        __v: 0,
    },
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = { initialBlogs, blogsInDb }