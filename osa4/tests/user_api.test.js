const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const testHelper = require('./test_helper')
const bcrypt = require('bcrypt')

const SALT_ROUNDS = 10

beforeEach(async () => {
    await User.deleteMany({})
    const initalUser = testHelper.initialUser
    const hashedPassword = await bcrypt.hash(initalUser.password, SALT_ROUNDS)
    const user = await new User({
        username: initalUser.username,
        name: initalUser.name,
        passwordHash: hashedPassword
    })
    await user.save()
})

describe('GET USERS', () => {
    test('Users are returned as JSON', async () => {
        await api.get('/api/users').expect(200)
            .expect('Content-Type', /application\/json/)
    })
})

describe('POST USER', () => {

    test('Username must be unique', async () => {
        const user = {
            name: 'test user',
            username: 'test1',
            password: 'secret'
        }
        const result = await api.post('/api/users')
            .send(user).expect(400)
            .expect('Content-Type', /application\/json/)
        expect(result.body.error).toContain('expected `username` to be unique')
    })

    test('Validate password min length', async () => {

        const user = {
            name: 'test user',
            username: 'new user',
            password: 'ee'
        }

        const reponse = await api.post('/api/users')
            .send(user).expect(400)
            .expect('Content-Type', /application\/json/)

        expect(reponse.body.error).toContain('Password dont match with requirements')
    })
    test('Validate username min length', async () => {

        const user = {
            name: 'newuser',
            username: 'ne',
            password: 'secret'
        }

        const response = await api.post('/api/users')
            .send(user).expect(400)
            .expect('Content-Type', /application\/json/)

        expect(response.body.error).toContain('is shorter than the minimum allowed length (3).')
    })
    test('Valid user is added', async() => {

        const user = {
            name: 'new user',
            username: 'new',
            password: 'secret'
        }

        const usersInDbStart = await testHelper.usersInDb()
        await api.post('/api/users')
            .send(user)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersInDb = await testHelper.usersInDb()
        expect(usersInDb).toHaveLength(usersInDbStart.length + 1)
    })
})



afterAll(async () => {
    await mongoose.connection.close()
})

