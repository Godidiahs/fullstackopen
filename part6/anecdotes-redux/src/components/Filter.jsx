import { useDispatch } from 'react-redux'
import { setFilter } from '../store'

// Full Stack Open Part 6, exercises 6.10-6.13
// Input that filters the anecdote list. The filter value
// lives in the Redux store (filter slice in store.js).

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    dispatch(setFilter(event.target.value))
  }

  return (
    <div>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter
