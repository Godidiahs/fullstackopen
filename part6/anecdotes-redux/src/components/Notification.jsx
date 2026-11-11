import { useSelector } from 'react-redux'

// Full Stack Open Part 6, exercises 6.11-6.13, 6.19
// Shows the current notification from the Redux store,
// or nothing when there is no notification. Styling is the
// same as in the course material.

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  }

  if (!notification) {
    return null
  }

  return <div style={style}>{notification}</div>
}

export default Notification
