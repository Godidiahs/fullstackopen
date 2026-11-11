import axios from 'axios'

// Full Stack Open Part 5, exercises 5.1-5.2
// Login service: posts credentials to the Part 4 backend and
// returns the user object (with the JWT token) on success.

const baseUrl = '/api/login'

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }
