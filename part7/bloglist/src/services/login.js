import axios from 'axios'

// Full Stack Open Part 7, exercises 7.9-7.15
// Login against the Part 4 backend (/api/login).

const baseUrl = '/api/login'

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }
