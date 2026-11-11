import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'
import usersReducer from './reducers/usersReducer'

// Full Stack Open Part 7, exercises 7.9-7.21
// Redux store for the bloglist: blogs, the logged-in
// user, notifications, and the list of all users.

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: userReducer,
    notification: notificationReducer,
    users: usersReducer,
  },
})

export default store
