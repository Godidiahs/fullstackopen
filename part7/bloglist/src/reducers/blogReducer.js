import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { showNotification } from './notificationReducer'

// Full Stack Open Part 7, exercises 7.9-7.15, 7.21
// Blog state handled with Redux Toolkit. The thunks
// call the Part 4 backend (services/blogs.js) and show
// a notification on success or failure.

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const updated = action.payload
      return state.map((blog) => (blog.id === updated.id ? updated : blog))
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
  },
})

export const { setBlogs, appendBlog, updateBlog, removeBlog } = blogSlice.actions

export const initializeBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll()
  dispatch(setBlogs(blogs))
}

export const createBlog = (blog) => async (dispatch) => {
  try {
    const newBlog = await blogService.create(blog)
    dispatch(appendBlog(newBlog))
    dispatch(
      showNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    )
  } catch (error) {
    dispatch(showNotification('adding a blog failed', 'error'))
  }
}

export const likeBlog = (blog) => async (dispatch) => {
  const liked = { ...blog, likes: blog.likes + 1 }
  const updated = await blogService.update(blog.id, liked)
  dispatch(updateBlog(updated))
  dispatch(showNotification(`blog ${updated.title} liked`))
}

export const deleteBlog = (blog) => async (dispatch) => {
  await blogService.remove(blog.id)
  dispatch(removeBlog(blog.id))
  dispatch(showNotification(`blog ${blog.title} removed`))
}

export const addComment = (blog, comment) => async (dispatch) => {
  const updated = await blogService.addComment(blog.id, comment)
  dispatch(updateBlog(updated))
}

export default blogSlice.reducer
