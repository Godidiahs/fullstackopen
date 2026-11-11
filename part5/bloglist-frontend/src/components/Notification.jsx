// Full Stack Open Part 5, exercise 5.3
// Shows a success (green) or error (red) message, or nothing
// when there is no message. The CSS classes are in index.css.

const Notification = ({ message, type }) => {
  if (!message) return null
  return <div className={type === 'error' ? 'error' : 'success'}>{message}</div>
}

export default Notification
