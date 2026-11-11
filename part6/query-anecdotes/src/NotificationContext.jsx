import { createContext, useReducer, useContext } from 'react'

// Full Stack Open Part 6, exercises 6.22-6.24
// Notification state handled with React context and
// useReducer, instead of Redux. showNotification sets a
// message and clears it after the given number of seconds.

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return ''
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ''
  )

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export const showNotification = (dispatch, message, seconds = 5) => {
  dispatch({ type: 'SET', payload: message })
  setTimeout(() => {
    dispatch({ type: 'CLEAR' })
  }, seconds * 1000)
}

export default NotificationContext
