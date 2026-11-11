import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAll, create, update } from './services/anecdotes'
import {
  useNotificationValue,
  useNotificationDispatch,
  showNotification,
} from './NotificationContext'

// Full Stack Open Part 6, exercises 6.20-6.24
// Anecdotes fetched and mutated with React Query.
// Notifications are handled with the context in
// NotificationContext.jsx. A failed fetch shows the
// anecdote service error message (6.24).

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: create,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      showNotification(
        notificationDispatch,
        `anecdote '${newAnecdote.content}' created`
      )
    },
    onError: (error) => {
      showNotification(
        notificationDispatch,
        error.response?.data?.error || 'anecdote must be at least 5 characters long'
      )
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const App = () => {
  const queryClient = useQueryClient()
  const notification = useNotificationValue()
  const notificationDispatch = useNotificationDispatch()

  const voteMutation = useMutation({
    mutationFn: update,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.map((a) => (a.id === updatedAnecdote.id ? updatedAnecdote : a))
      )
      showNotification(
        notificationDispatch,
        `anecdote '${updatedAnecdote.content}' voted`
      )
    },
  })

  const handleVote = (anecdote) => {
    voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: false,
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
      {notification && (
        <div
          style={{
            border: 'solid',
            padding: 10,
            borderWidth: 1,
            marginBottom: 10,
          }}
        >
          {notification}
        </div>
      )}
      <AnecdoteForm />
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}{' '}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
