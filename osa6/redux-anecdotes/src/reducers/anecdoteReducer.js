import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes";

export const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    vote: (state,action) => {
      const {id} = action.payload;
      return state.map(anecdote => anecdote.id !== id ? anecdote : action.payload)
    },
    addAnecdote: (state,action) => {
      state.push(action.payload)
    },
    setAnecdotes: (state,action) => {
      state.push(...action.payload)
    }
  }
})

export const {vote, addAnecdote, setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes));
  }
}

export const createAnecdote = (anecdoteToCreate) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createAnecdote(anecdoteToCreate);
    dispatch(addAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.voteAnecdote(anecdote);
    dispatch(vote(votedAnecdote));
  }
}

export default anecdoteSlice.reducer
