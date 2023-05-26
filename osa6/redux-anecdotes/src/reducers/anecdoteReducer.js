import { createSlice } from "@reduxjs/toolkit"

export const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteById: (state,action) => {
      const id = action.payload;
      const anecdoteToVote = state.find(a => a.id === id)
      const votedAnecdote = {
        ...anecdoteToVote,
        votes : anecdoteToVote.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : votedAnecdote)
    },
    addAnecdote: (state,action) => {
      state.push(action.payload)
    },
    setAnecdotes: (state,action) => {
      state.push(...action.payload)
    }
  }
})

export const {voteById, addAnecdote, setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer
