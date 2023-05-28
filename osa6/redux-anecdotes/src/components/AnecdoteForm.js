import { useDispatch } from 'react-redux'
import { createAnecdote, getId } from '../reducers/anecdoteReducer'
import { setEventNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleAddAnecdote = (event) => {
    event.preventDefault()
    const anecdote = {content: event.target.anecdote.value, id: getId(), votes: 0}
    event.target.anecdote.value = ""
    dispatch(createAnecdote(anecdote))
    dispatch(setEventNotification(`new anecdote added '${anecdote.content}'`,5))
  }

  return (
    <>
        <h2>create new</h2>
        <form onSubmit={handleAddAnecdote}>
        <div>
            <input name='anecdote' />
        </div>
            <button type='submit'>create</button>
        </form>
    </>
  )
}

export default AnecdoteForm