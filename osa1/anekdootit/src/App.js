import { useState } from "react";

const App = () => {
    const anecdotes = [
        "If it hurts, do it more often.",
        "Adding manpower to a late software project makes it later!",
        "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        "Premature optimization is the root of all evil.",
        "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
        "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
        "The only way to go fast, is to go well.",
    ];

    const MAX_NUMBER = anecdotes.length - 1;
    const MIN_NUMBER = 0;

    const anecdoteVotes = Array(MAX_NUMBER).fill(0);

    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState(anecdoteVotes);

    const generateAnecdote = () => {
        const min = Math.ceil(MIN_NUMBER);
        const max = Math.floor(MAX_NUMBER);
        const randomNumber = Math.floor(Math.random() * (max - min) + min);
        setSelected(randomNumber);
    };

    const voteAnecdote = () => {
        const votesCopy = [...votes];
        votesCopy[selected] += 1;
        setVotes(votesCopy);
    };

    const mostVoted = votes.indexOf(Math.max(...votes));

    return (
        <>
            <h1>Anecdote of the day</h1>
            <div>{anecdotes[selected]}</div>
            <div>{`Has ${votes[selected]} votes`}</div>
            <button onClick={() => generateAnecdote()}>next anecdote</button>
            <button onClick={() => voteAnecdote()}>vote</button>

            <h1>Anecdote with most votes</h1>
            {votes.some((v) => v > 0) && (
                <>
                    <div>{anecdotes[mostVoted]}</div>
                    <div>{`Has ${votes[mostVoted]} votes`}</div>
                </>
            )}
        </>
    );
};

export default App;
