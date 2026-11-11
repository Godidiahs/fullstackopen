require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

// Full Stack Open Part 3, exercises 3.1-3.22
// Phonebook backend: Express + MongoDB (Mongoose).
// Serves the production build of the Part 2 phonebook frontend
// from dist/ when present (3.9-3.11), and a JSON API at /api/persons.

const app = express()

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())

morgan.token('body', (request) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// 3.2, 3.8: info page -- number of persons and the time of the request
app.get('/info', (request, response, next) => {
  Person.countDocuments({})
    .then((count) => {
      response.send(`<p>Phonebook has info for ${count} people</p><p>${new Date()}</p>`)
    })
    .catch((error) => next(error))
})

// 3.1, 3.13: list all persons
app.get('/api/persons', (request, response, next) => {
  Person.find({}).then((persons) => response.json(persons)).catch((error) => next(error))
})

// 3.3, 3.14: show one person
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => (person ? response.json(person) : response.status(404).end()))
    .catch((error) => next(error))
})

// 3.4, 3.5, 3.10, 3.15, 3.19, 3.20: add a person (validated by the Mongoose schema)
app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body
  if (!name || !number) {
    return response.status(400).json({ error: 'name or number missing' })
  }
  const person = new Person({ name, number })
  person.save().then((savedPerson) => response.json(savedPerson)).catch((error) => next(error))
})

// 3.17, 3.20: update a person's number; validators run on update too
app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body
  Person.findByIdAndUpdate(request.params.id, { name, number }, { new: true, runValidators: true, context: 'query' })
    .then((updatedPerson) => (updatedPerson ? response.json(updatedPerson) : response.status(404).end()))
    .catch((error) => next(error))
})

// 3.6, 3.15: delete a person
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

// 3.7, 3.16, 3.20: error handler -- malformed id, validation errors
const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
