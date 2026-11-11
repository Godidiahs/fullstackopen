import { useSelector } from 'react-redux'

// Full Stack Open Part 7, exercises 7.9-7.15
// Shows the current notification from the Redux store,
// or nothing when there is no message. The class is
// 'error' or 'success' (see index.css).

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification.message) {
    return null
  }

  return <div className={notification.type}>{notification.message}</div>
}

export default Notification
