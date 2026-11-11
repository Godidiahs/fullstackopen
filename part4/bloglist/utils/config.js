require('dotenv').config()

// Full Stack Open Part 4, exercise 4.1
// Centralised configuration. MONGODB_URI and PORT come from
// the environment; the test database is used when NODE_ENV=test.
// SECRET is the JWT secret (see .env.example).

const PORT = process.env.PORT || 3003

const MONGODB_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI

module.exports = { MONGODB_URI, PORT }
