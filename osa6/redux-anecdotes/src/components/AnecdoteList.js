import { useDispatch, useSelector } from 'react-redux'
import { voteById } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()
    const filteredAndSortedAnecdotes = anecdotes.filter(
        a => a.content.toLowerCase()
        .includes(filter === "ALL" ? "" : filter.toLowerCase()))
        .sort((a,b) => b.votes - a.votes)

    const vote = (anecdote) => {
        dispatch(voteById(anecdote.id))
        dispatch(setNotification(`you voted '${anecdote.content}'`))
        setTimeout(()  => {
            dispatch(setNotification(""))
        },5000)
    }

    return (
        <>
            {filteredAndSortedAnecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                {anecdote.content}
                </div>
                <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
                </div>
            </div>
            )}
      </>
    )
}

export default AnecdoteList