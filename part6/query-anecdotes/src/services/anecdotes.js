import axios from 'axios'

// Full Stack Open Part 6, exercises 6.20-6.24
// The /api base is proxied to the JSON server on port
// 3001 by vite.config.js, the same setup as the Redux
// anecdotes app.

const baseUrl = '/api/anecdotes'

export const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const create = async (newAnecdote) => {
  const response = await axios.post(baseUrl, newAnecdote)
  return response.data
}

export const update = async (anecdote) => {
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
  return response.data
}
