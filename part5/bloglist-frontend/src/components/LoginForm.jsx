import { useState } from 'react'
import PropTypes from 'prop-types'

// Full Stack Open Part 5, exercises 5.1-5.2, 5.13
// Login form. The username and password are controlled here;
// on submit the parent (App) handles the login request.
// The inputs are named so the Playwright tests can find them.

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    onLogin(username, password)
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input type="text" value={username} name="Username" onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        password
        <input type="password" value={password} name="Password" onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
}

export default LoginForm
