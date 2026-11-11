import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

  const showNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find((person) => person.name === newName)
    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const changedPerson = { ...existingPerson, number: newNumber }
        personService
          .update(existingPerson.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            )
            setNewName('')
            setNewNumber('')
            showNotification(`Updated ${newName}`, 'success')
          })
          .catch(() => {
            showNotification(
              `Information of ${newName} has already been removed from server`,
              'error'
            )
            setPersons(persons.filter((p) => p.id !== existingPerson.id))
          })
      }
      return
    }
    const personObject = {
      name: newName,
      number: newNumber,
    }
    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
      showNotification(`Added ${newName}`, 'success')
    })
  }

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== person.id))
          showNotification(`Deleted ${person.name}`, 'success')
        })
        .catch(() => {
          showNotification(
            `Information of ${person.name} has already been removed from server`,
            'error'
          )
          setPersons(persons.filter((p) => p.id !== person.id))
        })
    }
  }

  const personsToShow =
    filter === ''
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter filter={filter} handleFilterChange={(event) => setFilter(event.target.value)} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={(event) => setNewName(event.target.value)}
        newNumber={newNumber}
        handleNumberChange={(event) => setNewNumber(event.target.value)}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App
