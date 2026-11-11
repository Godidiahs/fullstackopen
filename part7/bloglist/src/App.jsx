import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { initializeUser, loginUser, logoutUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'

// Full Stack Open Part 7, exercises 7.9-7.21
// Bloglist with Redux and React Router. The backend is
// the Part 4 bloglist API (port 3003). Routes: the blog
// list at /, a single blog at /blogs/:id, the users
// view at /users and a single user at /users/:id.

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const users = useSelector((state) => state.users)
  const user = useSelector((state) => state.user)
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
    dispatch(initializeUser())
  }, [dispatch])

  const handleLogin = (credentials) => {
    dispatch(loginUser(credentials))
  }

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const addBlog = (blog) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blog))
  }

  const blogMatch = useMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find((b) => b.id === blogMatch.params.id)
    : null

  const userMatch = useMatch('/users/:id')
  const singleUser = userMatch
    ? users.find((u) => u.id === userMatch.params.id)
    : null

  if (!user) {
    return (
      <div>
        <Notification />
        <LoginForm handleLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in{' '}
        <button onClick={handleLogout}>logout</button>
      </p>
      <p>
        <Link to="/">blogs</Link> <Link to="/users">users</Link>
      </p>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                <BlogForm createBlog={addBlog} />
              </Togglable>
              {[...blogs]
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                  <div key={blog.id} className="blog">
                    <Link to={`/blogs/${blog.id}`}>
                      {blog.title} {blog.author}
                    </Link>
                  </div>
                ))}
            </div>
          }
        />
        <Route path="/blogs/:id" element={<Blog blog={blog} />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User user={singleUser} />} />
      </Routes>
    </div>
  )
}

export default App
