// Full Stack Open Part 4, exercise 4.1
// Logging that stays quiet in tests. info is used for normal
// messages, error for connection and other errors.

const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') console.log(...params)
}

const error = (...params) => {
  if (process.env.NODE_ENV !== 'test') console.error(...params)
}

module.exports = { info, error }
