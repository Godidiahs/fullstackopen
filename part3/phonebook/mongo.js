const mongoose = require('mongoose')

// Full Stack Open Part 3, exercise 3.12
// Command-line helper for the phonebook database.
// Usage:
//   node mongo.js <password>            -- list all persons
//   node mongo.js <password> <name> <number>   -- add a person
// The password is the MongoDB Atlas database user password.
// It is passed on the command line only, never stored in source.

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.example.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({ name: String, number: String })
const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then((persons) => {
    console.log('phonebook:')
    persons.forEach((person) => console.log(`${person.name} ${person.number}`))
    mongoose.connection.close()
  })
} else {
  const person = new Person({ name: process.argv[3], number: process.argv[4] })
  person.save().then(() => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
  })
}
