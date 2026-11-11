import axios from 'axios'

// Full Stack Open Part 6, exercises 6.14-6.19
// Anecdote API service, backed by the JSON server (db.json,
// port 3001). The Vite proxy maps /api to the JSON server.

const baseUrl = '/api/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const vote = async (anecdote) => {
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, { ...anecdote, votes: anecdote.votes + 1 })
  return response.data
}

export default { getAll, create, vote }
