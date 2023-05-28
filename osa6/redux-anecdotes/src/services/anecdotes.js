import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
}

const createAnecdote = async (anecdoteToCreate) => {
    const response = await axios.post(baseUrl, anecdoteToCreate);
    return response.data;
}

const voteAnecdote = async (anecdote) => {
    const putObj = {...anecdote, votes: anecdote.votes+1}
    const {id} = putObj;
    const response = await axios.put(`${baseUrl}/${id}`,putObj)
    return response.data;
}

const anecdoteService = {
    getAll,
    createAnecdote,
    voteAnecdote
}

export default anecdoteService