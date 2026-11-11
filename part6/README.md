# Part 6 — State management with Redux and React Query

This part covers managing application state with Redux
(6.1–6.19) and with React Query (6.20–6.24). It contains
two versions of the same anecdotes app, both backed by a
JSON server on port 3001.

## anecdotes-redux — exercises 6.1–6.19

Anecdotes with Redux Toolkit and asynchronous thunks.

| Exercises | Content |
| --- | --- |
| 6.1–6.2 | `anecdoteReducer` with `createAnecdote` and voting, using Redux Toolkit `createSlice` |
| 6.3–6.4 | `AnecdoteForm` and `AnecdoteList` components connected to the store |
| 6.5 | `store.js` with `configureStore` |
| 6.6–6.9 | `Filter` component and a filter slice in `store.js` |
| 6.10–6.13 | Notification with a notification slice and `showNotification` thunk (clears after 5 seconds) |
| 6.14–6.19 | Communication with the server: `services/anecdotes.js` (axios), thunks `initializeAnecdotes`, `createAnecdote`, `voteFor`, JSON server seed in `db.json` |

Run it:

```bash
cd anecdotes-redux
npm install
npm run server   # json-server on port 3001
npm run dev
```

## query-anecdotes — exercises 6.20–6.24

The same anecdotes app, with state handled by React Query
(`@tanstack/react-query`) and notifications with React
context (`NotificationContext.jsx`).

| Exercises | Content |
| --- | --- |
| 6.20 | Fetching anecdotes with `useQuery` |
| 6.21 | Creating anecdotes with `useMutation`, invalidating/updating the query cache |
| 6.22 | Voting with `useMutation` and a notification via context |
| 6.23 | Notifications with `useReducer` + context, cleared after 5 seconds |
| 6.24 | Error handling: a failed fetch shows "anecdote service not available due to problems in server", and a too-short anecdote shows the server error |

Run it:

```bash
cd query-anecdotes
npm install
npm run server   # json-server on port 3001
npm run dev
```
