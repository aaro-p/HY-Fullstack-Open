import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setEventNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()
    const filteredAndSortedAnecdotes = anecdotes.filter(
        a => a.content.toLowerCase()
        .includes(filter === "ALL" ? "" : filter.toLowerCase()))
        .sort((a,b) => b.votes - a.votes)

    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote));
        dispatch(setEventNotification(`you voted '${anecdote.content}'`, 5))
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