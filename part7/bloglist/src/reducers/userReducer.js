import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { showNotification } from './notificationReducer'

// Full Stack Open Part 7, exercises 7.9-7.15
// The logged-in user, stored in Redux and in
// localStorage (key 'loggedBlogAppUser', as in Part 5).
// The token is passed to the blog service on login and
// on page reload.

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser() {
      return null
    },
  },
})

export const { setUser, clearUser } = userSlice.actions

export const loginUser = (credentials) => async (dispatch) => {
  try {
    const user = await loginService.login(credentials)
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch(setUser(user))
    dispatch(showNotification(`welcome ${user.name}`))
  } catch (error) {
    dispatch(showNotification('wrong username or password', 'error'))
  }
}

export const logoutUser = () => (dispatch) => {
  window.localStorage.removeItem('loggedBlogAppUser')
  blogService.setToken(null)
  dispatch(clearUser())
}

export const initializeUser = () => (dispatch) => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    blogService.setToken(user.token)
    dispatch(setUser(user))
  }
}

export default userSlice.reducer
