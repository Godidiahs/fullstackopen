import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

// Full Stack Open Part 7, exercises 7.16-7.18
// Users view: a table of all users and the number of
// blogs each has created. Each user links to their
// single view at /users/:id.

const Users = () => {
  const users = useSelector((state) => state.users)

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
