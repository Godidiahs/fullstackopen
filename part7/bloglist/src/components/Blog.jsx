import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { likeBlog, deleteBlog, addComment } from '../reducers/blogReducer'

// Full Stack Open Part 7, exercises 7.9-7.15, 7.19-7.21
// Single blog view at /blogs/:id: title and author,
// url, likes with a like button, the user who added the
// blog, a remove button for the blog's creator, and the
// comments list with a form to add a comment (7.19-7.21).

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const [comment, setComment] = useState('')

  if (!blog) {
    return null
  }

  const canRemove = user && blog.user && user.username === blog.user.username

  const handleLike = () => {
    dispatch(likeBlog(blog))
  }

  const handleRemove = () => {
    if (
      window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    ) {
      dispatch(deleteBlog(blog))
      navigate('/')
    }
  }

  const handleAddComment = (event) => {
    event.preventDefault()
    dispatch(addComment(blog, comment))
    setComment('')
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes <button onClick={handleLike}>like</button>
      </div>
      <div>added by {blog.user?.name}</div>
      {canRemove && <button onClick={handleRemove}>remove</button>}
      <h3>comments</h3>
      <form onSubmit={handleAddComment}>
        <input
          type="text"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {(blog.comments || []).map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
