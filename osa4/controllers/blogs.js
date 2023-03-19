const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (_, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const newBlog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    })

    const saved = await newBlog.save()
    response.status(201).json(saved)

})

module.exports = blogsRouter
