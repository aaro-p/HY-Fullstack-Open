import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer"
const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleAddAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ""
    dispatch(addAnecdote(anecdote))
    dispatch(setNotification(`new anecdote added '${anecdote}'`))
    setTimeout(() => {
      dispatch(setNotification(""))
    },5000)
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