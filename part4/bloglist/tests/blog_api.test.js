const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const listHelper = require('../utils/list_helper')

// Full Stack Open Part 4, exercises 4.3-4.14, 4.17-4.23
// API tests (supertest) and list_helper unit tests (4.3-4.7).
// Run with: NODE_ENV=test node --test  (npm test)

const api = supertest(app)

const getToken = async () => {
  const login = await api.post('/api/login').send({ username: 'root', password: 'sekret' })
  return login.body.token
}

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', name: 'Superuser', passwordHash })
  await user.save()
  const blogs = helper.initialBlogs.map((blog) => new Blog({ ...blog, user: user._id }))
  await Promise.all(blogs.map((blog) => blog.save()))
})

describe('list_helper (4.3-4.7)', () => {
  test('dummy returns one', () => assert.strictEqual(listHelper.dummy([]), 1))
  test('totalLikes sums likes', () => {
    assert.strictEqual(listHelper.totalLikes(helper.initialBlogs), 24)
    assert.strictEqual(listHelper.totalLikes([]), 0)
  })
  test('favoriteBlog is the most liked', () => {
    assert.strictEqual(listHelper.favoriteBlog(helper.initialBlogs).title, 'Canonical string reduction')
  })
  test('mostBlogs and mostLikes find Dijkstra', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(helper.initialBlogs), { author: 'Edsger W. Dijkstra', blogs: 2 })
    assert.deepStrictEqual(listHelper.mostLikes(helper.initialBlogs), { author: 'Edsger W. Dijkstra', likes: 17 })
  })
})

describe('blog API (4.8-4.14)', () => {
  test('blogs are returned as JSON and have id, not _id (4.8, 4.9)', async () => {
    const response = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
    assert.ok(response.body[0].id)
    assert.strictEqual(response.body[0]._id, undefined)
  })
  test('a blog can be added with a valid token (4.10, 4.19)', async () => {
    const token = await getToken()
    const newBlog = { title: 'New blog', author: 'Tester', url: 'http://example.com', likes: 3 }
    await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog).expect(201)
    const blogs = await helper.blogsInDb()
    assert.strictEqual(blogs.length, helper.initialBlogs.length + 1)
  })
  test('likes defaults to 0 when missing (4.11)', async () => {
    const token = await getToken()
    const response = await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send({ title: 'No likes', author: 'Tester', url: 'http://example.com' }).expect(201)
    assert.strictEqual(response.body.likes, 0)
  })
  test('a blog without title or url is rejected (4.12)', async () => {
    const token = await getToken()
    await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send({ author: 'Tester' }).expect(400)
  })
  test('a blog cannot be added without a token (4.19)', async () => {
    await api.post('/api/blogs').send({ title: 'No token', url: 'http://example.com' }).expect(401)
  })
  test('a blog can be deleted by its creator (4.13, 4.21)', async () => {
    const token = await getToken()
    const blogs = await helper.blogsInDb()
    await api.delete(`/api/blogs/${blogs[0].id}`).set('Authorization', `Bearer ${token}`).expect(204)
    assert.strictEqual((await helper.blogsInDb()).length, helper.initialBlogs.length - 1)
  })
  test('a blog can be updated (4.14)', async () => {
    const blogs = await helper.blogsInDb()
    const response = await api.put(`/api/blogs/${blogs[0].id}`).send({ ...blogs[0], likes: 99 }).expect(200)
    assert.strictEqual(response.body.likes, 99)
  })
})

describe('users (4.15-4.17)', () => {
  test('a user with a short password is rejected (4.16)', async () => {
    await api.post('/api/users').send({ username: 'short', password: 'pw' }).expect(400)
  })
  test('creating a user with a duplicate username fails (4.16)', async () => {
    await api.post('/api/users').send({ username: 'root', password: 'sekret' }).expect(400)
  })
})

after(async () => { await mongoose.connection.close() })
