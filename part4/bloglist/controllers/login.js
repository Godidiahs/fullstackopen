const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

// Full Stack Open Part 4, exercise 4.18: token-based login.
// Returns a signed JSON Web Token for a valid username/password.
// The secret comes from SECRET in .env (never committed).

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body
  const user = await User.findOne({ username })
  const passwordCorrect = user ? await bcrypt.compare(password, user.passwordHash) : false
  if (!(user && passwordCorrect)) {
    return response.status(401).json({ error: 'invalid username or password' })
  }
  const userForToken = { username: user.username, id: user._id }
  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 })
  response.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
