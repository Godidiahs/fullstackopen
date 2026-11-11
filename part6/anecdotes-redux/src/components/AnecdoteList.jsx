import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'

// Full Stack Open Part 6, exercises 6.3-6.4, 6.10, 6.14-6.19
// Lists anecdotes sorted by votes, filtered by the filter
// string, with a vote button for each anecdote.

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => {
    const filter = state.filter.toLowerCase()
    const filtered = filter
      ? state.anecdotes.filter((a) => a.content.toLowerCase().includes(filter))
      : state.anecdotes
    return [...filtered].sort((a, b) => b.votes - a.votes)
  })

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}{' '}
            <button onClick={() => dispatch(voteFor(anecdote))}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
