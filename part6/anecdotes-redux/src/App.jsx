import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

// Full Stack Open Part 6, exercises 6.1-6.19
// Anecdotes with Redux Toolkit. The state lives in the Redux
// store (store.js): anecdotes, filter and notification slices.
// Anecdotes are loaded from the JSON server on start and voting
// and creating are server-backed thunks (6.14-6.19).

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
