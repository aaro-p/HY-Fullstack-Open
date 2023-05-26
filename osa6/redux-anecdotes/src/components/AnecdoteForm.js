import { useDispatch } from 'react-redux'
import { addAnecdote, getId } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer"
import anecdoteService from '../services/anecdotes'
const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleAddAnecdote = (event) => {
    event.preventDefault()
    const anecdote = {content: event.target.anecdote.value, id: getId(), votes: 0}
    event.target.anecdote.value = ""
    anecdoteService.createAnecdote(anecdote).then(data => dispatch(addAnecdote(data)))
    dispatch(setNotification(`new anecdote added '${anecdote.content}'`))
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