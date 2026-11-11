import { configureStore, createSlice } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'

// Full Stack Open Part 6, exercises 6.1-6.19
// The Redux store: anecdotes (in reducers/anecdoteReducer.js),
// a filter string and a notification message. The filter and
// notification slices are small, so they live here.

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter(state, action) {
      return action.payload
    },
  },
})

export const { setFilter } = filterSlice.actions

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return ''
    },
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const showNotification = (message, seconds = 5) => {
  return async (dispatch) => {
    dispatch(setNotification(message))
    setTimeout(() => dispatch(clearNotification()), seconds * 1000)
  }
}

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterSlice.reducer,
    notification: notificationSlice.reducer,
  },
})

export default store
