import axios from 'axios'

// Full Stack Open Part 7, exercises 7.16-7.18
// Fetching all users from the Part 4 backend.

const baseUrl = '/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getAll }
