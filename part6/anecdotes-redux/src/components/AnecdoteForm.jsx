import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

// Full Stack Open Part 6, exercises 6.3-6.4, 6.14-6.19
// Form for creating a new anecdote. The input is handled as
// an uncontrolled component, reading the value from the form
// event, as in the course material.

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
