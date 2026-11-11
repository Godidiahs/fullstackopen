import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
import { showNotification } from '../store'

// Full Stack Open Part 6, exercises 6.1-6.19
// Anecdotes slice (Redux Toolkit). Voting and creating are
// thunks that talk to the JSON server (6.14-6.19); the plain
// reducers update the store optimistically after the server
// call succeeds.

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    voteAnecdote(state, action) {
      const updated = action.payload
      return state.map((a) => (a.id === updated.id ? updated : a))
    },
  },
})

export const { setAnecdotes, addAnecdote, voteAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch(addAnecdote(newAnecdote))
    dispatch(showNotification(`you created '${content}'`))
  }
}

export const voteFor = (anecdote) => {
  return async (dispatch) => {
    const updated = await anecdoteService.vote(anecdote)
    dispatch(voteAnecdote(updated))
    dispatch(showNotification(`you voted '${anecdote.content}'`))
  }
}

export default anecdoteSlice.reducer
