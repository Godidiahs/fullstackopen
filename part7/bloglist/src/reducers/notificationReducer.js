import { createSlice } from '@reduxjs/toolkit'

// Full Stack Open Part 7, exercises 7.9-7.15
// Notification state: a message and its type ('success'
// or 'error'). showNotification sets a message and
// clears it after the given number of seconds.

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: '', type: '' },
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return { message: '', type: '' }
    },
  },
})

export const { setNotification, clearNotification } =
  notificationSlice.actions

export const showNotification =
  (message, type = 'success', seconds = 5) =>
  (dispatch) => {
    dispatch(setNotification({ message, type }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000)
  }

export default notificationSlice.reducer
