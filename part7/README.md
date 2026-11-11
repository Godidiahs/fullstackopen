# Part 7 — React Router, custom hooks, and styling

This part adds routing, custom hooks and styling to the
apps from the earlier parts.

## routed-anecdotes — exercises 7.1–7.8

Anecdotes with React Router (`react-router-dom`).

| Exercises | Content |
| --- | --- |
| 7.1–7.2 | Menu with `NavLink`, routes for the anecdote list (`/`), the create form (`/create`) and about (`/about`) |
| 7.3–7.4 | Single anecdote view at `/anecdotes/:id` with `useMatch` |
| 7.5–7.6 | Creating an anecdote navigates back to the list with `useNavigate` and shows a notification for 5 seconds |
| 7.7–7.8 | Custom hook `useField` (`src/hooks/index.js`) used for the create form fields, with a reset button |

Run it:

```bash
cd routed-anecdotes
npm install
npm run dev
```

## bloglist — exercises 7.9–7.21

The Part 5 bloglist frontend, with state moved to Redux
and routing added. The backend is the Part 4 bloglist
API (run it first, on port 3003).

| Exercises | Content |
| --- | --- |
| 7.9–7.10 | Blogs and the logged-in user in the Redux store (`reducers/blogReducer.js`, `reducers/userReducer.js`, `store.js`) |
| 7.11–7.12 | Notifications in Redux (`reducers/notificationReducer.js`) and creating/liking blogs through thunks |
| 7.13–7.15 | Login and logout through Redux thunks; the user is kept in `localStorage` under `loggedBlogAppUser`, as in Part 5 |
| 7.16–7.17 | Users view (`/users`) listing all users and how many blogs each created (`reducers/usersReducer.js`, `components/Users.jsx`) |
| 7.18 | Single user view at `/users/:id` (`components/User.jsx`) |
| 7.19–7.20 | Single blog view at `/blogs/:id` (`components/Blog.jsx`): url, likes with a like button, the user who added it, remove for the creator, and the comments list |
| 7.21 | Adding comments: `addComment` in `services/blogs.js` (POST `/api/blogs/:id/comments`, already in the Part 4 backend) and a comment form in `components/Blog.jsx` |

Run it:

```bash
cd ../part4/bloglist && npm run dev   # backend on port 3003
cd ../part7/bloglist && npm install && npm run dev
```

The `comments` field (`models/blog.js`) and the
`POST /:id/comments` endpoint (`controllers/blogs.js`)
were added to the Part 4 backend as preparation.
