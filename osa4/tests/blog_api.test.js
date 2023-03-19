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

describe('GET BLOGS', () => {
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
})

describe('POST BLOG', () => {
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
    test('validate blog model on POST', async () => {
        const testBlog = {
            author: 'jane doe',
            likes: 1
        }
        await api.post('/api/blogs')
            .send(testBlog)
            .expect(400)
    })
})

describe('BLOG DELETE', () => {
    test('delete is successful', async () => {
        const { _id } = testHelper.initialBlogs[1]
        const blogsBeforeDelete = await testHelper.blogsInDb()
        await api.delete(`/api/blogs/${_id}`)
            .expect(204)
        const blogsAfterDelete = await testHelper.blogsInDb()

        expect(blogsAfterDelete.length).toBe(blogsBeforeDelete.length - 1)
        expect(blogsAfterDelete).not.toContain(testHelper.initialBlogs[1])

    })
})

describe('UPDATE BLOG', () => {
    test('blog updated successfully', async () => {
        const { _id } = testHelper.initialBlogs[0]
        const updatedBlog = { title: 'updated blog',
            author: 'updated author',
            url: 'https://www.updatedLink.com',
            likes: 88,
        }
        await api.put(`/api/blogs/${_id}`)
            .send(updatedBlog)
            .expect(200)
        const blogsAfterUpdate = await testHelper.blogsInDb()
        expect(blogsAfterUpdate[0]).toMatchObject(updatedBlog)
    })
})


afterAll(async () => {
    await mongoose.connection.close()
})