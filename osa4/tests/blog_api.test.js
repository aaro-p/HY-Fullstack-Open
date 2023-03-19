const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const testHelper = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(testHelper.initialBlogs)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(testHelper.initialBlogs.length)

})

test('all blogs shoud have indentifier as id', async () => {
    const response = await api.get('/api/blogs')

    const blogs = response.body.map(blog => blog)
    blogs.forEach(blog => {
        expect(blog.id).toBeDefined()
    })
})

test('blog can be added to DB', async () => {

    const testBlog = {
        title: 'new blog',
        author: 'jane doe',
        url: 'https://www.janesblog.com',
        likes: 1,
    }

    await api.post('/api/blogs')
        .send(testBlog)
        .expect(201)

    const blogsInDb = await testHelper.blogsInDb()
    expect(blogsInDb).toHaveLength(testHelper.initialBlogs.length + 1)

    expect(blogsInDb[blogsInDb.length - 1]).toMatchObject(testBlog)


})

test('added blog likes property should be 0 for default', async () => {
    const testBlog = {
        title: 'new blog',
        author: 'jane doe',
        url: 'https://www.janesblog.com',
    }

    await api.post('/api/blogs')
        .send(testBlog)
        .expect(201)
    const blogsInDb = await testHelper.blogsInDb()
    expect(blogsInDb).toHaveLength(testHelper.initialBlogs.length + 1)

    expect(blogsInDb[blogsInDb.length - 1].likes).toBe(0)
})

test('validate blog model', async () => {
    const testBlog = {
        author: 'jane doe',
        likes: 1
    }
    await api.post('/api/blogs')
        .send(testBlog)
        .expect(400)
})


afterAll(async () => {
    await mongoose.connection.close()
})