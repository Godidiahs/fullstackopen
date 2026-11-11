const express = require('express')
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

// Full Stack Open Part 4, exercises 4.1-4.23
// Blog list backend. The app is exported (not started) so
// the tests can import it; index.js starts the server.

const app = express()

mongoose.set('strictQuery', false)
logger.info('connecting to', config.MONGODB_URI)
mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info('connected to MongoDB'))
  .catch((error) => logger.error('error connecting to MongoDB:', error.message))

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

// In Part 7 the backend also serves comments (see part7/bloglist).
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
