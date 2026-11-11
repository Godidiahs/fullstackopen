import { useState } from 'react'

// Full Stack Open Part 5, exercises 5.6, 5.13
// Form for creating a new blog. The fields are controlled by
// this component's own state; on submit it calls onCreate and
// clears the fields.

const BlogForm = ({ onCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    onCreate({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <h2>create new</h2>
      <div>
        title: <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="title" />
      </div>
      <div>
        author: <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="author" />
      </div>
      <div>
        url: <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="url" />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm
