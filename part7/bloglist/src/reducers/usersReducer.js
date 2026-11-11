import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

// Full Stack Open Part 7, exercises 7.16-7.18
// The list of all users, shown in the users view with
// the number of blogs each user has created.

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
  },
})

export const { setUsers } = usersSlice.actions

export const initializeUsers = () => async (dispatch) => {
  const users = await userService.getAll()
  dispatch(setUsers(users))
}

export default usersSlice.reducer
