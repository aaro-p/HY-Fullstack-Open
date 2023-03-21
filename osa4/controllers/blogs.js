const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')


blogsRouter.get('/', async (_, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.post('/', userExtractor,async (request, response) => {
    const { body, user } = request
    if (user === null) {
        return response.status(401).json({ error: 'Unauthorized, token is invalid or missing' })
    }
    const newBlog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    const saved = await newBlog.save()
    user.blogs = user.blogs.concat(saved._id)
    await user.save()
    response.status(201).json(saved)

})

blogsRouter.delete('/:id', userExtractor,async (request, response) => {
    const { id } = request.params
    const user = request.user

    const blog = await Blog.findById(id)
    if (!blog) {
        return response.status(404).json({ error: 'Blog not found' })
    }

    if (user && blog.user.toString() === user.id.toString()) {
        await Blog.findByIdAndRemove(id)
        response.status(204).end()
    } else {
        response.status(401).json({ error: 'unauthorized' })
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const { id } = request.params
    const body = request.body

    await Blog.findByIdAndUpdate(id, body, { new: true })
    response.status(200).json(body)
})

module.exports = blogsRouter
