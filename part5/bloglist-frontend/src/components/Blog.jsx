import { useState } from 'react'
import PropTypes from 'prop-types'

// Full Stack Open Part 5, exercises 5.5-5.10, 5.13
// A single blog. The summary (title + author) is always shown;
// url, likes and the user who added it are shown after
// clicking 'view'. The like button (5.9) and the remove button
// (5.10, only for the user who created the blog) are here.

const Blog = ({ blog, onLike, onRemove, user }) => {
  const [visible, setVisible] = useState(false)

  const handleLike = () => {
    onLike(blog.id, { ...blog, likes: blog.likes + 1, user: blog.user.id || blog.user })
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author}{' '}
        <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
      </div>
      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user?.name}</div>
          {user && blog.user && (blog.user.username === user.username || blog.user.id === user.id) && (
            <button onClick={() => onRemove(blog.id)}>remove</button>
          )}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  onLike: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  user: PropTypes.object,
}

export default Blog
